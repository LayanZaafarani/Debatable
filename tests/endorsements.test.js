/**
 * endorsements.test.js contains testing for endorsements scenarios.
 * Layan Zaafarani 6/2022
 */

// imports
const {describe, it} = require('mocha');
const chai = require('chai');
chai.should();

const {faker} = require('@faker-js/faker');
const knex = require ('../knexHelper');

const request = require('supertest');
const {app} = require('../app');

const testHelper = require('./testHelper');

let testData;

// Testing
describe('Testing Debatable Project', async function(){
    // before each test clear data base and add users and debate
    beforeEach(async function(){
        await testHelper.clearDatabase();
        testData = await testHelper.prepareDatabase();
    });
    // after each test
    after(async function(){
        await testHelper.closeConnection();
    });
    
    // testing endorsements 
    describe('Testing Endorsements', async function(){
        it('Should create an endoresment correctly if all conditions are met', async function(){

            // login as a user
            const loginResponse = await request(app)
            .post('/users/login')
            .send({
                email: 'loyeen@hotmail.com',
                password: '123456'
            })
            .expect(200);

            // take JWT from the login
            const token = loginResponse.body.token;
            // ensure JWT exist
            token.should.not.be.null;

            // generate random opinion[for, against, neutral]
            const opinion = faker.helpers.arrayElement(['for', 'against', 'neutral']);
            
            // add endorsment on a random debate using the random opinion and token
            const endorsementResponse = await request(app)
            .post('/debates/debate/' + testData.debate.id + '/endorsements')
            .set('token', token)
            .send({opinion})
            .expect(200);

            // ensure the information of the added endorsement matches the infrormation we put
            const endoresment = endorsementResponse.body[0];
            endoresment.user_id.should.equal(loginResponse.body.user.id);
            endoresment.debate_id.should.equal(testData.debate.id);
            endoresment.opinion.should.equal(opinion);
        });
        it('Should not create endorsement if the user is not logged in (token is missing)', async function(){

            // generate random opinion[for, against, neutral]
            const opinion = faker.helpers.arrayElement(['for', 'against', 'neutral']);

            // create endorsement api
            await request(app)
            .post('/debates/debate/' + testData.debate.id + '/endorsements')
            .send({opinion})
            .expect(403);

            // check if the endorsement got added to the database
            const endorsements = await knex.select('id').from('endorsements');
            endorsements.length.should.equal(0);
        });
        it('Should not create two endorsements if the user changed the edorsement', async function(){
            // login as a user
            const loginResponse = await request(app)
            .post('/users/login')
            .send({
                email: 'loyeen@hotmail.com',
                password: '123456'
            })
            .expect(200);

            // take JWT from the login
            const token = loginResponse.body.token;
            // ensure JWT exist
            token.should.not.be.null;

            // generate random opinion[for, against, neutral]
            const opinions = faker.helpers.arrayElements(['for', 'against', 'neutral'], 2);

            // add the first endorsment
            const endorsementResponse1 = await request(app)
            .post('/debates/debate/' + testData.debate.id + '/endorsements')
            .set('token', token)
            .send({opinion: opinions[0]})
            .expect(200);
            // add the second endorsment
            const endorsementResponse2 = await request(app)
            .post('/debates/debate/' + testData.debate.id + '/endorsements')
            .set('token', token)
            .send({opinion: opinions[1]})
            .expect(200);

            // check the data base, there should be only one endorsement
            const dbResponse = await knex.count('*').from('endorsements');
            dbResponse[0].count.should.equal('1');

            // the stored endorsement should equal the second opinion added
            const storedEndorsemnent = await knex.select('opinion').from('endorsements').first();
            storedEndorsemnent.opinion.should.equal(opinions[1]);
        })
    })
})