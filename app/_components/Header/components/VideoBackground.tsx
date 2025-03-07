import { useRef, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "../styles/VideoBackground.module.scss";

const cx = classNames.bind(styles);

interface VideoBackgroundProps {
  src: string;
  isActive: boolean;
  className?: string;
}

export const VideoBackground = ({
  src,
  isActive,
  className,
}: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastTimeRef = useRef<number>(0);
  const hasPlayedRef = useRef<boolean>(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Configuración inicial del video (solo una vez)
    if (!hasPlayedRef.current) {
      video.muted = true;
      video.playsInline = true;
      video.loop = true;
      video.preload = "metadata";
    }

    if (isActive) {
      // Si el video ya se había reproducido antes, continuar desde donde se pausó
      if (hasPlayedRef.current) {
        video.currentTime = lastTimeRef.current;
      } else {
        // Primera reproducción
        hasPlayedRef.current = true;
      }

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Manejar silenciosamente las restricciones de autoplay
        });
      }
    } else {
      // Guardar la posición actual antes de pausar
      lastTimeRef.current = video.currentTime;
      video.pause();
    }

    // Cleanup al desmontar
    return () => {
      if (video && !video.paused) {
        lastTimeRef.current = video.currentTime;
        video.pause();
      }
    };
  }, [isActive]);

  return (
    <video
      ref={videoRef}
      src={src}
      className={cx(
        "video-background",
        {
          "video-background--active": isActive,
        },
        className
      )}
    />
  );
};

export default VideoBackground;
