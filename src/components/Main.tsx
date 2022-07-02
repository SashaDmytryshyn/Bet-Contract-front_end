/* eslint-disable spaced-comment */
/// <reference types="react-scripts" />
import { useEthers } from "@usedapp/core"
import helperConfig from "../helper-config.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants } from "ethers"
import brownieConfig from "../brownie-config.json"
import eth from "../eth.png"
import dapp from "../dapp.png"
import { makeStyles } from "@material-ui/core"
import { YourWallet } from "./yourWallet"
import { Bets } from "./makeBet"

export type Token = {
    image: string
    address: string
    name: string
}

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.common.white,
        textAlign: "center",
        padding: theme.spacing(4)
    }
}))

export const Main = () => {
    // Show token values from the wallet
    // Get the address of different tokens
    // Get the balance of the users wallet

    // send the brownie-config to our `src` folder
    // send the build folder
    const classes = useStyles()
    const { chainId, error } = useEthers()
    const networkName = chainId ? helperConfig[chainId] : "dev"
    let stringChainId = String(networkName)

    const PlatformTokenAddress = chainId ? networkMapping[stringChainId]["PlatformToken"][0] : constants.AddressZero
    //console.log(PlatformTokenAddress, chainId)

    const supportedTokens: Array<Token> = [

        {
            image: dapp,
            address: PlatformTokenAddress,
            name: "PLAT"
        },
        {
            image: eth,
            address: constants.AddressZero,
            name: "ChainToken"
        }
    ]

    return (<>
        <h2 className={classes.title}>Bet Contract App</h2>
        <YourWallet supportedTokens={supportedTokens} />
        <Bets supportedTokens={supportedTokens} />
    </>)
}
