import type { OnRpcRequestHandler } from '@metamask/snaps-sdk';
import type { OnTransactionHandler, OnTransactionResponse } from '@metamask/snaps-sdk';
import { Box, Text, Bold,Copyable } from '@metamask/snaps-sdk/jsx';



// async function getFees() {
//   const response = await fetch("https://beaconcha.in/api/v1/execution/gasnow")
//   return response.text()
// }


export let onTransaction: OnTransactionHandler = async ({ transaction }) => 
{
  
  let currentGasPrice = await ethereum.request({method: 'eth_gasPrice',}) as string; // Fetching gas price using Ethereum provider

  let transactionGas = parseInt(transaction.gas as string, 16);
  let currentGasPriceInWei = parseInt(currentGasPrice ?? '', 16);

  // Check if the transaction follows EIP-1559 
  let maxFeePerGasInWei = 'maxFeePerGas' in transaction ? parseInt(transaction.maxFeePerGas as string, 16): currentGasPriceInWei; // Fallback for legacy transactions
  let maxPriorityFeePerGasInWei = 'maxPriorityFeePerGas' in transaction ? parseInt(transaction.maxPriorityFeePerGas as string, 16): 0; // Fallback to 0 if not present in legacy transactions
  
  let gasFees = Math.min(maxFeePerGasInWei * transactionGas,(currentGasPriceInWei + maxPriorityFeePerGasInWei) * transactionGas,);
  let transactionValueInWei = parseInt(transaction.value as string, 16);
  let gasFeesPercentage = (gasFees / (gasFees + transactionValueInWei)) * 100;


  /*
  Total Gas Fees = Gas_Used × Gas_Price
  Gas Fees Percentage = (Total_Gas_Fees / Total_Transaction_Cost ) × 100
  */
  

  let response: OnTransactionResponse =        // Return the values in the OnTransactionResponse format
  {
    content: {
      type: 'paragraph',
      children: 
      [
        // {
        //   type: 'text',
        //   value: `Transaction Details =>`,
        // },
        {
          type: 'text',
          // value: `Transaction Amount: ${transactionValueInWei.toString()} Wei (${(transactionValueInWei / 1e18).toFixed(4)} ETH)`,
          value: `Transaction Amount -> ${(transactionValueInWei / 1e18).toFixed(4)} ETH  |`,
        },
        {
          type: 'text',
          value: `Gas Used -> ${transactionGas} (approximately ${((transactionGas * currentGasPriceInWei) / 1e9).toFixed(4)} Gwei) |`,
        },
        {
          type: 'text',
          value: `Gas Price per Ether -> (${(currentGasPriceInWei / 1e9).toFixed(4)} Gwei) |`,
        },
        {
          type: 'text',
          value: `You are paying ->  ${gasFeesPercentage.toFixed(2)}% in gas fees for this transaction `,
        },
      ],
    },
  };

  return response;
};

// Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
export let onRpcRequest: OnRpcRequestHandler = async ({ origin, request }) => {
  switch (request.method) {



  //   case "hello1":
  // const fees = await getFees();
  // return snap.request({
  //   method: "snap_dialog",
  //   params: {
  //     type: "alert",
  //     content: (
  //       <Box>
  //         <Text>Hello, <Bold>{origin}</Bold>!</Text>
  //         <Text>Current gas fee estimates:</Text>
  //         <Copyable value={fees} />
  //       </Box>
  //     ),
  //   }
  // });






    case 'hello': {
      // Call the onTransaction function to calculate gas fees percentage (simulate a transaction)
      let gasFeesResponse = await onTransaction({
        transaction: {
          gas: '0x5208', // Example gas value in hex
          maxFeePerGas: '0x77359400', // Example maxFeePerGas in hex (2 Gwei)
          maxPriorityFeePerGas: '0x59682f00', // Example maxPriorityFeePerGas in hex (1.5 Gwei)
          value: '0x2d9b0e0c9f87000', // Example transaction value in hex (0.01 ETH)
        },
        chainId: 'eip155:1', // Example chainId (Ethereum mainnet)
      });

      // Ensure gasFeesResponse is not null before accessing its content.
      if (gasFeesResponse) {
        // Display the gas fee percentage in a confirmation dialog.
        return snap.request({
          method: 'snap_dialog',
          params: {
            type: 'confirmation',
            content: (
              <Box>
                <Text>Transaction insights Snap</Text>
                <Text>{gasFeesResponse.content.children.map(child => child.value).join('\n')}</Text>
              </Box>
            ),
          },
        });
      } else {
        throw new Error('Failed to calculate gas fees.');
      }
    }
    default:
      throw new Error('Method not found.');
  }
};
