import { signInWithEmailAndPassword, getAuth } from "firebaseConfig";
import { Link } from "react-router-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
          alert(`${useCredential.user.email}님 로그인되었습니다.`);
        }
      );
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/invalid-email") {
        alert("이메일 형식이 아닙니다");
      } else if (error.code === "auth/wrong-password") {
        alert("비밀번호가 일치하지 않습니다.");
      } else if (error.code === "auth/missing-password") {
        alert("비밀번호를 입력해주세요.");
      } else if (error.code === "auth/user-not-found") {
        alert("가입된 정보가 없습니다.");
      }
    }
  };

  return (
    <div className="page-container">
      <div className="layout-center">
        <div>
          <TextField
            required
            id="standard-basic"
            label="이메일"
            name="email"
            type="email"
            variant="standard"
            value={email}
            onChange={(event) => {
              onChange(event);
            }}
          />
        </div>
        <div>
          <TextField
            name="password"
            type="password"
            value={password}
            required
            onChange={(event) => {
              onChange(event);
            }}
            id="standard-basic"
            label="비밀번호"
            variant="standard"
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "5px",
            padding: "10px 0",
          }}
        >
          <Link to="/register">
            <Button variant="outlined">회원가입</Button>
          </Link>
          <Button
            variant="contained"
            onClick={() => {
              login();
            }}
          >
            로그인
          </Button>
        </div>
      </div>
    </div>
  );
}

export { Login };
