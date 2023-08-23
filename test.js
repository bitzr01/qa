const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./index.js');  // Update this path

chai.use(chaiHttp);

const { expect } = chai;

describe('User Authentication Microservice', () => {
    describe('/signup endpoint', () => {
        it('should register a user with valid data', (done) => {
            chai.request(server)
                .post('/signup')
                .send({ email: 'test@example.com', password: 'password123' })
                .end((err, res) => {
                    expect(res.status).to.equal(201);
                    expect(res.body.message).to.equal('User registered successfully.');
                    done();
                });
        });

        it('should not register a user with missing or invalid data', (done) => {
            chai.request(server)
                .post('/signup')
                .send({ email: 'test2@example.com' })
                .end((err, res) => {
                    expect(res.status).to.equal(400);
                    expect(res.body.message).to.equal('Email and password are required.');
                    done();
                });
        });
    });

    describe('/login endpoint', () => {
        it('should login a user with valid credentials', (done) => {
            chai.request(server)
                .post('/login')
                .send({ email: 'test@example.com', password: 'password123' })
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.message).to.equal('Login successful.');
                    done();
                });
        });

        it('should not login a user with incorrect credentials', (done) => {
            chai.request(server)
                .post('/login')
                .send({ email: 'test@example.com', password: 'wrongpassword' })
                .end((err, res) => {
                    expect(res.status).to.equal(401);
                    expect(res.body.message).to.equal('Invalid credentials.');
                    done();
                });
        });
    });
});
