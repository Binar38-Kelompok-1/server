const supertest = require("supertest");
const app = require("../app");
const utility = require("./utility");

describe("POST /login-petugas", () => {
  beforeEach(async () => {
    await utility.createAdminTest();
  });
  afterEach(async () => {
    await utility.deleteAdminTest();
  });
  it("berhasil login jika data benar", async () => {
    const result = await supertest(app).post("/login-petugas").send({
      username: "admin",
      password: "admin",
    });

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("token");
  });

  it("gagal login jika password salah", async () => {
    const result = await supertest(app).post("/login-petugas").send({
      username: "admin",
      password: "salah",
    });

    expect(result.status).toBe(401);
    expect(result.body.error).toBeDefined();
    expect(result.body.error).toBe("username atau Password Salah");
  });

  it("gagal login jika username salah", async () => {
    const result = await supertest(app).post("/login-petugas").send({
      username: "salah",
      password: "admin",
    });

    expect(result.status).toBe(401);
    expect(result.body.error).toBeDefined();
    expect(result.body.error).toBe("username atau Password Salah");
  });
});
