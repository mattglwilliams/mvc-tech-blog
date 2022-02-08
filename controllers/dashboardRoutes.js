const router = require("express").Router();
const sequelize = require("../config/connection");
const { Blog, User, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {
    const blogs = (await Blog.findAll()).map((blog) =>
      blog.get({ plain: true })
    );
    res.render("dashboard", { blogs });
    // res.json(blogs);
  } catch (err) {
    res.sendStatus(500).send(err);
  }
});

router.get("/add-blog", (req, res) => {
  res.render("add-blog");
});

module.exports = router;
