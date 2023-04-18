import { FormEvent, useState, FC } from 'react';
import nameValidator from '../../helpers/nameValidator';
import { DropdownOptions, EntityType, FormData } from '../../types/types';
import DropdownMenu from '../DropdownMenu/dropdownMenu';
import './form.css';
import Error from '../Error/error';

interface FormProps {
  onSubmit: ({ name, entityType }: FormData) => void;
  loading: boolean;
}

const Form: FC<FormProps> = ({ onSubmit, loading }) => {
  const [name, setName] = useState('');
  const [entityType, setEntityType] = useState<EntityType>('Character');
  const [validationError, setValidationError] = useState('');

  const dropdownOptions: DropdownOptions[] = [
    { value: 'Character', label: 'Character' },
    { value: 'Corporation', label: 'Corporation' },
    { value: 'Alliance', label: 'Alliance' },
    { value: 'System', label: 'System' },
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nameValidator({ name, entityType })) {
      onSubmit({ name, entityType });
    } else {
      setName('');
      setValidationError(`Wrong ${entityType.toLowerCase()} name`);
      setTimeout(() => {
        setValidationError('');
      }, 3000);
    }
  };

  // If import is ok make start button glow a bit
  // Fix spinners

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="form">
      {validationError && <Error showing={Boolean(validationError)} message={validationError} />}
      <label className="formLabel">
        <input
          disabled={loading}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={(e) => setName(e.target.value.trim())}
        />
      </label>
      <DropdownMenu
        options={dropdownOptions}
        onChange={(v) => setEntityType(v)}
        loading={loading}
      />
      <button className="button" disabled={loading} type="submit">
        {loading ? <div className="loader" /> : <p>Start</p>}
      </button>
    </form>
  );
};

export default Form;
