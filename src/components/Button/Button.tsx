import { ReactNode, MouseEventHandler } from 'react';
import './button.css';

interface ButtonProps {
  loading?: boolean;
  type: 'button' | 'submit' | 'reset';
  children: ReactNode;
  glow?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button = ({ loading, type, children, glow, onClick }: ButtonProps) => (
  <button
    className={`button ${glow ? 'button-glow' : ''}`}
    disabled={loading}
    type={type}
    onClick={onClick}
  >
    {loading ? <div className="loader" /> : children}
  </button>
);

export default Button;
