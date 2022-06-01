import './style.css';

import { CSSProperties, memo } from 'react';

import { Input } from '../Input';
import { IMessageProps, Message } from './Message';
import { IProfileProps, Profile } from './Profile/index';

export interface IChatCardProps {
  attendee: IProfileProps;
  messages: Array<IMessageProps>;
  onInputOk: (text: string) => void;
  style?: CSSProperties;
  className?: string;
}

export const ChatCard = memo((props: IChatCardProps) => {
  const { className, attendee, messages, onInputOk, style } = props;
  return (
    <div className={`chatcard ${className ?? ''}`} style={style}>
      <div className='chatcardContent'>
        <div className='chatcardTitle'>You are chatting with:</div>
        <Profile {...attendee} />
        <div className='chatcardMessageWrapper'>
          <div className='chatcardMessageBox'>
            {messages.map((item, idx) => (
              <Message key={idx} {...item} />
            ))}
          </div>
        </div>
      </div>

      <div className='chatcardBottom'>
        <Input onOk={onInputOk} style={{ width: 532 }} />
      </div>
    </div>
  );
});
