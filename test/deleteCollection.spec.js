/**
 * Chaijs test.spec file for unit tests
 * written by: Sandeep Vattapparambil
 */

//import chaijs
import chai from 'chai';
//import WrapSplashJS
import WrapASplashAPI from '../dist/wrapsplash';

//set the Expect Assertion
const expect = chai.expect;
//set the Should Assertion
const should = chai.should;

//define the UnsplashAPI object
let UnsplashAPI;

//describe the test function
describe('Given an instance of WrapSplashJS', () => {
    //setup and initialize the UnsplashAPI object with the required parameters
    beforeEach(() => {
        UnsplashAPI = new WrapASplashAPI({
            access_key: '50f4e0688dedca12f966ea044221acf610e2ce4b47a24b4b34c0d34f8ac79cdb',
            secret_key: '6e4e5f1bb0b0d9987ff763907345b0b87281c1a2273daf4643f5f0a0c6c7b2da',
            redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
            code: '53697a83edbd3039a0a1e4abf181514da1d2ab39008c0eec33dfcbd6739d749b',
            bearer_token: '2175e61a37bce90fd86fbfa759384ad8a22c88f25ffbc45db17d5a36d731ae10'
        });
    });

    //describe the unit test
    describe('When the function -> deleteCollection() is called with parameter -> collection_id', () => {
        it('It should return the status object with status and statusText', (done) => {
            UnsplashAPI.deleteCollection(2526220).then((result) => {
                expect(result).to.be.a('object');
                if(result.status){
                    expect(result.status).to.be.equal(204);
                    expect(result.statusText).to.be.equal('No Content');
                }
            }).then(() => done(), done).catch((error) => {
                expect(error).to.be.a('object');
            });
        });
    });
});