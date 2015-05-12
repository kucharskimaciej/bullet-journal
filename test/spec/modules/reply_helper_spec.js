var include = require('rfr');

var H = include('test/helpers.js');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var ObjectId = require('mongoose').Types.ObjectId;
var replyHelper = include('modules/common/reply_helper');

lab.experiment("reply helper", function () {

    lab.describe("#replyIndex", function () {

        lab.it("replies with 500 if error isnt null", function (done) {
            var helper = replyHelper({ reply: function (res) {
                H.expect(res.output.statusCode).to.be.equal(500);
                done();
            }});

            helper.replyIndex({ message: "an error"}, null);
        });

        lab.it("replies with passed data otherwise", function (done) {
            var data = [1,2,3];
            var helper = replyHelper({ reply: function (res) {
                H.expect(res).to.be.equal(data);
                done();
            }});

            helper.replyIndex(null, data);
        });

    });

    lab.describe("#replyCreate", function () {

        lab.it("replies with 500 if error isnt null", function (done) {
            var helper = replyHelper({ reply: function (res) {
                H.expect(res.output.statusCode).to.be.equal(422);
                done();
            }});

            helper.replyCreate({ message: "an error"}, null);
        });

        lab.it("replies with passed data otherwise", function (done) {
            var data = [1,2,3];
            var helper = replyHelper({ reply: function (res) {
                H.expect(res).to.be.equal(data);
                done();
            }});

            helper.replyCreate(null, data);
        });

    });

    lab.describe("#replyShow", function () {

        lab.it("replies with 500 if error isnt null", function (done) {
            var helper = replyHelper({ reply: function (res) {
                H.expect(res.output.statusCode).to.be.equal(500);
                done();
            }});

            helper.replyShow({ message: "an error"}, null);
        });

        lab.it("replies with 404 if data is null", function (done) {
            var helper = replyHelper({ reply: function (res) {
                H.expect(res.output.statusCode).to.be.equal(404);
                done();
            }});

            helper.replyShow(null, null);
        });

        lab.it("replies with passed data otherwise", function (done) {
            var data = 42;
            var helper = replyHelper({ reply: function (res) {
                H.expect(res).to.be.equal(data);
                done();
            }});

            helper.replyShow(null, data);
        });

    });

    lab.describe("#replyDelete", function () {

        lab.it("replies with 500 if error isnt null", function (done) {
            var helper = replyHelper({ reply: function (res) {
                H.expect(res.output.statusCode).to.be.equal(500);
                done();
            }});

            helper.replyDelete({ message: "an error"}, null);
        });

        lab.it("replies with 404 if data is null", function (done) {
            var helper = replyHelper({ reply: function (res) {
                H.expect(res.output.statusCode).to.be.equal(404);
                done();
            }});

            helper.replyDelete(null, null);
        });

        lab.it("replies with passed data otherwise", function (done) {
            var data = 42;
            var helper = replyHelper({ reply: function (res) {
                H.expect(res).to.be.equal(undefined);
                // mock expected call path
                return {
                    hold: function () {
                        return {
                            code: function () {
                                return { send: done }
                            }
                        }
                    }
                }
            }});

            helper.replyDelete(null, data);
        });

    });

    lab.describe("#replyUpdate", function () {

        lab.it("replies with 500 if error isnt null", function (done) {
            var helper = replyHelper({ reply: function (res) {
                H.expect(res.output.statusCode).to.be.equal(500);
                done();
            }});

            helper.replyUpdate({ message: "an error"}, null);
        });

        lab.it("replies with 404 if data is null", function (done) {
            var helper = replyHelper({ reply: function (res) {
                H.expect(res.output.statusCode).to.be.equal(404);
                done();
            }});

            helper.replyUpdate(null, null);
        });

        lab.it("replies with passed data otherwise", function (done) {
            var data = {
                save: function (cb) {
                    return cb(null, data)
                }
            };
            var helper = replyHelper({ request: {}, reply: function (res) {
                H.expect(res).to.be.equal(data);
                done();
            }});

            helper.replyUpdate(null, data);
        });

    });

});
