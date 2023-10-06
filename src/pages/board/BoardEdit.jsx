import { db } from "firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "components/Loader";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

function BoardEdit() {
  const params = useParams();
  const id = params.id;
  const [loader, setloader] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [uid, setUid] = useState(null);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getDetail = async () => {
      setloader(true);
      const docRef = doc(db, "board", id);
      const docSnap = await getDoc(docRef);

      try {
        if (docSnap.exists()) {
          setTitle(docSnap.data().title);
          setContent(docSnap.data().content);
          setUid(docSnap.data().uid);
          setEmail(docSnap.data().email);
          setYoutubeLink(docSnap.data().youtubeLink);
          setTimestamp(docSnap.data().timestamp);
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

  const edit = async () => {
    if (title.length === 0) {
      alert("제목을 입력해주세요");
      return;
    }
    if (content.length === 0) {
      alert("내용을 입력해주세요");
      return;
    }

    try {
      await setDoc(doc(db, "board", id), {
        uid: uid,
        email: email,
        title: title,
        content: content,
        youtubeLink: youtubeLink,
        timestamp: timestamp,
      });
      alert("글 수정이 완료되었습니다.");
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/board/list");
      window.location.reload(); // TODO: router 이동 후 새로고침할 적절한 방법을 모르겠어서 임시방편
    }
  };

  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <>
          <FormControl fullWidth>
            <TextField
              style={{ marginBottom: "10px" }}
              id="standard-basic"
              label="제목"
              variant="standard"
              defaultValue={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <TextField
              id="outlined-multiline-static"
              label="내용"
              multiline
              rows={4}
              defaultValue={content}
              onChange={(event) => {
                setContent(event.target.value);
              }}
            />
            <TextField
              style={{ marginBottom: "10px" }}
              id="standard-basic"
              label="유튜브 링크"
              variant="standard"
              defaultValue={youtubeLink}
              onChange={(event) => {
                setYoutubeLink(event.target.value);
              }}
            />
          </FormControl>
          <div style={{ marginTop: "10px", textAlign: "right" }}>
            <Button
              variant="contained"
              onClick={() => {
                edit();
              }}
            >
              수정하기
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export { BoardEdit };
