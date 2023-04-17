import { EntityType, GetIdResponse } from '../types/types';

const getId = async (name: string, entityType: EntityType): Promise<number> => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': 'en',
    },
    body: JSON.stringify([name]),
  };

  try {
    const response = await fetch(
      'https://esi.evetech.net/latest/universe/ids/?datasource=tranquility&language=en',
      options,
    );
    const data: GetIdResponse = await response.json();

    switch (entityType) {
      case 'Character':
        return data.characters[0].id;
      case 'Corporation':
        return data.corporations[0].id;
      case 'Alliance':
        return data.alliances[0].id;
      case 'System':
        return data.systems[0].id;
      default:
        return 0;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getId;
