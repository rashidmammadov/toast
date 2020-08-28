import { Component } from '@angular/core';

export interface Message {
    header: string;
    subheader?: string;
    message: string;
    config: {
        delay?: number;
        type: string;
    };
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    data: Message;
    types: string[] = ['success', 'warning', 'error'];

    constructor() {}

    add() {
        this.data = {
            header: 'Example Header',
            subheader: Math.floor(Math.random() * 2) ? 'Example Subheader' : null,
            message: ('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
              'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor ' +
              'in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.').slice(0, Math.floor(Math.random() * 334)),
            config: {
                delay: Math.floor(Math.random() * 10),
                type: this.types[Math.floor(Math.random() * 3)]
            }
        };
    }

}
