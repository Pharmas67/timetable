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

  handleFileInput(event: any) {
    // Handle file selection here
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      console.log('Selected file:', file);
      
      if(file['type'] !== 'image/png' && file['type'] !== 'image/jpeg' && file['type'] !== 'image/gif'){
        this.warning = true;
        this.warningMessage = 'Wrong File Type';
        return;
      }

    }
  }
}
