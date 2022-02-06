const router = require("express").Router();
const { Blog } = require("../models");

// get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = (await Blog.findAll()).map((blog) =>
      blog.get({ plain: true })
    );
    res.render("blogs/blogs", { blogs });
  } catch (err) {
    res.sendStatus(500).send(err);
  }
});

// get a single blog
router.get("/:id", async (req, res) => {
  try {
    const singleBlogs = (await Blog.findByPk(req.params.id)).map((blog) =>
      blog.get({ plain: true })
    );
    res.render("blogs/single-blog", { singleBlogs });
  } catch (err) {
    res.sendStatus(500).send(err);
  }
});

// add a blog
router.post("/", async (req, res) => {
  Blog.create();
});

// update a blog
router.put("/:id", async (req, res) => {
  Blog.update(req.params.id);
});

// delete a blog
router.delete("/:id", async (req, res) => {
  Blog.destroy(req.params.id);
});
