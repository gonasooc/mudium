import "styles/Base.scss"; // reset css
import "styles/App.scss"; // main css
import "styles/Header.scss"; // header css
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import Header from "components/Header";
import Home from "pages/Home";
import { Index } from "pages/board/Index";
import { BoardList } from "pages/board/BoardList";
import { BoardWrite } from "pages/board/BoardWrite";
import { BoardDetail } from "pages/board/BoardDetail";
import { BoardEdit } from "pages/board/BoardEdit";

const theme = createTheme({
  // 별도 테마 설정(MUI 기본 폰트 변경)
  typography: {
    fontFamily:
      "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<Index />}>
            <Route path="list" element={<BoardList />} />
            <Route path="write" element={<BoardWrite />} />
            <Route path="detail/:id" element={<BoardDetail />} />
            <Route path="edit/:id" element={<BoardEdit />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
