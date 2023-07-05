import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="mudium-header">
      <div className="header-inner">
        <Link to="/">
          <span>HOME</span>
        </Link>
        <Link to="/board/list">
          <span>BOARD</span>
        </Link>
      </div>
    </div>
  );
}
