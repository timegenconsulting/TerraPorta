# TerraPorta

### Required:

- [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-beta.32.3 (included in vendor file)
- [Docker](https://www.docker.com/)
- Django Back-End repo: [tp-django-site](https://github.com/GeometricEnergyCorporation/tp-django-site)

## Development server

1. Navigate to your `../terraPorta_UI` local folder after cloning this repo.

2. Run `npm install`.

3. Run `ng serve` for a dev server. Run `npm update` first if "You seem to not be depending on "@angular/core". This is an error." 

4. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

If you have render issues try forcing the host with: "ng serve --host your.local.ip.numeric" and viewing with "your.local.ip.numeric:4200".

## Backend

1. Navigate to project folder `cd tp-django-site`

2. Run service postgres and tp_api `docker-compose up -d postgres tp_api`

3. Open tp_api shell `docker exec -it tp_api /bin/bash`
    * Migrate dtb `python manage.py migrate`
    * Create super user `python manage.py createsuperuser`
    * Exit shell `exit`

7. Run all services `docker-compose up -d`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
