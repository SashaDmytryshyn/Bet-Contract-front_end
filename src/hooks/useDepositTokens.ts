import { useEffect, useState } from "react"
import { useEthers, useContractFunction, useSendTransaction } from "@usedapp/core"
import { constants, utils } from "ethers"
import BetContract from "../chain-info/contracts/BetContract.json"
import ERC20 from "../chain-info/contracts/MockERC20.json"
import { Contract } from "@ethersproject/contracts"
import networkMapping from "../chain-info/deployments/map.json"
import helperConfig from "../helper-config.json"

export const useDepositTokens = (tokenAddress: string) => {
    // address
    // abi
    // chainId
    const { chainId } = useEthers()
    const { abi } = BetContract
    const networkName = chainId ? helperConfig[chainId] : "dev"
    let stringChainId = String(networkName)
    const betContractAddress = chainId ? networkMapping[String(stringChainId)]["BetContract"][0] : constants.AddressZero
    const betContractInterface = new utils.Interface(abi)
    const betContract = new Contract(betContractAddress, betContractInterface)
    const erc20ABI = ERC20.abi
    const erc20Interface = new utils.Interface(erc20ABI)
    const erc20Contract = new Contract(tokenAddress, erc20Interface)
    //console.log(tokenAddress)
    // approve
    //if the address is the zero address, do a normal chain-token transfer
    //else do this
    const { sendTransaction: sendChainToken, state: depositChainTokenState } = useSendTransaction({
        transactionName: "Deposit Tokens",
    })

    //const betInterface = new utils.Interface(betABI))
    const { send: approveErc20Send, state: approveAndDepositErc20State } =
        useContractFunction(erc20Contract, "approve", {
            transactionName: "Approve ERC20 transfer",
        })
    const approveAndDeposit = (amount: string) => {
        setAmountToDeposit(amount)
        if (tokenAddress != constants.AddressZero) {
            return approveErc20Send(betContractAddress, amount)
        }
        else {
            return sendChainToken({ to: betContractAddress, value: amount })
        }

    }
    // deposit
    const { send: depositSend, state: depositState } =
        useContractFunction(betContract, "depositTokens", {
            transactionName: "Deposit Tokens",
        })
    const [amountToDeposit, setAmountToDeposit] = useState("0")

    //useEffect
    useEffect(() => {
        if (approveAndDepositErc20State.status === "Success") {
            console.log(tokenAddress)
            depositSend(amountToDeposit, tokenAddress)
        }
    }, [approveAndDepositErc20State, amountToDeposit, tokenAddress])


    const [state, setState] = useState(approveAndDepositErc20State)

    useEffect(() => {
        if (approveAndDepositErc20State.status === "Success") {
            setState(depositState)
        } else {
            setState(approveAndDepositErc20State)
        }
    }, [approveAndDepositErc20State, depositState])

    return { approveAndDeposit, state }
}
