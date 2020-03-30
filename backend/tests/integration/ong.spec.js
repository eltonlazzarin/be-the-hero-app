const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("ONG", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  /*
   * Example validation below
   * Header validation use...
   * .post('/ongs')
   * .set('Authorization', 'VALID_ID_ONG')
   * .send({ name: ''... })
   */

  describe("ONG", () => {
    it("should be able to create a new ONG", async () => {
      const response = await request(app)
        .post("/ongs")
        .send({
          name: "APAD2",
          email: "contato@l.com",
          whatsapp: "4700000000",
          city: "Rio do Sul",
          uf: "SC"
        });

      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toHaveLength(8);
    });
  });
});
