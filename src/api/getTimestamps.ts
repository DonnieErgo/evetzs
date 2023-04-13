import {ESIKillmail, HashId, IdTime} from "../types/types";

// hash+id > esikillmail > timestamp array

const getTimestamps = async (hashIds: HashId[]): Promise<IdTime[]> => {
  let refinedData: IdTime[];

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': 'en',
      'Accept-Encoding': 'gzip, deflate, br',
    }
  };

  // const responses = hashIds.map(async (item) => {
  //   try {
  //     const response = await fetch(`https://esi.evetech.net/latest/killmails/${item.id}/${item.hash}/?datasource=tranquility`, options);
  //     const data: ESIKillmail = await response.json();
  //
  //     return { id: data.killmail_id, time: data.killmail_time };
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // });
  //
  // refinedData = await Promise.all(responses);
  // console.log(refinedData)

  const responses = hashIds.map(async (item) => {
    try {
      const response = await fetch(`https://esi.evetech.net/latest/killmails/${item.id}/${item.hash}/?datasource=tranquility`, options);
      const data: ESIKillmail = await response.json();

      return { id: data.killmail_id, time: data.killmail_time };
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  });

  const settledResponses = await Promise.allSettled(responses);

  refinedData = settledResponses
    .filter((res): res is PromiseFulfilledResult<IdTime> => res.status === 'fulfilled')
    .map((res) => res.value);

  return refinedData
};

export default getTimestamps;
