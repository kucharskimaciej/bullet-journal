var H = require('../../helpers.js');
exports.lab = H.lab;

var api = H.apiServer;

H.lab.suite("Posts", function () {

    H.describe("#index", function () {
        H.it("returns an array of posts", function (done) {
            var opts = {
                method: "GET",
                url: "/posts"
            };

            api.inject(opts, function (res) {
                var result = res.result;
                H.expect(res.statusCode).to.equal(200);
                H.expect(result).to.be.instanceof(Array);
                done();

            });
        });
    });

});