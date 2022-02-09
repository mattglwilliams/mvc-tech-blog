const router = require("express").Router();
const { User, Blog } = require("../../models");

// CREATE new user
router.post("/add-blog", async (req, res) => {
  try {
    const dbUserData = await Blog.create({
      blog_title: req.body.blog_title,
      blog_content: req.body.blog_content,
      user_id: req.session.user_id,
    });
    res.status(200).json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
