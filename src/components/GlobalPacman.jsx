export default function GlobalPacman() {
  return (
    <div className="global-pacman-layer" aria-hidden="true">
      <div className="global-pacman-track">
        <svg className="global-logo-mark" viewBox="0 0 44 54" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="FREEWILL">
          {/* salpicaduras superiores */}
          <path d="M21 1l2 3-3 1zM26 2l1.4 1.6-1.8.5zM30 4l1 1.4-1.6.3zM33 7l1.2 1-1.3.4zM16 3l1 1.2-1.4.2z" fill="#111111" />
          {/* rombo de tinta (marco del ojo) */}
          <path
            d="M21.5 4 C27 12 34 18 38.5 25 C35 30 30 35 24 49 C22.5 45 21.5 43 21 41 C16 36 9 31 6 25 C11 19 17 12 21.5 4 Z"
            fill="#111111"
          />
          {/* lente del ojo */}
          <ellipse cx="21.5" cy="26" rx="11.4" ry="9.2" fill="#f7f4ed" />
          {/* iris */}
          <circle cx="21.5" cy="26" r="6.4" fill="#111111" />
          {/* brillo */}
          <circle cx="24.2" cy="23" r="2.1" fill="#f7f4ed" />
          {/* punto inferior (estilo signo) */}
          <path d="M30 47 c3.4 0 5.2 4 2.6 6.2 c-2.4 1.9-6.2.2-6-2.9 c.1-1.9 1.6-3.3 3.4-3.3 Z" fill="#111111" />
        </svg>
        <span className="pac-dot pac-dot-one" />
        <span className="pac-dot pac-dot-two" />
        <span className="pac-dot pac-dot-three" />
      </div>
    </div>
  );
}
