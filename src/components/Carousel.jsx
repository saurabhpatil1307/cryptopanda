import React, { useEffect, useState } from 'react'
import { makeStyles } from "@mui/styles";
import axios from 'axios';
import { TrendingCoins } from '../api/Api';
import { CryptoState } from '../context/CryptoContext';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

const useStyle = makeStyles({
    carousel:{
        height: "50%",
        display: "flex",
        alignItems: "center",
        marginTop:"50px"
    },
    carouselItem:{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      flexDirection:"column"
    }    
})
const Carousel = () => {
    const classes = useStyle()
    const {curr, symbol} = CryptoState()
    const [trendingCoinData, setTrendingCoinData] = useState([])
    const fetchTrendingCoins = async ()=>{
      try {
        const {data} = await axios.get(TrendingCoins(curr))
      setTrendingCoinData(data)
      } catch (error) {
        console.log(error)
      }
      
    }
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    useEffect(()=>{
      fetchTrendingCoins()
    },[curr])
    const responsive = {
      0: {
        items: 2,
      },
      512: {
        items: 4,
      },
    }
    const items = trendingCoinData.map((coin)=>{
      let profit = coin.price_change_percentage_24h>=0;

      return <Link to={`/coin/${coin.id}`} className={classes.carouselItem}>

      <img src={coin?.image} alt={coin?.name} height="80" style={{marginBottom:10}} />

      <span >{coin?.symbol} &nbsp; 
      <span style={{color: profit?"green":"red"}}>{profit && "+"}{coin.price_change_percentage_24h?.toFixed(2)}%</span></span>

        <span>{symbol} {numberWithCommas(coin?.current_price.toFixed(2))}</span>
      </Link>
    })
  return (
    <div className={classes.carousel}>
      <AliceCarousel 
      infinite
      autoPlayInterval={1000} 
      animationDuration={1500} 
      disableDotsControls 
      disableButtonsControls
      responsive={responsive} 
      mouseTracking 
      items={items}
      autoPlay
      />
    </div>
    
  )
}

export default Carousel