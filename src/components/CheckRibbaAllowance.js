import {useState} from "react";
import {Button, Grid, InputAdornment, TextField} from "@mui/material";
import React from "react";
import {useForm} from "react-hook-form";
import { ReactComponent as Mafalda } from '../SVG/Mafalda.svg';
import SendIcon from "@mui/icons-material/Send";

const constant = require("../constant/Constant")

const contract_address = "0x1fFEF23a976cA1EF0B0716b74999D845A70C0943";
const contract_abi = require("../JSON/abirib.json")

const contract = new constant.web3.eth.Contract(contract_abi, contract_address);

const ribbaAccount = "0xb91A8C92E5FF08B76f73F7480150ABa4Ed5A9a53";

export default function CheckRibbaAllowance(){
    const { handleSubmit } = useForm();
    const [account, setAccount] = useState('');
    const [allowance, setAllowance] = useState('');

    const checkAllowance = async () => {
        const allowance = await contract.methods.allowance(ribbaAccount, account).call();
        setAllowance(allowance);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(checkAllowance)}>
                <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Grid item>
                        <TextField
                            variant="outlined"
                            fullWidth={true}
                            required={true}
                            sx={{m: 1, width: '25ch', input: { color: 'white' }}}
                            placeholder="Address"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Mafalda/>
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
            <h1>{allowance ? allowance : console.log("Ribba allowance")}</h1>
        </div>
    )
}
