# MetaMask-Snap
MetaMask Snaps is a feature of the MetaMask wallet that enables developers to build and integrate custom plugins, known as "snaps," which enhance the wallet's functionality. These snaps allow for personalized features, additional blockchain interactions, and custom user interfaces while maintaining a secure environment. This modular approach encourages innovation within the MetaMask ecosystem, allowing users to tailor their wallet experience to their specific needs.

### MetaMask Flask setup

- Install [MetaMask Flask](https://docs.metamask.io/snaps/get-started/install-flask/)

Note: Install Flask in a new browser profile, or disable any existing installed versions of MetaMask before installing Flask. Running multiple instances of MetaMask in the same browser profile can break dapp interactions.

## How to run MetaMask Snap

### Create a Snap to estimate gas fees

1. Clone the repository:
    ```bash
    https://github.com/jatinmeta/MetaMask-Snap.git
    ```

2. Install dependencies:
    ```bash
    cd MetaMask-Snap/gas-estimation-snap
    yarn install
    ```
3. build and test your Snap
    ```bash
    yarn start
    ```
3. build and test your Snap
    ```bash
    yarn start
    ```

You can now view site in the browser at http://localhost:8000/
Open localhost:8000 in your browser (with MetaMask Flask installed)


### Create a Snap to calculate gas fee percentages

1. Open a new terminal window and navigate to the transaction-insights-snap directory:
    ```bash
    cd MetaMask-Snap/transaction-insights-snap
    ```
2. Install dependencies:
    ```bash
    yarn install
    ```
3. build and test your Snap
    ```bash
    yarn start
    ```
