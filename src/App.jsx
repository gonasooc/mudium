import "styles/Base.scss"; // reset css
import "styles/App.scss"; // main css
import "styles/Header.scss"; // header css
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
// import { db } from "./firebaseConfig";
import Header from "components/Header";
import Home from "pages/Home";
import { Register } from "pages/auth/Register";
import { Login } from "pages/auth/Login";
import { Index } from "pages/board/Index";
import { BoardList } from "pages/board/BoardList";
import { BoardWrite } from "pages/board/BoardWrite";
import { BoardDetail } from "pages/board/BoardDetail";
import { BoardEdit } from "pages/board/BoardEdit";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "redux/userSlice";
import BottomNav from "components/BottomNav";

const theme = createTheme({
  // 별도 테마 설정(MUI 기본 폰트 변경)
  typography: {
    fontFamily:
      "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif",
  },
  palette: {
    primary: {
      main: "#4B928F",
    },
  },
});

function App() {
  const auth = getAuth();

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  console.log("user", user);

  let [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
        setIsLogin(true);
      } else {
        dispatch(clearUser());
        setIsLogin(false);
      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {/* <Router> */}
      <Header />
      <Routes>
        <Route path="/register" element={!isLogin ? <Register /> : <Home />} />
        <Route path="/" element={isLogin ? <Home /> : <Login />} />
        <Route path="/board" element={<Index />}>
          <Route path="list" element={<BoardList />} />
          <Route path="write" element={<BoardWrite />} />
          <Route path="detail/:id" element={<BoardDetail />} />
          <Route path="edit/:id" element={<BoardEdit />} />
        </Route>
      </Routes>
      <BottomNav />
      {/* </Router> */}
    </ThemeProvider>
  );
}

export default App;
