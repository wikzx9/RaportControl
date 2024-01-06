# Raport Control
> The application was created to facilitate the work of field service technicians in the IT sector. It is intended to speed up the reporting of work carried out at the customer's site. And to make it easier for the management to terminate work related to the service procedure.
> Live demo not yet available [_here_](https://www.example.com). <!-- If you have the project hosted somewhere, include the link here. -->

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Usage](#usage)
* [Project Status](#project-status)
<!-- * [License](#license) -->


## General Information
>The project was done as a credit work in the next phases to be completed and presented as a thesis application. The app was originally intended to solve problems with work reporting which was cumbersome, so I came up with the idea for this app.



## Technologies Used
- ReactJS v18.2.43
- NodeJS v19.7.0
- ExpressJS v4.18.2
- TailwindCSS v3.4
- Vite v5.0.8
- MongoDB v6.3.0


## Features
List the ready features here:
- Allows reporting
- Allows editing of reports in CRUD cases
- Allows displaying raports 



## Screenshots
![Example screenshot](./img/screenshot.png)
<!-- If you have screenshots you'd like to share, include them here. -->


## Setup
Dependencies are listed in package.json respectively in backend and frontend.
To install you need to:
- Install all dependencies by going into backend and frontend folders and typing
```
npm i
```
- And create .env file in backend with structure like this 
```
PORT = ""
DBUSERNAME = ""
DBPASSWORD = ""
DBNAME = ""
JWTPRIVATEKEY = ""
```
- Edit connection link to MongoDB in app.js file line 6
- Then you can run it by running two scripts one for backend server 
```
npm run dev
```
- Respectively in frontend run 
```
npm run dev
``` 

## Usage
How does one go about using it?
Provide various use cases and code examples here.

`write-your-code-here`


## Project Status
Project is: _in progress_. currently working on authentication

