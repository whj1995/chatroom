import './style.css';

import { CSSProperties, useCallback, useState } from 'react';

import arrowSvg from './arrow.svg';

interface IInputProps {
  style?: CSSProperties;
  placeholder?: string;
  onOk?: (text: string) => void;
}

export function Input(props: IInputProps) {
  const { style, placeholder = 'Type your message...', onOk } = props;
  const [text, setText] = useState('');

  const handleSend = useCallback(() => {
    onOk?.(text);
    setText('');
  }, [onOk, text]);

  return (
    <span style={style} className='inputWrapper'>
      <input
        value={text}
        onChange={(e) => {
          console.debug(e);
          setText(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.code === 'Enter') {
            handleSend();
          }
        }}
        className='input'
        placeholder={placeholder}
      />
      <span className='inputIcon' onClick={handleSend}>
        <img src={arrowSvg} />
      </span>
    </span>
  );
}
