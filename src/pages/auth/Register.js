import { createUserWithEmailAndPassword, getAuth } from "firebaseConfig";
import { useState } from "react";

function Register() {
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

  const register = async () => {
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
        <form action="">
          <div>
            <label htmlFor="">이메일</label>
            <input
              name="email"
              type="email"
              required
              value={email}
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
              placeholder="비밀번호를 입력해주세요"
              required
              onChange={(event) => {
                onChange(event);
              }}
            />
          </div>
          <div>
            <input type="text" placeholder="비밀번호를 한번 더 입력해주세요" />
          </div>
          <button
            type="button"
            onClick={() => {
              register();
            }}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}

export { Register };
