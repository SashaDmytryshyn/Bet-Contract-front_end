import * as React from 'react';
import ReactDOM from 'react-dom';
import { ChainId, DAppProvider, Localhost, Kovan } from '@usedapp/core';
import { Header } from "./components/Header"
import { Container } from "@material-ui/core"
import { Main } from "./components/Main"

const config = {
  readOnlyUrls: {
    [Localhost.chainId]: 'http://127.0.0.1:8545',
    [Kovan.chainId]: 'https://kovan.infura.io/v3/94bdbb7cd321452c9292190b3eab4b50',
  },
  multicallAddresses: {
    '1337': '0x53eCF964dE1F99B51a4897498BaB0f3Ae4838B17', // picked from ganache after launching the multicall contract once
  },
  notifications: {
    expirationPeriod: 1000,
    checkInterval: 1000
  },
}

function App() {
  return (
    <DAppProvider config={config}>
      <Header />
      <Container maxWidth="md">
        <Main />
      </Container>

    </DAppProvider>
  );
}

export default App;
