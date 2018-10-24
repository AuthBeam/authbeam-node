var authbeam = require('..');

describe("A basic test suite", function() {
  it("contains specs for testing the default demo function", function() {
    expect(authbeam()).toEqual("AuthBeam!");
  });
});