
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Button, Grid, Input, InputAdornment, TextField} from "@mui/material";
import {AccountBalanceWallet} from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import PaidIcon from '@mui/icons-material/Paid';

//import { IconName } from "react-icons/gi";
// IPFS??????????

const Tx = require("@ethereumjs/tx").Transaction;
const Common = require("@ethereumjs/common").default;
const contract_abi = require("../JSON/abirib.json");

const constant = require("../constant/Constant")

const privateKey = Buffer.from(constant.privateKey,"hex");
// This is the address of the prestigious RibbaToken ;)
const contract_address = "0x1fFEF23a976cA1EF0B0716b74999D845A70C0943";
const contract = new constant.web3.eth.Contract(contract_abi, contract_address);


export default function ExchangeRibbaToken(){
    const { handleSubmit } = useForm();
    //const [balance, setBalance] = useState('');
    const [account, setAccount] = useState('');
    const [txCount, setTxCount] = useState(0);
    const [amount, setAmount] = useState('');
    const [txHash, setTxHash] = useState('');

    //const [transactionReceipt, setTransactionReceipt] = useState(null);


    // Transaction data
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
            console.log(tx);
            // Broadcast the transaction
            tx = tx.serialize();
            const raw = "0x" + tx.toString("hex");
            await constant.web3.eth.sendSignedTransaction(raw, function (err, res) {
                console.log("txHash: ", res);
                setTxHash(res);
            });
            // console.log("Vero txHash:" + txHash);
            // await constant.web3.eth.getTransactionReceipt(txHash, function (err, res) {
            //     if (!err) {
            //         setSuccess(true);
            //     } else {
            //         setSuccess(false);
            //     }
            // });
            // console.log(success);
        });

        // const txCountTmp = await constant.web3.eth.getTransactionCount(account, 'pending');
        // setTxCount(txCountTmp);
        // console.log("txCountTmp: " + txCountTmp);
        // const txObject = {
        //     nonce: constant.web3.utils.toHex(txCount)+10,
        //     gasLimit: constant.web3.utils.toHex(800000),
        //     gasPrice: constant.web3.utils.toHex(constant.web3.utils.toWei("80", "gwei")),
        //     to: contract_address,
        //     data: contract.methods.transfer(account, amount).encodeABI()
        // }
        // const commonObject = new Common({chain: "ropsten", chainId: 3});
        // let tx = Tx.fromTxData(txObject, {common: commonObject});
        //
        // // Sign the transaction     LA PRIVATE KEY DEVE ESSERE DI CHI MANDA I RIBBATOKEN
        // tx = tx.sign(privateKey);
        // console.log("tx: " + tx);
        // // Broadcast the transaction
        // tx = tx.serialize();
        // console.log("tx serialized: " + tx);
        // const raw = "0x" + tx.toString("hex");
        // constant.web3.eth.sendSignedTransaction(raw,(error, result) => {
        //     if(!error) {
        //         setTxHash(result);
        //         console.log(`Transaction hash is: ${txHash}`);
        //     } else {
        //         console.error("New: " + error);
        //     }
        // });
        // //setTxHash(txHashTemp);
        // //console.log("txHash: ", txHash);
        // }
    }
    // useEffect( () => {
    //     async function info() {
    //         console.log("Vero txHash:" + txHash);
    //         await constant.web3.eth.getTransactionReceipt(txHash, function (err, res) {
    //             console.log(res);
    //             if (res != null) {
    //                 setSuccess(true);
    //             } else {
    //                 setSuccess(false);
    //             }
    //         });
    //         console.log(success);
    //     }
    //     info();
    // }, [success, txHash])
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
                    {/*<TextField onChange={amount => setAmount(amount.target.value)}/>*/}
                </Grid>
            </form>
            <p>{txHash ? <span>The ribbatokens are on their way, if you want to follow the transaction this is its hash code: <br/>{txHash}</span> : console.log("È andato tutto bene?")}</p>
        </div>
    )
}
