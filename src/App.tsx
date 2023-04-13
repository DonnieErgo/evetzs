import {FC, FormEvent, useState} from 'react'
import './App.css'
import getLatestHashId from './api/getLatestHashId';
import getCharacterId from './api/getId';
import { HashId, IdTime } from './types/types';
import getTimestamps from "./api/getTimestamps";
import TimeChart from "./components/timeChart";

// TODO: refactor css (global styles, css variables, adaptive)
// TODO: spinner for every load
// TODO: add submit on enter key
// TODO: add corp / alliance / system entities
// TODO: refactor with axios ?
// TODO: tests
// TODO: deploy and release cycle via actions
// TODO: check security
// TODO: favicon and SEO
// TODO: choose data timeframe (or let user choose 1y/all time)
// TODO: lock input while app is getting data and add spinner around button
// TODO: render chart and fetch data simultaneously
// TODO: permalink
// TODO: font
// TODO: remove console.log
// TODO: check for memoization/caching options
// TODO: user side errors for each api function
// TODO: add local time adapter, button to use eve time or local

const App: FC = () => {
  const [name, setName] = useState('');
  const [timestampsArray, setTimestampsArray] = useState<IdTime[]>()
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    const entityID: number = await getCharacterId(name);
    const latestHashId: HashId[] = await getLatestHashId(entityID);
    const timestamps: IdTime[] = await getTimestamps(latestHashId)
    setTimestampsArray(timestamps)
    setLoading(false)
  };

  return (
    <>
      <form onSubmit={e => handleSubmit(e)} className='form' autoComplete='on'>
        <label className='formLabel'>
          <p className='formLabelText'>Character:</p>
          <input disabled={loading} type='text' onChange={(e) => setName(e.target.value)} />
        </label>
        {/* loader component or button glow effect on load */}
        <button className='button' disabled={loading} type='submit'>
          {loading ? (
            <p className='loading'>Loading...</p>
          ) : (
            <p>Check Timezone</p>
          )}
        </button>
      </form>
      {timestampsArray && <TimeChart timeArray={timestampsArray}/>}
    </>
  );
};

export default App;
