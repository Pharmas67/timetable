import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BlockedRelationship, Friendship, User } from '../../../interfaces/interfaces';
import { userService } from '../../../service/userService';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { blockService } from '../../../service/blockService';

@Component({
  selector: 'app-block-dialog',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './block-dialog.component.html',
  styleUrl: './block-dialog.component.css'
})
export class BlockDialogComponent {
  constructor(private userService:userService, private blockService:blockService) {}

  @Input() visible: Boolean | undefined;
  @Input() blockArray:BlockedRelationship[] = [];

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
      userId: this.currentUser?.id,
    }    

    this.initUserAray = this.userArray;  
    
    if(this.userArray.length > 0){
      await this.fetchBlockedUser();
    }

  }
  
  searchInput = new FormControl('')
  
  private async fetchUserList(){
    try {
      const response = await this.userService.fetchUserList();

      if (Array.isArray(response) && response.length !== 0) {
        response.forEach((item: User) => {
          if(!this.userArray.some((element: User) => item.id === element.id)){
            this.userArray.push(item);
          }
        })

        this.userArray.filter((item) => item.id !== this.currentUser?.id);
      }
      console.log(this.userArray);
      
    } catch(error) {
      console.log(error);
      throw error;
    }
  }

  private async fetchBlockedUser(){
    try {
      this.userArray = this.userArray.filter((user: User) => {
        return this.blockArray.some((relationship: BlockedRelationship) => relationship.blockerId === this.currentUser?.id && relationship.blockedId === user.id);
      });      
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
      this.userArray = this.userArray.filter((item) => item.username == input);
    }
  }
  
  resetSearch(){
    this.userArray = this.initUserAray;
  
    this.searchInput.setValue('');
  }
  
  async unBlockUser(targetId: BinaryData){
    try {
      const payload = {
        userId: this.currentUser?.id,
        blockedId: targetId
      }
  
      const response = await this.blockService.unBlockUser(payload);
  
      console.log(response);
      

      if(response == 'invalidRequest'){
        this.warning = true;
        this.warningMessage = 'Something went wrong, try again later';
        return;
      }
  
      if(response == 'validRequest'){
      
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
