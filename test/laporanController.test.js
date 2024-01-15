const supertest = require("supertest");
const app = require("../app");
const utility = require("./utility");

describe("GET /laporan", () => {
  beforeEach(async () => {
    await utility.createUserTest();
  });
  afterEach(async () => {
    await utility.deleteUserTest();
  });

  it("berhasil get laporan", async () => {
    const jwtToken = await utility.getUserToken();
    const result = await supertest(app)
      .get("/user/lapor")
      .set("Cookie", `authorization=${jwtToken}`);

    expect(result.status).toBe(200);
    expect(result.body.data.nama).toBe("usertest1234");
  });

  it("gagal get laporan jika token invalid", async () => {
    const jwtToken = "invalidToken";
    const result = await supertest(app)
      .get("/user/lapor")
      .set("Cookie", `authorization=${jwtToken}`);
    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
});

describe("POST /laporan", () => {
  beforeEach(async () => {
    await utility.createUserTest();
  });
  afterEach(async () => {
    await utility.deleteUserTest();
  });

  it("berhasil buat laporan", async () => {
    const jwtToken = await utility.getUserToken();
    const result = await supertest(app)
      .post("/user/lapor")
      .set("Cookie", `authorization=${jwtToken}`)
      .send({
        isi_laporan: "test isi laporan",
      });

    expect(result.status).toBe(201);
    expect(result.body.data.isi_laporan).toBe("test isi laporan");
    expect(result.body.data.status).toBe(false);
    expect(result.body.data).toHaveProperty("id_laporan");
    expect(result.body.data).toHaveProperty("id_masyarakat");
    expect(result.body.data).toHaveProperty("foto");
  });

  it("gagal buat laporan jika token invalid", async () => {
    const jwtToken = "invalidToken";
    const result = await supertest(app)
      .post("/user/lapor")
      .set("Cookie", `authorization=${jwtToken}`)
      .send({
        isi_laporan: "test isi laporan",
      });

    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });

  it("gagal buat laporan jika laporan kosong", async () => {
    const jwtToken = await utility.getUserToken();
    const result = await supertest(app)
      .post("/user/lapor")
      .set("Cookie", `authorization=${jwtToken}`)
      .send({
        isi_laporan: "",
      });

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
    expect(result.body.error).toContain("is not allowed to be empty");
  });
});

describe("GET /riwayat", () => {
  beforeEach(async () => {
    await utility.createUserTest();
    await utility.createLaporan();
  });
  afterEach(async () => {
    await utility.deleteLaporan();
    await utility.deleteUserTest();
  });

  it("berhasil get riwayat laporan", async () => {
    const jwtToken = await utility.getUserToken();
    const result = await supertest(app)
      .get("/user/riwayat")
      .set("Cookie", `authorization=${jwtToken}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    expect(result.body.nama).toBe("usertest1234");
    expect(result.body.data[0].isi_laporan).toBe("test laporan");
    expect(result.body.data[0].status).toBe(false);
    expect(result.body.data[0]).toHaveProperty("id_laporan");
    expect(result.body.data[0]).toHaveProperty("id_masyarakat");
    expect(result.body.data[0]).toHaveProperty("foto");
  });

  it("gagal get riwayat laporan jika token invalid", async () => {
    const jwtToken = "invalidToken";
    const result = await supertest(app)
      .get("/user/riwayat")
      .set("Cookie", `authorization=${jwtToken}`);
    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
});
