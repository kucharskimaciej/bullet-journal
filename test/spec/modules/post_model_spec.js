var include = require('rfr');

var H = include('test/helpers.js');
exports.lab = H.lab;


var Post = include('modules/posts/models/post');

H.lab.suite("Post model", function () {
    H.describe("creation date", function () {
        H.it("is set to current date by default", function (done) {
            var post = new Post();
            H.expect(post.created_at).to.be.instanceof(Date);
            done();
        });

        H.it("can be set manually", function (done) {
            var postDate = new Date(8,8,2014);
            var post = new Post({
                created_at: postDate
            });
            H.expect(post.created_at).to.be.equal(postDate);
            done();
        })
    });

});