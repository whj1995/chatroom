import './style.css';

import AgoraRTC from 'agora-rtc-sdk-ng';
import { memo, useCallback, useMemo, useState } from 'react';

import audioSrc from './assets/audio.svg';
import bellSrc from './assets/bell.svg';
import callSrc from './assets/call.svg';
import fullScreen from './assets/fullScreen.svg';
import settingSrc from './assets/setting.svg';
import shareSrc from './assets/share.svg';
import videoSrc from './assets/video.svg';
import { Media } from './Media';
import { useAgora } from './useAgora';

export interface IMediaPlayer {
  appId: string;
  token: string;
  channel: string;
}

export const MediaPlayer = memo((props: IMediaPlayer) => {
  const { appId, token, channel } = props;
  const client = useMemo(() => AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' }), []);
  const { localAudioTrack, localVideoTrack, leave, join, remoteUsers } = useAgora(client);

  const [isJoin, setIsJoin] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  const handleJoinClick = useCallback(() => {
    if (!isJoin) {
      join(appId, channel, token);
    } else {
      leave();
    }
    setIsJoin(!isJoin);
  }, [appId, channel, isJoin, join, leave, token]);

  const handleVideoClick = useCallback(() => {
    if (!isVideoEnabled) {
      localVideoTrack?.setEnabled(true);
    } else {
      localVideoTrack?.setEnabled(false);
    }
    setIsVideoEnabled(!isVideoEnabled);
  }, [localVideoTrack, isVideoEnabled]);

  const handleAudioClick = useCallback(() => {
    if (!isAudioEnabled) {
      localAudioTrack?.setEnabled(true);
    } else {
      localAudioTrack?.setEnabled(false);
    }
    setIsAudioEnabled(!isAudioEnabled);
  }, [isAudioEnabled, localAudioTrack]);

  return (
    <div className='mediaPlayer'>
      <div className='mediaPlayerContent'>
        <Media videoTrack={localVideoTrack} audioTrack={undefined} className='videoMe' />
        {remoteUsers.length && (
          <Media
            className='videoAttendee'
            videoTrack={remoteUsers[0].videoTrack}
            audioTrack={remoteUsers[0].audioTrack}
          />
        )}
      </div>
      <div className='mediaPlayerTools'>
        <div className='mediaPlayerToolLeft'>
          <div className='mediaPlayerTime'>
            <img src={bellSrc} />
            <span>01 59</span>
          </div>
          <div className='mediaPlayerExtend'>Extend</div>
        </div>
        <div className='mediaPlayerToolMiddle'>
          <img className='mediaPlayerIcon' src={settingSrc} />
          <img
            className='mediaPlayerIcon'
            src={isAudioEnabled ? audioSrc : 'x'}
            onClick={handleAudioClick}
          />
          <img
            className='mediaPlayerIcon'
            src={isVideoEnabled ? videoSrc : 'x'}
            onClick={handleVideoClick}
          />
          <img className='mediaPlayerIcon' src={shareSrc} />
          <img className='mediaPlayerIcon' src={callSrc} onClick={handleJoinClick} />
        </div>
        <div className='mediaPlayerToolRight'>
          <img className='mediaPlayerIcon' src={fullScreen} />
        </div>
      </div>
    </div>
  );
});
