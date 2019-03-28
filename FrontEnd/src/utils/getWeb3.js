import Web3 from "web3";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
        // Modern dapp browsers...
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          try {
            await window.ethereum.enable();
            console.warn("Web3 detected : Modern dapp browsers");

            resolve(web3);
          } catch (error) {
            reject(error);
          }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
          // Use Mist/MetaMask's provider.
          const web3 = window.web3;
          console.warn("Injected web3 detected : MetaMask");
          resolve(web3);
        }
        // Fallback to localhost; use dev console port by default...
        else {
          const provider = new Web3.providers.HttpProvider(
            "http://127.0.0.1:7545"
          );
          const web3 = new Web3(provider);
          console.error("***** NO web3 instance INJECTED *****, using Local web3 (without MetaMask) !!!");
          resolve(web3);
        }
      }


    );
  });

export default getWeb3;
