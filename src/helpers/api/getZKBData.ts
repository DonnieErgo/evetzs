import { EntityType, HashId, KillDataType, ZkbKillmail } from '../../types/types';

export interface GetLatestDataProps {
  id: number;
  entityType: EntityType;
  dataType?: KillDataType;
  sampleSize?: number;
}

const getZKBData = async (props: GetLatestDataProps): Promise<HashId[]> => {
  const { id, entityType, dataType = 'kills', sampleSize = 800 } = props;
  let kills: HashId[] = [];
  let page = 1;

  while (kills.length < sampleSize && page <= 10) {
    const response = await fetch(
      `https://zkillboard.com/api/${dataType}/${entityType.toLowerCase()}ID/${id}/page/${page}/`,
    );
    if (!response.ok) throw new Error('Could not get latest hashes and ids');

    const data: ZkbKillmail[] = await response.json();
    if (data.length === 0) break;

    const newKills: HashId[] = data.map((kill: ZkbKillmail) => ({
      id: kill.killmail_id,
      hash: kill.zkb.hash,
    }));

    kills = kills.concat(newKills);
    page++;
    await new Promise((r) => setTimeout(r, 1200));
  }

  return kills;
};

export default getZKBData;
