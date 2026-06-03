import React, { useRef, useState } from 'react';

export const VideoCall: React.FC = () => {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCalling, setIsCalling] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);

  // START CALL
  const startCall = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setStream(mediaStream);

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = mediaStream;
      }

      setIsCalling(true);
    } catch (err) {
      console.error("Camera access denied", err);
    }
  };

  // END CALL
  const endCall = () => {
    stream?.getTracks().forEach(track => track.stop());
    setStream(null);
    setIsCalling(false);
  };

  // TOGGLE VIDEO
  const toggleVideo = () => {
    if (!stream) return;

    stream.getVideoTracks().forEach(track => {
      track.enabled = !track.enabled;
    });

    setVideoEnabled(prev => !prev);
  };

  // TOGGLE AUDIO
  const toggleAudio = () => {
    if (!stream) return;

    stream.getAudioTracks().forEach(track => {
      track.enabled = !track.enabled;
    });

    setAudioEnabled(prev => !prev);
  };

  // SCREEN SHARE
  const toggleScreenShare = async () => {
    if (!screenSharing) {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = screenStream;
      }

      setScreenSharing(true);

      screenStream.getVideoTracks()[0].onended = () => {
        setScreenSharing(false);
        startCall();
      };
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-6">

      <h1 className="text-2xl font-bold">Video Call</h1>

      {/* VIDEO */}
      <div className="bg-black rounded-xl overflow-hidden w-[600px] h-[400px] flex items-center justify-center">
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
        {!isCalling && (
          <p className="text-white">Camera is off</p>
        )}
      </div>

      {/* CONTROLS */}
      <div className="flex space-x-4">

        {!isCalling ? (
          <button
            onClick={startCall}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Start Call
          </button>
        ) : (
          <button
            onClick={endCall}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            End Call
          </button>
        )}

        <button
          onClick={toggleVideo}
          disabled={!isCalling}
          className="px-4 py-2 bg-gray-700 text-white rounded"
        >
          {videoEnabled ? 'Video Off' : 'Video On'}
        </button>

        <button
          onClick={toggleAudio}
          disabled={!isCalling}
          className="px-4 py-2 bg-gray-700 text-white rounded"
        >
          {audioEnabled ? 'Mute' : 'Unmute'}
        </button>

        <button
          onClick={toggleScreenShare}
          disabled={!isCalling}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Screen Share
        </button>

      </div>
    </div>
  );
};