import { FormData } from '../types/types';

const nameValidator = ({ name, entityType }: FormData): boolean => {
  switch (entityType) {
    case 'Character':
      return /^[A-Za-z0-9\s'._-]{3,37}$/.test(name);
    case 'Corporation':
      return /^[A-Za-z0-9\s.-]{2,50}$/.test(name);
    case 'Alliance':
      return /^[A-Za-z0-9\s.-]{2,50}$/.test(name);
    case 'System':
      return /^[-a-zA-Z0-9]{3,17}$/.test(name);
    default:
      return false;
  }
};

export default nameValidator;
