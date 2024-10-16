import React, { useState, useEffect } from 'react'
import { CryptoState } from '../context/CryptoContext'
import { HistoricalChart } from '../api/Api'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto';

const CoinInfo = ({coin}) => {
  const[historicalData, setHistoricalData] = useState([])
  const[days, setDays] = useState(1)
  const {curr} = CryptoState();
  const { id } = useParams()

  
  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const {data} = await axios.get(HistoricalChart(id, days, curr))
        setHistoricalData(data.prices)
        console.log(data.prices, "coin Info")
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [days, curr])

  return (
    <div className='w-100'>
    <Line 
    const data = {{
      labels:  historicalData.map((coin)=>{
          let date = new Date(coin[0])
          let time = date.getHours() > 12 
          ? `${date.getHours() - 12}:${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`;

          return days === 1 ? time : date.toLocaleDateString() ;
      }) ,
      datasets: [{
        label: `price ( Past ${days} Days ) in  currency`,
        data: historicalData.map((coin)=> coin[1] ),
        borderColor: "white",
      }]
    }}
    options={{
      // responsive: true,
    // maintainAspectRatio: false,
      elements: {
        point: {
          radius: 1,
          },
        },
        scales: {
          x: {
            ticks: {
              color: "white"
            }
          },
          y: {
            ticks: {
              color: "white"
            }
          }
        },
        plugins: {
          legend : {
            labels: {
              color: "white"
            }
          }
        }
    }}
    />
    <div className='d-flex justify-content-center'>
      <button className='btn btn-sm btn-primary mx-2' onClick={()=> setDays(1)}>1 Day</button>
      <button className='btn btn-sm btn-primary mx-2' onClick={()=> setDays(30)}>1 Month</button>
      <button className='btn btn-sm btn-primary mx-2' onClick={()=> setDays(365)}>1 Year</button>
    </div>
    </div>
  )
}

export default CoinInfo