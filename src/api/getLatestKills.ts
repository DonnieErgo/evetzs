import { EntityType, HashId, KillDataType, ZkbKillmail } from '../types/types';

export interface GetLatestDataProps {
  id: number;
  entityType: EntityType;
  dataType: KillDataType;
}

const getLatestKills = async ({
  id,
  entityType,
  dataType = 'kills',
}: GetLatestDataProps): Promise<HashId[] | string> => {
  let hashesWithIds: HashId[] = [];
  let page = 1;

  while (hashesWithIds.length < 1000 && page <= 10) {
    try {
      const response = await fetch(
        `https://zkillboard.com/api/${dataType}/${entityType.toLowerCase()}ID/${id}/page/${page}/`,
      );
      if (!response.ok) throw new Error('Could not get latest hashes and ids');

      const data: ZkbKillmail[] = await response.json();

      const newKills: HashId[] = data.map((kill: ZkbKillmail) => ({
        id: kill.killmail_id,
        hash: kill.zkb.hash,
      }));

      hashesWithIds = hashesWithIds.concat(newKills);
      page++;

      await new Promise((r) => setTimeout(r, 1000));
    } catch (error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;
      return message;
    }
  }

  return hashesWithIds;
};

export default getLatestKills;