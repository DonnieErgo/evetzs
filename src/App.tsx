import { FC, useState } from 'react';
import getId from './api/getId';
import getLatestHashId from './api/getLatestHashId';
import getTimestamps from './api/getTimestamps';
import Form from './components/Form/form';
import TimeChart from './components/TimeChart/timeChart';
import { FormData, HashId, IdTime } from './types/types';

// TODO: refactor css (global styles, css variables, adaptive, layout)
// TODO: fix loaders + disable hover on dropdown on loading
// TODO: fix firefox and safari CORS error
// TODO: refactor with axios ?
// TODO: check security
// TODO: favicon and SEO
// TODO: choose data timeframe (or let user choose 1y / last 1k kills)
// TODO: render chart and fetch data simultaneously + animation
// TODO: check for memoization/caching options
// TODO: text errors for each api function
// TODO: add check for too many rejects in Promise.allSettled, failsafe for user
// TODO: add local time adapter as button "use local time"
// TODO: add copyright and donation info
// TODO: test linter and prettier hooks again
// TODO: a11y
// TODO: add short summary module like top3 systems + main TZ + lowsec/null
// TODO: incorporate check for x-esi-error-limit-remain: 100 and x-esi-error-limit-reset: 44
// TODO: tests
// TODO: response type in getId

const App: FC = () => {
  const [timestampsArray, setTimestampsArray] = useState<IdTime[]>();
  const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string>()

  const handleFormSubmit = async ({ name, entityType }: FormData) => {
    setLoading(true);
    const entityID: number = await getId(name, entityType);
    const latestHashId: HashId[] = await getLatestHashId(entityID, entityType);
    const timestamps: IdTime[] = await getTimestamps(latestHashId);
    setTimestampsArray(timestamps);
    setLoading(false);
  };

  return (
    <>
      {/*{error && <p className='error'>{error}</p>}*/}
      <Form loading={loading} onSubmit={handleFormSubmit} />
      {/* show progress bar https://www.chartjs.org/docs/latest/samples/advanced/progress-bar.html */}
      {timestampsArray && <TimeChart timeArray={timestampsArray} />}
    </>
  );
};

export default App;
