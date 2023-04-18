import { EntityType, GetIdResponse } from '../types/types';

const getId = async (name: string, entityType: EntityType): Promise<number | string> => {
  const options = {
    method: 'POST',
    body: JSON.stringify([name]),
  };

  const notFoundErr = new Error(`${entityType} was not found`);

  try {
    const response = await fetch(
      'https://esi.evetech.net/latest/universe/ids/?datasource=tranquility&language=en',
      options,
    );
    const data: GetIdResponse = await response.json();

    switch (entityType) {
      case 'Character': {
        if (!data.characters) throw notFoundErr;
        return data.characters[0].id;
      }
      case 'Corporation': {
        if (!data.corporations) throw notFoundErr;
        return data.corporations[0].id;
      }
      case 'Alliance': {
        if (!data.alliances) throw notFoundErr;
        return data.alliances[0].id;
      }
      case 'System': {
        if (!data.systems) throw notFoundErr;
        return data.systems[0].id;
      }
      default:
        throw notFoundErr;
    }
  } catch (error) {
    let message = 'Unknown Error';
    if (error instanceof Error) message = error.message;
    return message;
  }
};

export default getId;
