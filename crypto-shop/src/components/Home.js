import WalletBalance from "./WalletBalance";
import Install from './Install'
import { ethers } from "ethers";
import {useEffect, useState} from 'react';

import BaldDude from '../artifacts/contracts/BaldDude.sol/BaldDude.json';

const contractAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
// const contractAddress = '0xcd3b766ccdd6ae721141f452c550ca635964ce71';

const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();

const contract = new ethers.Contract(contractAddress, BaldDude.abi, signer);

function Home() {
    const [totalMinted, setTotalMinted] = useState(0);
    useEffect(() => {
      getCount();
    }, []);
  
    const getCount = async () => {
      const count = await contract.count();
      console.log(parseInt(count));
      setTotalMinted(parseInt(count));
    };
  


    return (
        window.ethereum ?
            <div>
                <WalletBalance /> 
                <NFT tokenId={0} getCount={getCount} />
            </div>
            :
            <Install />
    );
}


function NFT({tokenId, getCount}){
    const contentId = '1337';
    const metadataURI = `${contentId}/${tokenId}.json`;

    const [isMinted, setIsMinted] = useState(false);
    useEffect(() => {
      getMintedStatus();
    }, [isMinted]);
  
    const getMintedStatus = async () => {
      const result = await contract.isTokenOwned(metadataURI);
      console.log(result)
      setIsMinted(result);
    };
  
    const mintToken = async () => {
      const connection = contract.connect(signer);
      const addr = connection.address;
      const result = await contract.payToMint(addr, metadataURI, {
        value: ethers.utils.parseEther('0.05'),
      });
  
      await result.wait();
      getMintedStatus();
      getCount();
    };
  
    async function getURI() {
      const uri = await contract.tokenURI(tokenId);
      alert(uri);
    }


    return(
        <div>
            <h5 className="card-title">ID #{tokenId}</h5>
        {!isMinted ? (
          <button className="btn btn-primary" onClick={mintToken}>
            Mint
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={getURI}>
            Taken! Show URI
          </button>
        )}
        </div>

    );
}


export default Home;