const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
let should = chai.should();


const { expect } = chai;
chai.use(chaiHttp);
describe("Visitor Infos", () => {

    it("Get Vistors for museum by month", done => {

        chai
            .request(app)
            .get("/api/v1/visitors?date=1612137600000&museum=avila_adobe")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.data).to.be.a('object');
                expect(res.body.data.result).to.be.a('object');
                expect(res.body.data.result.museum).to.equal("avila_adobe")
                done();
            });
    })
    it("Get Vistors for museum without date", done => {

        chai
            .request(app)
            .get("/api/v1/visitors?museum=avila_adobe")
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.meta).to.be.a('object');
                expect(res.body.meta.message).to.equal("Required Parameter missing");
                done();
            });
    })

    it("Get Vistors for date without museum", done => {

        chai
            .request(app)
            .get("/api/v1/visitors?date=1612137600000")
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.meta).to.be.a('object');
                expect(res.body.meta.message).to.equal("Required Parameter missing");
                done();
            });
    })


});

console.log(typeof {});
