import getWeb3 from './getWeb3';
import ElectrifyContract from "../contracts/Electrify.json";
// import { rejects } from 'assert';

const Electrify =

  new Promise((resolve, reject) => {
    getWeb3().then(web3 => {
      web3.eth.net.getId().then((networkId) => {
        const contractAddress = ElectrifyContract.networks[networkId].address;
        const contract = new web3.eth.Contract(
          ElectrifyContract.abi,
          contractAddress
        );
        resolve({ contract, web3 });
      })
    })
      .catch(error => {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`
        );
        reject(error);
      })
  });
    
export default Electrify;
