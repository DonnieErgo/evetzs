import { HashId, ZkbKillmail } from '../types/types';

const getLatestHashId = async (id: number): Promise<HashId[]> => {
  let hashesWithIds: HashId[] = [];
  let page = 1;

  while (hashesWithIds.length < 1000 && page <= 10) {
    const options = {
      method: 'GET',
      headers: {
        'Accept-Encoding': 'gzip',
        'User-Agent': 'Whitmore',
      },
    };

    try {
      const response = await fetch(
        `https://zkillboard.com/api/characterID/${id}/page/${page}/`,
        options,
      );

      const data: ZkbKillmail[] = await response.json();
      if (data.length === 0) {
        break;
      }

      const newKills: HashId[] = data.map((kill: ZkbKillmail) => ({
        id: kill.killmail_id,
        hash: kill.zkb.hash,
      }));

      hashesWithIds = hashesWithIds.concat(newKills);
      page++;

      await new Promise((r) => setTimeout(r, 1000));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return hashesWithIds;
};

export default getLatestHashId;
