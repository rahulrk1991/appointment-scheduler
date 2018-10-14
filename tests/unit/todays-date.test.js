const { getTodaysDate } = require("../../javascript/index.js");

describe("Todays date", () => {
  it("Checks if todays date is correct", () => {
    expect(getTodaysDate()).toBe(new Date().toString().substring(4, 15))
  });
});
