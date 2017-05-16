import * as supertest from "supertest";
const request = supertest("http://localhost:8000");

describe("GET /docs", () => {
  it("should return 200 OK", (done) => {
    request.get("/docs")
      .expect(200, done);
  });
});