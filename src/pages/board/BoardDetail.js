import { Link } from "react-router-dom";

function BoardDetail() {
  return (
    <div>
      <div>BOARD DETAIL</div>
      <Link to="/board/edit/id">
        <button>글수정</button>
      </Link>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed soluta
        doloremque necessitatibus molestiae esse inventore quaerat, mollitia,
        neque cum cupiditate est harum ea dolor, repellat quam cumque possimus
        voluptate enim.
      </p>
    </div>
  );
}

export { BoardDetail };
