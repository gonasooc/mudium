import { Link, useOutletContext } from "react-router-dom";

function BoardList() {
  const context = useOutletContext();
  const boardArr = context.boardData.docs;
  console.log(boardArr);

  return (
    <div>
      <div>BOARD LIST</div>
      <Link to="/board/write">
        <button>글쓰기</button>
      </Link>
      <ul>
        {boardArr?.map((item) => {
          return (
            <li key={item.id} style={{ border: "1px solid #000" }}>
              <Link to={`/board/detail/${item.id}`}>
                <p>
                  {item._document.data.value.mapValue.fields.title.stringValue}
                </p>
                <p>
                  {
                    item._document.data.value.mapValue.fields.content
                      .stringValue
                  }
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export { BoardList };
