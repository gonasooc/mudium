import { Link, useNavigate, useParams } from "react-router-dom";
import { db } from "firebaseConfig";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import Loader from "components/Loader";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import ShareButton from "components/ShareButton";

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
    console.log("detailData", detailData);
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

  const extractYouTubeVideoId = (link) => {
    if (!link) {
      return null;
    }

    const regex =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = link.match(regex);
    return match && match[1];
  };

  // YouTube 링크 추출
  const youtubeVideoId = extractYouTubeVideoId(detailData.youtubeLink);

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
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={1}
                style={{ padding: "16px 0" }}
              >
                <p
                  className=""
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                  }}
                >
                  {detailData.title}
                </p>
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  spacing={1}
                >
                  <ShareButton paramsId={paramsId} />
                </Stack>
              </Stack>
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
              <p style={{ whiteSpace: "pre-line" }}>{detailData.content}</p>

              {youtubeVideoId && (
                <div
                  className="responsive-iframe"
                  style={{ marginTop: "20px" }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                    title="YouTube video player"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export { BoardDetail };
