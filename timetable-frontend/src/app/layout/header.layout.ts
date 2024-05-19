import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule,RouterLink],
    templateUrl: './header.layout.html'
})
export class header implements OnInit {
    constructor(private router: Router) { }

    visible: boolean = false;

    ngOnInit(): void {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                
                const currentUrl = this.router.url;
                const splitUrl = currentUrl.split('?');
                const rootUrl = splitUrl[0];    
                
                this.visible = !(rootUrl === '/' || rootUrl === '/signup' || rootUrl === '/appointmentDialog');
            
            }
          });
    }

    logOut(): void {
        localStorage.removeItem("userToken");
        localStorage.removeItem("validUser");
    }
}
