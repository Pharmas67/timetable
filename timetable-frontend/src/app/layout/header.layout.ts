import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { userService } from '../service/userService';
import { User } from '../interfaces/interfaces';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule,RouterLink],
    templateUrl: './header.layout.html'
})
export class header implements OnInit {
    constructor(private router: Router, private userService:userService) { }

    visible: boolean = false;
    isMenuVisible: boolean = true;

    currentUser: User | null = null;

    ngOnInit(): void {
        const jwt = localStorage.getItem('userToken');
        const validUser = localStorage.getItem('validUser');
        
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                
                const currentUrl = this.router.url;
                const splitUrl = currentUrl.split('?');
                const rootUrl = splitUrl[0];    
                
                this.visible = !(rootUrl === '/' || rootUrl === '/signup' || rootUrl === '/appointmentDialog' || rootUrl === '/editProfile');
                
                if(!(rootUrl === '/' || rootUrl === '/signup')){
                    if(!validUser){
                        this.router.navigate(['/'], { queryParams: {error: 'invalidAccess'}})            
                    }  
                }
            }
          });

        this.authenticate(jwt);
    }

    private authenticate(jwt: String | null) {
        this.userService.authenticate(jwt)
        .then((response) => {
            if(response !== 'validToken'){
                this.router.navigate(['/'], { queryParams: {error: 'invalidToken'}}) 
            }
        })
    }

    logOut(): void {
        localStorage.removeItem("userToken");
        localStorage.removeItem("validUser");
        localStorage.removeItem("currentUser");
    }

    toggleMenu(){
        this.isMenuVisible = !this.isMenuVisible;
    }
}
