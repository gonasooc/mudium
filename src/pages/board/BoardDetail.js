import { Link, useParams } from "react-router-dom";
import { db } from "firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';

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
      <Link to={`/board/edit/${id}`}>
        <Button variant="contained">글수정</Button>
      </Link>
      {detailData && (
        <div>
          <p style={{fontWeight: '700'}}>{detailData.title}</p>
          <p>{detailData.content}</p>
        </div>
      )}
    </div>
  );
}

export { BoardDetail };
