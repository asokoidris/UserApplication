const insert_user = require("../function/user-entry");
const { clearUserDataJsonAfterTest } = require("../function/helpers");

const {
  FUNCTION_RESPONSE: {
    USER_ALREADY_REGISTERED,
    INVALID_NAME,
    INVALID_DOB,
    INVALID_EMAIL,
    INVALID_PASSWORD,
  },
} = require("../function/constants");

describe("insert_user function", () => {
  beforeAll(() => {
    clearUserDataJsonAfterTest();
  });

  afterAll(() => {
    clearUserDataJsonAfterTest();
  });

  it("should return true if user is added", async () => {
    const result = await insert_user(
      "asokoIdris",
      "1/1/2000",
      "asoko@kundabox.com",
      "12ABCabc"
    );
    expect(result).toBe(true);
  });

  it("should return USER_ALREADY_REGISTERED if user already exists", async () => {
    const result = await insert_user(
      "asokoIdris",
      "1/1/2000",
      "asokoIdris@kundabox.com",
      "12ABCabc"
    );
    expect(result).toBe(USER_ALREADY_REGISTERED);
  });

  it("should return INVALID_NAME if user_name is not a string", async () => {
    const result = await insert_user(
      123,
      "1/1/2000",
      "asokoIdris@kundabox.com",
      "12ABCabc"
    );
    expect(result).toBe(INVALID_NAME);
  });

  it("should return INVALID_NAME if user_name is less than 5 characters", async () => {
    const result = await insert_user(
      "asok",
      "1/1/2000",
      "asokoIdris@kundabox.com",
      "12ABCabc"
    );
    expect(result).toBe(INVALID_NAME);
  });

  it("should return INVALID_NAME if user_name is more than 16 characters", async () => {
    const result = await insert_user(
      "asokoIdrisAsokoIdrisAsokoIdris",
      "1/1/2000",
      "asokoIdris@kundabox.com",
      "12ABCabc"
    );
    expect(result).toBe(INVALID_NAME);
  });

  it("should return INVALID_DOB if dob is not a date", async () => {
    const result = await insert_user(
      "asokoIdris1",
      "25/10/000000",
      "asokoIdris@kundabox.com",
      "12ABCabc"
    );
    expect(result).toBe(INVALID_DOB);
  });

  it("should return INVALID_DOB if dob is not more 18 years ago", async () => {
    const result = await insert_user(
      "asokoIdris1",
      "1/1/2010",
      "joekundabox.com",
      "12ABCabc"
    );
    expect(result).toBe(INVALID_DOB);
  });

  it("should return INVALID_EMAIL if email is not a string", async () => {
    const result = await insert_user(
      "asokoIdris1",
      "1/1/2000",
      123456789,
      "12ABCabc"
    );
    expect(result).toBe(INVALID_EMAIL);
  });

  it("should return INVALID_EMAIL if email is not a valid email", async () => {
    const result = await insert_user(
      "asokoIdris1",
      "1/1/2000",
      "asokoIdris.com",
      "12ABCabc"
    );
    expect(result).toBe(INVALID_EMAIL);
  });

  it("should return USER_ALREADY_REGISTERED if user email already exists", async () => {
    const result = await insert_user(
      "asokoIdris1",
      "1/1/2000",
      "asoko@kundabox.com",
      "12ABCabc"
    );
    expect(result).toBe(USER_ALREADY_REGISTERED);
  });

  it("should return INVALID_PASSWORD if password is not a string", async () => {
    const result = await insert_user(
      "asokoIdris1",
      "1/1/2000",
      "asoko1@kundabox.com",
      123456789
    );
    expect(result).toBe(INVALID_PASSWORD);
  });

  it("should return INVALID_PASSWORD if password does not contain at least one uppercase letter", async () => {
    const result = await insert_user(
      "asokoIdris1",
      "1/1/2000",
      "asko1@kundabox.com",
      "12abcabc"
    );
    expect(result).toBe(INVALID_PASSWORD);
  });

  test("should return INVALID_PASSWORD if password does not contain at least 2 number", async () => {
    const result = await insert_user(
      "asokoIdris1",
      "1/1/2000",
      "asko1@kundabox.com",
      "AB1Cabcabc"
    );
    expect(result).toBe(INVALID_PASSWORD);
  });

  test("should return INVALID_PASSWORD if password is less than 5 characters", async () => {
    const result = await insert_user(
      "asokoIdris1",
      "1/1/2000",
      "asko1@kundabox.com",
      "!Abc"
    );
    expect(result).toBe(INVALID_PASSWORD);
  });

  test("should return INVALID_PASSWORD if password is more than 16 characters", async () => {
    const result = await insert_user(
      "asokoIdris1",
      "1/1/2000",
      "asko1@kundabox.com",
      "12ABCabcabcabcababcABc"
    );
    expect(result).toBe(INVALID_PASSWORD);
  });
});
