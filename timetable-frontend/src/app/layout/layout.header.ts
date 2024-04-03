import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './layout.header.html',
    styleUrls: ['./layout.header.css']
})
export class header implements OnInit {
    constructor(private location: Location) { }

    vHeader: boolean = true;
    
    getCurrentUrl():string {
        return this.location.path();
    }
    ngOnInit(): void {
        const currentUrl = this.getCurrentUrl();
        if(currentUrl === 'http://localhost:4200/' || currentUrl === 'http://localhost:4200/'){
            this.vHeader = false;
        }
    }
}
