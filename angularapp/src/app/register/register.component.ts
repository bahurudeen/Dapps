import { Component, OnInit } from "@angular/core";
// web3Service
import { Web3Service } from "../web3.service";

// import FormGroup and FormBuilder
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  form: FormGroup; // form is of type FormGroup
  showSpinner: boolean = false; // this variable is used to show spinner when submit registration
  accounts: string[];
  // inject Web3Service and FormBuilder
  constructor(private web3Service: Web3Service, private fb: FormBuilder) {}

  ngOnInit() {
    // get list of accounts of node
    this.web3Service.getAccounts().then(res => {
      this.form.patchValue({
        address: res[0] // assign active account of MetaMask
      });
    });
    // call createForm
    this.createForm();
  }

  // this function is used to create a from group with initial data value
  createForm() {
    // creates a FormGroup using FormBuilder.group factory method
    this.form = this.fb.group({
      name: "",
      address: "",
      email: "",
      phone: "",
      amount: 0.00002
    });
  }

  // this function is called when submit registration
  onSubmit() {
    //console.log(this.form.value.name);
    // show spinner
    this.showSpinner = true;
    // call contract registration with required parameters
    this.web3Service
      .registration(
        this.form.value.name,
        this.form.value.address,
        this.form.value.phone,
        this.form.value.email,
        this.form.value.amount.toString()
      )
      .then(res => {
        // hide spinner
        this.showSpinner = false;
        // reset the form
        this.form.reset();
      });
  }
}
