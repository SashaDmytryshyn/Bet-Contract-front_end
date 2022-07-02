import { Token } from "../Main"
import { useEthers, useTokenBalance, useEtherBalance } from "@usedapp/core"
import { formatUnits } from "@ethersproject/units"
import { constants, utils } from "ethers"
import networkMapping from "../../chain-info/deployments/map.json"
import helperConfig from "../../helper-config.json"
import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { green } from "@material-ui/core/colors"
import Button from '@mui/material/Button';

const theme = createTheme({
    spacing: 8,
});

//import { betABI } from '../../chain-info/contracts/BetContract.json'
export interface MakeBetProps {
    supportedTokens: Array<Token>
}


export const MakeBet = ({ supportedTokens }: MakeBetProps) => {

    //console.log(Balance, tokenBalance, chainBalance)
    const [selectedTokenIndex, setToken] = React.useState('');

    //they pick a new token from the list
    const handleChangeToken = (event: SelectChangeEvent) => {
        console.log("changed!")
        setToken(event.target.value as string);
        console.log(supportedTokens[parseInt(event.target.value)]) // selectedTokenIndex is only updated at the end of this const (see&test changeTextField console.log below)
    };

    const [err, setError] = React.useState<boolean>(false)
    const [helpertext, setHelperText] = React.useState<string>("")
    const [amount, setAmount] = React.useState<number | string | Array<number | string>>(0)

    //they write a new number in the amount textfield
    const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = event.target.value === "" ? "" : Number(event.target.value)
        setAmount(newAmount)
        console.log(amount, selectedTokenIndex)
        if (isNaN(+newAmount)) {
            setError(true)
            setHelperText("numbers only")
        }
        else {
            setError(false)
            setHelperText("")
        }
    };

    //they click the button
    const handleDepositSubmit = () => {
        console.log("click")
    }

    return (
        <ThemeProvider theme={theme}>
            <Box display="flex" justifyContent="flex-start" alignItems="center">
                <FormControl sx={{ minWidth: 120 }} >
                    <InputLabel id="demo-simple-select-label">Token</InputLabel>
                    <Select

                        value={selectedTokenIndex}
                        label="Token"
                        onChange={handleChangeToken}
                    >
                        {supportedTokens.map((token, index) => {
                            return (<MenuItem key={index} value={index} >{token.name}</MenuItem>)
                        })}
                    </Select>
                </FormControl>
                <TextField onChange={handleChangeTextField} error={err} helperText={helpertext} id="standard-basic" label="Amount" variant="standard" sx={{ ml: 1 }} />
                <Button sx={{ ml: 1 }} onClick={handleDepositSubmit} variant="contained">Bet</Button >
            </Box>
        </ThemeProvider>
    )
}
