import React, {useEffect, useState} from "react";
import {Button} from "@mui/material";
import MetamaskLogo from "../UI/MetamaskLogo.js"

function WalletConnection() {

    const [currentAccount, setCurrentAccount] = useState('');

    const checkWalletIsConnected = async () => {
        const {ethereum} = window;                                          //Serve per connettersi con metamask https://docs.metamask.io/guide/ethereum-provider.html#basic-usage
                                                                            // metamask se installato mette il suo zampino su ogni pagina di chrome e quindi se non c'è etherium allora non è installato
        if (!ethereum) {
            console.log("Make sure you have Metamask installed!");
            return;
        } else {
            console.log("Wallet exists! We're ready to go!")
        }

        const accounts = await ethereum.request({method: 'eth_accounts'});

        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Found an authorized account: ", account);
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
            console.log("Found an account! Address: ", accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (err) {
            console.log(err)
        }

    }

    // const mintNftHandler = async () => {
    //     try {
    //         const {ethereum} = window;
    //
    //         if (ethereum) {
    //             const provider = new ethers.providers.Web3Provider(ethereum);
    //             const signer = provider.getSigner();
    //             const nftContract = new ethers.Contract(contractAddress, abi, signer);
    //
    //             console.log("Initialize payment");
    //             let nftTxn = await nftContract.mintNFTs(1, {value: ethers.utils.parseEther("0.01")});
    //
    //             console.log("Mining... please wait");
    //             await nftTxn.wait();
    //
    //             console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
    //
    //         } else {
    //             console.log("Ethereum object does not exist");
    //         }
    //
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }


    const connectWalletButton = () => {
        return (
            <div>
                <Button variant={"contained"} onClick={connectWalletHandler} startIcon={<MetamaskLogo/>} sx={{}}>
                    <strong>Connect Wallet</strong>
                </Button>
            </div>
        )
    }

    // const mintNftButton = () => {
    //     return (
    //         <button onClick={mintNftHandler} className='cta-button mint-nft-button'>
    //             Mint NFT
    //         </button>
    //     )
    // }

    useEffect(() => {
        checkWalletIsConnected();
    }, [])

    let alreadyConnected = <p>Sei già connesso! <br/>il tuo address è {currentAccount}</p>
    return (
        <div className='main-app'>
            <h4>Connettiti al tuo portafoglio Metamask</h4>
            <div>
                { currentAccount ? alreadyConnected : connectWalletButton() }
            </div>
        </div>
    )
}

export default WalletConnection;
