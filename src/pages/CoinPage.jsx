import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../api/Api";
import { CryptoState } from "../context/CryptoContext";
import { makeStyles } from "@mui/styles";
import CoinInfo from "../components/CoinInfo";
import { Typography } from "@mui/material";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";

const useStyle = makeStyles({
  container: {
    display: "flex",
  },
  // sidebar: {
  //   width: "30%",
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   marginTop: 25,
  //   borderRight: "2px solid grey",
  //   padding: 10,
  // },
});

export default function CoinPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState([]);
  const { curr, symbol } = CryptoState();
  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(SingleCoin(id));
      setCoin(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCoin();
  }, [curr]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="overflow-x-hidden">
      <div className="row p-3 d-flex justify-content-center align-items-center" style={{height: "87vh"}}>
        <div className="col-md-12 col-lg-12 col-xl-4 border-end p-2 text-center mt-3">
          <img
            src={coin.image?.large}
            alt={coin.name}
            height="200"
            style={{ marginBottom: 20 }}
          />
          <Typography variant="h3" style={{ fontWeight: "bold" }}>
            {coin.name}
          </Typography>
          <Typography variant="subtitle1">
            {ReactHtmlParser(coin.description?.en.split(". ")[0])}
          </Typography>
          <div style={{ alignSelf: "start" }}>
            <Typography
              variant="h5"
              style={{ fontWeight: "bold", marginTop: "10px" }}
            >
              Rank:{coin?.market_cap_rank}
            </Typography>
            <Typography
              variant="h5"
              style={{ fontWeight: "bold", marginTop: "10px" }}
            >
              Current Price:{symbol}
              {coin?.market_data?.current_price[
                curr.toLowerCase()
              ]?.toLocaleString()}
            </Typography>
            <Typography
              variant="h5"
              style={{ fontWeight: "bold", marginTop: "10px" }}
            >
              Market Cap:{symbol}
              {coin?.market_data?.market_cap[curr.toLowerCase()]
                ?.toString()
                .slice(0, -6)?.toLocaleString()
                ? parseInt(coin?.market_data?.market_cap[curr.toLowerCase()]
                    ?.toString()
                    .slice(0, -6)).toLocaleString()
                : ""}
              M
            </Typography>
          </div>
        </div>
        <div className="col-12 col-lg-12 col-xl-8 d-flex justify-content-center align-items-center mt-3">
          <CoinInfo coin={coin} />
        </div>
      </div>
    </div>
  );
}
