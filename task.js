let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
var request = require('supertest');
var expect = chai.expect;

chai.should();
chai.use(chaiHttp);

//For Login/Register Use case and User Authentication microservice:
//i) Register use case slice:
//Everything is correct, the user does not exist from before..
describe('POST api/users' , () => {
    var n = "Sara Augustin";
    var e = "sara100@gmail.com";
    var p = "789456";
    it('should register user', (done) => {
        const detail = {
            name: n,
            email: e,
            password: p
        }
        chai.request(server)
            .post('/api/users')
            .send(detail)
            .end((err , res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('token')
            done();
            });
    });

});
//User Already Exists
describe('POST api/users' , () => {
    var n = "Sara Augustin";
    var e = "sara100@gmail.com";
    var p = "789456";
    it('should not register user1', (done) => {
        const detail = {
            name: n,
            email: e,
            password: p
        }
        chai.request(server)
            .post('/api/users')
            .send(detail)
            .end((err , res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('errors').should.be.a('object');
            done();
            });
    });

});
// Password length not 6
describe('POST api/users' , () => {
    var n = "Sara Augustin";
    var e = "sara02@gmail.com";
    var p = "22";
    it('should not register user2', (done) => {
        const detail = {
            name: n,
            email: e,
            password: p
        }
        chai.request(server)
            .post('/api/users')
            .send(detail)
            .end((err , res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('errors').should.be.a('object');
                
            done();
            });
    });

});
//Login use case slice
//the eamil is incorrect
describe('POST api/auth' , () => {
    var em = "xyz@gmail.com";
    var pass = "789456";
    it('should not login', (done) => {
        const detail = {
            email: em,
            password: pass
        }
        chai.request(server)
            .post('/api/auth')
            .send(detail)
            .end((err , res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('errors').should.be.a('object');
            done();
            });
    });

});
//Password incorrcet
describe('POST api/auth' , () => {
    var em = "sara100@gmail.com";
    var pass = "7894560";
    it('should not login 2', (done) => {
        const detail = {
            email: em,
            password: pass
        }
        chai.request(server)
            .post('/api/auth')
            .send(detail)
            .end((err , res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('errors').should.be.a('object');
            done();
            });
    });

});
//everything correct
describe('POST api/auth' , () => {
    var em = "sara100@gmail.com";
    var pass = "789456";
    it('should login', (done) => {
        const detail = {
            email: em,
            password: pass
        }
        chai.request(server)
            .post('/api/auth')
            .send(detail)
            .end((err , res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('token');
            done();
            });
    });

});
//Create ,update and view profile use case and Profile Microservice.
//Create and delete profile use case slice
//Create profile

/*describe('POST api/profile' , () => {
    
        var em = "sara100@gmail.com";
        var pass = "789456";
        const detail = {
            email: em,
            password: pass
        }
        const info = {
            status: "Student",
            skills: "C , C++ , javascript , node.js , express.js, mongodb , PostmanAPI"
        }
        let token;
        before(done => {
            chai
               .request(server)
               .post('/api/auth')
               .send(detail)
               .end((err,res)=>{
                   expect(res.status).to.equal(200);
                   token = res.body.token;
                   done();
               });

        });
        it('should create profile', (done) => {
            chai.request(server)
                .set('Authorization',token)
                .post('/api/profile')
                .send(info)
                .end((err , res) => {
                    res.should.have.status(200);
                done();
                });
        });  
});*/

//iii)Able to view other people’s profile use case slice:
describe('GET api/profile' , () => {
    var n = "Sara Augustin";
    var e = "sara9@gmail.com";
    var p = "789456";
    it('should get all the profile', (done) => {
        chai.request(server)
            .get('/api/profile')
            .end((err , res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
            done();
            });
    });

});
