import React from "react";
import { useForm } from "react-hook-form";
import {Button, Grid, InputAdornment, TextField} from "@mui/material";
import {AccountBalanceWallet} from '@mui/icons-material';
import {useState} from "react";
import SendIcon from "@mui/icons-material/Send";

const constant = require("../constant/Constant")

export default function GetBalance() {
    const { handleSubmit } = useForm();
    const [balance, setBalance] = useState('');
    const [account, setAccount] = useState('');

    const getBalance = async () => {
        if(!constant.web3.utils.isAddress(account)){
            setBalance("L'indirizzo inserito non è valido")
        }
        let balance = await constant.web3.eth.getBalance(account);
        balance = constant.web3.utils.fromWei(balance, "ether");
        setBalance(balance);
        console.log("Sono dentro getBalance");
    }

    const form = () => {
        return(
            <div>
                <form onSubmit={handleSubmit(getBalance)}>
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
                                        <AccountBalanceWallet sx={{color: "#949494"}}/>
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
                <h1>{balance ? balance : console.log("no balance")}</h1>
            </div>
        )
    }

    return (
        <div>
            {form()}
        </div>
    );
}
