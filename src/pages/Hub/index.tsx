import './style.css';

import LogoSrc from '@/assets/logo.svg';
import { Breadcrumb } from '@/components/Breadcrumb';
import { MediaPlayer } from '@/components/MediaPlayer';
import { Menu } from '@/components/Menu';
import Tag from '@/components/Tag';
import { ChatCard } from '@/container/ChatCard';

import Tools from './tools';

const routes = [
  {
    label: 'ELC Community',
    path: 'elccommunity',
  },
  {
    label: 'Match',
    path: 'match',
  },
  {
    label: 'How to have a great career in Gradual',
    path: 'career',
  },
  {
    label: 'Hub',
    path: 'hub',
  },
];

const menuRoutes = [
  {
    label: 'Hub',
    path: 'hub',
  },
  {
    label: 'People',
    path: 'people',
  },
  {
    label: 'Messages',
    path: 'messages',
  },
  {
    label: 'History',
    path: 'history',
  },
  {
    label: 'Community',
    path: 'community',
    highLight: true,
  },
];

const appId = '4e8ce405b4ee4dc8ad7f8585eccdc8ce';
const token =
  '0064e8ce405b4ee4dc8ad7f8585eccdc8ceIAALhnLiH9H74bxrYh6l8bv6XIQU3TICOvGRv5iEyM7USwx+f9gAAAAAEADBxArjPXeXYgEAAQA7d5di';
const channel = 'test';

function Hub() {
  return (
    <div className='hub'>
      <div className='header'>
        <div className='headerLeft'>
          <img className='logo' width={40} src={LogoSrc} />
          <Breadcrumb routes={routes} path='hub' />
        </div>
        <Tools />
      </div>
      <div className='content'>
        <div className='left'>
          <Menu style={{ height: '100%' }} routes={menuRoutes} path='hub' />
        </div>
        <div className='right'>
          <div className='live'>
            <div className='liveTitle'>
              <Tag label='1:1 Match' />
              <div className='liveTitleText'>
                How to have a great career in a lifetime
              </div>
            </div>
            <div className='liveContent'>
              <MediaPlayer appId={appId} token={token} channel={channel} />
            </div>
          </div>
          <div className='chat'>
            <ChatCard className='chatInner' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hub;
