import { useEffect, useRef, useState } from 'react';
import videoSrc from '../assets/videoHERO.mp4';

export default function HeroVideo() {
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const [activeVideo, setActiveVideo] = useState(1);

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    v1.play().catch(() => {});

    // Duración de la transición suave de crossfade (1.2 segundos)
    const CROSSFADE_TIME = 1.2;

    const onTimeUpdate1 = () => {
      if (!v1.duration || isNaN(v1.duration)) return;
      const timeLeft = v1.duration - v1.currentTime;
      if (timeLeft <= CROSSFADE_TIME && v2.paused) {
        v2.currentTime = 0;
        v2.play().then(() => {
          setActiveVideo(2);
        }).catch(() => {});
      }
    };

    const onEnded1 = () => {
      v1.pause();
      v1.currentTime = 0;
    };

    const onTimeUpdate2 = () => {
      if (!v2.duration || isNaN(v2.duration)) return;
      const timeLeft = v2.duration - v2.currentTime;
      if (timeLeft <= CROSSFADE_TIME && v1.paused) {
        v1.currentTime = 0;
        v1.play().then(() => {
          setActiveVideo(1);
        }).catch(() => {});
      }
    };

    const onEnded2 = () => {
      v2.pause();
      v2.currentTime = 0;
    };

    v1.addEventListener('timeupdate', onTimeUpdate1);
    v1.addEventListener('ended', onEnded1);
    v2.addEventListener('timeupdate', onTimeUpdate2);
    v2.addEventListener('ended', onEnded2);

    return () => {
      v1.removeEventListener('timeupdate', onTimeUpdate1);
      v1.removeEventListener('ended', onEnded1);
      v2.removeEventListener('timeupdate', onTimeUpdate2);
      v2.removeEventListener('ended', onEnded2);
    };
  }, []);

  return (
    <div className="relative mx-auto flex w-full max-w-[460px] items-center justify-center select-none">
      {/* Neblina y halo orgánico tipo humo detrás */}
      <div className="pointer-events-none absolute -inset-10 rounded-full bg-gradient-to-tr from-gold/15 via-[#f7f4ed]/70 to-gold/10 blur-3xl opacity-85" />
      <div className="pointer-events-none absolute -inset-8 rounded-full bg-[#f7f4ed] blur-2xl opacity-75" />

      {/* Contenedor del video con máscara difuminada multi-capa estilo humo orgánico */}
      <div
        className="relative aspect-[9/16] w-full max-h-[740px] overflow-visible"
        style={{
          maskImage: `
            radial-gradient(ellipse 64% 70% at 50% 50%, rgba(0,0,0,1) 18%, rgba(0,0,0,0.92) 34%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.30) 66%, rgba(0,0,0,0.06) 80%, rgba(0,0,0,0) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 88%, rgba(0,0,0,0) 100%),
            linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)
          `,
          maskComposite: 'intersect',
          WebkitMaskImage: `
            radial-gradient(ellipse 64% 70% at 50% 50%, rgba(0,0,0,1) 18%, rgba(0,0,0,0.92) 34%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.30) 66%, rgba(0,0,0,0.06) 80%, rgba(0,0,0,0) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12%, rgba(0,0,0,1) 88%, rgba(0,0,0,0) 100%),
            linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%)
          `,
          WebkitMaskComposite: 'source-in, source-in',
        }}
      >
        {/* Video 1 */}
        <video
          ref={video1Ref}
          src={videoSrc}
          autoPlay
          muted
          playsInline
          className={`absolute inset-0 h-full w-full object-contain mix-blend-multiply contrast-[1.05] transition-opacity duration-1000 ease-in-out ${
            activeVideo === 1 ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Video 2 (para crossfade loop continuo y fluido) */}
        <video
          ref={video2Ref}
          src={videoSrc}
          muted
          playsInline
          className={`absolute inset-0 h-full w-full object-contain mix-blend-multiply contrast-[1.05] transition-opacity duration-1000 ease-in-out ${
            activeVideo === 2 ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Difuminado perimetral adicional tipo humo suave hacia el fondo */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          boxShadow: 'inset 0 0 50px 35px #f7f4ed, inset 0 0 90px 60px #f7f4ed',
        }}
      />
    </div>
  );
}
