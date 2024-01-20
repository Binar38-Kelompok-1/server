const supertest = require("supertest");
const app = require("../app");
const utility = require("./utility");

describe("POST /admin/petugas/tambah", () => {
  afterAll(async () => {
    await utility.deleteAdminTest();
  });

  it("berhasil registrasi jika data benar", async () => {
    await utility.deleteAdminTest();
    const jwtToken = await utility.getBintangToken();
    const result = await supertest(app)
      .post("/admin/petugas/tambah")
      .set("Cookie", `authorization=${jwtToken}`)
      .send({
        username: "admin",
        password: "admin",
        nama: "admintest",
        no_telp: "6285444333222",
        alamat: "jalan test no 1234",
      });

    expect(result.status).toBe(201);
    expect(result.body.data).toHaveProperty("id");
    expect(result.body.data.username).toBe("admin");
    expect(result.body.data.nama).toBe("admintest");
    expect(result.body.data.no_telp).toBe("6285444333222");
    expect(result.body.data.alamat).toBe("jalan test no 1234");
  });

  it("gagal registrasi jika username sudah ada", async () => {
    const jwtToken = await utility.getBintangToken();
    const result = await supertest(app)
      .post("/admin/petugas/tambah")
      .set("Cookie", `authorization=${jwtToken}`)
      .send({
        username: "admin",
        password: "admin",
        nama: "admintest",
        no_telp: "6285444333222",
        alamat: "jalan test no 1234",
      });

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
    expect(result.body.error).toBe("username already exist");
  });
});

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

describe("POST /admin/logout", () => {
  beforeEach(async () => {
    await utility.createAdminTest();
  });
  afterEach(async () => {
    await utility.deleteAdminTest();
  });

  it("berhasil logout jika data benar", async () => {
    const jwtToken = await utility.getBintangToken();
    const result = await supertest(app)
      .get("/admin/logout")
      .set("Cookie", `authorization=${jwtToken}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    expect(result.body.token).toBeNull();
  });

  it("gagal logout jika data salah", async () => {
    const jwtToken = "invalidToken";
    const result = await supertest(app)
      .get("/admin/logout")
      .set("Cookie", `authorization=${jwtToken}`);

    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
});
