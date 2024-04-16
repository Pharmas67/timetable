import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './layout.header.html'
})
export class header implements OnInit {
    constructor(private location: Location) { }

    visible: boolean = false;

    getCurrentUrl():string {
        return this.location.path();
    }

    ngOnInit(): void {
        const currentUrl = this.getCurrentUrl();
        
        if(!(currentUrl === '' || currentUrl === '/signup')){
            this.visible = true;
        }
    }
}
