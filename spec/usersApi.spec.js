const frisby = require('frisby');
const Joi = frisby.Joi;

const baseURI = 'http://localhost:8000/api/users';
const noPassBody = {
    'user': {
        'email':'nopass@word.com',
        'password':''
    }
}
const noEmailBody = {
    'user': {
        'email': '',
        'password': 'noemail'
    }
}
const properBody = {
    'user': {
        'email': 'proper@body.com',
        'password': 'success'
    }
}
const badPassBody = {
    'user': {
        'email': 'proper@body.com',
        'password': 'fail'
    } 
}
const badEmailBody = {
    'user': {
        'email': 'unregistered@email.com',
        'password': 'any'
    }
}
const validTokenHeaders = {
    'request': {
        'headers': {
            'Authorization': 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNia2x1dmVyQGdtYWlsLmNvbSIsImlkIjoiNWM3ZTg1Y2FiYzA3ZTEyMzA0ZTQ2ZmJkIiwiZXhwIjoxNTU3MTE0MzQxLCJpYXQiOjE1NTE5MzM5NDF9.OLx2fKGrsfT1DoVW3BlbtUND37gxSwyBiyKKC-dS028'
        }
    }
}

describe('Users API', () => {
    describe('POST - / - Register route', () => {
        it('should return code 422 if no email is provided', (done) => {
            return frisby.post(baseURI + '/', noEmailBody)
            .expect('status', 422)
            .done(done);
        })
    });
    describe('POST - / - Register route', () => {
        it('should return code 422 if no password is provided', (done) => {
            return frisby.post(baseURI + '/', noPassBody)
            .expect('status', 422)
            .done(done);
        })
    });
    describe('POST - / - Register route', () => {
        it('should return code 200 and token string when proper credentials are supplied', (done) => {
            return frisby.post(baseURI + '/', properBody)
            .expect('status', 200)
            .expect('jsonTypes', 'user.token', Joi.string())
            .done(done);
        })
    });
    describe('POST - /login - Login route', () => {
        it('should return code 422 if no email is provided', (done) => {
            return frisby.post(baseURI + '/login', noEmailBody)
            .expect('status', 422)
            .done(done);
        })
    });
    describe('POST - /login - Login route', () => {
        it('should return code 422 if no password is provided', (done) => {
            return frisby.post(baseURI + '/login', noPassBody)
            .expect('status', 422)
            .done(done);
        })
    });
    describe('POST - /login - Login route', () => {
        it('should return code 400 and error object with property "email or password" and value "is invalid" if password is invalid but email is valid', (done) => {
            return frisby.post(baseURI + '/login', badPassBody)
            .expect('status', 400)
            .expect('json', 'errors', {
                "email or password": "is invalid"
            })
            .done(done);
        })
    });
    describe('POST - /login - Login route', () => {
        it('should return code 400 and error object with property "email or password" and value "is invalid" if email is unregistered', (done) => {
            return frisby.post(baseURI + '/login', badEmailBody)
            .expect('status', 400)
            .expect('json', 'errors', {
                "email or password": "is invalid"
            })
            .done(done);
        })
    });
    describe('POST - /login - Login route', () => {
        it('should return code 200 and token string when credentials are verified', (done) => {
            return frisby.post(baseURI + '/login', properBody)
            .expect('status', 200)
            .expect('jsonTypes', 'user.token', Joi.string())
            .done(done);
        })
    });
    describe('GET - /current - Validate route', () => {
        it('should return code 401 if valid JWT token is not passed in header of request', (done) => {
            return frisby.get(baseURI + '/current')
            .expect('status', 401)
            .done(done);
        })
    });
    describe('/GET - /current - Validate route', () => {
        it('should return 200 if valid JWT Token is provided in header', (done) => {
            return frisby.setup(validTokenHeaders)
            .get(baseURI + '/current')
            .expect('status', 200)
            .done(done);
        })
    });
});