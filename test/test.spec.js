const chai = require('chai');
const WrapASplashAPI = require('../dist/main');

chai.expect();
const expect = chai.expect;

let UnsplashAPI;
describe('Given an instance of WraspSplashJS', () => {

    beforeEach(() => {
        UnsplashAPI = new WrapASplashAPI({
            access_key: '5a419933621f55950741e4c30182c1d5f99974112a96cf0c49d8d9091cc0ba7e',
            secret_key: '0464eb09a8590dfaaf11e562a8c7a361c15d25d7757f26e20e6b86d0fd6b9c5c',
            redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
            code: '172112daa24a80945e9c15b8ee6e21e60f83337868fc33b439326d71f041009f',
            bearer_token: '2c15444720fd795bec49aa23fd3982722626377471ec29af581d5d0f07da565c'
        });
    });

    describe('When the function -> listPhotos() is called without parameters', () => {
        it('It should return the Array of list of photos from Unsplash API', () => {
            UnsplashAPI.listPhotos().then((result) => {
                expect(result).to.be.a('array');
            });
        });
    });

});