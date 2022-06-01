import {
  ILocalAudioTrack,
  ILocalVideoTrack,
  IRemoteAudioTrack,
  IRemoteVideoTrack,
} from 'agora-rtc-sdk-ng';
import { memo, useEffect, useRef } from 'react';

export interface IMediaProps {
  className?: string;
  videoTrack?: ILocalVideoTrack | IRemoteVideoTrack;
  audioTrack?: ILocalAudioTrack | IRemoteAudioTrack;
}

export const Media = memo((props: IMediaProps) => {
  const { className, videoTrack, audioTrack } = props;
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!container.current) return;
    videoTrack?.play(container.current);
    return () => {
      videoTrack?.stop();
    };
  }, [container, videoTrack]);
  useEffect(() => {
    if (audioTrack) {
      audioTrack?.play();
    }
    return () => {
      audioTrack?.stop();
    };
  }, [audioTrack]);

  return <div ref={container} className={`media ${className ? className : ''}`} />;
});
