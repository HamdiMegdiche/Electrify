pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;
contract Electrify {

    // address of the person that made the deployment of this contract
    // perhaps the "admin" later
    address public owner;

    struct User {
        uint weight;
        uint nbrTransactions;
    }

    struct Transaction {
        address from;
        address to;
        uint unitPrice; // price of 1KWh in ether
        uint quantity;
        uint timestamp;
    }

    Transaction[] public transactions ;

    constructor() public {
        owner = msg.sender;
    }

    // send an amount of ether from the user that called this function to an address
    function makeTransaction(address payable to, uint quantity) public payable returns(bool) {
     require(msg.sender.balance >= msg.value && msg.value > 0.0001 ether);
     to.transfer(msg.value);
     Transaction memory trans = Transaction({
         from: msg.sender,
         to: to,
         unitPrice: msg.value,
         quantity: quantity,
         timestamp: now});
     transactions.push(trans);

     return true;

    }

    function getTransactions() public view returns(Transaction[]memory){
        return transactions;
    }

}
