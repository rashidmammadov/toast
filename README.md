# Toast

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.6.

## Install

Please, get project from public [GitHub repository](https://github.com/rashidmammadov/toast).
Go to the root directory of the project. Run `npm install` to get dependencies Build **toast** library project with `npm run lib:build` or `ng build toast` command. Run `ng test toast` command to show the result of tests.

## Demo

For run demo project run `ng serve --toast-app` and then just open your browser on [http://localhost:4200/](http://localhost:4200/) to show the result.

## Import to any project

Run `npm run lib:pack` to publish the project as a npm package. Then you can obtain a zipped package in `dist/toast` folder.
Add the package to dependencies list of your project’s package.json and then run npm install:

```
"dependencies": { 
    … 
    "toast": "file:path/to/toast-1.0.0.tgz"
}
```

Add **ToastModule** to the module of project:

```
import { BrowserModule } from '@angular/platform-browser'; 
import { NgModule } from '@angular/core'; 
import { ToastModule } from 'toast'; 
import { AppComponent } from './app.component'; 

@NgModule({ 
    declarations: [ AppComponent ], 
    imports: [ BrowserModule, ToastModule ], 
    providers: [], 
    bootstrap: [AppComponent] 
}) 
export class AppModule { } 
```

## Use
Paste **dg-toast** element to your template file with **message** attribute which is hold data from component:

```
<dg-toast [message]="data" [position]="'bottom-right'" [max]="3"></dg-toast>
```

| Name          | Type         | Necessity | Description |
| ------------- | ------------ | --------- | ----------- |
| message       | Message      | required  | Holds a toast message that will be shown. |
| position      | string       | optional  | The position of toast messages: `top-left`, `top-right`, `bottom-left`, `bottom-right`. Default is `top-right`. |
| max           | number       | optional  | Maximum count of toast messages that will be shown at the same time. Default is `5`. |

Data must be Message format that contains:

```
data = { 
    header: “Test Header”, 
    subheader: “Test Sub Header”, 
    message: “Test Message”,
    config: { 
        delay: 3,
        type: “warning”
    }
}
```

| Name          | Type         | Necessity | Description |
| ------------- | ------------ | --------- | ----------- |
| header        | string       | required  | Represents the header of toast message. |
| subheader     | string       | optional  | Represents the sub header of toast message. |
| message       | string       | required  | Represents the message of toast message. |
| config        | object       | required  | Includes `type` which is must be a `success`, `warning` or `error`. `delay` which is visibility time of toast message default is 5 seconds.  |

Just update the data to add new toast messages. For example, each call of add method will affect to add a new random toast message to show on the screen:

```
add() {
    this.data = {
        header: 'Example Header',
        subheader: Math.floor(Math.random() * 2) ? 'Example Subheader' : null,
        message: ('Lorem ipsum dolor sit amet, consectetur adipiscing eli,
        config: {
            delay: Math.floor(Math.random() * 10),
            type: this.types[Math.floor(Math.random() * 3)]
        }
    };
}
```
