const fs = require("fs");
const path = require("path");

const dayjs = require("dayjs");

const { FUNCTION_RESPONSE, USER_DATA_FILE_NAME } = require("./constants");

/**

@description - Update user data in the JSON file by adding a new user object with the given user_name, dob, email, and password

@param {string} user_name - Name of the user
@param {string} dob - Date of birth of the user in the format 'YYYY-MM-DD'
@param {string} email - Email address of the user
@param {string} password - Password of the user
@returns {object|boolean} - If successful, returns an object containing message, status and statusCode properties, else returns false
*/

const updateUserDataJson = (user_name, dob, email, password) => {
  const UserModel = getUserModelData();
  try {
    const newUser = {
      user_name,
      dob,
      email,
      password,
    };

    const isFileEmpty = fs.readFileSync(
      path.join(__dirname, USER_DATA_FILE_NAME),
      "utf-8"
    );

    if (isFileEmpty === "") {
      // get the data from the json file

      const data = JSON.stringify([...UserModel, newUser]);
      fs.writeFileSync(
        path.join(__dirname, USER_DATA_FILE_NAME),
        data,
        "utf-8"
      );
    }

    if (isFileEmpty !== "") {
      const data = JSON.stringify([...UserModel, newUser]);
      fs.writeFileSync(
        path.join(__dirname, USER_DATA_FILE_NAME),
        data,
        "utf-8"
      );
    }

    return {
      message: FUNCTION_RESPONSE.USER_ALREADY_REGISTERED,
      status: true,
      statusCode: 200,
    };
  } catch (err) {
    console.error(err);
    return false;
  }
};
/**
@description - Retrieves user data from a JSON file and returns it as an array of user objects
@returns {Array} - Array of user objects
*/

const getUserModelData = () => {
  let UserModel = [];
  try {
    const fileExist = fs.existsSync(path.join(__dirname, USER_DATA_FILE_NAME));

    if (!fileExist) {
      fs.writeFileSync(
        path.join(__dirname, USER_DATA_FILE_NAME),
        JSON.stringify([]),
        "utf-8"
      );

      return UserModel;
    }

    const data = fs.readFileSync(
      path.join(__dirname, USER_DATA_FILE_NAME),
      "utf-8"
    );

    if (data === "") {
      return [];
    }

    UserModel = JSON.parse(data);

    return UserModel;
  } catch (err) {
    console.error(err);
    UserModel = [];
  }
};
/**
@description - Clears user data in the JSON file after testing is complete
*/

const clearUserDataJsonAfterTest = () => {
  const data = JSON.stringify([]);
  fs.writeFileSync(path.join(__dirname, USER_DATA_FILE_NAME), data, "utf-8");
};
/**
@description - Checks if the given user_name is valid
@param {string} user_name - The user name to be checked
@returns {boolean} - Returns true if the user_name is a string of length between 5 and 16 characters, else returns false
*/

const isUserNameValid = (user_name) => {
  return (
    typeof user_name === "string" &&
    user_name.length >= 5 &&
    user_name.length <= 16
  );
};

/**
@description - Checks if the given dob is a valid date
@param {string} dob - The date of birth to be checked
@returns {boolean} - Returns true if the dob is a valid date, else returns false
*/

const isValidDate = (dob) => {
  return dayjs(dob).isValid();
};

/**
 * Checks whether the user is old enough to access a resource based on their date of birth.
 * @param {string} dob - The date of birth of the user to be checked in the format YYYY-MM-DD.
 * @returns {boolean} - Returns true if the user is 18 years or older, else returns false.
 */

const isUserOldEnough = (dob) => {
  const age = dayjs().diff(dob, "year");
  return age > 18;
};

/**
 * Checks whether the given email is valid or not.
 * @param {string} email - The email string to be checked
 * @returns {boolean} - Returns true if the email is valid, else returns false.
 */

const isEmailValid = (email) => {
  return email.includes("@") && email.includes(".");
};

/**
 * Checks whether the given parameter is a string or not.
 * @param {*} email - The parameter to be checked
 * @returns {boolean} - Returns true if the parameter is a string, else returns false.
 */

const isEmailString = (email) => {
  return typeof email === "string";
};

/**
 * Checks whether the given email is unique in the User model or not.
 * @param {object} UserModel - The User model object that represents the user collection in the database.
 * @param {string} email - The email string to be checked
 * @returns {boolean} - Returns true if the email is unique in the user collection, else returns false.
 */

const isEmailUnique = (UserModel, email) => {
  return UserModel.find((user) => user.email === email);
};

/**
 * Checks whether the given password meets the length requirements or not.
 * @param {string} password - The password string to be checked
 * @returns {boolean} - Returns true if the password meets the length requirements, else returns false.
 */

const isPasswordValid = (password) => {
  return password.length >= 5 && password.length <= 16;
};

/**
 * Checks whether the given parameter is a string or not.
 * @param {*} password - The parameter to be checked
 * @returns {boolean} - Returns true if the parameter is a string, else returns false.
 */

const isPasswordString = (password) => {
  return typeof password === "string";
};

/**
 * Checks whether the given password contains an uppercase letter or not.
 * @param {string} password - The password string to be checked
 * @returns {boolean} - Returns true if the password contains an uppercase letter, else returns false.
 */

const isPasswordContainUpperCase = (password) => {
  return /[A-Z]/.test(password);
};

/**
 * Checks whether the given password contains at least two numerical digits or not.
 * @param {string} password - The password string to be checked
 * @returns {boolean} - Returns true if the password contains at least two numerical digits, else returns false.
 */

const isPasswordContainNumber = (password) => {
  return password.match(/\d/g).length >= 2;
};

module.exports = {
  updateUserDataJson,
  getUserModelData,
  isUserNameValid,
  isValidDate,
  isUserOldEnough,
  isEmailValid,
  isEmailString,
  isEmailUnique,
  isPasswordValid,
  isPasswordString,
  isPasswordContainUpperCase,
  isPasswordContainNumber,
  clearUserDataJsonAfterTest,
};
