var include = require('rfr');

var H = include('test/helpers.js');
var Lab = require('lab');
var lab = exports.lab = Lab.script();


var Post = include('modules/posts/models/post');

lab.suite("Post model", function () {
    lab.describe("creation date", function () {
        lab.it("is set to current date by default", function (done) {
            var post = new Post();
            H.expect(post.created_at).to.be.instanceof(Date);
            done();
        });

        lab.it("can be set manually", function (done) {
            var postDate = new Date(8,8,2014);
            var post = new Post({
                created_at: postDate
            });
            H.expect(post.created_at).to.be.equal(postDate);
            done();
        })
    });

});