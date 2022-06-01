import './style.css';

import { memo } from 'react';

import linkedinSrc from '@/assets/linkedin.svg';
import Tag from '@/components/Tag';

export interface IProfileProps {
  name?: string;
  career?: string;
  company?: string;
  introduction?: string;
  avatar?: string;
}

export const Profile = memo((props: IProfileProps) => {
  const { name, career, company, introduction, avatar } = props;
  return (
    <div className='profile'>
      <div className='profileTop'>
        <img className='profileAvatar' width={90} src={avatar} />
        <div className='profileContent'>
          <Tag size='small' label='Attendee' color='#45B1ED' />
          <div className='profileNmaeLink'>
            <div className='profileName'>{name}</div>
            <img src={linkedinSrc} />
          </div>
          <div className='profileCareer'>
            {career}&nbsp;@&nbsp;{company}
          </div>
        </div>
      </div>
      <div className='profileMiddle'>{introduction}</div>
      <div className='profileBottom'>
        <div className='profileMore'>+ Show more</div>
      </div>
    </div>
  );
});
