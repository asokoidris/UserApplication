const {
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
} = require("./helpers");

const {
  FUNCTION_RESPONSE: {
    USER_ALREADY_REGISTERED,
    INVALID_NAME,
    INVALID_DOB,
    INVALID_EMAIL,
    INVALID_PASSWORD,
    SOMETHING_WENT_WRONG,
  },
} = require("./constants");

/**
 * @description Inserts a new user into the database if the user details are valid.
 * @param {string} user_name - The username of the user to be inserted.
 * @param {string} dob - The date of birth of the user to be inserted in the format YYYY-MM-DD.
 * @param {string} email - The email address of the user to be inserted.
 * @param {string} password - The password of the user to be inserted.
 * @returns {string} - Returns a string indicating the status of the user insertion operation.
 */

const insert_user = async (user_name, dob, email, password) => {
  try {
    const UserModel = await getUserModelData();
    if (!isUserNameValid(user_name)) return INVALID_NAME;

    const isUserExist = UserModel.find((user) => user.user_name === user_name);

    if (isUserExist) return USER_ALREADY_REGISTERED;

    if (!isValidDate(dob) || !isUserOldEnough(dob)) return INVALID_DOB;

    if (!isEmailString(email) || !isEmailValid(email)) return INVALID_EMAIL;

    if (isEmailUnique(UserModel, email)) return USER_ALREADY_REGISTERED;

    if (
      !isPasswordValid(password) ||
      !isPasswordString(password) ||
      !isPasswordContainUpperCase(password) ||
      !isPasswordContainNumber(password)
    )
      return INVALID_PASSWORD;

    const createUser = await updateUserDataJson(
      user_name,
      dob,
      email,
      password
    );

    if (!createUser) return false;

    return true;
  } catch (err) {
    console.error(err);
    return {
      message: SOMETHING_WENT_WRONG,
      status: false,
    };
  }
};

module.exports = insert_user;
