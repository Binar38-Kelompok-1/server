const supertest = require("supertest");
const app = require("../app");
const utility = require("./utility");

describe("POST /register", () => {
  afterAll(async () => {
    await utility.deleteUserTest();
  });
  it("berhasil register jika data benar", async () => {
    const result = await supertest(app).post("/register").send({
      nik: "1111222233334444",
      nama: "usertest1234",
      password: "usertest1234",
      no_telp: "6285444333222",
      alamat: "jalan test no 1234",
    });

    expect(result.status).toBe(201);
    expect(result.body.message).toBe("success");
    expect(result.body.data.nik).toBe("1111222233334444");
    expect(result.body.data.nama).toBe("usertest1234");
    expect(result.body.data.no_telp).toBe("6285444333222");
    expect(result.body.data.alamat).toBe("jalan test no 1234");
  });

  it("gagal register jika data nik sudah ada", async () => {
    const result = await supertest(app).post("/register").send({
      nik: "1111222233334444",
      nama: "usertest1234",
      password: "usertest1234",
      no_telp: "6285444333222",
      alamat: "jalan test no 1234",
    });

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
    expect(result.body.error).toContain("NIK sudah terdaftar");
  });

  it("gagal register jika data nik kosong", async () => {
    const result = await supertest(app).post("/register").send({
      nik: "",
      nama: "usertest1234",
      password: "usertest1234",
      no_telp: "6285444333222",
      alamat: "jalan test no 1234",
    });

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
    expect(result.body.error).toContain("is not allowed to be empty");
  });

  it("gagal register jika data nama tidak ada", async () => {
    const result = await supertest(app).post("/register").send({
      nik: "1111222233334444",
      nama: "",
      password: "usertest1234",
      no_telp: "6285444333222",
      alamat: "jalan test no 1234",
    });

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
    expect(result.body.error).toContain("is not allowed to be empty");
  });
});

describe("POST /", () => {
  beforeEach(async () => {
    await utility.createUserTest();
  });
  afterEach(async () => {
    await utility.deleteUserTest();
  });

  it("berhasil login jika data benar", async () => {
    const result = await supertest(app).post("/").send({
      nik: "1111222233334444",
      password: "usertest1234",
    });

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("token");
  });

  it("gagal login jika data salah", async () => {
    const result = await supertest(app).post("/").send({
      nik: "1111222233334444",
      password: "salah",
    });

    expect(result.status).toBe(401);
    expect(result.body.error).toBeDefined();
    expect(result.body.error).toBe("NIK atau Password Salah");
  });

  it("gagal login jika data nik kosong", async () => {
    const result = await supertest(app).post("/").send({
      nik: "",
      password: "salah",
    });

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
    expect(result.body.error).toContain("is not allowed to be empty");
  });

  it("gagal login jika data password kosong", async () => {
    const result = await supertest(app).post("/").send({
      nik: "1111222233334444",
      password: "",
    });

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
    expect(result.body.error).toContain("is not allowed to be empty");
  });
});

describe("Get /user", () => {
  beforeEach(async () => {
    await utility.createUserTest();
  });
  afterEach(async () => {
    await utility.deleteUserTest();
  });

  it("berhasil get user", async () => {
    const jwtToken = await utility.getUserToken();
    const result = await supertest(app)
      .get("/user")
      .set("Cookie", `authorization=${jwtToken}`);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    expect(result.body.data.nik).toBe("1111222233334444");
    expect(result.body.data.nama).toBe("usertest1234");
    expect(result.body.data.no_telp).toBe("6285444333222");
    expect(result.body.data.alamat).toBe("jalan test no 1234");
  });

  it("gagal get user jika token invalid", async () => {
    const jwtToken = "invalidToken";
    const result = await supertest(app)
      .get("/user")
      .set("Cookie", `authorization=${jwtToken}`);
    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });

  it("gagal get user jika token tidak ada", async () => {
    const jwtToken = await utility.getUserToken();
    await utility.deleteUserTest();

    const result = await supertest(app).get("/user");
    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
});
