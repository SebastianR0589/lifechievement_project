import { useState, useEffect } from "react";
import axios from "axios";

export default function Balance(){
    const [balance, setBalance] = useState(0);

    useEffect(() => {axios.get("http://localhost:8080/api/balance").then((response) => {setBalance(response.data)})})

    return (
        <div>{balance}</div>
    )

}