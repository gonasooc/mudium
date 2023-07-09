import { Link, useParams } from "react-router-dom";
import { db } from "firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Loader from "components/Loader";

function BoardDetail() {
  const params = useParams();
  const id = params.id;
  const [detailData, setDetailData] = useState({});
  const [loader, setloader] = useState(false);

  useEffect(() => {
    const getDetail = async () => {
      setloader(true);
      const docRef = doc(db, "board", id);
      const docSnap = await getDoc(docRef);

      try {
        if (docSnap.exists()) {
          setDetailData(docSnap.data());
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

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div>
          <Link to={`/board/edit/${id}`}>
            <Button variant="contained">글수정</Button>
          </Link>
          {detailData && (
            <div>
              <p style={{ fontSize: "14px", opacity: "0.8" }}>글쓴이</p>
              <p style={{ fontSize: "18px", fontWeight: "600" }}>
                {detailData.title}
              </p>
              <p>{detailData.content}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export { BoardDetail };
