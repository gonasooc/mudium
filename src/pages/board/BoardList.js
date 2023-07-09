import { Link, useOutletContext, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Loader from "components/Loader";

function BoardList() {
  const outletContext = useOutletContext();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(false);
  // const boardArr = outletContext.boardData.docs;

  useEffect(() => {
    const fetchData = async () => {
      setLoader(true);
      try {
        setData(outletContext.boardData.docs);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, [outletContext]);

  const goDetail = (id) => {
    navigate(`/board/detail/${id}`);
  };

  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div style={{ textAlign: "right", padding: "10px 0" }}>
            <Link to="/board/write">
              <Button variant="contained">글쓰기</Button>
            </Link>
          </div>
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
                {data?.map((item) => (
                  <TableRow
                    hover
                    onClick={() => {
                      goDetail(item.id);
                    }}
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {
                        item._document.data.value.mapValue.fields.title
                          .stringValue
                      }
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
        </>
      )}
    </div>
  );
}

export { BoardList };
