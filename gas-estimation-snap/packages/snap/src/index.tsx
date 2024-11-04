import type { OnRpcRequestHandler } from '@metamask/snaps-sdk';
import { Box, Text, Bold ,Copyable } from '@metamask/snaps-sdk/jsx';


//____________________________________________________________________________________________________________________
async function getFees() {
  const response = await fetch("https://beaconcha.in/api/v1/execution/gasnow")
  return response.text()
}
//____________________________________________________________________________________________________________________
 

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  switch (request.method) 
  {
    // case 'hello':
    //   return snap.request(
    //   {
    //     method: 'snap_dialog',
    //     params: 
    //     {
    //       type: 'confirmation',
    //       content: (
    //         <Box>
    //           <Text>
    //             Hello, <Bold>{origin}</Bold>!
    //           </Text>
    //           <Text>
    //             This custom confirmation is just for display purposes.
    //           </Text>
    //           <Text>
    //             But you can edit the snap source code to make it do something,
    //             if you want to!
    //           </Text>
    //         </Box>
    //       ),
    //     },
    //   });
    case "hello":
      const fees = await getFees();
      return snap.request({
        method: "snap_dialog",
        params: {
          type: "alert",
          content: (
            <Box>
              <Text>Hello, <Bold>{origin}</Bold>!</Text>
              <Text>Current gas fee estimates:</Text>
              <Copyable value={fees} />
            </Box>
          ),
        }
      });
      default:
      throw new Error('Method not found.');
  }
};
