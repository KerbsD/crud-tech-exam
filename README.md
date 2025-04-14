# Instruction:

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Environments

Node: v16.18.1\
NPM: 8.19.2

## Set Up

### First Step
- While in this repository, click the green button with a lable "code".
- Then copy the URL of this repository - https://github.com/KerbsD/crud-tech-exam.git

### Second Step
- Go to VS Code and open terminal (use Git Bash to access git command)
- In the terminal, type git clone https://github.com/KerbsD/crud-tech-exam.git

### Third Step
- After cloning the project in to your local machine, go to Terminal again.
- and type, "npm install"

### Fourt Step
- After installing all of the dependencies using npm.
- You can then type again in the terminal "npm start" to start development build or the main website.

## Test

- After setting up and started the development build, you will be redirected to the home page of the website.

- On the left side, you can see a sidebar that has navigation. Home and Users (You are currently in the home page).

- Click the Users icon to go to Users page.

- In the users page, you will see the table of users, the table only shows 10 user data at a time. I used pagination to handle displaying of data. Additionally, at the top of the table you can see the Add user button.

- Per row, you can see Id, Avatar, Email, First name, Last name and Action.

- You can only interact on the Email and Action in the table.

- The Add user and Edit action, prompts almost the same modal but the only difference is that in the edit user modal the inputs are pre-filled with user data based on the row data ID.

- To test the inputs on both User and Edit fields, try to provide incomplete details, numbers and random symbols on the name fields (except "'"), and incomplete email.

- Every submit button has a debounce to avoid multiple request on the api.


