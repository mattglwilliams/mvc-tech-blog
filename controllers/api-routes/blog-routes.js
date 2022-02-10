const router = require("express").Router();
const { User, Blog } = require("../../models");
const withAuth = require("../../utils/auth");

// create new blog
router.post("/add-blog", async (req, res) => {
  try {
    const newBlog = await Blog.create({
      blog_title: req.body.blog_title,
      blog_content: req.body.blog_content,
      user_id: req.session.user_id,
    });
    res.status(200).json(newBlog);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete a blog
router.delete("/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(deletedBlog);
  } catch (err) {
    res.sendStatus(500).send(err);
  }
});

// update a blog
router.put("/:id", async (req, res) => {
  try {
    const updatedBlog = await Blog.update(
      { blog_title: req.body.blog_title, blog_content: req.body.blog_content },
      { where: { id: req.params.id } }
    );
    res.json(updatedBlog);
  } catch (err) {
    res.sendStatus(500).send(err);
  }
});

module.exports = router;
