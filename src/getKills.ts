export interface Kill {
  id: number;
  hash: string;
}

const getLatestKills = async (characterNameOrId: string): Promise<Kill[]> => {
  let kills: Kill[] = [];
  let page = 1;

  while (kills.length < 1000 && page <= 10) {
    const response = await fetch(`https://zkillboard.com/api/characterID/${characterNameOrId}/page/${page}/`, {
      headers: {
        'Accept-Encoding': 'gzip',
        'User-Agent': 'Whitmore'
      }
    });

    const data: any[] = await response.json();
    if (data.length === 0) {
      break;
    }

    console.log(data)

    const newKills = data.map((kill: any) => ({
      id: kill.killmail_id,
      hash: kill.zkb.hash
    }));

    console.log(newKills)

    kills = kills.concat(newKills);
    page++;

    await new Promise(r => setTimeout(r, 2000));
  }

  // todo: smth smth

  console.log(kills)
  return kills;
};

export default getLatestKills;
