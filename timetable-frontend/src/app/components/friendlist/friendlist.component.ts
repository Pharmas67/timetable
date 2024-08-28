import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BlockedRelationship, Friendship, User } from '../../interfaces/interfaces';
import { userService } from '../../service/userService';
import { FriendlistDialogComponent } from './friendlist-dialog/friendlist-dialog.component';
import { friendService } from '../../service/friendService';
import { FriendRequestDialogComponent } from './friend-request-dialog/friend-request-dialog.component';
import { BlockDialogComponent } from './block-dialog/block-dialog.component';
import { blockService } from '../../service/blockService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-friendlist',
  standalone: true,
  imports: [CommonModule,FriendlistDialogComponent,FriendRequestDialogComponent,BlockDialogComponent],
  templateUrl: './friendlist.component.html',
  styleUrl: './friendlist.component.css'
})
export class FriendlistComponent implements OnInit{

  constructor(private userService:userService, private friendService:friendService,private blockService:blockService, private router:Router) {}

  userArray: User[] = [];
  friendArray: User[] = [];
  blockArray: BlockedRelationship[] = [];

  currentUser: User | undefined;

  warningMessage: string = '';
  warning: boolean = false;

  searchDialogVisible: Boolean = false;
  fVisible: Boolean = true;
  reqDialogVisible: Boolean = false;
  blockDialogVisible: Boolean = false;

  ngOnInit(): void {
    this.fetchUserList();

    const userString = localStorage.getItem('currentUser');

    this.currentUser = JSON.parse(userString!); 

    const payload = {
      userId: this.currentUser?.id
    }

    this.fetchFriendList(payload);

    this.fetchBlocklist(payload);    

  }

  private fetchUserList() : void{
    this.userService.fetchUserList()
    .then((response) => {
      if(Array.isArray(response) && response.length !== 0){
        response.forEach((item: User) => {
          if(!this.userArray.some(user => user.id === item.id)){
            this.userArray.push(item);
          }
        })
      }
    })
    .catch((error) => {
      console.log(error);
      throw error;
    })
  }

  private fetchFriendList(userObj: Object): void{
    this.friendService.fetchFriendList(userObj)
    .then((response) => {
      if(Array.isArray(response) && response.length !== 0){
        response.forEach((item: Friendship) => {
          if(!this.friendArray.some(user => user.id === item.friendId || user.id === item.userId)){
            this.userArray.forEach((element) => {
              if(element.id === item.friendId || element.id === item.userId){
                this.friendArray.push(element);
              }
            })
          }
        })
      }

      this.friendArray = this.friendArray.filter((item) => item.id !== this.currentUser?.id);
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
  }

  private fetchBlocklist(userObj: Object) {
    this.blockService.fetchBlocklist(userObj)
    .then((response) => {
      if(Array.isArray(response) && response.length !== 0){
        response.forEach((item: BlockedRelationship) => {
          if(!this.blockArray.some((element: BlockedRelationship) => element.blockedId === item.blockedId && element.blockerId === item.blockerId)){
            this.blockArray.push(item);  
          }
        })
      }      
    })
  }
  

  openSearchDialog(){
    this.searchDialogVisible = !this.searchDialogVisible;
  }

  openFriendDialog(){
    this.reqDialogVisible = !this.reqDialogVisible;
  }

  openBlockDialog(){
    this.blockDialogVisible = !this.blockDialogVisible;
  }

  test(id: BinaryData) {
    this.router.navigate(['/viewCalendar'], { queryParams: { viewId: id }});
  }
}
