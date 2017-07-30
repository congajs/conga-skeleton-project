const Controller = require('@conga/framework').Controller;

const os = require('os');

/**
 * The DefaultController defines the default actions and routes
 *
 * @Route("/")
 */
module.exports = class DefaultController extends Controller {

    /**
     * Show the main application index page
     *
     * @Route("/", name="default.index", methods=["GET"])
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

}
