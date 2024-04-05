const request = require("supertest");
const { app } = require(".."); // Assuming your Express app instance is exported from index.js

describe("User Endpoints", () => {
  it("should register a new user", (done) => {
    request(app)
      .post("/users/register")
      .send({
        username: "testuser",
        email: "test@example.com",
        password: "password",
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it("should login an existing user", (done) => {
    request(app)
      .post("/users/login")
      .send({ email: "test@example.com", password: "password" })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
