import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Button, Grid, InputAdornment, TextField} from "@mui/material";
import {AccountBalanceWallet} from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import PaidIcon from '@mui/icons-material/Paid';

const Tx = require("@ethereumjs/tx").Transaction;
const Common = require("@ethereumjs/common").default;
const contract_abi = require("../JSON/abirib.json");
const constant = require("../constant/Constant")

const privateKey = Buffer.from(constant.privateKey,"hex");
// This is the address of the RibbaToken
const contract_address = "0x1fFEF23a976cA1EF0B0716b74999D845A70C0943";
const contract = new constant.web3.eth.Contract(contract_abi, contract_address);


export default function ExchangeRibbaToken(){

    const { handleSubmit } = useForm();
    const [account, setAccount] = useState('');
    const [txCount, setTxCount] = useState(0);
    const [amount, setAmount] = useState('');
    const [txHash, setTxHash] = useState('');

    const transaction = async () => {
        await constant.web3.eth.getTransactionCount(constant.myAddress, async function (err, txCount) {
            // Transaction data
            const txObject = {
                nonce: constant.web3.utils.toHex(txCount),
                gasLimit: constant.web3.utils.toHex(800000),
                gasPrice: constant.web3.utils.toHex(constant.web3.utils.toWei("100", "gwei")),
                to: contract_address,
                data: contract.methods.transfer(account, amount).encodeABI(),
            };
            setTxCount(txCount);
            // Network data
            const commonObject = new Common({chain: "ropsten", chainId: 3});
            // Create the transaction
            let tx = Tx.fromTxData(txObject, {common: commonObject});
            // Sign the transaction
            tx = tx.sign(privateKey);
            // Broadcast the transaction
            tx = tx.serialize();
            const raw = "0x" + tx.toString("hex");
            await constant.web3.eth.sendSignedTransaction(raw, function (err, res) {
                setTxHash(res);
            });
        });
    }
    return (
        <div>
            <form onSubmit={handleSubmit(transaction)}>
                <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Grid item>
                        <TextField
                            variant="outlined"
                            fullWidth={true}
                            required={true}
                            sx={{m: 1, width: '28ch', input: { color: 'white' }}}
                            placeholder="Address"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountBalanceWallet sx={{color: "#949494"}}/>
                                    </InputAdornment>
                                )
                            }}
                            size="normal"
                            onChange={account => setAccount(account.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="outlined"
                            fullWidth={true}
                            required={true}
                            sx={{m: 1, width: '10ch', input: { color: 'white' }}}
                            placeholder="Amount"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PaidIcon sx={{color: "#949494"}}/>
                                    </InputAdornment>
                                )
                            }}
                            size="normal"
                            onChange={amount => setAmount(amount.target.value)}
                        />
                    </Grid>
                    <Grid item alignItems="stretch" style={{ display: "flex" }}>
                        <Button variant="contained" disableElevation size={"large"} endIcon={<SendIcon/>} type="submit">Submit</Button>
                    </Grid>
                </Grid>
            </form>
            <p>{txHash ? <span>The ribbatokens are on their way. To check the transaction you can follow <a href={"https://ropsten.etherscan.io/tx/"+txHash}>this link</a></span> : void(0)}</p>
        </div>
    )
}
