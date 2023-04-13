// {
//   "characters": [
//   {
//     "id": 95465499,
//     "name": "CCP Bartender"
//   },
//   {
//     "id": 2112625428,
//     "name": "CCP Zoetrope"
//   }
//   ],
//     "systems": [
//     {
//       "id": 30000142,
//       "name": "Jita"
//     }
//   ]
// }

// TODO: response type

const getCharacterId = async (name: string): Promise<number> => {

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': 'en'
    },
    body: JSON.stringify([name])
  };

  try {
    const response = await fetch('https://esi.evetech.net/latest/universe/ids/?datasource=tranquility&language=en', options);
    const data = await response.json();

    return data.characters[0].id;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getCharacterId;
