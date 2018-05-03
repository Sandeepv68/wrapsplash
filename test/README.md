# WrapSplash Module Test Spec Files for Mocha + Chai.
This folder contains the Unit Test specification files for testing WrapSplashJS features.

## Running the Unit Tests
Run the unit tests by running Mocha from the command line.

```
cd wrapsplash
./node_modules/.bin/mocha --timeout 10000 --require babel-core/register --colors ./test/*.spec.js
```

For convenience, the above command has been added as the `test` script in `package.json`, so you can run the tests this way also:

```
npm test
```

At this point you should see this super shiny Mocha unit test runner (or something more than this):

```sh
   Given an instance of WrapSplashJS
    When the function -> deleteCollection() is called with parameter -> collection_id
      √ It should return the status object with status and statusText (980ms)

  Given an instance of WrapSplashJS
    When the function -> listPhotos() is called without parameters
      √ It should return the Array of list of photos from Unsplash API (1913ms)
      √ It should return the result array having length between 0 - 10 (1392ms)
    When the function -> listPhotos() is called with parameters page = 1 & per_page = 20
      √ It should return the Array of list of photos from Unsplash API (1298ms)
      √ It should return the result array having length between 0 - 20 (1117ms)


  5 passing (7s)
```
