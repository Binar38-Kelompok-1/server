const supertest = require("supertest");
const app = require("../app");

describe("ALL 404 not found", () => {
  it("should return 404 not found", async () => {
    const result = await supertest(app).get("/random/endpoint");

    expect(result.status).toBe(404);
    expect(result.body.error).toContain("endpoint endpoint not found!");
  });

  it("should not return 404 Page not found", async () => {
    const result = await supertest(app).get("/");

    expect(result.status).not.toBe(404);
    expect(result.status).toBe(200);
    expect(result.body.error).toBeUndefined();
  });
});
