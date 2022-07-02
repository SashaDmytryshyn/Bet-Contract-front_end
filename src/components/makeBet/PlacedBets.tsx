import { Token } from "../Main"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


//import { betABI } from '../../chain-info/contracts/BetContract.json'
export interface PlacedBetsProps {
    supportedTokens: Array<Token>
}


export const PlacedBets = ({ supportedTokens }: PlacedBetsProps) => {
    function createData(
        BetSize: number,
        TotalPool: number,
        BetCondition: string,
        ExpectedWin: number,
        TimeLeft: number,
    ) {
        return { BetSize, TotalPool, BetCondition, ExpectedWin, TimeLeft };
    }

    const rows = [
        createData(42, 2345435, "Rand num > 0.5", 85.424, 32),
        createData(62, 34534535, "sneed", 34524, 72),
        createData(52, 6575, "obama wins", 654, 82),
        createData(82, 86795435, "idk", 424, 92),
        createData(40, 98745435, "(￣y▽,￣)╭ ", 90, 10),
    ];


    return (
        <TableContainer component={Paper} style={{ backgroundColor: '#666699' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Bet Size</TableCell>
                        <TableCell align="right">Total Pool</TableCell>
                        <TableCell align="right">Bet Condition</TableCell>
                        <TableCell align="right">Expected Win</TableCell>
                        <TableCell align="right">Time Left</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.BetSize}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.BetSize}
                            </TableCell>
                            <TableCell align="right">{row.TotalPool}</TableCell>
                            <TableCell align="right">{row.BetCondition}</TableCell>
                            <TableCell align="right">{row.ExpectedWin}</TableCell>
                            <TableCell align="right">{row.TimeLeft}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
