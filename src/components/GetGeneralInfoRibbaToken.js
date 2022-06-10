import {useState} from "react";
import {Button} from "@mui/material";
import React from "react";
import constant from "../constant/Constant";

const contract_address = "0x1fFEF23a976cA1EF0B0716b74999D845A70C0943";
const contract_abi = require("../JSON/abirib.json")

const contract = new constant.web3.eth.Contract(contract_abi, contract_address);


export default function GetGeneralInfo(){

    const [name,setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [supply, setSupply] = useState('');

    const getName = async () => {
        let name = await contract.methods.name().call();
        setName(name);
        await getSymbol();
    }

    const getSymbol = async () => {
        let symbol = await contract.methods.symbol().call();
        setSymbol(symbol);
        await getSupply();
    }

    const getSupply = async () => {
        let supply = await contract.methods.totalSupply().call();
        setSupply(supply);
    }

    const renderElement = () => {
        const list = <ul>
                        <li>Name: {name}</li>
                        <li>Symbol: {symbol}</li>
                        <li>Supply: {supply}</li>
                    </ul>;
        if(name)
            return list;
        return null;
    }

    return (
        <div>
            <Button variant={"contained"} onClick={getName}>Get RibbaToken info</Button>
            {renderElement()}
        </div>
    )
}
