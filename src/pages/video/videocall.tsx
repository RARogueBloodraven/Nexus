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
            console.error('Camera access denied', err);
        }
    };

    // END CALL
    const endCall = () => {
        stream?.getTracks().forEach(track => track.stop());

        if (localVideoRef.current) {
            localVideoRef.current.srcObject = null;
        }

        setStream(null);
        setIsCalling(false);
        setVideoEnabled(true);
        setAudioEnabled(true);
        setScreenSharing(false);
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
            try {
                const screenStream = await navigator.mediaDevices.getDisplayMedia({
                    video: true,
                });

                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = screenStream;
                }

                setScreenSharing(true);

                screenStream.getVideoTracks()[0].onended = () => {
                    setScreenSharing(false);
                    if (stream && localVideoRef.current) {
                        localVideoRef.current.srcObject = stream;
                    }
                };
            } catch (err) {
                console.error('Screen share error', err);
            }
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 space-y-6">

            {/* TITLE */}
            <h1 className="text-3xl font-bold text-white">
                Video Call
            </h1>

            {/* VIDEO SCREEN (BIG) */}
            <div className="relative w-full max-w-7xl h-[80vh] bg-black rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center">

                <video
                    ref={localVideoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                />

                {!isCalling && (
                    <p className="absolute text-white text-lg opacity-70">
                        Camera is off
                    </p>
                )}
            </div>

            {/* CONTROLS */}
            <div className="flex flex-wrap justify-center gap-4">

                {!isCalling ? (
                    <button
                        onClick={startCall}
                        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        Start Call
                    </button>
                ) : (
                    <button
                        onClick={endCall}
                        className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        End Call
                    </button>
                )}

                <button
                    onClick={toggleVideo}
                    disabled={!isCalling}
                    className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50"
                >
                    {videoEnabled ? 'Video Off' : 'Video On'}
                </button>

                <button
                    onClick={toggleAudio}
                    disabled={!isCalling}
                    className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50"
                >
                    {audioEnabled ? 'Mute' : 'Unmute'}
                </button>

                <button
                    onClick={toggleScreenShare}
                    disabled={!isCalling}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                    Screen Share
                </button>

            </div>
        </div>
    );
};