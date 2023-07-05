import "styles/Base.scss"; // reset css
import "styles/App.scss"; // main css
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import Header from "components/Header";
import Test from "pages/Test";

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
          <Route path="/" element={<Test />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
