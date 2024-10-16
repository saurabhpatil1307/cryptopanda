import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage';
import CoinPage from './pages/CoinPage';
import CryptoProvider from './context/CryptoContext.jsx';

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"",
        element:<HomePage/>
      },
      {
        path:"/coin/:id",
        element:<CoinPage/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <CryptoProvider>
      <RouterProvider router={router}/>
    </CryptoProvider>,
)
