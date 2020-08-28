import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ToastComponent } from './toast.component';
import { first } from 'rxjs/operators';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  let compiled;

  beforeEach(async(() => {
      TestBed.configureTestingModule({
          declarations: [ ToastComponent ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(ToastComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      compiled = fixture.nativeElement;
  });

  it('should create', () => {
      // Assert.
      expect(component).toBeTruthy();
  });

  it('should set default configs', () => {
      // Assert..
      expect(component.max).toBe(5);
      expect(component.position).toBe('top-right');
  });

  it('should set position of toasts', () => {
      // Setup..
      component.position = 'bottom-left';

      // Assert..
      expect(compiled.querySelector('.bl')).toBeDefined();
  });

  describe('Method: ngOnChanges', () => {
    const message = { header: 'test header', subheader: 'test subheader', message: 'test message', config: { delay: 4, type: 'success' } };
    let changes;
    beforeEach(() => {
       changes = { message: { currentValue: message } };
    });

    it('should append passed message to notifications and toasts', async () => {
        // Execute..
        component.ngOnChanges(changes);
        const toasts = await component.toasts.pipe(first()).toPromise();

        // Assert..
        expect(component.notifications.length).toBe(1);
        expect(toasts.length).toBe(1);
        expect(component.notifications[0]).toEqual(message);
        expect(toasts[0]).toEqual(message);
        expect(component.badge).toBe(0);
    });

    it('should reduce toast message after default timeout ended', fakeAsync(async () => {
        // Setup..
        component.notifications = [message, message, message, message, message];

        // Execute..
        component.ngOnChanges(changes);
        const toasts = await component.toasts.pipe(first()).toPromise();

        // Assert..
        expect(component.notifications.length).toBe(6);
        expect(toasts.length).toBe(6);
        tick(message.config.delay * 1000);
        expect(component.notifications.length).toBe(5);
        expect(toasts.length).toBe(5);
    }));

    it('should reduce toast message after custom timeout ended', fakeAsync(async () => {
        // Setup..
        changes.message.currentValue.config.delay = 3;
        component.notifications = [message, message, message, message, message];

        // Execute..
        component.ngOnChanges(changes);
        const toasts = await component.toasts.pipe(first()).toPromise();

        // Assert..
        expect(component.notifications.length).toBe(6);
        expect(toasts.length).toBe(6);
        tick(message.config.delay * 1000);
        expect(component.notifications.length).toBe(5);
        expect(toasts.length).toBe(5);
    }));

    it('should group badge if notifications count is bigger than default max limit', () => {
        // Setup..
        component.notifications = [message, message, message, message, message];

        // Execute..
        component.ngOnChanges(changes);

        // Assert..
        expect(component.badge).toBe(1);
    });

    it('should group badge if notifications count is bigger than custom max limit', () => {
        // Setup..
        component.max = 3;
        component.notifications = [message, message, message, message, message];

        // Execute..
        component.ngOnChanges(changes);

        // Assert..
        expect(component.badge).toBe(3);
    });

    it('should reduce badge count after default timeout ended', fakeAsync(async () => {
        // Setup..
        component.notifications = [message, message, message, message, message, message];

        // Execute..
        component.ngOnChanges(changes);

        // Assert..
        expect(component.badge).toBe(2);
        tick(message.config.delay * 1000);
        expect(component.badge).toBe(1);
    }));

  });

});
