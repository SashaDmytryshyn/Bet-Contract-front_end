import { Token } from "../Main"
import { useEthers, useTokenBalance, useEtherBalance, useCall } from "@usedapp/core"
import { formatUnits } from "@ethersproject/units"
import { BalanceMsg } from "../../components/BalanceMsg"
import { constants, utils } from "ethers"
import networkMapping from "../../chain-info/deployments/map.json"
import helperConfig from "../../helper-config.json"
import betC from '../../chain-info/contracts/BetContract.json'
import ERC20 from "../../chain-info/contracts/MockERC20.json"
import { Contract } from "@ethersproject/contracts"
import eth from "../../eth.png"
export interface DepositBalanceProps {
    token: Token
}

export const DepositBalance = ({ token }: DepositBalanceProps) => {
    const { image, address, name } = token
    const { account } = useEthers()
    const isChainToken = (address === constants.AddressZero)
    const ethers = require('ethers')
    let provider = ethers.getDefaultProvider()
    const { chainId } = useEthers()
    const networkName = chainId ? helperConfig[chainId] : "dev"
    let stringChainId = String(networkName)
    const betContractAddress = chainId ? networkMapping[stringChainId]["BetContract"][0] : constants.AddressZero
    const Balance: number = isChainToken ? 1 : 0
    const betABI = betC.abi
    const betI = new utils.Interface(betABI)
    const betContract = new Contract(betContractAddress, betI)
    //custom hook for reading from BetContract to find balance of this token
    //this hook gives the userAltBalance (in token amount, not in usd)
    const { value: getDepositAmount } = //, error 
        useCall(
            {
                contract: betContract, // instance of called contract
                method: "userAltBalances", // Method to be called
                args: [address, account], // Method arguments - address to be checked for balance
            }
        ) ?? {};
    //this is to check if the priceFeed is right
    // const { value: checkPriceFeed, error } =
    //     useCall(
    //         {
    //             contract: betContract, // instance of called contract
    //             method: "tokenPriceFeedMapping", // Method to be called
    //             args: [address], // Method arguments - address to be checked for balance
    //         }
    //     ) ?? {};
    //this to check if token value is correct/not zero
    // const { value: getAltUsdValue, error } =
    //     useCall(
    //         {
    //             contract: betContract, // instance of called contract
    //             method: "getTokenValue", // Method to be called
    //             args: [address, false], // Method arguments - address to be checked for balance
    //         }
    //     ) ?? {};


    const { value: getChainDepositAmount } = //, error //allowedTokens
        useCall(
            {
                contract: betContract, // instance of called contract
                method: "userCoreBalances", // Method to be called
                args: [account], // Method arguments - address to be checked for balance
            }
        ) ?? {};

    const { value: getUserUsdValue, error } =
        useCall(
            {
                contract: betContract, // instance of called contract
                method: "getUserSingleTokenValue", // Method to be called
                args: [account, address, isChainToken], // Method arguments - address to be checked for balance
            }
        ) ?? {};
    if (error) {
        return <div> {error.message} </div>
    }
    if (!getDepositAmount) {
        return <div> Loading... </div>
    }
    //console.log(ethers.utils.formatEther(getChainDepositAmount[0]))
    const depositedAmountUSD = ethers.utils.formatEther(getUserUsdValue[0])
    const depositedAmount = isChainToken ? ethers.utils.formatEther(getChainDepositAmount[0]) : ethers.utils.formatEther(getDepositAmount[0])
    return (<div><BalanceMsg
        label={`Your deposited ${name} balance`}
        tokenImgSrc={image}
        amount={depositedAmount} />
        <BalanceMsg
            label={`USD value`}
            tokenImgSrc={eth}
            amount={depositedAmountUSD} /></div>
    )
}
