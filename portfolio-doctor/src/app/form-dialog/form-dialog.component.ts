import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import {Router} from '@angular/router'
import { ApiService } from '../api.service';
import { NotificationService } from '../notification.service'; 


@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent implements OnInit {
  isLinear = false;
  formsubmit:boolean = false;
  @ViewChild('stepper') stepper!: MatStepper;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  Products:Array<any>=[
    {name:'Equities portfolio diagnosis', value:'Equities portfolio diagnosis'},
    {name:'Mutual Fund portfolio diagnosis', value:'Mutual Fund portfolio diagnosis'},
    {name:'Bonds portfolio diagnosis', value:'Bonds portfolio diagnosis'},
    {name:'Real Estate portfolio diagnosis', value:'Real Estate portfolio diagnosis'},
    {name:'Insurance portfolio diagnosis', value:'Insurance portfolio diagnosis'},
    {name:'Deposits portfolio diagnosis', value:'Deposits portfolio diagnosis'},
    {name:'Loans portfolio diagnosis', value:'Loans portfolio diagnosis'},
    {name:'Crypto portfolio diagnosis', value:'Crypto portfolio diagnosis'},
    {name:'Gold portfolio diagnosi', value:'Gold portfolio diagnosi'},
    {name:'Portfolio risk assessment', value:'Portfolio risk assessment'},
    {name:'Practical training on trading', value:'Practical training on trading'},
    {name:'Certification courses on trading and investments', value:'Certification courses on trading and investments'},
    {name:'Training on managing finances of your clients', value:'Training on managing finances of your clients'},
    {name:'Learn high return trading strategies', value:'Learn high return trading strategies'},
    {name:'Share your trading strategy with other users', value:'Share your trading strategy with other users'},
    {name:'High rank news about your investment holdings', value:'High rank news about your investment holdings'},
    {name:'Learning the best investment style of your peers', value:'Learning the best investment style of your peers'}
  ]
  Interaction:Array<any>=[
    {name:'On web browser', value:'On web browser'},
    {name:'On mobile app', value:'On mobile app'},
    {name:'Interactive diagnosis reports', value:'Interactive diagnosis reports'},
    {name:'Static diagnosis report as PDF', value:'Static diagnosis report as PDF'}
  ]
  personalizedOptions:Array<any>=[
    {name:'Have a trading account?', value:'Have a trading account'},
    {name:'Trade in equities market?', value:'Trade in equities market'},
    {name:'Invest in equities?', value:'Invest in equities'},
    {name:'Invest in bonds?', value:'Invest in bonds'},
    {name:'Trade bonds?', value:'Trade bonds'},
    {name:'Traded equities in last 3 months?', value:'Traded equities in last 3 months'},
    {name:'Traded bonds in last 3 months?', value:'Traded bonds in last 3 months'},
    {name:'Have a financial advisor?', value:'Have a financial advisor'},
    {name:'You believe forecasting based on future situations is important for investments?', value:'You believe forecasting based on future situations is important for investments'},
    {name:'You believe historical price data is important for investments?', value:'You believe historical price data is important for investments'},
    {name:'You believe fundamentals data is important for investments?', value:'You believe fundamentals data is important for investments'},
    {name:'You believe risk analysis is important for investments?', value:'You believe risk analysis is important for investments'},
    {name:'You follow financial and economic news?', value:'You follow financial and economic news'},
    {name:'You attend training / courses on investments?', value:'You attend training / courses on investments'},
    {name:'You believe women need a specialized trading and investment experience?', value:'You believe women need a specialized trading and investment experience'}
  ]
  constructor(private dialogRef: MatDialogRef<FormDialogComponent>,private _formBuilder: FormBuilder, public router:Router, public api:ApiService,private notifyService : NotificationService) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      products: this._formBuilder.array([]),
      interaction: this._formBuilder.array([]),
      personalizedOptions: this._formBuilder.array([]),
      age: ['', Validators.required],
      gender:['',Validators.required],
      city: ['', Validators.required],
      profession:['', Validators.required],
      name:[''],
      email:['',[Validators.required,Validators.email]],
      number:['',[Validators.pattern('[6-9]\\d{9}')]]
    });

  }
  save() {
    this.formsubmit = true;
    this.api.submitFormData(this.firstFormGroup.value).subscribe((res:any)=>{
      if(res.type == 'success') {
        console.log(res,"response after submitting form")
        this.notifyService.showSuccess("Form submitted successfully !!", "Success")
        this.formsubmit = false;
        this.dialogRef.close(this.firstFormGroup.value);
        this.router.navigate(['/success']);
      }
      else {
        this.notifyService.showError("Something is wrong", "Failure")
        this.formsubmit = false;
      }
    }, err=>{
      console.log(err,"Check for error")
      this.notifyService.showError("Something is wrong", "Error")
      this.formsubmit = false;
    })
  }
 
  close() {
    this.dialogRef.close();
  }
  goForward(stepper: MatStepper){
    stepper.next();
  }
  onProductCheckboxChange(e:any,) {
    const checkArray: FormArray = this.firstFormGroup.get('products') as FormArray;
    if (e.checked) {
      checkArray.push(new FormControl(e.source.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item) => {
        if (item.value == e.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  onInteractionsCheckboxChange(e:any){
    const checkArray: FormArray = this.firstFormGroup.get('interaction') as FormArray;
    if (e.checked) {
      checkArray.push(new FormControl(e.source.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item) => {
        if (item.value == e.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  onpersonalizedOptionsCheckboxChange(e:any){
    const checkArray: FormArray = this.firstFormGroup.get('personalizedOptions') as FormArray;
    if (e.checked) {
      checkArray.push(new FormControl(e.source.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item) => {
        if (item.value == e.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  /* Handle form errors in Angular 8 */
  public errorHandling = (control: string, error: string) => {
    return this.firstFormGroup.controls[control].hasError(error);
  }
  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
      }
  }

}
