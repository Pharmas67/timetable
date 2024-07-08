import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../interfaces/interfaces';
import { userService } from '../../service/userService';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  
  constructor(private router: Router, private userService:userService) {}

  @ViewChild('fileInput') fileInput: any;

  currentUser: User | null = null;

  ngOnInit(): void {
    
    const userString = localStorage.getItem('currentUser');
    
    if(userString !== null){
      this.currentUser = JSON.parse(userString);
    } else {
      this.router.navigate(['/home'], { queryParams: {error:'invalidUser'}})
    }

    this.name = this.currentUser!.username;

    this.email = this.currentUser!.email;

    this.image = this.currentUser?.image;
  }

  name: String = 'John Doe';
  email: String = 'john.doe@example.com';
  password: number | null = null;
  image: String | undefined;
  editingName: boolean = false;
  editingEmail: boolean = false;
  editingPassword: boolean = false;

  warningMessage: string = '';
  warning: boolean = false;

  maxSizeInMB = 5; // Maximum size in MB

  editName(){
    this.router.navigate(['/editProfile'], {queryParams: { detail: "name"}});
  }

  editEmail(){
    this.router.navigate(['/editProfile'], {queryParams: { detail: "email"}});
  }

  editPassword(){
    this.router.navigate(['/editProfile'], {queryParams: { detail: "password"}});
  }

  async openFileInput(){
    this.fileInput.nativeElement.click();
  }

  async handleFileInput(event: any) {
    // Handle file selection here
    const fileList: FileList = event.target.files;
    console.log(fileList);
    
    if (fileList.length > 0) {
      const file: File = fileList[0];
      
      const fileType = file['type'].split('/');
      console.log(fileType);
      

      if(!(fileType[0] === 'image')){
        this.warning = true;
        this.warningMessage = 'Wrong File Type';
        return;
      }

      if((file['size'] / 1024 / 1024) > this.maxSizeInMB){
        this.warning = true;
        this.warningMessage = 'File is too big';
        return;
      }
      
      let formData = new FormData();
      formData.append('userId', String(this.currentUser?.id));
      formData.append('image', file);

      const response = await this.userService.updateUserImage(formData);

      console.log(response);
      

      if(response == 'Something went wrong'){
        this.warning = true;
        this.warningMessage = 'Something went wrong';
        return;
      }

      return;
    }
  }
}
