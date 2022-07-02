import { Token } from "../Main"
import React, { useState } from "react"
import { Box, makeStyles } from "@material-ui/core"
import { TabContext, TabList, TabPanel } from "@material-ui/lab"
import { Tab } from "@material-ui/core"
import { MakeBet } from "./MakeBet"
import { PlacedBets } from "./PlacedBets"


interface BetProps {
    supportedTokens: Array<Token>
}

const useStyles = makeStyles((theme) => ({
    tabContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(4)
    },
    box: {
        backgroundColor: "grey",
        borderRadius: "25px"
    },
    header: {
        color: "grey"
    }
}))

export const Bets = ({ supportedTokens }: BetProps) => {

    const [selectedTabIndex, setTabsIndex] = useState<number>(1)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setTabsIndex(parseInt(newValue))
    }
    const classes = useStyles()
    return (
        <Box>
            <h1 className={classes.header}> Bets </h1>
            <Box className={classes.box}>
                <TabContext value={selectedTabIndex.toString()}>
                    <TabList onChange={handleChange} aria-label="bet form tabs">
                        <Tab label="All Bets" value="1" />
                        <Tab label="Placed Bets" value="2" />
                        <Tab label="Make Bet" value="3" />
                    </TabList>
                    <TabPanel value="1">
                        filler0
                    </TabPanel>
                    <TabPanel value="2">
                        <PlacedBets supportedTokens={supportedTokens} />
                    </TabPanel>
                    <TabPanel value="3">
                        <MakeBet supportedTokens={supportedTokens} />
                    </TabPanel>

                </TabContext>
            </Box>
        </Box >
    )

}
