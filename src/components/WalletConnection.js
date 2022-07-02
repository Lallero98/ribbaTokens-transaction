import React, {useEffect, useState} from "react";
import {Button} from "@mui/material";
import MetamaskLogo from "../UI/MetamaskLogo.js"

function WalletConnection() {

    const [currentAccount, setCurrentAccount] = useState('');

    const checkWalletIsConnected = async () => {
        const {ethereum} = window;                                          // Need for conntect with metamask https://docs.metamask.io/guide/ethereum-provider.html#basic-usage
                                                                            // metamask if installed put its hand in each browser page and so if there isn't etherium then metamask is not installed
        if (!ethereum) {
            console.log("Make sure you have Metamask installed!");
            return;
        } else {
            console.log("Wallet exists! We're ready to go!")
        }

        const accounts = await ethereum.request({method: 'eth_accounts'});

        if (accounts.length !== 0) {
            const account = accounts[0];
            setCurrentAccount(account);
        } else {
            console.log("No authorized account found");
        }
    }

    const connectWalletHandler = async () => {
        const {ethereum} = window;

        if (!ethereum) {
            alert("Please install Metamask!");
        }

        try {
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            setCurrentAccount(accounts[0]);
        } catch (err) {
            console.log(err)
        }
    }

    const connectWalletButton = () => {
        return (
            <div>
                <Button variant={"contained"} onClick={connectWalletHandler} startIcon={<MetamaskLogo/>} sx={{}}>
                    <strong>Connect Wallet</strong>
                </Button>
            </div>
        )
    }

    useEffect(() => {
        checkWalletIsConnected();
    }, [])

    let alreadyConnected = <p>You are connected! <br/>Your address is: {currentAccount}</p>
    return (
        <div className='main-app'>
            <h3>Connect to your Metamask wallet</h3>
            <div>
                { currentAccount ? alreadyConnected : connectWalletButton() }
            </div>
        </div>
    )
}

export default WalletConnection;
