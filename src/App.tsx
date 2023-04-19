import { FC, useState } from 'react';
import getId from './api/getId';
import getLatestKills, { GetLatestDataProps } from './api/getLatestKills';
import getTimestamps from './api/getTimestamps';
import Error from './components/Error/error';
import Footer from './components/Footer/footer';
import Form from './components/Form/form';
import TimeChart from './components/TimeChart/timeChart';
import { FormData, HashId, IdTime } from './types/types';

/*
  TODO: ! refactor css (global styles, css variables)
  TODO: ! light/dark themes with a switch and auto-theme in css
  TODO: ! SEO
  TODO: ! add checkboxes for losses / w-space / solo datasets
  TODO: ! add option to set amount of kills to gather in api function
  TODO: ! check for memoization/caching options
  TODO: ! a11y
  TODO: BACKLOG add local time adapter as button "use local time"
  TODO: BACKLOG choose data timeframe (or let user choose 1y / last 1k kills)
  TODO: BACKLOG render chart and fetch data simultaneously + animation
  TODO: BACKLOG short summary module like top3 systems + main TZ + lowsec/null
  TODO: BACKLOG caps and bigger only switch
  TODO: BACKLOG add module showing which days of week player is doing, maybe even day-dependent time
  TODO: BACKLOG web-app analogue for https://github.com/Eve-PySpy/PySpy
*/

const App: FC = () => {
  const [timestampsArray, setTimestampsArray] = useState<IdTime[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleError = (errString: string) => {
    setError(errString);
    setLoading(false);
    setTimeout(() => {
      setError('');
    }, 3000);
    return;
  };

  const handleFormSubmit = async ({ name, entityType }: FormData) => {
    setLoading(true);
    const entityID: number | string = await getId(name, entityType);
    if (typeof entityID === 'string') {
      handleError(entityID);
      return;
    }

    const zkbKillsDataPack: GetLatestDataProps = {
      id: entityID,
      entityType: entityType,
      dataType: 'kills',
    };

    const latestHashId: HashId[] | string = await getLatestKills(zkbKillsDataPack);
    if (typeof latestHashId === 'string') {
      handleError(latestHashId);
      return;
    }

    const timestamps: IdTime[] | string = await getTimestamps(latestHashId);
    if (typeof timestamps === 'string') {
      handleError(timestamps);
      return;
    }

    setTimestampsArray(timestamps);
    setLoading(false);
  };

  return (
    <>
      {error && <Error showing={Boolean(error)} message={error} />}
      <div style={{ position: 'fixed', top: '10px', left: '10px', color: '#20a289' }}>beta</div>
      <Form loading={loading} onSubmit={handleFormSubmit} />
      {/* show progress bar https://www.chartjs.org/docs/latest/samples/advanced/progress-bar.html */}
      {timestampsArray && <TimeChart timeArray={timestampsArray} />}
      <Footer />
    </>
  );
};

export default App;
