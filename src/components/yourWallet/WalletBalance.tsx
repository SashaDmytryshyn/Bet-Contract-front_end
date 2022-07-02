import { Token } from "../Main"
import { useEthers, useTokenBalance, useEtherBalance } from "@usedapp/core"
import { formatUnits } from "@ethersproject/units"
import { BalanceMsg } from "../../components/BalanceMsg"
import { constants, utils } from "ethers"
import networkMapping from "../../chain-info/deployments/map.json"
import helperConfig from "../../helper-config.json"
//import { betABI } from '../../chain-info/contracts/BetContract.json'
export interface WalletBalanceProps {
    token: Token
}

export const WalletBalance = ({ token }: WalletBalanceProps) => {
    const { image, address, name } = token
    const { account } = useEthers()
    const isChainToken = (address === constants.AddressZero)

    const tokenBalance = useTokenBalance(address, account)
    //there is an issue/bug with useEtherBalance, lets just pretend it works for now (doesnt affect the smart contract, only the UI)
    //dont we want to show how much they put in the platform? (i.e. call contract)
    const chainBalance = useEtherBalance(address)
    const ethers = require('ethers')
    let provider = ethers.getDefaultProvider()
    const { chainId, error } = useEthers()
    const networkName = chainId ? helperConfig[chainId] : "dev"
    let stringChainId = String(networkName)
    const betContractAddress = chainId ? networkMapping[stringChainId]["BetContract"][0] : constants.AddressZero
    //const betInterface = new utils.Interface(betABI)
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0
    const formattedChainBalance: number = chainBalance ? parseFloat(formatUnits(chainBalance, 18)) : 0
    const Balance: number = isChainToken ? formattedChainBalance : formattedTokenBalance
    //console.log(Balance, tokenBalance, chainBalance)
    return (<BalanceMsg
        label={`Your wallet ${name} balance`}
        tokenImgSrc={image}
        amount={Balance} />
    )
}
