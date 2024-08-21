import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Friendship, User } from '../../../interfaces/interfaces';
import { userService } from '../../../service/userService';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { friendService } from '../../../service/friendService';
import { blockService } from '../../../service/blockService';

@Component({
  selector: 'app-friendlist-dialog',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './friendlist-dialog.component.html',
  styleUrl: './friendlist-dialog.component.css'
})
export class FriendlistDialogComponent {

constructor(private userService:userService, private friendService:friendService,private blockService:blockService) {}

@Input() visible: Boolean | undefined;
@Input() friendArray: User[] = [];
friendReqs: Friendship[] = [];

currentUser: User | undefined;

userArray: User[] = [];
initUserAray: User[] = [];

warningMessage: string = '';
warning: boolean = false;

dialogVisible: Boolean = false;

async ngOnInit() {
  const userString = localStorage.getItem('currentUser');

  this.currentUser = JSON.parse(userString!);
  
  await this.fetchUserList();

  const payload = {
    userId: this.currentUser?.id
  }

  this.fetchFriendRequests(payload);

  if(this.userArray.length > 0){
    await this.fetchFriendRequests(payload);
  }

  this.initUserAray = this.userArray;  

  //console.log(this.friendReqs);
  
}

searchInput = new FormControl('')

private async fetchUserList(){
  try {
    const response = await this.userService.fetchUserList();

    if(Array.isArray(response) && response.length !== 0){
      const nonFriendUsers = response.filter((item: User) => {
        return !this.friendArray.some((element : User) => item.id === element.id)
      });

      this.userArray.push(...nonFriendUsers);

      this.userArray = this.userArray.filter((user: User) => user.id !== this.currentUser?.id);
    }
  } catch(error){
    console.log(error);
    throw error;
  }
}

private async fetchFriendRequests(userObj: Object) {
  try {
    const response = await this.friendService.fetchFriendReqs(userObj);
    
    if(Array.isArray(response) && response.length !== 0){
      response.forEach((item: Friendship) => {
        if(!this.friendReqs.some((element: Friendship) => element.friendId === item.friendId)){
          this.friendReqs.push(item);
        }
      });
    }
  } catch(error) {
    console.log(error);
    throw error;
  }
}

private async fetchBlocklist(userObj: Object) {
  try {
    const response = await this.friendService.fetchFriendReqs(userObj);
    
    if(Array.isArray(response) && response.length !== 0){
      response.forEach((item: Friendship) => {
        if(!this.friendReqs.some((element: Friendship) => element.friendId === item.friendId)){
          this.friendReqs.push(item);
        }
      });
    }
  } catch(error) {
    console.log(error);
    throw error;
  }
}
closeDialog(): void {
  this.visible = !this.visible;

  this.warning = false;
  this.warningMessage = '';
}

onInputChange(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  const value = inputElement.value;
  this.searchList(value);
}

searchList(input: String | null): void {
  if(input){
    console.log(input);

    this.userArray = this.userArray.filter((item) => item.username == input);
  }
}

resetSearch(){
  this.userArray = this.initUserAray;

  this.searchInput.setValue('');
}

async addFriend(targetId: BinaryData){
  try {
    const payload = {
      userId: this.currentUser?.id,
      friendId: targetId
    }

    const response = await this.friendService.addFriend(payload);

    if(response == 'invalidRequest'){
      this.warning = true;
      this.warningMessage = 'Something went wrong, try again later';
      return;
    }

    if(response == 'alreadyExists'){
      this.warning = true;
      this.warningMessage = 'You already sent a request';
      return;
    }

    if(response == 'validRequest'){
      const payload = {
        userId: this.currentUser?.id
      }
    
      this.fetchFriendRequests(payload);
      this.visible = !this.visible;
      return;
    }

    return;
  } catch(e) {
    console.log(e);
    throw e;
  }
}

checkForRequest(userId: any): boolean {
  if(this.friendReqs.some((user: Friendship) => user.friendId === userId)){
    return true;
  } else {
    return false;
  }
}

async blockUser(targetId: BinaryData){
  try {
    const payload = {
      userId: this.currentUser?.id,
      blockId: targetId
    }

    const response = await this.(payload);

    if(response == 'Something went wrong'){
      this.warning = true;
      this.warningMessage = 'Something went wrong, try again later';
      return;
    }

    if(response == 'Successfull'){
      const payload = {
        userId: this.currentUser?.id
      }
    
      
      this.visible = !this.visible;
      location.reload();
      return;
    }

    return;
  } catch(e) {
    console.log(e);
    throw e;
  }
}
}
