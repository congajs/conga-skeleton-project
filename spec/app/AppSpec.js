const path = require('path');
const request = require('request');

const Kernel = require('@conga/framework/lib/kernel/TestKernel');

describe("Kernel", function() {

    let kernel;

    beforeAll(function(done) {

        kernel = new Kernel(
            path.join(__dirname, '..', '..'),
            'app',
            'test',
            {}
        );

        kernel.addBundlePaths({
            //'demo-bundle': path.join(__dirname, '..', 'data', 'projects', 'sample', 'src', 'demo-bundle'),
            //'test-bundle': path.join(__dirname, '..', 'data', 'projects', 'sample', 'src', 'test-bundle'),
        });

        kernel.boot(() => {
            done();
        });
    });

    describe('DefaultController', function() {

        it("should return a response for /", (done) => {

            request('http://localhost:3000/', (error, response, body) => {
                const json = JSON.parse(body);
                expect(response.statusCode).toEqual(200);
                expect(json.message).toEqual('Congrats! If you are seeing this that means you have successfully created and started your project!');
                done();
            });

        });

        it("should return a response for /hello/world", (done) => {

            request('http://localhost:3000/hello/world', (error, response, body) => {
                const json = JSON.parse(body);
                expect(response.statusCode).toEqual(200);
                expect(json.message).toEqual('Hello world');
                done();
            });

        });

        it("should return an error response for /hello/world", (done) => {

            request('http://localhost:3000/hello/error', (error, response, body) => {
                const json = JSON.parse(body);
                expect(response.statusCode).toEqual(403);
                expect(json.error).toEqual('this is an error');
                done();
            });

        });

    });

});
