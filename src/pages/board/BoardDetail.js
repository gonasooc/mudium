import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "firebaseConfig";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Loader from "components/Loader";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

function BoardDetail() {
  const params = useParams();
  const paramsId = params.id;
  const [detailData, setDetailData] = useState({});
  const [dt, setDt] = useState();
  const [loader, setloader] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const getDetail = async () => {
      setloader(true);
      const docRef = doc(db, "board", paramsId);
      const docSnap = await getDoc(docRef);

      try {
        if (docSnap.exists()) {
          setDetailData(docSnap.data());
          let tempDate = docSnap._document.createTime.timestamp.toDate();
          setDt(dayjs(tempDate).format("YYYY-MM-DD HH:MM"));
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setloader(false);
      }
    };

    getDetail();
  }, []);

  const deletePost = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteDoc(doc(db, "board", paramsId));
        alert("글 삭제가 완료되었습니다.");
      } catch (error) {
        console.log(error);
      } finally {
        navigate("/board/list");
        window.location.reload(); // TODO: router 이동 후 새로고침할 적절한 방법을 모르겠어서 임시방편
      }
    }
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div>
          {user?.uid === detailData.uid && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingTop: "10px",
              }}
            >
              <Link
                to={`/board/edit/${paramsId}`}
                style={{ marginRight: "2px" }}
              >
                <Button variant="contained">글수정</Button>
              </Link>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  deletePost();
                }}
              >
                글삭제
              </Button>
            </div>
          )}
          {detailData && (
            <div>
              <p style={{ fontSize: "20px", fontWeight: "600" }}>
                {detailData.title}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <p className="" style={{ fontSize: "14px", fontWeight: "500" }}>
                  {detailData.email}
                </p>
                <p
                  className=""
                  style={{ fontSize: "12px", opacity: "0.8", marginTop: "2px" }}
                >
                  {dt}
                </p>
              </div>
              <p>{detailData.content}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export { BoardDetail };
