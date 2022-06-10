import React from "react";
import {useState} from "react";
import {Button, Grid, InputAdornment, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

const constant = require("../constant/Constant")

const contract_address = "0x1fFEF23a976cA1EF0B0716b74999D845A70C0943";
const contract_abi = require("../JSON/abirib.json")

const contract = new constant.web3.eth.Contract(contract_abi, contract_address);

export default function GetRibbaBalance(){
    const { handleSubmit } = useForm();
    const [balance, setBalance] = useState('');
    const [account, setAccount] = useState('');

    const getMyBalance = async () => {
        const balance = await contract.methods.balanceOf(account).call();
        setBalance(balance);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(getMyBalance)}>
                <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Grid item>
                        <TextField
                            variant="outlined"
                            fullWidth={true}
                            required={true}
                            sx={{m: 1, width: '24ch', input: { color: 'white' }}}
                            placeholder="Address"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CurrencyBitcoinIcon sx={{color: "#949494"}}/>
                                    </InputAdornment>
                                )
                            }}
                            onChange={account => setAccount(account.target.value)}
                            size="normal"
                        />
                    </Grid>
                <Grid item alignItems="stretch" style={{ display: "flex" }}>
                    <Button variant="contained" disableElevation size={"large"} endIcon={<SendIcon/>} type="submit">Submit</Button>
                </Grid>
                </Grid>
            </form>
            <h1>{balance ? balance : console.log("Ribba")}</h1>
        </div>
    )
}
