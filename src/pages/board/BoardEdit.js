import { db } from "firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function BoardEdit() {
  const params = useParams();
  const id = params.id;
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const getDetail = async () => {
      setLoading(true);
      const docRef = doc(db, "board", id);
      const docSnap = await getDoc(docRef);

      try {
        if (docSnap.exists()) {
          setTitle(docSnap.data().title);
          setContent(docSnap.data().content);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getDetail();
  }, []);

  const edit = async () => {
    console.log("됐냐");
    await setDoc(doc(db, "board", id), {
      title: title,
      content: content,
    });
    alert("글 수정이 완료되었습니다.");
  };

  return (
    <div>
      {loading ? (
        <div>로딩중입니다</div>
      ) : (
        <>
          <div>BOARD EDIT</div>
          <div>
            <label htmlFor="">제목</label>
            <input
              type="text"
              defaultValue={title}
              onChange={(event) => {
                setTitle(event.target.value);
                console.log(title);
              }}
            />
          </div>
          <div>
            <label htmlFor="">내용</label>
            <textarea
              name=""
              id=""
              defaultValue={content}
              onChange={(event) => {
                setContent(event.target.value);
                console.log(content);
              }}
            ></textarea>
          </div>
          <button
            type="button"
            onClick={() => {
              edit();
            }}
          >
            글 수정
          </button>
        </>
      )}
    </div>
  );
}

export { BoardEdit };
