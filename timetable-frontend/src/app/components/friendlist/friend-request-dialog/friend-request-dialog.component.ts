import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Friendship, User } from '../../../interfaces/interfaces';
import { userService } from '../../../service/userService';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { friendService } from '../../../service/friendService';
@Component({
  selector: 'app-friend-request-dialog',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './friend-request-dialog.component.html',
  styleUrl: './friend-request-dialog.component.css'
})
export class FriendRequestDialogComponent {
  constructor(private userService:userService, private friendService:friendService) {}

  @Input() visible: Boolean | undefined;
  @Input() friendArray: User[] = [];
  friendReqs: Friendship[] = [];
  
  currentUser: User | undefined;
  
  userArray: User[] = [];
  initUserAray: User[] = [];
  
  warningMessage: string = '';
  warning: boolean = false;
  
  dialogVisible: Boolean = false;
  
  ngOnInit(): void {
    const userString = localStorage.getItem('currentUser');
  
    this.currentUser = JSON.parse(userString!);
    
    this.fetchUserList();
  
    const payload = {
      userId: this.currentUser?.id
    }
      
    this.fetchFriendRequests(payload);    

    this.initUserAray = this.userArray;  
      
  }
  
  searchInput = new FormControl('')
  
  private fetchUserList() : void{
    this.userService.fetchUserList()
    .then((response) => {      
      if (Array.isArray(response) && response.length !== 0) {
        const nonFriendUsers = response.filter((item: User) => 
            !this.friendArray.some((element: User) => item.id === element.id)
        );

        this.userArray = nonFriendUsers.filter((user: User) => user.id !== this.currentUser?.id);
    }
    })
    .catch((error) => {
      console.log(error);
      throw error;
    })
  }
  
  private fetchFriendRequests(userObj: Object): void {
    this.friendService.fetchFriendReqsRev(userObj)
    .then((response) => {            
      if(Array.isArray(response) && response.length !== 0){
        console.log(response);
        
        response.forEach((element: Friendship) => {
          if(!this.friendReqs.some((item : Friendship) => item.userId === element.userId)){
            this.friendReqs.push(element);
          }
        });

        console.log(this.friendReqs);        

        this.userArray = this.userArray.filter((user: User) => {
           return this.friendReqs.some((friendReq : Friendship) => user.id === friendReq.userId);
        });
        
      }
    })
    .catch((error) => {
      console.log(error);
      throw error;
    })
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
}
