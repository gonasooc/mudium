import { Outlet } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "firebaseConfig";

function Index() {
  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const q = query(collection(db, "board"), orderBy("timestamp", "desc"));
      const data = await getDocs(q);
      setBoardData(data);
    };

    getData();
  }, []);

  return (
    <div className="page-container">
      <div className="layout-center">
        {/* <div>BoardHome</div> */}
        <Outlet context={{ boardData }}></Outlet>
      </div>
    </div>
  );
}

export { Index };
