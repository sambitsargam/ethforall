import React, { useState, useEffect } from 'react';

function Appy() {
  const [transactions, setTransactions] = useState([]);
  const address="0x46E9492E532567339F1bF2aFd679b21391ae6a0f";
  useEffect(() => {

    const fetchTransactions = async () => {
      const response = await fetch(`https://explorer.testnet.mantle.xyz/api?module=account&action=txlist&address=${address}`);
      const data = await response.json();
      console.log(data);
      setTransactions(data.result);
    };

    fetchTransactions();
  }, [address]); // Run every time the address changes

       // Only run once when the component mounts

  return (
    <div>
      <table>
          <tr>
            <th>Transaction Hash</th>
            <th>Block Number</th>
            <th>To</th>
            <th>Value</th>
          </tr>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.hash}>
              <td>{tx.hash}</td>
              <td>{tx.blockNumber}</td>
              <td>{tx.to}</td>
              <td>{tx.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Appy;
