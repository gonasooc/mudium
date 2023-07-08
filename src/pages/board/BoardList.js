import { Link, useOutletContext, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

function BoardList() {
  const context = useOutletContext();
  const boardArr = context.boardData.docs;
  const navigate = useNavigate();

  const goDetail = (id) => {
    navigate(`/board/detail/${id}`);
  };

  return (
    <div>
      <Link to="/board/write">
        <Button variant="contained">글쓰기</Button>
      </Link>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>제목</TableCell>
              <TableCell>내용</TableCell>
              <TableCell align="right">작성자</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {boardArr?.map((item) => (
              <TableRow
                hover
                onClick={() => {
                  goDetail(item.id);
                }}
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item._document.data.value.mapValue.fields.title.stringValue}
                </TableCell>
                <TableCell>
                  {
                    item._document.data.value.mapValue.fields.content
                      .stringValue
                  }
                </TableCell>
                <TableCell align="right">{"작성자"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <ul>
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
      </ul> */}
    </div>
  );
}

export { BoardList };
