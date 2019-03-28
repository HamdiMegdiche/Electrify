import getWeb3 from './getWeb3';
import ElectrifyContract from "../contracts/Electrify.json";

const Electrify = async () => {
  try {
    // Get network provider and web3 instance.
    const web3 = await getWeb3();

    // Use web3 to get the user's accounts.
    // const accounts = await web3.eth.getAccounts();


    // Get the contract instance.
    const networkId = await web3.eth.net.getId();
    const contractAddress = ElectrifyContract.networks[networkId].address;

    const contract = new web3.eth.Contract(
      ElectrifyContract.abi,
      contractAddress
    );

    // console.log('Contract instanciated : ');
    // console.log(instance);
    // console.log('Accounts');
    // console.log(accounts);

    return {contract, web3};

  } catch (error) {
    // Catch any errors for any of the above operations.
    alert(
      `Failed to load web3, accounts, or contract. Check console for details.`
    );
    console.error(error);
  }

}

export default Electrify;
