import { addDoc, collection } from "firebase/firestore";
import { db } from "firebaseConfig";
import { useState } from "react";

function BoardWrite() {
  // const uniqueId = useId();
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
      <div>BOARD WRITE</div>
      <div>
        <label htmlFor="">제목</label>
        <input
          type="text"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="">내용</label>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          onChange={(event) => {
            setContent(event.target.value);
          }}
        ></textarea>
      </div>
      <button
        type="button"
        onClick={() => {
          write();
        }}
      >
        글 작성
      </button>
    </div>
  );
}

export { BoardWrite };
