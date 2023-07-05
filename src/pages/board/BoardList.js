import { Link } from "react-router-dom";

function BoardList() {
  return (
    <div>
      <div>BOARD LIST</div>
      <Link to="/board/write">
        <button>글쓰기</button>
      </Link>
      <ul>
        {[1, 2].map((item, index) => {
          return (
            <li key={index}>
              <Link to={`/board/detail/${index}`}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Numquam minima laudantium magni, recusandae accusamus,
                consequatur explicabo ducimus eaque officia vitae id rerum,
                blanditiis modi culpa? Hic consequuntur labore laboriosam est!
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export { BoardList };
