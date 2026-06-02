export default function GlobalPacman() {
  return (
    <div className="global-pacman-layer" aria-hidden="true">
      <div className="global-pacman-track">
        <div className="global-pacman">
          <span className="global-pacman-mouth" />
        </div>
        <span className="pac-dot pac-dot-one" />
        <span className="pac-dot pac-dot-two" />
        <span className="pac-dot pac-dot-three" />
      </div>
    </div>
  );
}
