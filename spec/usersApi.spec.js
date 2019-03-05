const frisby = require('frisby');
const Joi = frisby.Joi;

const baseURI = 'http://localhost:8000/api/users';

describe('Users API', () => {
    describe('POST - / - Register route', () => {
        const noEmailBody = {
            'user': {
                'email': '',
                'password': 'noemail'
            }
        }
        it('should return code 422 if no email is provided', (done) => {
            return frisby.post(baseURI + '/', noEmailBody)
            .expect('status', 422)
            .done(done);
        })
    })
    describe('POST - / - Register route', () => {
        const noPassBody = {
            'user': {
                'email':'nopass@word.com',
                'password':''
            }
        }
        it('should return code 422 if no password is provided', (done) => {
            return frisby.post(baseURI + '/', noPassBody)
            .expect('status', 422)
            .done(done);
        })
    })
    describe('POST - / - Register route', () => {
        const properBody = {
            'user': {
                'email': 'proper@body.com',
                'password': 'success'
            }
        }
        it('should return code 200 and token string when proper credentials are supplied', (done) => {
            return frisby.post(baseURI + '/', properBody)
            .expect('status', 200)
            .expect('jsonTypes', 'user.token', Joi.string())
            .done(done);
        })
    })

});