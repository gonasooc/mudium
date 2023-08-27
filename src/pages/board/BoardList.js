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
import { useSelector } from "react-redux";
import dayjs from "dayjs";

function BoardList() {
  const outletContext = useOutletContext();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(false);
  // const boardArr = outletContext.boardData.docs;
  const user = useSelector((state) => state.user.user);

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

  console.log(data);

  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <>
          {user ? (
            <div style={{ textAlign: "right", padding: "10px 0" }}>
              <Link to="/board/write">
                <Button variant="contained">글쓰기</Button>
              </Link>
            </div>
          ) : null}

          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 350 }}
              aria-label="sticky table"
              style={{ tableLayout: "fixed" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>제목</TableCell>
                  <TableCell align="right">작성자</TableCell>
                  <TableCell align="right">작성일</TableCell>
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
                    <TableCell
                      component="th"
                      scope="row"
                      className="type-one-line"
                    >
                      {
                        item._document.data.value.mapValue.fields.title
                          .stringValue
                      }
                    </TableCell>
                    <TableCell className="type-one-line" align="right">
                      {
                        item._document.data.value.mapValue.fields.email
                          .stringValue
                      }
                    </TableCell>
                    <TableCell
                      className="type-one-line type-tabular-nums"
                      align="right"
                    >
                      {dayjs(
                        item._document.createTime.timestamp.toDate(),
                      ).format("YYYY-MM-DD")}
                    </TableCell>
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
