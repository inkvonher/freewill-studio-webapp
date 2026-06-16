import ojoLogo from '../assets/freewill-ojo.png';

export default function GlobalPacman() {
  return (
    <div className="global-pacman-layer" aria-hidden="true">
      <div className="global-pacman-track">
        <img className="global-logo-mark" src={ojoLogo} alt="" />
        <span className="pac-dot pac-dot-one" />
        <span className="pac-dot pac-dot-two" />
        <span className="pac-dot pac-dot-three" />
      </div>
    </div>
  );
}
