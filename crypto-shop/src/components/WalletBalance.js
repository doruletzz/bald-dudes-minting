
import { useState } from 'react';
import { ethers } from 'ethers';
import { Button } from 'react-bootstrap';


function WalletBalance() {

    const [balance, setBalance] = useState();

    const getBalance = async () => {
        const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const balance = await provider.getBalance(account);

        setBalance(ethers.utils.formatEther(balance));
    };

    return (
        <div>
            <h4>Your Balance: {balance}</h4>
            <Button onClick={() => getBalance()}> Show Balance </Button>
        </div>

    );

};

export default WalletBalance;