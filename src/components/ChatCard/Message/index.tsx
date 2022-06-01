import './style.css';

import { memo } from 'react';

import Tag from '@/components/Tag';

export interface IMessageProps {
  avatar: string;
  name: string;
  content: string;
  isMe: boolean;
  career?: string;
  company?: string;
}

export const Message = memo((props: IMessageProps) => {
  const { avatar, name, isMe, content, career, company } = props;
  return (
    <div className='message'>
      <img style={{ borderRadius: 20 }} width={40} src={avatar} />
      <div className='messageRight'>
        <div className='messageTop'>
          <div className='messageName'>{name}</div>
          <Tag
            size='small'
            label={isMe ? 'Me' : 'Attendee'}
            color={isMe ? '#6CF3DB' : '#45B1ED'}
            backgroundColor={isMe ? 'rgba(4,177,125, 0.1)' : 'rgba(69,177,237,0.1)'}
          />
          {career && (
            <div className='messageCareer'>
              {career}
              {company ? `@ ${company}` : ''}
            </div>
          )}
        </div>
        <div className='messageContent'>{content}</div>
      </div>
    </div>
  );
});
