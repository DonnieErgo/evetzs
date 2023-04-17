import { FormEvent, useState } from 'react';
import { DropdownOptions, EntityType, FormData } from '../../types/types';
import DropdownMenu from '../DropdownMenu/dropdownMenu';
import './form.css';

interface FormProps {
  onSubmit: ({ name, entityType }: FormData) => void;
  loading: boolean;
}

const Form = ({ onSubmit, loading }: FormProps) => {
  const [name, setName] = useState('');
  const [entityType, setEntityType] = useState<EntityType>('Character');

  const dropdownOptions: DropdownOptions[] = [
    { value: 'Character', label: 'Character' },
    { value: 'Corporation', label: 'Corporation' },
    { value: 'Alliance', label: 'Alliance' },
    { value: 'System', label: 'System' },
  ];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ name, entityType });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="form">
      <label className="formLabel">
        <input
          disabled={loading}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <DropdownMenu
        options={dropdownOptions}
        onChange={(v) => setEntityType(v)}
        loading={loading}
      />
      <button className="button" disabled={loading} type="submit">
        {loading ? <div className="loader" /> : <p>Check Timezone</p>}
      </button>
    </form>
  );
};

export default Form;
