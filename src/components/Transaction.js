import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

function Appy() {
  const [transactions, setTransactions] = useState([]);
  const address="0x46E9492E532567339F1bF2aFd679b21391ae6a0f";
  useEffect(() => {

    const fetchTransactions = async () => {
      const response = await fetch(`https://explorer.testnet.mantle.xyz/api?module=account&action=txlist&address=${address}`);
      const data = await response.json();
      console.log(data);
      setTransactions(data.result.slice(0,5));
    };

    fetchTransactions();
  }, [address]); // Run every time the address changes
  
    function ConvertTimeStamp(unixTimestamp) {
      const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to JavaScript Date object
      return date.toUTCString();
    }

    function SliceAddress(address) {
      return address.slice(0, 6) + "..." + address.slice(-4);
    }

    function ConvertValue(value) {
      return value / 1000000000000000000;
    }


       // Only run once when the component mounts

  return (
    <div>
         <Table striped bordered hover responsive="sm">          <tr>
            <th>Transaction Hash</th>
            <th>Block Number</th>
            <th>Time</th>
            <th>To</th>
            <th>Value</th>
          </tr>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.hash}>
              <td>{tx.hash}</td>
              <td>{tx.blockNumber}</td>
              <td>{ConvertTimeStamp(tx.timeStamp)}</td>
              <td>{SliceAddress(tx.to)}</td>
              <td>{ConvertValue(tx.value)} BIT</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Appy;
