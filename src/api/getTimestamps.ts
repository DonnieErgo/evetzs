import { ESIKillmail, HashId, IdTime } from '../types/types';

const getTimestamps = async (hashIds: HashId[]): Promise<IdTime[]> => {
  const responses = hashIds.map(async (item) => {
    try {
      const response = await fetch(
        `https://esi.evetech.net/latest/killmails/${item.id}/${item.hash}/?datasource=tranquility`,
      );
      const data: ESIKillmail = await response.json();

      return { id: data.killmail_id, time: data.killmail_time };
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  });

  const settledResponses = await Promise.allSettled(responses);

  return settledResponses
    .filter((res): res is PromiseFulfilledResult<IdTime> => res.status === 'fulfilled')
    .map((res) => res.value);
};

export default getTimestamps;
