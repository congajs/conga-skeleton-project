const Controller = require('@conga/framework').Controller;

const os = require('os');

/**
 * The DefaultController defines the default actions and routes
 *
 * @Route("/")  <-- this defines the prefix for all routes in this controller
 */
module.exports = class DefaultController extends Controller {

    /**
     * Show the application's index page
     *
     * @Route("/", name="default.index", methods=["GET"])  <-- this defines the route info for this action
     */
    index(req, res) {

        res.return({
            message: "Congrats! If you are seeing this that means you have successfully created and started your project!",
            content: "Take a look at src/hello-world-bundle/controller/DefaultController.js to see this route's controller",
            conga_version: this.container.getParameter('conga.version'),
            environment: this.container.getParameter('kernel.environment'),
            installed_bundles: this.container.getParameter('app.bundles'),
            os: {
                cpus: os.cpus().length,
                hostname: os.hostname(),
                type: os.type(),
                platform: os.platform(),
                release: os.release()
            }
        });

    }

    /**
     * Here is an action that uses URL parameters and also demonstrates using a promise
     *
     * Go to http://localhost:3000/hello/world
     *
     * or:
     *
     * http://localhost:3000/hello/error to trigger an error
     *
     * @Route("/hello/:name", methods=["GET"])
     */
    hello(req, res) {

        // you can also return promises
        return new Promise((resolve, reject) => {

            if (req.params.name === 'error') {
                reject(this.buildErrorResponse({ error: 'this is an error', code: 403}, 403));
            }

            resolve({
                message: 'Hello ' + req.params.name
            });
        });

    }

}
