import { addDoc, collection } from "firebase/firestore";
import { db } from "firebaseConfig";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) {
      navigate(-1);
    }
  }, []);

  const write = async () => {
    if (title.length === 0) {
      alert("제목을 입력해주세요");
      return;
    }
    if (content.length === 0) {
      alert("내용을 입력해주세요");
      return;
    }

    try {
      await addDoc(collection(db, "board"), {
        uid: user.uid,
        email: user.email,
        title: title,
        content: content,
        youtubeLink: youtubeLink,
        timestamp: new Date(),
      });
      alert("글 등록이 완료됐습니다.");
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/board/list");
      window.location.reload(); // TODO: router 이동 후 새로고침할 적절한 방법을 모르겠어서 임시방편
    }
  };

  return (
    <div>
      <FormControl fullWidth>
        <TextField
          style={{ marginBottom: "10px" }}
          id="standard-basic"
          label="제목"
          variant="standard"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <TextField
          id="outlined-multiline-static"
          label="내용"
          multiline
          rows={4}
          onChange={(event) => {
            setContent(event.target.value);
          }}
        />
        <TextField
          style={{ marginBottom: "10px" }}
          id="standard-basic"
          label="유튜브 링크"
          variant="standard"
          onChange={(event) => {
            setYoutubeLink(event.target.value);
          }}
        />
      </FormControl>
      <div style={{ marginTop: "10px", textAlign: "right" }}>
        <Button
          variant="contained"
          onClick={() => {
            write();
          }}
        >
          작성하기
        </Button>
      </div>
    </div>
  );
}

export { BoardWrite };
