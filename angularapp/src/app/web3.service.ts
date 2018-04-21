import { Injectable } from "@angular/core";
// import Web3 from web3.js
import Web3 from "web3";

// import exhibition contract from exhibition.json file
// which saved when deployed the contract.
import contract from "../../../SmartContracts/build/exhibition.json";

declare let window: any;

@Injectable()
export class Web3Service {
  // declare web3 object
  private web3: Web3;
  // get only interface object from contract
  private interface = (<any>contract).interface;
  // address where contract is deployed.
  private contractDeployedAt = "0x1180e1dD0267e92B28B2c98Ec00CB27E9e10c8d8";
  private exhibition = null;
  private accounts: string[];

  constructor() {
    // call createWeb3
    this.createWeb3();
  }

  // this function is used to get the organizer address
  public async getOrganizer() {
    // it calls getOrganizer method of exhibition contract
    return await this.exhibition.methods.getOrganizer().call();
  }

  // this function is used to transfer the amount to winner
  public async transferAmount(amount) {
    // it calls transferamount method of exhibition contract
    // web3.utils.toWei converts ether value into wei.
    return await this.exhibition.methods.transferAmount().send({
      from: this.accounts[0], // address where amount need to be transfered
      value: this.web3.utils.toWei(amount, "ether") // amount in ether need to be transfered
    });
  }

  // this function is used to choose winner by organizer
  public async pickWinner() {
    // it calls pickWinner method of exhibition contract
    return await this.exhibition.methods.pickWinner().send({
      from: this.accounts[0] // Organizer address
    });
  }

  // this function is used to register the participant
  public async registration(name, address, phone, email, amount) {
    // it calls registration method of exhibition contract with name, phone, email parameters
    // web3.utils.toWei converts ether value into wei.
    return await this.exhibition.methods.registration(name, phone, email).send({
      from: address, // participant address
      value: this.web3.utils.toWei(amount, "ether") //amount in ether need to be send
    });
  }

  // this function is used to the winner name
  public async getWinner() {
    // it calls getWinner method of exhibition contract
    return await this.exhibition.methods.getWinner().call();
  }

  // this function is used to get all the participants address
  public async getParticipants() {
    // it calls getParticipants method of exhibition contract
    return await this.exhibition.methods.getParticipants().call();
  }

  // this function is used to get getIsWinnerSelected
  public async getIsWinnerSelected() {
    // it calls getIsWinnerSelected method of exhibition contract
    return await this.exhibition.methods.getIsWinnerSelected().call();
  }

  // this function is used to get list of accounts of node
  public async getAccounts() {
    return await this.web3.eth.getAccounts();
  }

  // this method is used to create web3 object with MetaMask provider
  // create a exhibition contract instance
  private async createWeb3() {
    // Checking if Web3 has been injected by the browser (MetaMask)
    if (typeof window.web3 !== "undefined") {
      // Use MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);

      //create a exhibition contract instance
      this.exhibition = new this.web3.eth.Contract(
        JSON.parse(this.interface), // contract interface
        this.contractDeployedAt // address where contract is deployed
      );

      this.accounts = await this.web3.eth.getAccounts();
      //console.log(this.accounts);
    } else {
      console.log("No web3? Please trying with MetaMask!");
    }
  }
}
