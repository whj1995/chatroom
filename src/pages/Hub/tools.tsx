import './style.css';

import AvatarSrc from '@/assets/avatar.png';
import BellSrc from '@/assets/bell.svg';
import DownArrowSrc from '@/assets/downarrow.svg';
import GlobeSrc from '@/assets/globe.svg';
import HelpSrc from '@/assets/help.svg';
import MessageSrc from '@/assets/message.svg';

function Tools() {
  return (
    <div className='tools'>
      <div className='zoneSelect tool'>
        <img src={GlobeSrc} />
        <span style={{ fontSize: 14, color: '#7B798F' }}>UTC -05:00 Chicago</span>
        <img src={DownArrowSrc} />
      </div>
      <img className='tool' src={HelpSrc} />
      <img className='tool' src={MessageSrc} />
      <img className='tool' src={BellSrc} />
      <img className='tool' src={AvatarSrc} />
    </div>
  );
}

export default Tools;
