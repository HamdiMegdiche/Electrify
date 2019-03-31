pragma solidity ^0.5.0;

contract Electrify {

    // address of the person that made the deployment of this contract
    // perhaps the "admin" later
    address public owner;
    uint public transCount = 0;

    struct User {
        uint weight;
        uint nbrTransactions;
    }

    struct Transaction {
        address from;
        address to;
        uint unitPrice; // price of 1KWh in ether
        uint quantity; // quantity in Whats
        uint timestamp;
    }

    Transaction [] public  transactions;

    constructor() public {
        owner = msg.sender;
    }

    event message(string);

    // send an amount of ether from the user that called this function to an address
    function makeTransaction(address payable to, uint quantity) public payable returns(bool) {
     require(msg.sender.balance >= msg.value && msg.value > 0.0001 ether);

     emit message("new trans");


     Transaction memory trans = Transaction({
         from: msg.sender,
         to: to,
         unitPrice: msg.value,
         quantity: quantity,
         timestamp: now});
     transactions.push(trans);
     transCount++;

     to.transfer(msg.value);

     return true;

    }
}
