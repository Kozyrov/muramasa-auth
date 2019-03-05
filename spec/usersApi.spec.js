const frisby = require('frisby');

const baseURI = 'http://localhost:8000/api/users';

describe('Users API', () => {
    describe('POST - / - Register route', () => {
        const noEmailBody = {
            'user': {
                'email': '',
                'password': 'noemail'
            }
        }
        it('should return error code 422 if no email is provided', (done) => {
            return frisby.post(baseURI + '/', noEmailBody)
            .expect('status', 422)
            .done(done);
        })
    })
});