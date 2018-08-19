/**
 * Wrapsplash test spec file
 * Written by: Sandeep Vattapparambil
 */

/**
 * Import library
 */
import WrapsplashLib from '../dist/wrapsplash';

/**
 * initialize variable
 */
let wrapsplash = new WrapsplashLib();

/**
 * Initialization
 */
beforeAll(() => {
    wrapsplash.init({
        access_key: '50f4e0688dedca12f966ea044221acf610e2ce4b47a24b4b34c0d34f8ac79cdb',
        secret_key: '6e4e5f1bb0b0d9987ff763907345b0b87281c1a2273daf4643f5f0a0c6c7b2da',
        redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
        code: '53697a83edbd3039a0a1e4abf181514da1d2ab39008c0eec33dfcbd6739d749b',
        bearer_token: '2175e61a37bce90fd86fbfa759384ad8a22c88f25ffbc45db17d5a36d731ae10'
    });
});
/**
 * Describe the tests
 */
describe('Given an instance of wrapsplash..', () => {

    /**
     * Current User
     */
    describe('Current User tests ->', () => {
        describe('When getCurrentUserProfile() function is called..', () => {
            test('Should return the User data object', async (done) => {
                const response = await wrapsplash.getCurrentUserProfile();
                expect(typeof response).toBe('object');
                done();
            });
        });
        describe('When updateCurrentUserProfile() function is called..', () => {
            test('Should return the updated User data object', async (done) => {
                const response = await wrapsplash.updateCurrentUserProfile();
                expect(typeof response).toBe('object');
                done();
            });
        });

    });

    /**
     * Users
     */
    describe('Users tests ->', () => {
        describe('When getPublicProfile() function is called with parameter..', () => {
            test('Should return the public profile data of user', async (done) => {
                const response = await wrapsplash.getPublicProfile('sandeepv');
                expect(typeof response).toBe('object');
                done();
            });
        });
        describe('When getUserPortfolio() function is called with parameter..', () => {
            test('Should return the portfolio of user', async (done) => {
                const response = await wrapsplash.getUserPortfolio('sandeepv');
                expect(typeof response).toBe('object');
                done();
            });
        });
        describe('When getUserPhotos() function is called with parameter..', () => {
            test('Should return the Users photos', async (done) => {
                const response = await wrapsplash.getUserPhotos('sandeepv');
                expect(typeof response).toBe('object');
                done();
            });
        });
        describe('When getUserLikedPhotos() function is called with parameter..', () => {
            test('Should return the User liked photos', async (done) => {
                const response = await wrapsplash.getUserLikedPhotos('sandeepv');
                expect(typeof response).toBe('object');
                done();
            });
        });
        describe('When getUserCollections() function is called with parameter..', () => {
            test('Should return the User photo collections', async (done) => {
                const response = await wrapsplash.getUserCollections('sandeepv');
                expect(typeof response).toBe('object');
                done();
            });
        });
        describe('When getUserStatistics() function is called with parameter..', () => {
            test('Should return the User statistics', async (done) => {
                const response = await wrapsplash.getUserStatistics('sandeepv');
                expect(typeof response).toBe('object');
                done();
            });
        });
    });

    /**
     * Describe the test group
     */
    describe('When getAphoto() function is called with a photoId..', () => {
        test('Should return the Single photo data object', (done) => {
            wrapsplash.getAPhoto('w8_IxV1G_EI').then(response => {
                expect(typeof response).toBe('object');
                done();
            });
        });
    });
});