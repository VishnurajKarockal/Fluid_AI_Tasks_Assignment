const request = require("supertest");
const { app } = require("..");

describe("Task Endpoints", () => {
  let token;

  before(function (done) {
    this.timeout(5000);
    request(app)
      .post("/users/login")
      .send({ email: "test@example.com", password: "password" })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        token = res.body.token;
        done();
      });
  });

  it("should create a new task", (done) => {
    request(app)
      .post("/tasks/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Task",
        description: "This is a test task",
        duedate: "2024-04-10T12:00:00Z",
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it("should get all tasks", (done) => {
    request(app)
      .get("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
