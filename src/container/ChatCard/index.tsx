import { memo, useEffect, useState } from 'react';

import { ChatCard as ChatCardComp } from '@/components/ChatCard';
import { IMessageProps } from '@/components/ChatCard/Message';
import { readAttendeeInfo } from '@/services/readAttendeeInfo';
import { subscribeMessage } from '@/services/subscribeMessage';

interface IChatCardProps {
  className?: string;
}

export const ChatCard = memo((props: IChatCardProps) => {
  const { className } = props;
  const [attendee, setAttendee] = useState({});
  const [messagess, setMessages] = useState([] as IMessageProps[]);

  useEffect(() => {
    readAttendeeInfo().then(setAttendee);
  }, []);

  useEffect(() => {
    const unSubscribe = subscribeMessage((item) => {
      setMessages((msgs) => [...msgs, item]);
    });
    return () => unSubscribe();
  }, []);

  return (
    <ChatCardComp
      className={className}
      attendee={attendee}
      messages={messagess}
      onInputOk={(text) =>
        setMessages((msgs) => [
          ...msgs,
          {
            avatar: 'https://avatars.githubusercontent.com/u/22634735?s=60&v=4',
            name: 'Gladys Murphy',
            content: text,
            isMe: true,
            career: 'ELC Team',
          },
        ])
      }
    />
  );
});
