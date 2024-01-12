const supertest = require("supertest");
const app = require("../src/App");

describe("ALL 404 not found", () => {
     it("should return 404 not found", async () => {
          const result = await supertest(app).get("/");

          expect(result.status).toBe(404);
          expect(result.body.error).toContain("endpoint not found!");
     });
});
