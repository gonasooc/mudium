import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Stack } from "@mui/material";

export default function AlertDialog({ onClose, paramsId }) {
  const isLocalEnvironment = window.location.hostname === "localhost";

  let apiUrl = "https://gonasooc.github.io/mudium"; // 배포 환경의 기본 URL

  if (isLocalEnvironment) {
    apiUrl = "http://localhost:3000/mudium"; // 로컬 환경에서의 URL
  }

  const postId = paramsId;
  const url = `${apiUrl}/board/detail/${postId}`;

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("해당 url이 클립보드에 복사되었습니다.");
    } catch (err) {
      console.error("URL 복사 실패:", err);
    } finally {
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">게시글 공유하기</DialogTitle>
        <DialogContent>
          <Stack direction="row" gap={0.5}>
            <ContentCopyIcon fontSize="small" />
            <DialogContentText
              id="alert-dialog-description"
              className="type-one-line"
            >
              {url}
            </DialogContentText>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="contained" onClick={handleCopyClick} autoFocus>
            링크복사
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
