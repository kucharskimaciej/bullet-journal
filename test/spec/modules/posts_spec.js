var include = require('rfr');

var H = include('test/helpers.js');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var sinon = require('sinon');
var ObjectId = require('mongoose').Types.ObjectId;

var api = H.apiServer;
var Post = include('modules/posts/models/post');

lab.experiment("Posts", function () {

    lab.describe("#index", function () {
        function getOpts () {
            return {
                method: "GET",
                url: "/posts"
            };
        }

        lab.it("can be called without any params", function (done) {
            var opts = getOpts();

            api.inject(opts, function (res) {
                Lab.expect(res.statusCode).to.equal(200);
                done();
            });
        });

        lab.it("returns array of posts when called without any params", function (done){
            api.inject(getOpts(), function (res){
                Lab.expect(res.result).to.be.instanceof(Array);
                done();
            });
        });

        lab.it("accepts single tag as a query param", function (done) {
            var opts = getOpts();
            opts.url += "?tags=sometag";

            api.inject(opts, function (res) {
                Lab.expect(res.statusCode).to.equal(200);
                done();
            });

        });

        lab.it("accepts array of tags", function (done) {
            var opts = getOpts();
            opts.url += "?tags=sometag&tags=othertag";

            api.inject(opts, function (res) {
                Lab.expect(res.statusCode).to.equal(200);
                done();
            });

        });

        lab.it("returns an array of results when called with tags", function (done) {
            var opts = getOpts();
            opts.url += "?tags=sometag&tags=othertag";

            api.inject(opts, function (res) {
                Lab.expect(res.result).to.be.instanceOf(Array);
                done();
            });

        });
    });

    lab.describe("#show", function () {

        function getOpts () {
            return {
                method: "GET",
                url: "/posts/" + (new ObjectId()).toHexString()
            };
        }

        lab.it("accepts id of a post as a url param", function (done) {
            var opts = getOpts();
            api.inject(opts, function (res) {
                // 404 errors means mongoose callback failed, but route params validation passed
                Lab.expect(res.statusCode).to.equal(404);
                done();
            });
        });

        lab.it("fails for ids other than ObjectID", function (done) {
            var opts = getOpts();
            opts.url = "/posts/badID";
            api.inject(opts, function (res) {
                Lab.expect(res.statusCode).to.equal(400);
                done();
            }) ;
        });


    });

    lab.describe("#create", function () {
        function getOpts () {
            return {
                method: "POST",
                url: "/posts",
                payload: {
                    title: 'example',
                    content: 'some content',
                    original_content: 'some content',
                    tags: ['a tag'],
                    type: 'regular'
                }
            };
        }

        lab.it("creates a post", function (done) {
            api.inject(getOpts(), function (res) {
                Lab.expect(res.statusCode).to.equal(200);
                done();
            });
        });

        lab.it("validates presence of a title", function (done) {
            var opts = getOpts();
            opts.payload.title = undefined;

            api.inject(opts, function (res) {
                Lab.expect(res.statusCode).to.equal(400);
                done();
            });

        });

        lab.it("validates presence of original_content", function (done) {
            var opts = getOpts();
            opts.payload.original_content = undefined;

            api.inject(opts, function (res) {
                Lab.expect(res.statusCode).to.equal(400);
                done();
            });

        });

        lab.it("disallows type to be anything but 'regular' or 'daily'", function (done) {
            var opts = getOpts();
            opts.payload.type = 'notasupportedtype';

            api.inject(opts, function (res) {
                Lab.expect(res.statusCode).to.equal(422);
                done();
            });

        });

        lab.it("disallows tags to be anything but string or array", function (done) {
            var opts = getOpts();
            opts.payload.tags = {
                somekey: "somevalue",
                answer: 42
            };

            api.inject(opts, function (res) {
                Lab.expect(res.statusCode).to.equal(400);
                done();
            });
        });

    });


    lab.describe("#delete", function () {

        function getOpts () {
            return {
                method: "DELETE",
                url: "/posts/" + (new ObjectId()).toHexString()
            };
        }

        lab.it("accepts id of a post as a url param", function (done) {
            var opts = getOpts();
            api.inject(opts, function (res) {
                // 404 errors means mongoose callback failed, but route params validation passed
                Lab.expect(res.statusCode).to.equal(404);
                done();
            });
        });

        lab.it("fails for ids other than ObjectID", function (done) {
            var opts = getOpts();
            opts.url = "/posts/badID";
            api.inject(opts, function (res) {
                Lab.expect(res.statusCode).to.equal(400);
                done();
            }) ;
        });


    });

    lab.describe("#update", function () {

        function getOpts () {
            return {
                method: "PUT",
                url: "/posts/" + (new ObjectId()).toHexString(),
                payload: {
                    title: 'new title'
                }
            };
        }

        lab.it("accepts id of a post as a url param", function (done) {
            var opts = getOpts();
            api.inject(opts, function (res) {
                // 404 errors means mongoose callback failed, but route params validation passed
                Lab.expect(res.statusCode).to.equal(404);
                done();
            });
        });

        lab.it("fails for ids other than ObjectID", function (done) {
            var opts = getOpts();
            opts.url = "/posts/badID";
            api.inject(opts, function (res) {
                Lab.expect(res.statusCode).to.equal(400);
                done();
            }) ;
        });


    });

});