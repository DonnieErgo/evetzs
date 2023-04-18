import { FC, useState } from 'react';
import getId from './api/getId';
import getLatestHashId from './api/getLatestHashId';
import getTimestamps from './api/getTimestamps';
import Error from './components/Error/error';
import Footer from './components/Footer/footer';
import Form from './components/Form/form';
import TimeChart from './components/TimeChart/timeChart';
import { FormData, HashId, IdTime } from './types/types';

/*
  TODO: refactor css (global styles, css variables, adaptive, layout)
  TODO: fix loaders + disable hover on dropdown on loading
  TODO: refactor with axios ?
  TODO: check security
  TODO: add button to
  TODO: SEO
  TODO: choose data timeframe (or let user choose 1y / last 1k kills)
  TODO: render chart and fetch data simultaneously + animation
  TODO: check for memoization/caching options
  TODO: text errors for each api function
  TODO: add check for too many rejects in Promise.allSettled, failsafe for user
  TODO: add local time adapter as button "use local time"
  TODO: add copyright and donation info
  TODO: test linter and prettier hooks again
  TODO: a11y
  TODO: add short summary module like top3 systems + main TZ + lowsec/null
  TODO: incorporate check for x-esi-error-limit-remain: 100 and x-esi-error-limit-reset: 44
  TODO: tests
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

    const latestHashId: HashId[] | string = await getLatestHashId(entityID, entityType);
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
      <Form loading={loading} onSubmit={handleFormSubmit} />
      {/* show progress bar https://www.chartjs.org/docs/latest/samples/advanced/progress-bar.html */}
      {timestampsArray && <TimeChart timeArray={timestampsArray} />}
      <Footer />
    </>
  );
};

export default App;
