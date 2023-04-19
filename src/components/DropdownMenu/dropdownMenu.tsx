import './dropdownMenu.css';
import { useEffect, useState, MouseEvent, SetStateAction, FC } from 'react';
import { DropdownOptions, EntityType } from '../../types/types';
import Button from '../Button/Button';

interface DropdownMenuProps {
  options: DropdownOptions[];
  onChange: (value: SetStateAction<EntityType>) => void;
  loading: boolean;
}

const Icon = () => (
  <svg height="20" width="20" viewBox="0 0 20 20">
    <path
      d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615"
      fill="rgba(255, 255, 255, 0.87)"
    />
  </svg>
);

const DropdownMenu: FC<DropdownMenuProps> = ({ options, onChange, loading }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<DropdownOptions>(options[0]);

  useEffect(() => {
    const handler = () => setShowMenu(false);

    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  });

  const handleInputClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const getDisplay = () => selectedValue.label;

  const onItemClick = (option: DropdownOptions) => {
    setSelectedValue(option);
    onChange(option.value);
  };

  const isSelected = (option: DropdownOptions) => {
    if (!selectedValue) return false;
    return selectedValue.value === option.value;
  };

  return (
    <div className="dropdown-container" onClick={(e) => handleInputClick(e)}>
      <Button onClick={undefined} glow={false} loading={loading} type="button">
        <div className="dropdown-input">
          <div className="dropdown-selected-value">{getDisplay()}</div>
          <div className={`dropdown-tool ${showMenu && 'open'}`}>
            <Icon />
          </div>
        </div>
        {showMenu && (
          <div className="dropdown-menu">
            {options.map((option) => (
              <div
                onClick={() => onItemClick(option)}
                key={option.value}
                className={`dropdown-item ${isSelected(option) && 'selected'}`}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </Button>
    </div>
  );
};

export default DropdownMenu;
