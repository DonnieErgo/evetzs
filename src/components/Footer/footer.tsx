import { useState, FC } from 'react';

const Footer: FC = () => {
  const [text, setText] = useState('Suggestions, bugs and donations');

  const handleMouseOver = () => {
    setText('Whitmore ingame or discord in bio');
  };

  const handleMouseLeave = () => {
    setText('Suggestions, bugs and donations');
  };

  return (
    <div
      style={{ position: 'fixed', bottom: '20px', right: '30px', padding: '20px' }}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </div>
  );
};

export default Footer;
