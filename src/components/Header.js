import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebaseConfig";
import { useEffect, useState } from "react";

export default function Header() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState(true);

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
            <button
              type="button"
              onClick={() => {
                signOutAndGoLoginPage();
              }}
            >
              로그아웃
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
