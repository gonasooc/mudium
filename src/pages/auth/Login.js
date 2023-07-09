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
