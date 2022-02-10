import WalletBalance from "./WalletBalance";
import Install from './Install'
import { ethers } from "ethers";
import { useEffect, useState } from 'react';


import './Home.css';

import { Button, Row, Col, Container, Card } from "react-bootstrap";

import BaldDude from '../artifacts/contracts/BaldDude.sol/BaldDude.json';
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

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
        {/* <WalletBalance /> */}
        <Container>
          <Row lg={8} md={6} sm={4} xs={2} className=" p-5" >

            {Array(totalMinted + 1)
              .fill(0)
              .map((_, i) => (
                <Col key={i} className="mt-4" style={{display: 'flex', justifyContent: 'center'}}>
                  <NFT tokenId={i} getCount={getCount} />
                </Col>
              ))}
          </Row>
        </Container>

      </div>
      :
      <Install />
  );
}


function NFT({ tokenId, getCount }) {
  const contentId = 'QmToLgjMMwb619z2ZMWmrAj4AduP2Sih7nUsSsVZKj7Rzn';
  const metadataURI = `${contentId}/bald_dude${tokenId}.json`;
  const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/bald_dude${tokenId}.png`

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
      value: ethers.utils.parseEther('0.03'),
    });

    await result.wait();
    getMintedStatus();
    getCount();
  };

  async function getURI() {
    const uri = await contract.tokenURI(tokenId);
    alert(uri);
  }


  return (
    <div>
      {/* <div>
        <img width="300px" src={isMinted ? imageURI : 'https://images.unsplash.com/photo-1582556135623-653b87486f21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1106&q=80'} />
      </div> */}
      <Card className="nft-card">
        <Card.Img className="nft-img" variant="top" src={isMinted ? imageURI : 'https://images.unsplash.com/photo-1582556135623-653b87486f21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1106&q=80'} />
        <Card.Body>
          <Row>
            <Col md={8}>
              <Card.Title>{`Bald Dude #${tokenId}`}</Card.Title>
              <Card.Text>
                just another bald dude
              </Card.Text>
            </Col>
            <Col>
              <Card.Text className="nft-price float-end">
                0.3 eth
              </Card.Text>
            </Col>

          </Row>
          {!isMinted ? (
            <Button className="card-btn-primary float-end" variant="primary" align onClick={mintToken}>
              Mint
            </Button>
          ) : (
            <Button className="card-btn-secondary float-end" variant="secondary" onClick={getURI}>
              View
            </Button>
          )}
        </Card.Body>
      </Card>



    </div>

  );
}


export default Home;