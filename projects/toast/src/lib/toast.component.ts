import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

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
    selector: 'dg-toast',
    template: `
      <div class="dg-toast" [ngClass]="{
            'tl': position === 'top-left',
            'tr': position === 'top-right',
            'bl': position === 'bottom-left',
            'br': position === 'bottom-right'
          }">
          <div class="toast fadeInBottom" *ngFor="let toast of notifications.slice(0, max)"
              [ngClass]="{
                  'success': toast.config.type === 'success',
                  'warning': toast.config.type === 'warning',
                  'error': toast.config.type === 'error'
              }">
              <h1>{{toast.header}}</h1>
              <h3 *ngIf="toast.subheader">{{toast.subheader}}</h3>
              <span>{{toast.message.length > 200 ? toast.message.slice(0, 200) + '...' : toast.message}}</span>
          </div>
          <div *ngIf="badge" class="badge">
              <p>Another {{badge}} notification{{badge > 1 ? 's' : ''}}</p>
          </div>
      </div>
    `,
    styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnChanges {
    @Input() position = 'top-right';
    @Input() max = 5;
    @Input() message: Message;
    toasts: Observable<Message[]> = new Observable<Message[]>();
    notifications: Message[] = [];
    badge: number;

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        const message = changes.message.currentValue;
        if (message) {
            this.bindToast(message);
        }
    }

    private bindToast(message: Message) {
        if (message.header && message.message && (message.config && message.config.type)) {
            this.notifications.push(message);
            this.setBadge();
            this.toasts = of(this.notifications);
            const timeout = this.getTimeout(message.config.delay);
            this.toasts.pipe(delay(timeout)).subscribe(() => {
                this.notifications.shift();
                this.setBadge();
            });
        } else {
            throw new Error('The message should be needed format');
        }
    }

    private setBadge() {
        this.badge = (this.notifications.length > this.max) ? (this.notifications.length - this.max) : 0;
    }

    private getTimeout(d: number | undefined) {
        return (d || 5) * 1000;
    }
}
