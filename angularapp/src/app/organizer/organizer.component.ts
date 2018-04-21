import { Component, OnInit } from "@angular/core";

// import Web3Service
import { Web3Service } from "../web3.service";

@Component({
  selector: "app-organizer",
  templateUrl: "./organizer.component.html",
  styleUrls: ["./organizer.component.css"]
})
export class OrganizerComponent implements OnInit {
  showSpinner: boolean = false;
  participants: string[] = [];
  showWinner: boolean = false;
  winner: string = "";
  prizeAmount: number = 0.0002;
  // inject web3Service
  constructor(private web3Service: Web3Service) {}

  ngOnInit() {
    // this method get all the participants of exhibition contract
    this.web3Service.getParticipants().then(res => {
      this.participants = res;
    });

    // this method get IsWinnerSelected status
    this.web3Service.getIsWinnerSelected().then(res => {
      this.showWinner = res;
      // IsWinnerSelected is true
      if (this.showWinner) {
        // call getWinner
        this.getWinner();
      }
    });
  }

  // this function is called when pick the winner
  pickWinner() {
    // show spinner
    this.showSpinner = true;
    // call pickwinner contract method
    this.web3Service.pickWinner().then(res => {
      // hide spinner
      this.showSpinner = false;
      // enable winner section
      this.showWinner = true;
      // call getwinner
      this.getWinner();
    });
  }

  // this function is used to get winner name
  getWinner() {
    // call getwinner contract method
    this.web3Service.getWinner().then(res => {
      this.winner = res;
    });
  }

  // this function is called when transfer amount
  transferAmount() {
    // show spinner
    this.showSpinner = true;
    // call transferAmount contract method with required parameter
    this.web3Service.transferAmount(this.prizeAmount.toString()).then(res => {
      // hide spinner
      this.showSpinner = false;
    });
  }
}
