import { addDoc, collection } from "firebase/firestore";
import { db } from "firebaseConfig";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const write = async () => {
    try {
      const docRef = await addDoc(collection(db, "board"), {
        title: title,
        content: content,
      });
      console.log("Document written with ID: ", docRef.id);
      alert("글 등록이 완료됐습니다.");
    } catch (error) {
      console.log(error);
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
