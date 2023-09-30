import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebaseConfig";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import logo from "assets/logo512.png";

export default function Header() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState(true);
  const user = useSelector((state) => state.user.user);

  const location = useLocation();

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
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Link className="logo-link" to="/">
            <img src={logo} alt="logo" className="logo-img" />
          </Link>
        </div>
        <div>
          {loginState ? (
            <>
              {/* FIXME: redux에서 받아오는 값 비동기 처리 필요 */}
              <span style={{ fontSize: "14px", marginRight: "6px" }}>
                {user?.email}
              </span>
              <Button
                variant="contained"
                onClick={() => {
                  signOutAndGoLoginPage();
                }}
              >
                로그아웃
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
