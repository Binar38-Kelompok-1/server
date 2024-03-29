const supertest = require("supertest");
const app = require("../app");
const utility = require("./utility");
const bcrypt = require("bcrypt");
const db = require("../db/db");

describe("Get /admin", () => {
  beforeEach(async () => {
    await utility.createAdminTest();
  });
  afterEach(async () => {
    await utility.deleteAdminTest();
  });

  it("berhasil mengambil data admin", async () => {
    const jwtToken = await utility.getAdminToken();
    const result = await supertest(app)
      .get("/admin")
      .set("Cookie", `authorization=${jwtToken}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    expect(result.body.data.username).toBe("admin");
    expect(result.body.data.nama).toBe("admintest");
    expect(result.body.data.no_telp).toBe("6285444333222");
    expect(result.body.data.alamat).toBe("jalan test no 1234");
  });

  it("gagal mengambil data admin jika token salah", async () => {
    const jwtToken = "salah";
    const result = await supertest(app)
      .get("/admin/profil")
      .set("Cookie", `authorization=${jwtToken}`);

    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
});

describe("Get /admin/profil", () => {
  beforeEach(async () => {
    await utility.createAdminTest();
  });
  afterEach(async () => {
    await utility.deleteAdminTest();
  });

  it("berhasil mengambil data admin", async () => {
    const jwtToken = await utility.getAdminToken();
    const result = await supertest(app)
      .get("/admin/profil")
      .set("Cookie", `authorization=${jwtToken}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    expect(result.body.data.username).toBe("admin");
    expect(result.body.data.nama).toBe("admintest");
    expect(result.body.data.no_telp).toBe("6285444333222");
    expect(result.body.data.alamat).toBe("jalan test no 1234");
  });

  it("gagal mengambil data admin jika token salah", async () => {
    const jwtToken = "salah";
    const result = await supertest(app)
      .get("/admin/profil")
      .set("Cookie", `authorization=${jwtToken}`);

    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
});

describe(" GET /admin/profil/edit", () => {
  beforeEach(async () => {
    await utility.createAdminTest();
  });
  afterEach(async () => {
    await utility.deleteAdminTest();
  });

  it("berhasil mengambil data admin", async () => {
    const jwtToken = await utility.getAdminToken();
    const result = await supertest(app)
      .get("/admin/profil/edit")
      .set("Cookie", `authorization=${jwtToken}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    expect(result.body.data.username).toBe("admin");
    expect(result.body.data.nama).toBe("admintest");
    expect(result.body.data.no_telp).toBe("6285444333222");
    expect(result.body.data.alamat).toBe("jalan test no 1234");
  });

  it("gagal mengambil data admin jika token salah", async () => {
    const jwtToken = "salah";
    const result = await supertest(app)
      .get("/admin/profil/edit")
      .set("Cookie", `authorization=${jwtToken}`);

    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
});

describe(" POST /admin/profil/edit", () => {
  beforeEach(async () => {
    await utility.createAdminTest();
  });
  afterEach(async () => {
    await utility.deleteAdminTest();
  });

  it("berhasil edit data admin", async () => {
    const jwtToken = await utility.getAdminToken();
    const result = await supertest(app)
      .post("/admin/profil/edit")
      .set("Cookie", `authorization=${jwtToken}`)
      .send({
        username: "admin",
        password: "admin",
        nama: "admintest update",
        no_telp: "6285444333223",
        alamat: "jalan test no 1234 update",
      });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    expect(result.body.data.username).toBe("admin");
    expect(result.body.data.nama).toBe("admintest update");
    expect(result.body.data.no_telp).toBe("6285444333223");
    expect(result.body.data.alamat).toBe("jalan test no 1234 update");
  });

  it("gagal edit data admin jika token salah", async () => {
    const jwtToken = "salah";
    const result = await supertest(app)
      .post("/admin/profil/edit")
      .set("Cookie", `authorization=${jwtToken}`)
      .send({
        username: "admin",
        password: "admin",
        nama: "admintest update",
        no_telp: "6285444333223",
        alamat: "jalan test no 1234 update",
      });

    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });

  it("gagal edit data admin jika notelepon sudah ada", async () => {
    const jwtToken = await utility.getAdminToken();
    const result = await supertest(app)
      .post("/admin/profil/edit")
      .set("Cookie", `authorization=${jwtToken}`)
      .send({
        username: "admin",
        password: "admin",
        nama: "admintest update",
        no_telp: "6285444333222",
        alamat: "jalan test no 1234 update",
      });

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
    expect(result.body.error).toBe("no_telp already exist");
  });
});

describe(" GET /admin/profil/password", () => {
  beforeEach(async () => {
    await utility.createAdminTest();
  });
  afterEach(async () => {
    await utility.deleteAdminTest();
  });

  it("berhasil mengambil data admin", async () => {
    const jwtToken = await utility.getAdminToken();
    const result = await supertest(app)
      .get("/admin/profil/password")
      .set("Cookie", `authorization=${jwtToken}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    expect(result.body.data.username).toBe("admin");
    expect(result.body.data.nama).toBe("admintest");
    expect(result.body.data.no_telp).toBe("6285444333222");
    expect(result.body.data.alamat).toBe("jalan test no 1234");
  });

  it("gagal mengambil data admin jika token salah", async () => {
    const jwtToken = "salah";
    const result = await supertest(app)
      .get("/admin/profil/password")
      .set("Cookie", `authorization=${jwtToken}`);

    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
});

describe(" POST /admin/profil/password", () => {
  beforeEach(async () => {
    await utility.createAdminTest();
  });
  afterEach(async () => {
    await utility.deleteAdminTest();
  });

  it("berhasil mengambil data admin", async () => {
    const jwtToken = await utility.getAdminToken();
    const result = await supertest(app)
      .post("/admin/profil/password")
      .set("Cookie", `authorization=${jwtToken}`)
      .send({
        password: "adminbaru",
      });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    expect(result.body.data.username).toBe("admin");
    expect(result.body.data.nama).toBe("admintest");
    expect(result.body.data.no_telp).toBe("6285444333222");
    expect(result.body.data.alamat).toBe("jalan test no 1234");
  });

  it("gagal mengambil data admin jika token salah", async () => {
    const jwtToken = "salah";
    const result = await supertest(app)
      .post("/admin/profil/password")
      .set("Cookie", `authorization=${jwtToken}`);

    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
});

describe("POST /admin/profil/password/baru", () => {
  beforeEach(async () => {
    await utility.createAdminTest();
  });
  afterEach(async () => {
    await utility.deleteAdminTest();
  });

  it("berhasil mengganti data password admin", async () => {
    const jwtToken = await utility.getAdminToken();
    const result = await supertest(app)
      .post("/admin/profil/password/baru")
      .set("Cookie", `authorization=${jwtToken}`)
      .send({
        password: "adminbaru",
      });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    expect(result.body.data.username).toBe("admin");
    expect(result.body.data.nama).toBe("admintest");
    expect(result.body.data.no_telp).toBe("6285444333222");
    expect(result.body.data.alamat).toBe("jalan test no 1234");
    const testuser = await utility.getAdminTest();
    expect(await bcrypt.compare("adminbaru", testuser.password)).toBe(true);
  });

  it("gagal mengganti data password admin jika token salah", async () => {
    const jwtToken = "salah";
    const result = await supertest(app)
      .post("/admin/profil/password/baru")
      .set("Cookie", `authorization=${jwtToken}`)
      .send({
        password: "adminbaru",
      });

    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
});

describe("GET /admin/dasbor", () => {
  beforeEach(async () => {
    await utility.createAdminTest();
    await utility.createUserTest();
    await utility.createLaporan();
  });

  afterEach(async () => {
    await utility.deleteLaporan();
    await utility.deleteUserTest();
    await utility.deleteAdminTest();
  });

  it("berhasil mengambil data laporan, sudah dibalas atau belum dibalas", async () => {
    const jwtToken = await utility.getAdminToken();
    const result = await supertest(app)
      .get("/admin/dasbor")
      .set("Cookie", `authorization=${jwtToken}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    expect(result.body.data).toHaveProperty("semua");
    expect(result.body.data).toHaveProperty("belum");
    expect(result.body.data).toHaveProperty("sudah");
    expect(result.body.data).toHaveProperty("findAdmin");
  });

  it("gagal mengambil data laporan jika token salah", async () => {
    const jwtToken = "salah";
    const result = await supertest(app)
      .get("/admin/dasbor")
      .set("Cookie", `authorization=${jwtToken}`);

    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
});

describe("GET /admin/masyarakat", () => {
  beforeEach(async () => {
    await utility.createAdminTest();
    await utility.createUserTest();
    await utility.createLaporan();
  });

  afterEach(async () => {
    await utility.deleteLaporan();
    await utility.deleteUserTest();
    await utility.deleteAdminTest();
  });

  it("berhasil mengambil data masyarakat", async () => {
    const jwtToken = await utility.getAdminToken();
    const result = await supertest(app)
      .get("/admin/masyarakat")
      .set("Cookie", `authorization=${jwtToken}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    expect(result.body.data).toHaveProperty("result");
    expect(result.body.data).toHaveProperty("findAdmin");
  });

  it("gagal mengambil data masyarakat jika token salah", async () => {
    const jwtToken = "salah";
    const result = await supertest(app)
      .get("/admin/masyarakat")
      .set("Cookie", `authorization=${jwtToken}`);
    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
});

describe("GET /masyarakat/:idMasyarakat", () => {
  beforeEach(async () => {
    await utility.createAdminTest();
    await utility.createUserTest();
    await utility.createLaporan();
  });

  afterEach(async () => {
    await utility.deleteLaporan();
    await utility.deleteUserTest();
    await utility.deleteAdminTest();
  });
  it("berhasil mengambil data masyarakat", async () => {
    const jwtToken = await utility.getAdminToken();
    const user = await utility.getTestUser();
    const result = await supertest(app)
      .get(`/admin/masyarakat/${user.id}`)
      .set("Cookie", `authorization=${jwtToken}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    expect(result.body.data).toHaveProperty("result");
    expect(result.body.data).toHaveProperty("findAdmin");
  });

  it("gagal mengambil data masyarakat jika token salah", async () => {
    const jwtToken = "salah";
    const user = await utility.getTestUser();
    const result = await supertest(app)
      .get(`/admin/masyarakat/${user.id}`)
      .set("Cookie", `authorization=${jwtToken}`);
    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
});

describe("GET /masyarakat/:idMasyarakat/edit", () => {
  beforeEach(async () => {
    await utility.createAdminTest();
    await utility.createUserTest();
    await utility.createLaporan();
  });

  afterEach(async () => {
    await utility.deleteLaporan();
    await utility.deleteUserTest();
    await utility.deleteAdminTest();
  });
  it("berhasil mengambil data masyarakat", async () => {
    const jwtToken = await utility.getAdminToken();
    const user = await utility.getTestUser();
    const result = await supertest(app)
      .get(`/admin/masyarakat/${user.id}/edit`)
      .set("Cookie", `authorization=${jwtToken}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    expect(result.body.data).toHaveProperty("result");
    expect(result.body.data).toHaveProperty("findAdmin");
  });

  it("gagal mengambil data masyarakat jika token salah", async () => {
    const jwtToken = "salah";
    const user = await utility.getTestUser();
    const result = await supertest(app)
      .get(`/admin/masyarakat/${user.id}/edit`)
      .set("Cookie", `authorization=${jwtToken}`);
    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
});

describe("POST /masyarakat/:idMasyarakat/edit", () => {
  beforeEach(async () => {
    await utility.createAdminTest();
    await utility.createUserTest();
    await utility.createLaporan();
  });

  afterEach(async () => {
    await utility.deleteLaporan();
    await utility.deleteUserTest();
    await utility.deleteAdminTest();
  });

  it("berhasil edit data masyarakat", async () => {
    const jwtToken = await utility.getAdminToken();
    const user = await utility.getTestUser();
    const result = await supertest(app)
      .post(`/admin/masyarakat/${user.id}/edit`)
      .set("Cookie", `authorization=${jwtToken}`)
      .send({
        nama: "test",
        no_telp: "081234567890",
        alamat: "jalan test no 1234",
      });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    expect(result.body.data).toHaveProperty("result");
    expect(result.body.data).toHaveProperty("findAdmin");
  });

  it("gagal edit data masyarakat jika token salah", async () => {
    const jwtToken = "salah";
    const user = await utility.getTestUser();
    const result = await supertest(app)
      .post(`/admin/masyarakat/${user.id}/edit`)
      .set("Cookie", `authorization=${jwtToken}`)
      .send({
        nik: "1234567890123456",
        nama: "test",
        no_telp: "081234567890",
        alamat: "jalan test no 1234",
      });
    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
  it("gagal edit jika data masyarakat tidak ada", async () => {
    const jwtToken = await utility.getAdminToken();
    const user = await utility.getTestUser();
    const result = await supertest(app)
      .post(`/admin/masyarakat/${user.id}/edit`)
      .set("Cookie", `authorization=${jwtToken}`)
      .send({
        nama: "test",
        no_telp: "",
        alamat: "jalan test no 1234",
      });

    expect(result.status).toBe(400);
    expect(result.error.text).toContain("is not allowed to be empty");
  });
});

describe("DELETE /masyarakat/:idMasyarakat/delete", () => {
  beforeEach(async () => {
    await utility.createAdminTest();
    await utility.createUserTest();
    await utility.createLaporan();
  });
  afterEach(async () => {
    // await utility.deleteLaporan();
    await utility.deleteUserTest();
    await utility.deleteAdminTest();
  });

  it("berhasil delete data masyarakat", async () => {
    const jwtToken = await utility.getAdminToken();
    const user = await utility.getTestUser();
    const result = await supertest(app)
      .get(`/admin/masyarakat/${user.id}/delete`)
      .set("Cookie", `authorization=${jwtToken}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    expect(result.body.data).toHaveProperty("findUser");
    expect(result.body.data).toHaveProperty("findAdmin");
  });

  it("gagal delete data masyarakat jika token salah", async () => {
    const jwtToken = "salah";
    const user = await utility.getTestUser();
    const result = await supertest(app)
      .get(`/admin/masyarakat/${user.id}/delete`)
      .set("Cookie", `authorization=${jwtToken}`);
    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
});

describe("GET /admin/petugas", () => {
  beforeEach(async () => {
    await utility.createAdminTest();
    await utility.createUserTest();
    await utility.createLaporan();
  });
  afterEach(async () => {
    await utility.deleteLaporan();
    await utility.deleteUserTest();
    await utility.deleteAdminTest();
  });

  it("berhasil get data petugas", async () => {
    const jwtToken = await utility.getAdminToken();
    const result = await supertest(app)
      .get("/admin/petugas")
      .set("Cookie", `authorization=${jwtToken}`);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    expect(result.body).toHaveProperty("findAdmin");
  });

  it("gagal get data petugas jika token salah", async () => {
    const jwtToken = "salah";
    const result = await supertest(app)
      .get("/admin/petugas")
      .set("Cookie", `authorization=${jwtToken}`);
    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
});

describe("GET /admin/petugas/tambah", () => {
  beforeEach(async () => {
    await utility.createAdminTest();
    await utility.createUserTest();
    await utility.createLaporan();
  });
  afterEach(async () => {
    await utility.deleteLaporan();
    await utility.deleteUserTest();
    await utility.deleteAdminTest();
  });

  it("berasil get data petugas", async () => {
    const jwtToken = await utility.getAdminToken();
    const result = await supertest(app)
      .get("/admin/petugas/tambah")
      .set("Cookie", `authorization=${jwtToken}`);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    expect(result.body.data.username).toBe("admin");
    expect(result.body.data.nama).toBe("admintest");
    expect(result.body.data.no_telp).toBe("6285444333222");
    expect(result.body.data.alamat).toBe("jalan test no 1234");
  });

  it("gagal get data petugas jika token salah", async () => {
    const jwtToken = "salah";
    const result = await supertest(app)
      .get("/admin/petugas/tambah")
      .set("Cookie", `authorization=${jwtToken}`);
    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
});

describe("POST /admin/petugas/tambah", () => {
  beforeEach(async () => {
    await utility.createAdminTest();
    await utility.createUserTest();
    await utility.createLaporan();
  });
  afterEach(async () => {
    await utility.deleteLaporan();
    await utility.deleteUserTest();
    await utility.deleteAdminTest();
  });

  it("berasil tambah data petugas", async () => {
    const jwtToken = await utility.getAdminToken();
    await db("petugas").where({ username: "petugastest" }).del();

    const inputData = {
      username: "petugastest",
      nama: "petugastest",
      password: "petugastest",
      no_telp: "6285444333222",
      alamat: "jalan test no 1234",
    };
    const result = await supertest(app)
      .post("/admin/petugas/tambah")
      .send(inputData)
      .set("Cookie", `authorization=${jwtToken}`);
    await db("petugas").where({ username: "petugastest" }).del();
    expect(result.status).toBe(201);
    expect(result.body.message).toBe("success");
    expect(result.body.data.username).toBe("petugastest");
    expect(result.body.data.nama).toBe("petugastest");
    expect(result.body.data.no_telp).toBe("6285444333222");
    expect(result.body.data.alamat).toBe("jalan test no 1234");
  });

  it("gagal tambah data petugas jika token salah", async () => {
    const jwtToken = "salah";
    await db("petugas").where({ username: "petugastest" }).del();

    const inputData = {
      username: "petugastest",
      nama: "petugastest",
      password: "petugastest",
      no_telp: "6285444333222",
      alamat: "jalan test no 1234",
    };
    const result = await supertest(app)
      .post("/admin/petugas/tambah")
      .send(inputData)
      .set("Cookie", `authorization=${jwtToken}`);
    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
});

describe("GET /admin/petugas/:idPetugas", () => {
  beforeEach(async () => {
    await utility.createAdminTest();
    await utility.createUserTest();
    await utility.createLaporan();
  });
  afterEach(async () => {
    await utility.deleteLaporan();
    await utility.deleteUserTest();
    await utility.deleteAdminTest();
  });

  it("berasil get data petugas", async () => {
    const jwtToken = await utility.getAdminToken();
    const petugas = await utility.getAdminTest();
    const result = await supertest(app)
      .get(`/admin/petugas/${petugas.id}`)
      .set("Cookie", `authorization=${jwtToken}`);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    expect(result.body.data.username).toBe("admin");
    expect(result.body.data.nama).toBe("admintest");
    expect(result.body.data.no_telp).toBe("6285444333222");
    expect(result.body.data.alamat).toBe("jalan test no 1234");
  });

  it("gagal get data petugas jika token salah", async () => {
    const jwtToken = "salah";
    const result = await supertest(app)
      .get("/admin/petugas/1")
      .set("Cookie", `authorization=${jwtToken}`);
    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
});

describe("GET /admin/laporan", () => {
  beforeEach(async () => {
    await utility.createAdminTest();
    await utility.createUserTest();
    await utility.createLaporan();
  });
  afterEach(async () => {
    await utility.deleteLaporan();
    await utility.deleteUserTest();
    await utility.deleteAdminTest();
  });

  it("berasil get data laporan", async () => {
    const jwtToken = await utility.getAdminToken();
    const result = await supertest(app)
      .get("/admin/laporan")
      .set("Cookie", `authorization=${jwtToken}`);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    expect(result.body).toHaveProperty("laporan");
    expect(result.body).toHaveProperty("data");
  });

  it("gagal get data laporan jika token salah", async () => {
    const jwtToken = "salah";
    const result = await supertest(app)
      .get("/admin/laporan")
      .set("Cookie", `authorization=${jwtToken}`);
    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
});

describe("GET /admin/laporan/:idLap", () => {
  beforeEach(async () => {
    await utility.createAdminTest();
    await utility.createUserTest();
    await utility.createLaporan();
  });
  afterEach(async () => {
    await utility.deleteLaporan();
    await utility.deleteUserTest();
    await utility.deleteAdminTest();
  });

  it("berasil get data laporan", async () => {
    const jwtToken = await utility.getAdminToken();
    const laporan = await utility.getLaporan();
    const result = await supertest(app)
      .get(`/admin/laporan/${laporan.id_laporan}`)
      .set("Cookie", `authorization=${jwtToken}`);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    expect(result.body).toHaveProperty("laporan");
    expect(result.body.data).toHaveProperty("user");
    expect(result.body.data).toHaveProperty("admin");
  });

  it("gagal get data laporan jika token salah", async () => {
    const jwtToken = "salah";
    const result = await supertest(app)
      .get("/admin/laporan/1")
      .set("Cookie", `authorization=${jwtToken}`);
    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
});

describe("POST /admin/laporan/:idLap", () => {
  beforeEach(async () => {
    await utility.createAdminTest();
    await utility.createUserTest();
    await utility.createLaporan();
  });
  afterEach(async () => {
    await utility.deleteBalasan();
    await utility.deleteLaporan();
    await utility.deleteUserTest();
    await utility.deleteAdminTest();
  });

  it("berasil buat data laporan", async () => {
    const jwtToken = await utility.getAdminToken();
    const laporan = await utility.getLaporan();
    const result = await supertest(app)
      .post(`/admin/laporan/${laporan.id_laporan}`)
      .set("Cookie", `authorization=${jwtToken}`)
      .send({
        isi_balasan: "test balasan",
      });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    expect(result.body).toHaveProperty("balas");
    expect(result.body).toHaveProperty("laporan");
  });

  it("gagal buat data laporan jika token salah", async () => {
    const jwtToken = "salah";
    const result = await supertest(app)
      .post("/admin/laporan/1")
      .set("Cookie", `authorization=${jwtToken}`)
      .send({
        isi_balasan: "test balasan",
      });
    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
});

describe("GET /admin/laporan/:idLap/delete", () => {
  beforeEach(async () => {
    await utility.createAdminTest();
    await utility.createUserTest();
    await utility.createLaporan();
  });
  afterEach(async () => {
    await utility.deleteLaporan();
    await utility.deleteUserTest();
    await utility.deleteAdminTest();
  });

  it("berasil hapus data laporan", async () => {
    const jwtToken = await utility.getAdminToken();
    const laporan = await utility.getLaporan();
    const result = await supertest(app)
      .get(`/admin/laporan/${laporan.id_laporan}/delete`)
      .set("Cookie", `authorization=${jwtToken}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    expect(result.body).toHaveProperty("data");
  });

  it("gagal hapus data laporan jika token salah", async () => {
    const jwtToken = "salah";
    const result = await supertest(app)
      .get("/admin/laporan/1/delete")
      .set("Cookie", `authorization=${jwtToken}`);
    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
});

describe("POST /admin/selesai", () => {
  beforeEach(async () => {
    await utility.createAdminTest();
    await utility.createUserTest();
    await utility.createLaporan();
    await utility.createBalasan();
  });
  afterEach(async () => {
    await utility.deleteBalasan();
    await utility.deleteLaporan();
    await utility.deleteUserTest();
    await utility.deleteAdminTest();
  });

  it("berasil selesaikan laporan", async () => {
    const jwtToken = await utility.getAdminToken();
    const result = await supertest(app)
      .get(`/admin/selesai`)
      .set("Cookie", `authorization=${jwtToken}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    expect(result.body).toHaveProperty("data");
  });

  it("gagal selesaikan laporan jika token salah", async () => {
    const jwtToken = "salah";
    const result = await supertest(app)
      .get("/admin/selesai")
      .set("Cookie", `authorization=${jwtToken}`);
    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
});

describe("GET /admin/selesai/:idLap", () => {
  beforeEach(async () => {
    await utility.createAdminTest();
    await utility.createUserTest();
    await utility.createLaporan();
    await utility.createBalasan();
  });
  afterEach(async () => {
    await utility.deleteBalasan();
    await utility.deleteLaporan();
    await utility.deleteUserTest();
    await utility.deleteAdminTest();
  });

  it("berasil selesaikan laporan", async () => {
    const jwtToken = await utility.getAdminToken();
    const laporan = await utility.getLaporan();
    const result = await supertest(app)
      .get(`/admin/selesai/${laporan.id_laporan}`)
      .set("Cookie", `authorization=${jwtToken}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    expect(result.body).toHaveProperty("dataLap");
    expect(result.body).toHaveProperty("dataUser");
    expect(result.body).toHaveProperty("dataBalas");
    expect(result.body).toHaveProperty("dataAdmin");
  });

  it("gagal selesaikan laporan jika token salah", async () => {
    const jwtToken = "salah";
    const result = await supertest(app)
      .get("/admin/selesai/1")
      .set("Cookie", `authorization=${jwtToken}`);
    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
});

describe("GET /admin/riwayat", () => {
  beforeEach(async () => {
    await utility.createAdminTest();
    await utility.createUserTest();
    await utility.createLaporan();
    await utility.createBalasan();
  });
  afterEach(async () => {
    await utility.deleteBalasan();
    await utility.deleteLaporan();
    await utility.deleteUserTest();
    await utility.deleteAdminTest();
  });

  it("berasil selesaikan laporan", async () => {
    const jwtToken = await utility.getAdminToken();
    const result = await supertest(app)
      .get(`/admin/riwayat`)
      .set("Cookie", `authorization=${jwtToken}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    expect(result.body).toHaveProperty("balasan");
    expect(result.body).toHaveProperty("nama");
  });

  it("gagal selesaikan laporan jika token salah", async () => {
    const jwtToken = "salah";
    const result = await supertest(app)
      .get("/admin/riwayat")
      .set("Cookie", `authorization=${jwtToken}`);
    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
});

describe("GET /admin/riwayat/:idBalasan", () => {
  beforeEach(async () => {
    await utility.createAdminTest();
    await utility.createUserTest();
    await utility.createLaporan();
    await utility.createBalasan();
  });
  afterEach(async () => {
    await utility.deleteBalasan();
    await utility.deleteLaporan();
    await utility.deleteUserTest();
    await utility.deleteAdminTest();
  });

  it("berasil selesaikan laporan", async () => {
    const jwtToken = await utility.getAdminToken();
    const balasan = await utility.getBalasan();
    const result = await supertest(app)
      .get(`/admin/riwayat/${balasan.id_balasan}`)
      .set("Cookie", `authorization=${jwtToken}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    expect(result.body).toHaveProperty("balasan");
    expect(result.body).toHaveProperty("nama");
  });

  it("gagal selesaikan laporan jika token salah", async () => {
    const jwtToken = "salah";
    const result = await supertest(app)
      .get("/admin/riwayat/1")
      .set("Cookie", `authorization=${jwtToken}`);
    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
});

describe("GET /admin/logout", () => {
  beforeEach(async () => {
    await utility.createAdminTest();
  });
  afterEach(async () => {
    await utility.deleteAdminTest();
  });

  it("berasil logout", async () => {
    const jwtToken = await utility.getAdminToken();
    const result = await supertest(app)
      .get("/admin/logout")
      .set("Cookie", `authorization=${jwtToken}`);
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
    expect(result.body).toHaveProperty("token");
    expect(result.body.token).toBe(null);
  });

  it("gagal logout jika token salah", async () => {
    const jwtToken = "salah";
    const result = await supertest(app)
      .get("/admin/logout")
      .set("Cookie", `authorization=${jwtToken}`);
    expect(result.status).toBe(401);
    expect(result.error).toBeDefined();
    expect(result.error.text).toBe("Unauthorized");
  });
});

describe("GET /login-petugas", () => {
  it("berasil login petugas", async () => {
    const result = await supertest(app).get("/login-petugas");
    expect(result.status).toBe(200);
    expect(result.body.message).toBe("success");
  });
});
