import { Link } from "react-router-dom";

export default function BoardList() {
  return (
    <div className="page-container">
      <div className="layout-center">
        <div>BOARD LIST</div>
        <Link to="/write">
          <button>글쓰기</button>
        </Link>
      </div>
    </div>
  );
}
