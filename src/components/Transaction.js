import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

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
         <Table >     
          <Thead>
            <Tr>
            <Th>Transaction Hash</Th>
            <Th>Block Number</Th>
            <Th>Time</Th>
            <Th>To</Th>
            <Th>Value</Th>
          </Tr>
          </Thead>     
        <Tbody>
          {transactions.map((tx) => (
            <Tr key={tx.hash}>
              <Td>{tx.hash}</Td>
              <Td>{tx.blockNumber}</Td>
              <Td>{ConvertTimeStamp(tx.timeStamp)}</Td>
              <Td>{SliceAddress(tx.to)}</Td>
              <Td>{ConvertValue(tx.value)} BIT</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

export default Appy;
