import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule,RouterLink],
    templateUrl: './layout.header.html'
})
export class header implements OnInit {
    constructor(private router: Router) { }

    visible: boolean = false;

    /*getCurrentUrl():string {
        return this.location.path();
    } */

    ngOnInit(): void {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
              const currentUrl = this.router.url;
    
              this.visible = !(currentUrl === '/' || currentUrl === '/signup');
            
            }
          });
    }
}
