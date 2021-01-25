import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {DataService} from '../app/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test';submitform:FormGroup
  constructor(private service:DataService,private formBuilder: FormBuilder){

 this.submitform = this.formBuilder.group(
       {
            name: ['', [Validators.required]],
            address: ['', [Validators.required]],
            image: ['', [Validators.required]],

            number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13)]],
            email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\..([a-zA-Z0-9-]+)*$/)]],
            fileSource: new FormControl('', [Validators.required])

        },
      );

  }
 get name() 
  {
    return this.submitform.get("name");
  }
get address() 
  {
    return this.submitform.get("address");
  }
  get image() 
  {
    return this.submitform.get("image");
  }
  get number() 
  {
    return this.submitform.get("number");
  }
   get email() 
  {
    return this.submitform.get("email");
  }
public errorMessages = 
  {
    name:
    [
      { type: 'required', message: 'Name is required' }
    ],

    image:
    [
      { type: 'required', message: 'Company name is required' },
    ],
    address:
    [
      { type: 'required', message: 'Company name is required' },
    ],
    number:
    [
      { type: 'required', message: 'Phone number is required' },
      { type: 'minlength', message: 'Phone number cannot be smaller than 10 digits' },
      { type: 'maxlength', message: 'Phone number cannot be greater than 13 digits' }
    ],

    email:
    [
      { type: 'required', message: 'Email Id is required' },
      { type: 'pattern', message: 'Please enter a valid email id' }
    ],

   

   
  };
  savedData(){
    this.service.getData().subscribe(data => console.log(data));

  }

ngOnInit() 
  {
    this.savedData();
  }
onFileChange(event) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.submitform.patchValue({
        fileSource: file
      });
    }
  }




  submit(){
    console.log(this.submitform);
    let data = new FormData();
    data.append(
      'image', this.submitform.get('fileSource').value,
    // 'name':this.submitform.get('name').value,
    // 'email':this.submitform.get('email').value,
    // 'number':this.submitform.get('number').value,
    //   'address':this.submitform.get('address').value
);
data.append('name',this.submitform.get('name').value)
data.append('email',this.submitform.get('email').value)
data.append('number',this.submitform.get('number').value)
data.append('address',this.submitform.get('address').value)

 console.log(data);
 
this.service.submitdata(data).subscribe(data=>{
  console.log(data);
  this.savedData();
  
})
    
  }
}
