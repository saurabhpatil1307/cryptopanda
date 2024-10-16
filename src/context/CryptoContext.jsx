import { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

const CryptoProvider = ({children})=>{

    const[curr, setCurr] = useState("INR")
    const [symbol, setSymbol] = useState("₹")

    useEffect(()=>{
        if(curr === "INR") setSymbol("₹")
        else if(curr === "USD") setSymbol("$")
    },[curr])

    return(
        <Crypto.Provider value={{curr, setCurr, symbol}}>
            {children}
        </Crypto.Provider>
    )
}
export default CryptoProvider

export const CryptoState = ()=>{
    return useContext(Crypto)
}