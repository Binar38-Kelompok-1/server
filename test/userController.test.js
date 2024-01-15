const supertest = require("supertest");
const app = require("../app");
const utility = require("./utility");

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

describe("GET /user/profil", () => {
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

describe("GET /user/profil/edit", () => {
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

describe("POST /user/profil/edit", () => {
  beforeEach(async () => {
    await utility.createUserTest();
  });
  afterEach(async () => {
    await utility.deleteUserTest();
  });

  it("berhasil post user", async () => {
    const jwtToken = await utility.getUserToken();
    const result = await supertest(app)
      .post("/user/profil/edit")
      .set("Cookie", `authorization=${jwtToken}`)
      .send({
        nik: "1111222233334444",
        nama: "usertest1234 update",
        no_telp: "6285444333222",
        alamat: "jalan test no 1234 update",
      });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    expect(result.body.data.nik).toBe("1111222233334444");
    expect(result.body.data.nama).toBe("usertest1234 update");
    expect(result.body.data.no_telp).toBe("6285444333222");
    expect(result.body.data.alamat).toBe("jalan test no 1234 update");
  });

  it("gagal post user jika token invalid", async () => {
    const jwtToken = "invalidToken";
    const result = await supertest(app)
      .post("/user/profil/edit")
      .set("Cookie", `authorization=${jwtToken}`)
      .send({
        nik: "1111222233334444",
        nama: "usertest1234 update",
        no_telp: "6285444333222",
        alamat: "jalan test no 1234 update",
      });

    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });

  it("gagal post user jika token tidak ada", async () => {
    const jwtToken = await utility.getUserToken();
    await utility.deleteUserTest();

    const result = await supertest(app).post("/user/profil/edit").send({
      nik: "1111222233334444",
      nama: "usertest1234 update",
      no_telp: "6285444333222",
      alamat: "jalan test no 1234 update",
    });

    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
});

describe("GET /user/profil/password", () => {
  beforeEach(async () => {
    await utility.createUserTest();
  });
  afterEach(async () => {
    await utility.deleteUserTest();
  });

  it("berhasil get user", async () => {
    const jwtToken = await utility.getUserToken();
    const result = await supertest(app)
      .get("/user/profil/password")
      .set("Cookie", `authorization=${jwtToken}`);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    expect(result.body.data.nama).toBe("usertest1234");
  });

  it("gagal get user jika token invalid", async () => {
    const jwtToken = "invalidToken";
    const result = await supertest(app)
      .get("/user/profil/password")
      .set("Cookie", `authorization=${jwtToken}`);
    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });

  it("gagal get user jika token tidak ada", async () => {
    const jwtToken = await utility.getUserToken();
    await utility.deleteUserTest();

    const result = await supertest(app).get("/user/profil/password");
    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
});
