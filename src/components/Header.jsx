import {
  AppBar,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../context/CryptoContext";

const useStyle = makeStyles({
  title: {
    flex: 1,
    color: "gold",
    cursor: "pointer",
  },
  select: {},
});

function Header() {
    const {curr, setCurr, symbol} = CryptoState()
  const navigate = useNavigate();
  const classes = useStyle();
  
  return (
      <AppBar color="transparent" position="static" sx={{
        backgroundColor: 'grey',
      }}>
        <Toolbar>
          <Typography
            onClick={() => navigate("/")}
            className={classes.title}
            variant="h5"
            style={{
              fontFamily: "Montserrat",
            }}
          >
            Crypto Hunter
          </Typography >
            <Select
            variant="outlined"
                style={{
                    width: 100,
                    height: 40,
                    marginRight:15,
                    border:"1px solid white",
                    color:"white"
                }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              value={curr}
              onChange={(e)=>setCurr(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
        </Toolbar>
      </AppBar>
  );
}

export default Header;
