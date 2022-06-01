import AgoraRTC, {
  CameraVideoTrackInitConfig,
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ILocalAudioTrack,
  ILocalVideoTrack,
  MicrophoneAudioTrackInitConfig,
} from 'agora-rtc-sdk-ng';
import { useCallback, useEffect, useState } from 'react';

export function useAgora(client: IAgoraRTCClient | undefined) {
  const [localVideoTrack, setLocalVideoTrack] = useState<ILocalVideoTrack | undefined>(
    undefined,
  );
  const [localAudioTrack, setLocalAudioTrack] = useState<ILocalAudioTrack | undefined>(
    undefined,
  );

  const [joinState, setJoinState] = useState(false);

  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);

  const createLocalTracks = useCallback(
    async (
      audioConfig?: MicrophoneAudioTrackInitConfig,
      videoConfig?: CameraVideoTrackInitConfig,
    ) => {
      const [microphoneTrack, cameraTrack] =
        await AgoraRTC.createMicrophoneAndCameraTracks(audioConfig, videoConfig);
      setLocalAudioTrack(microphoneTrack);
      setLocalVideoTrack(cameraTrack);
      return [microphoneTrack, cameraTrack];
    },
    [],
  );

  const join = useCallback(
    async (appid: string, channel: string, token?: string) => {
      if (!client) return;
      const [microphoneTrack, cameraTrack] = await createLocalTracks();

      await client.join(appid, channel, token || null);
      await client.publish([microphoneTrack, cameraTrack]);

      (window as any).client = client;
      (window as any).videoTrack = cameraTrack;

      setJoinState(true);
    },
    [client, createLocalTracks],
  );

  const leave = useCallback(async () => {
    if (localAudioTrack) {
      localAudioTrack.stop();
      localAudioTrack.close();
    }
    if (localVideoTrack) {
      localVideoTrack.stop();
      localVideoTrack.close();
    }
    setRemoteUsers([]);
    setJoinState(false);
    await client?.leave();
  }, [client, localAudioTrack, localVideoTrack]);

  useEffect(() => {
    if (!client) return;
    setRemoteUsers(client.remoteUsers);

    const handleUserPublished = async (
      user: IAgoraRTCRemoteUser,
      mediaType: 'audio' | 'video',
    ) => {
      await client.subscribe(user, mediaType);
      setRemoteUsers(Array.from(client.remoteUsers));
    };

    const handleUserChange = () => {
      setRemoteUsers(Array.from(client.remoteUsers));
    };

    client.on('user-published', handleUserPublished);
    client.on('user-unpublished', handleUserChange);
    client.on('user-joined', handleUserChange);
    client.on('user-left', handleUserChange);

    return () => {
      client.off('user-published', handleUserPublished);
      client.off('user-unpublished', handleUserChange);
      client.off('user-joined', handleUserChange);
      client.off('user-left', handleUserChange);
    };
  }, [client]);

  return {
    localAudioTrack,
    localVideoTrack,
    joinState,
    leave,
    join,
    remoteUsers,
  };
}
