import { createUserWithEmailAndPassword, getAuth } from "firebaseConfig";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const auth = getAuth();

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "password_check") {
      setPasswordCheck(value);
    }
  };

  const register = async () => {
    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (useCredential) => {
          console.log("회원가입 성공");
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
        {/* TODO: 비밀번호확인 validation 작업 필요 */}
        <div>
          <TextField
            name="password_check"
            type="password"
            value={passwordCheck}
            required
            onChange={(event) => {
              onChange(event);
            }}
            id="standard-basic"
            label="비밀번호 확인"
            variant="standard"
          />
        </div>

        <div style={{ padding: "10px 0" }}>
          <Button
            variant="outlined"
            onClick={() => {
              register();
            }}
          >
            회원가입
          </Button>
        </div>
      </div>
    </div>
  );
}

export { Register };
