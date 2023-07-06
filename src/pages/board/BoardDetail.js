import { Link, useParams } from "react-router-dom";
import { db } from "firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

function BoardDetail() {
  const params = useParams();
  const id = params.id;
  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    const getDetail = async () => {
      const docRef = doc(db, "board", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDetailData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    getDetail();
  }, []);

  return (
    <div>
      <div>BOARD DETAIL</div>
      <Link to={`/board/edit/${id}`}>
        <button>글수정</button>
      </Link>
      {detailData && (
        <div>
          <p>{detailData.title}</p>
          <p>{detailData.content}</p>
        </div>
      )}
    </div>
  );
}

export { BoardDetail };
