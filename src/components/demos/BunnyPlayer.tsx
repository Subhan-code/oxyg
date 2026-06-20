import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

export default function BunnyPlayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  const [playerStatus, setPlayerStatus] = useState<"idle" | "ready" | "playing" | "paused" | "loading">("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [hoverState, setHoverState] = useState<"idle" | "active">("idle");
  const [aspectRatio, setAspectRatio] = useState("62.5%");

  const src = "https://vz-6ed806ff-5e5.b-cdn.net/b6a663de-07c1-4c37-8bb6-0e79fef7fb3c/playlist.m3u8";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;

    const isSafariNative = !!video.canPlayType("application/vnd.apple.mpegurl");
    const canUseHlsJs = Hls.isSupported() && !isSafariNative;

    // Handler for HLS or Native initialization
    const initPlayer = () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }

      if (isSafariNative) {
        video.src = src;
        video.addEventListener("loadedmetadata", () => {
          setPlayerStatus("ready");
          if (video.videoWidth && video.videoHeight) {
            setAspectRatio(`${(video.videoHeight / video.videoWidth) * 100}%`);
          }
        }, { once: true });
      } else if (canUseHlsJs) {
        const hls = new Hls({ maxBufferLength: 10 });
        hls.attachMedia(video);
        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
          hls.loadSource(src);
        });
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setPlayerStatus("ready");
          const levels = hls.levels || [];
          if (levels.length > 0) {
            // Find best level to get width/height
            const best = levels.reduce((a, b) => ((b.width || 0) > (a.width || 0) ? b : a), levels[0]);
            if (best && best.width && best.height) {
              setAspectRatio(`${(best.height / best.width) * 100}%`);
            }
          }
        });
        hlsRef.current = hls;
      } else {
        video.src = src;
      }
    };

    initPlayer();

    // Event listeners on video element to sync react states
    const onPlay = () => {
      setIsActivated(true);
      setPlayerStatus("playing");
    };

    const onPlaying = () => {
      setPlayerStatus("playing");
    };

    const onPause = () => {
      setPlayerStatus("paused");
    };

    const onWaiting = () => {
      setPlayerStatus("loading");
    };

    const onCanPlay = () => {
      if (playerStatus !== "playing") {
        setPlayerStatus("ready");
      }
    };

    const onEnded = () => {
      setPlayerStatus("paused");
      setIsActivated(false);
    };

    const onMetadata = () => {
      if (video.videoWidth && video.videoHeight) {
        setAspectRatio(`${(video.videoHeight / video.videoWidth) * 100}%`);
      }
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("pause", onPause);
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("ended", onEnded);
    video.addEventListener("loadedmetadata", onMetadata);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("loadedmetadata", onMetadata);

      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [src]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      setPlayerStatus("loading");
      video.play().catch(() => {
        setPlayerStatus("paused");
      });
    } else {
      video.pause();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <div className="relative w-full max-w-[640px] mx-auto overflow-hidden rounded-2xl select-none font-sans bg-black border border-white/10 shadow-2xl">
      <style>{`
        .bunny-player {
          color: #fff;
          isolation: isolate;
          width: 100%;
          display: flex;
          position: relative;
          overflow: hidden;
          background: #000;
          aspect-ratio: 16/10;
        }

        .bunny-player__placeholder {
          object-fit: cover;
          width: 100%;
          height: 100%;
          position: absolute;
          transition: opacity 0.3s linear, visibility 0.3s linear;
          z-index: 2;
        }

        .bunny-player__placeholder.is-hidden {
          opacity: 0;
          visibility: hidden;
        }

        .bunny-player__dark {
          background-color: #000;
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 3;
          transition: opacity 0.3s linear;
        }

        .bunny-player__video {
          width: 100%;
          height: 100%;
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
        }

        .bunny-player__playpause {
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          display: flex;
          position: absolute;
          z-index: 4;
          cursor: pointer;
          transition: opacity 0.3s linear;
        }

        .bunny-player__big-btn {
          backdrop-filter: blur(1em);
          -webkit-backdrop-filter: blur(1em);
          cursor: pointer;
          background-color: rgba(100, 100, 100, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          justify-content: center;
          align-items: center;
          width: 4.5em;
          height: 4.5em;
          padding: 1.25em;
          display: flex;
          transition: transform 0.2s ease, background-color 0.2s ease;
        }

        .bunny-player__big-btn:hover {
          transform: scale(1.08);
          background-color: rgba(255, 255, 255, 0.15);
        }

        .bunny-player__play-svg, .bunny-player__pause-svg {
          width: 100%;
          height: 100%;
          color: white;
        }

        .bunny-player__loading {
          background-color: rgba(0, 0, 0, 0.4);
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          display: flex;
          position: absolute;
          z-index: 5;
        }

        .bunny-player__loading-svg {
          width: 4em;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .bunny-mute-btn {
          position: absolute;
          bottom: 12px;
          right: 12px;
          z-index: 10;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          padding: 6px;
          border-radius: 50%;
          cursor: pointer;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .bunny-mute-btn:hover {
          background: rgba(0, 0, 0, 0.8);
        }
      `}</style>

      <div 
        className="bunny-player"
        onMouseEnter={() => setHoverState("active")}
        onMouseLeave={() => setHoverState("idle")}
      >
        {/* Placeholder image overlay */}
        <img 
          src="https://cdn.prod.website-files.com/68d1258667a36fff8e2a0887/68d12711fc7a7d993a8d46dc_player-placeholder.jpg" 
          alt="Video Thumbnail" 
          className={`bunny-player__placeholder ${isActivated ? "is-hidden" : ""}`}
        />

        {/* Dark overlay backdrop */}
        <div 
          className="bunny-player__dark" 
          style={{
            opacity: playerStatus === "paused" 
              ? 0.3 
              : playerStatus === "playing" && hoverState === "active"
              ? 0.2
              : 0
          }}
        />

        {/* Video stream viewport */}
        <video 
          ref={videoRef}
          preload="auto" 
          playsInline 
          className="bunny-player__video"
          onClick={togglePlay}
        />

        {/* Big play/pause toggle button overlays */}
        <div 
          className="bunny-player__playpause"
          onClick={togglePlay}
          style={{
            opacity: playerStatus === "playing" && hoverState !== "active" ? 0 : 1,
            pointerEvents: playerStatus === "playing" && hoverState !== "active" ? "none" : "auto"
          }}
        >
          <div className="bunny-player__big-btn">
            {playerStatus === "playing" ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="bunny-player__pause-svg">
                <path d="M16 5V19" strokeWidth="3" strokeLinecap="round" />
                <path d="M8 5V19" strokeWidth="3" strokeLinecap="round" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="bunny-player__play-svg">
                <path d="M6 12V5.01109C6 4.05131 7.03685 3.4496 7.87017 3.92579L14 7.42855L20.1007 10.9147C20.9405 11.3945 20.9405 12.6054 20.1007 13.0853L14 16.5714L7.87017 20.0742C7.03685 20.5503 6 19.9486 6 18.9889V12Z" />
              </svg>
            )}
          </div>
        </div>

        {/* Mute button control */}
        {isActivated && (
          <button 
            className="bunny-mute-btn" 
            onClick={toggleMute}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>
        )}

        {/* Loading spinner overlay */}
        {playerStatus === "loading" && (
          <div className="bunny-player__loading">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100" className="bunny-player__loading-svg">
              <path fill="currentColor" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
