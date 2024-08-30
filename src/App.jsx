// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
const [isLoading, setIsLoading] = useState(false)
const [amount, setAmount] = useState(1)
const [fromCur, fromSetCur] = useState("USD")
const [toCur, toSetCur] = useState("USD")
const [converted, setConverted] = useState("")


  useEffect(function(){
    async function getMoneyConvert () {
      setIsLoading(true);
        const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
        );
  
        const data = await res.json();
        console.log(data);
        if (data.rates && data.rates[toCur]) {
          setConverted(data.rates[toCur]);
        } else {
          setConverted("Conversion rate not available");
        }
        setIsLoading(false)
    }
    if( toCur === fromCur) return setConverted(amount)
    getMoneyConvert()
  }, [amount, fromCur, toCur])
  return (
    <div>
      <input type="text" value={amount} onChange={(e) => setAmount(Number(e.target.value))} disabled={isLoading} />
      <select value={fromCur} onChange={(e) => fromSetCur(e.target.value)} disabled={isLoading}   >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toCur} onChange={(e) => toSetCur(e.target.value)} disabled={isLoading}  >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{converted} {toCur}</p>
    </div>
  );
}
