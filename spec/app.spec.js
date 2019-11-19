process.env.NODE_ENV = "test";
const chai = require("chai");
const { expect } = chai;
const chaiSorted = require("chai-sorted");
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

chai.use(chaiSorted);

describe("/api", () => {
  describe("/bad-endpoint", () => {
    it("GET:404, error with bad endpoint", () => {
      return request(app)
        .get("/hello")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).to.equal("Page not found");
        });
    });
  });
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe("/topics", () => {
    it("GET:200, returns all the topics", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          // console.log(body.topics);
          expect(body.topics).to.be.an("array");
          expect(body.topics[0]).to.contain.keys("slug", "description");
          expect(body.topics[0].slug).to.equal("mitch");
        });
    });
    it("GET:404, returns error if incorrect path", () => {
      return request(app)
        .get("/api/bad-path")
        .expect(404)
        .then(body => {
          //console.log(body);
          expect(body.status).to.equal(404);
        });
    });
    it("INVALID:METHODS", () => {
      const invalidMethods = ["patch", "put", "delete"];
      const methodPromises = invalidMethods.map(method => {
        return request(app)
          [method]("/api/topics")
          .expect(405)
          .then(body => {
            expect(body.status).to.equal(405);
            expect(body.body.msg).to.equal("Invalid Method");
          });
      });
      return Promise.all(methodPromises);
    });
  });
  describe("/users", () => {
    describe("/:username", () => {
      it("GET:200, get user by username", () => {
        return request(app)
          .get("/api/users/butter_bridge")
          .expect(200)
          .then(({ body }) => {
            expect(body.user[0].username).to.equal("butter_bridge");
            expect(body.user[0]).to.have.keys("username", "avatar_url", "name");
            expect(body.user.length).to.equal(1);
          });
      });
      it("INVALID:METHODS", () => {
        const invalidMethods = ["patch", "put", "delete"];
        const methodPromises = invalidMethods.map(method => {
          return request(app)
            [method]("/api/users/butter_bridge")
            .expect(405)
            .then(body => {
              expect(body.status).to.equal(405);
              expect(body.body.msg).to.equal("Invalid Method");
            });
        });
        return Promise.all(methodPromises);
      });
      it("GET:404, input a username that does not exist", () => {
        return request(app)
          .get("/api/users/banana")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Username not found");
          });
      });
    });
  });
  describe("/articles", () => {
    describe("/:article_id", () => {
      it("GET:200", () => {
        return request(app)
          .get("/api/articles/2")
          .expect(200)
          .then(({ body: { article } }) => {
            expect(article[0].article_id).to.equal(2);
            expect(article[0]).to.have.keys(
              "article_id",
              "title",
              "body",
              "votes",
              "topic",
              "author",
              "created_at",
              "comment_count"
            );
          });
      });
      it("GET:404, a valid id that does not exist", () => {
        return request(app)
          .get("/api/articles/22222")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Not Found");
          });
      });
      it("GET:406, an invalid id", () => {
        return request(app)
          .get("/api/articles/banana")
          .expect(406)
          .then(({ body }) => {
            expect(body.msg).to.equal("Not an acceptable id");
          });
      });
      it("PATCH:202, successfully updates votes in article ", () => {
        return request(app)
          .patch("/api/articles/2")
          .send({ inc_votes: 100 })
          .expect(202)
          .then(({ body }) => {
            expect(body.article[0].votes).to.equal(100);
            expect(body.article[0].article_id).to.equal(2);
          });
      });
    });
  });
});
