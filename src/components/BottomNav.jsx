import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BottomNav = () => {
  const [value, setValue] = useState("home");
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case "home":
        navigate("/");
        break;
      case "board":
        navigate("/board/list");
        break;
      case "library":
        navigate("/library");
        break;
      default:
        navigate("/home"); // 기본적으로 홈 페이지로 이동
    }
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 20px" }}>
        <BottomNavigation
          sx={{ width: "100%" }}
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction
            label="Home"
            value="home"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            label="Board"
            value="board"
            icon={<NoteAltIcon />}
          />
          <BottomNavigationAction
            label="Library"
            value="library"
            icon={<LibraryMusicIcon />}
          />
        </BottomNavigation>
      </div>
    </Paper>
  );
};

export default BottomNav;
