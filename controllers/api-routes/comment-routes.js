const router = require("express").Router();
const { Blog, User, Comment } = require("../../models");

// add a new comment
router.post("/", async (req, res) => {
  if (req.session) {
    try {
      const newComment = await Comment.create({
        comment_desc: req.body.comment_desc,
        blog_id: req.body.blog_id,
        user_id: req.session.user_id,
      });
      res.status(200).json(newComment);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

module.exports = router;
