Node.js Application for Adding Users
👋 Welcome to our Node.js application for adding users to a database! This application allows you to insert new users into the database using the insert_user() function.

🚀 Getting Started
To start the application, follow these steps:

    Clone this repository to your local machine: git clone https://github.com/asokoidris/userEntryApp
    Change directory into the cloned repository: cd userEntryApp
    Install the dependencies by running : npm install
    Start the application by running : npm start


🧪 Testing
To run the tests, follow these steps:

    npm test


This will run a suite of tests to ensure that the insert_user() function is working as expected. The tests cover the following scenarios:

    Adding a user with proper values (should pass) ✅
    Adding a user that's already inserted into the DB (should fail) ❌
    Adding a user with non-valid user_name (should fail) ❌
    Adding a user with non-valid dob (should fail) ❌
    Adding a user with non-valid email (should fail) ❌
    Adding a user with non-valid password (should fail) ❌


The insert_user() function returns a structure with two properties:
    result - a boolean value that returns true if the user was inserted successfully, and false if it wasn't.
    code - an enum value that indicates the reason why the user couldn't be inserted, if result is false. The possible values for code are:

    USER_ALREADY_REGISTERED 🥳
    INVALID_NAME 😰
    INVALID_DOB 😰
    INVALID_EMAIL 😰
    INVALID_PASSWORD 😭


📝 License

This project uses the following license: MIT License.

# Contributing to userEntryApp
👍🎉 First off, thanks for taking the time to contribute! 🎉👍


# About Author
👤 **Asoko Idris**

I'm a Software Engineer. I love to code in Node.js. I also love to play the guitar and sing. I'm a huge fan of the Beatles and the Rolling Stones. I'm also a huge fan o let's code together! 🤝

