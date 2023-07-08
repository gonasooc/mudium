import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebaseConfig";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Header() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState(true);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoginState(true);
      } else {
        setLoginState(false);
      }
    });
  }, []);

  const signOutAndGoLoginPage = () => {
    signOut(auth);
    navigate("/");
  };

  return (
    <div className="mudium-header">
      <div
        className="header-inner"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>
          <Link to="/">
            <span>HOME</span>
          </Link>
          <Link to="/board/list">
            <span>BOARD</span>
          </Link>
        </div>
        <div>
          {loginState ? (
            <>
              {/* <span>{user.email}</span> */}
              {/* FIXME: redux에서 받아오는 값 비동기 처리 필요 */}
              <button
                type="button"
                onClick={() => {
                  signOutAndGoLoginPage();
                }}
              >
                로그아웃
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
