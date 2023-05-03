import { FC } from 'react';
import './error.css';

interface ErrorProps {
  showing: boolean;
  message: string;
}

const ErrorPopup: FC<ErrorProps> = ({ showing, message }) => (
  <div className={`error ${showing ? 'visible' : ''}`}>{message}</div>
);

export default ErrorPopup;
