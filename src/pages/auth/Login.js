import { signInWithEmailAndPassword, getAuth } from "firebaseConfig";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (useCredential) => {
          console.log("로그인완료");
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page-container">
      <div className="layout-center">
        <form action="">
          <div>
            <label htmlFor="">이메일</label>
            <input
              name="email"
              type="email"
              value={email}
              required
              onChange={(event) => {
                onChange(event);
              }}
            />
          </div>
          <div>
            <label htmlFor="">비밀번호</label>
            <input
              name="password"
              type="password"
              value={password}
              required
              onChange={(event) => {
                onChange(event);
              }}
            />
          </div>
          <Link to="/register">
            <button type="button">회원가입</button>
          </Link>
          <button
            type="button"
            onClick={() => {
              login();
            }}
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}

export { Login };
