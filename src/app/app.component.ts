import { Component ,OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 loginForm : FormGroup;
 fullNameLength = 0;
 validationMessages : {
   'email': {
    'required' : 'full name is required',
    'minLength' : '2 chars pls',
    'maxLength' : 'enough pls'
   }
 }

 formErrors : {
   email:''
 }

 constructor(private fbform:FormBuilder){}

 ngOnInit() {
  this.loginForm = this.fbform.group({
      email : ['',[Validators.required,Validators.minLength(2),Validators.maxLength(4)]],
      password:[null,Validators.required],
      age:[null,Validators.required]
  })

  console.log(this.loginForm.get('email').errors);

  this.loginForm.valueChanges.subscribe((val:any) => {
    console.log(JSON.stringify(val));
    this.fullNameLength = val.length;
  })
 }

 loginUser() {
   this.logKeyVal(this.loginForm)
   console.log(this.loginForm.value);
 }

 logKeyVal(group:FormGroup) {
  console.log(Object.keys(group.controls)) 
  Object.keys(group.controls).forEach((key:string) => {
    const abstractControl = group.get(key);
    if(abstractControl instanceof FormGroup) {
      this.logKeyVal(abstractControl)
      abstractControl.disable();
    } else {
      // console.log('Key =' + key + ' value ' + abstractControl.value)
      // abstractControl.disable();
      // abstractControl.markAsDirty();
      if(abstractControl && !abstractControl.valid) {
        const messages = this.validationMessages[key];
        console.log(messages)
      //  console.log(abstractControl.errors)
      }
    }
  })
 }

}


function emailDomain(control:AbstractControl) : {[key:string]:any}  | null {
  const email: string = control.value;
  const domain = email.substring(email.lastIndexOf('@')+1);

  if(email ==='' || domain.toLowerCase() === 'pragimtech.com') {
    return null;
  } else {
    return {'emailDomain':true}
  }

}