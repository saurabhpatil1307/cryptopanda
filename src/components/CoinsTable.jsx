import React, { useEffect, useState } from "react";
import { CryptoState } from "../context/CryptoContext";
import { CoinList } from "../api/Api";
import {
  Container,
  LinearProgress,
  Table,
  TableContainer,
  TableHead,
  TextField,
  Typography,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
} from "@mui/material";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyle = makeStyles({
  row: {
    display: "flex",
    justifyContent: "flex-start",
  },
});

const CoinsTable = () => {
  const { curr, symbol } = CryptoState();
  const [coinData, setCoinData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const fetctCoinsData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(CoinList(curr));
      setCoinData(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetctCoinsData();
    console.log("is called");
  }, [curr]);
  const handleSearch = () => {
    return coinData.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const classes = useStyle();
  return (
    <div>
      <Container style={{ textAlign: "center", color: "white" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat", color: "white" }}
        >
          Cryptocurrency Prices by market cap
        </Typography>
        <TextField
          variant="outlined"
          label="Search For the crypto currency"
          style={{ marginBottom: 20, width: "100%" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputLabelProps={{
            style: { color: "white" }, // Label color
          }}
          InputProps={{
            style: { color: "white" }, // Text color
            classes: {
              notchedOutline: {
                borderColor: "white", // Outline color
              },
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white", // Outline color
              },
              "&:hover fieldset": {
                borderColor: "white", // Outline color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "white", // Outline color when focused
              },
            },
          }}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#eebc1d" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((en) => {
                    return (
                      <TableCell
                        align="left"
                        key={en}
                        style={{ color: "white" }}
                      >
                        {en}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, page * 10)
                  .map((coin) => {
                    const profit = coin.market_cap_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => {
                          navigate(`/coin/${coin.id}`);
                        }}
                        className={classes.row}
                        key={coin.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ display: "flex", gap: 15 }}
                          className={classes.row}
                        >
                          <img
                            src={coin?.image}
                            alt={coin?.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              color: "white",
                            }}
                          >
                            <span>{coin.symbol}</span>
                            <span>{coin.name}</span>
                          </div>
                        </TableCell>
                        <TableCell style={{ color: "white" }}>
                          {symbol + " "}
                          {numberWithCommas(coin.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          style={{ color: profit > 0 ? "green" : "red" }}
                        >
                          {profit > 0 ? "+" : ""}
                          {coin.market_cap_change_percentage_24h}%
                        </TableCell>
                        <TableCell style={{ color: "white" }}>
                          {symbol + " "}
                          {numberWithCommas(
                            coin.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          count={handleSearch()?.length / 10}
          value={page}
          onChange={(_, e) => {
            setPage(e);
            window.scroll(0, 460);
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
            '& .MuiPaginationItem-root': {
              color: 'white',  // Color of the page numbers
            },
            '& .Mui-selected': {
              backgroundColor: 'white',  // Background color for selected item
              color: 'black',            // Text color for selected item
            },
            '& .MuiPaginationItem-ellipsis': {
              color: 'white',  // Color of the ellipsis
            },
          }}
          style={{ display: "flex", justifyContent: "center", padding: 20, color: "white" }}
        />
      </Container>
    </div>
  );
};

export default CoinsTable;
