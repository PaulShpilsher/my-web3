import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import logo from './metamask.svg';
import { BigNumber, ethers } from 'ethers';
import { NFTCollectible__factory } from './typechain-types/factories/contracts/NFTCollectible__factory';
import { contractAddress } from './wallet/contractAddress';
import { defaultWallet, IWallet } from './wallet/wallet.interface';
import Box from '@mui/material/Box';
import { AccountCircle } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';


function Demo() {

    const [state, setState] = React.useState<IWallet>(defaultWallet());
    const [nftCollection, setNFTCollection] = React.useState<string[]>([]);


    const connectWallet = async () => {
        try {
          console.log("connect wallet");
          const { ethereum } = window as unknown as { ethereum: any };
    
          if (!ethereum) {
            alert("Please install MetaMask!");
            return;
          }
    
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          console.log("Connected", accounts[0]);
    
          const provider = new ethers.providers.Web3Provider(ethereum);
          const contract = NFTCollectible__factory.connect
                           (contractAddress, provider.getSigner());
          //const contract = new ethers.Contract
          //(contractAddress, NFTCollectible__factory.abi, signer) as NFTCollectible;
          const ownerAddress = await contract.owner();
          const symbol = await contract.symbol();
          const baseTokenURI = await contract.baseTokenURI();
          const balance = await (await contract.balanceOf(accounts[0])).toNumber();
          const ethBalance = ethers.utils.formatEther
                             (await provider.getBalance(accounts[0]));
          const isOwner = (ownerAddress.toLowerCase() === accounts[0].toLowerCase());
          const price = ethers.utils.formatEther(await contract.PRICE());
          setState({
            iconColor: "success",
            connectedWallet: accounts[0],
            contractSymbol: symbol,
            contractAddress: contract.address,
            contractBaseTokenURI: baseTokenURI,
            contractOwnerAddress: ownerAddress,
            contractPrice: `${price} ETH`,
            isOwner: isOwner
          });
    
          console.log("Connected", accounts[0]);
        } catch (error) {
          console.log(error);
        }
    };
    
    const loadNFTCollection = async () => {
        try {
          console.log("load NFT collection");
          let baseURI: string = state.contractBaseTokenURI;
          baseURI = baseURI.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
          setNFTCollection(
            [
              `${baseURI}0001.svg`,
              `${baseURI}0002.svg`,
              `${baseURI}0003.svg`,
              `${baseURI}0004.svg`,
            ]);
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Stack direction="row" spacing={2}>
            <Typography variant="h3" component="div">
              NFT Collection
            </Typography>
            <Avatar alt="logo" src={logo} sx={{ width: 64, height: 64 }} />
          </Stack>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container>
        <Button variant='text' onClick={connectWallet}>Connect Wallet</Button>
        <Stack direction="row" spacing={2} sx={{ margin: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AccountCircle color={state.iconColor} sx={{ mr: 1, my: 0.5 }} />
                <TextField id="wallet_address" label="Connected Account" 
                sx={{ width: 300 }} variant="standard" value={state.connectedWallet}
                inputProps={{ readOnly: true, }}
                />
            </Box>
            <TextField id="contract_symbol" label="Contract Symbol" 
            vari-ant="standard" value={state.contractSymbol}
                inputProps={{ readOnly: true, }}
            />
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <TextField id="contract_address" label="Contract Address" 
                sx={{ width: 400 }} variant="standard" value={state.contractAddress}
                inputProps={{ readOnly: true, }}
                />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <TextField id="contract_baseURI" label="Contract Base Token URI" 
                sx={{ width: 500 }} variant="standard" value={state.contractBaseTokenURI}
                inputProps={{ readOnly: true, }}
                />
            </Box>
        </Stack>
      </Container>
    </React.Fragment>
  );
}

export default Demo;