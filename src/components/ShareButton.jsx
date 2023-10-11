import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import ShareDialog from "components/ShareDialog";

const ShareButton = (props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const paramsId = props.paramsId;

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <IconButton aria-label="share" size="small" onClick={handleDialogOpen}>
        <ShareIcon fontSize="small" />
      </IconButton>
      {dialogOpen && (
        <ShareDialog paramsId={paramsId} onClose={() => setDialogOpen(false)} />
      )}
    </>
  );
};

export default ShareButton;
