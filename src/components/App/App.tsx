import { FC, useState } from 'react';
import getId from '../../helpers/api/getId';
import getTimestamps from '../../helpers/api/getTimestamps';
import getZKBData, { GetLatestDataProps } from '../../helpers/api/getZKBData';
import { ChartReadyData, FormData, HashId, IdTime } from '../../types/types';
import ErrorPopup from '../Error/errorPopup';
import Footer from '../Footer/footer';
import Form from '../Form/form';
import TimeChart from '../TimeChart/timeChart';

/*
  TODO: ! add theme switch, fix dropdown opacity on light
  TODO: ! SEO as metadata, robots.txt and previews for reddit/discord/etc
  TODO: ! add checkboxes for losses / w-space / solo datasets, add input for sampleSize
  TODO: ! check for memoization/caching options
  TODO: ! a11y
  TODO: ! test chart progress bar https://www.chartjs.org/docs/latest/samples/advanced/progress-bar.html
  TODO: BACKLOG add local time adapter as button "use local time"
  TODO: BACKLOG short summary module like top3 systems + main TZ + lowsec/null
  TODO: BACKLOG caps and bigger only switch
  TODO: BACKLOG add module showing which days of week player is doing, maybe even day-dependent time
  TODO: BACKLOG web-app analogue for https://github.com/Eve-PySpy/PySpy
*/

const App: FC = () => {
  const [timestampsArray, setTimestampsArray] = useState<ChartReadyData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleFormSubmit = async ({ name, entityType }: FormData): Promise<void> => {
    setLoading(true);

    try {
      // getting entity ID from ESI
      const entityID: number = await getId(name, entityType);

      // creating setup objects for ZKB data fetching
      const zkbKillsDataPack: GetLatestDataProps = {
        id: entityID,
        entityType: entityType,
        dataType: 'kills',
        sampleSize: 800,
      };
      const zkbLossesDataPack: GetLatestDataProps = {
        id: entityID,
        entityType: entityType,
        dataType: 'losses',
        sampleSize: 400,
      };

      // fetching ZKB data
      const latestKills: HashId[] = await getZKBData(zkbKillsDataPack);
      const latestLosses: HashId[] = await getZKBData(zkbLossesDataPack);

      // fetching timestamps from ESI
      const [killsTimestamps, lossesTimestamps]: [IdTime[], IdTime[]] = await Promise.all([
        getTimestamps(latestKills),
        getTimestamps(latestLosses),
      ]);

      setTimestampsArray({ kills: killsTimestamps, losses: lossesTimestamps });
    } catch (error) {
      let message = 'Unknown error';
      if (error instanceof Error) message = error.message;

      setError(message);
      setLoading(false);

      setTimeout(() => {
        setError('');
      }, 3000);
    }
    setLoading(false);
  };

  return (
    <>
      {error && <ErrorPopup showing={Boolean(error)} message={error} />}
      <div style={{ position: 'fixed', top: '10px', left: '10px', color: '#20a289' }}>beta</div>
      <Form loading={loading} onSubmit={handleFormSubmit} />
      {timestampsArray && <TimeChart {...timestampsArray} />}
      <Footer />
    </>
  );
};

export default App;
