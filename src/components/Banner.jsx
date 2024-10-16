import { Container, Typography,  } from '@mui/material'
import { makeStyles } from "@mui/styles";
import React from 'react'
import Carousel from './Carousel';



const useStyle = makeStyles({
    bannerContent:{
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "center"
    },
    tagLine:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
        height:"40%"
    }
})
const Banner = () => {
    const classes = useStyle()
  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
            <div className={classes.tagLine}>
                <Typography 
                variant='h2'
                style={{
                    fontWeight:"bold",
                    marginBottom:15,
                    fontFamily:"Montserrat",
                    textAlign:"center"
                }}
                >
                    Crypto Tracker
                </Typography>
                <Typography
                variant='subtitle2'
                style={{
                    color:"white",
                    marginBottom:15,
                    fontFamily:"Montserrat",
                }}
                >
                    Get all the Info regarding your favorite Crypto Currency
                </Typography>
            </div>
            <div>
                <Carousel/>
            </div>
        </Container>
    </div>
  )
}

export default Banner