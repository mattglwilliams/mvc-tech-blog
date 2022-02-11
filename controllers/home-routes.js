const router = require("express").Router();
const { Blog, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// login
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// signup
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

// add a blog
router.get("/add-blog", withAuth, async (req, res) => {
  res.render("add-blog");
});

// get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = (
      await Blog.findAll({
        attributes: ["id", "blog_title", "blog_content", "created_at"],
        include: [{ model: User }, { model: Comment }],
      })
    ).map((blog) => blog.get({ plain: true }));
    res.render("home", { blogs, loggedIn: req.session.loggedIn });
    // res.json(blogs);
  } catch (err) {
    res.sendStatus(500).send(err);
  }
});

// get all blogs by a certain user
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const blogs = (
      await Blog.findAll({
        where: {
          user_id: req.session.user_id,
        },
        attributes: ["id", "blog_title", "blog_content", "created_at"],
      })
    ).map((blog) => blog.get({ plain: true }));
    res.render("dashboard", { blogs, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.sendStatus(500).send(err);
  }
});

// get a single blog
router.get("/blog/:id", async (req, res) => {
  try {
    const blog = (
      await Blog.findOne({
        where: { id: req.params.id },
        attributes: ["id", "blog_title", "blog_content", "created_at"],
        include: [
          {
            model: Comment,
            attributes: [
              "id",
              "comment_desc",
              "user_id",
              "blog_id",
              "createdAt",
            ],
            include: { model: User, attributes: ["username"] },
          },
          { model: User, attributes: ["username"] },
        ],
      })
    ).get({ plain: true });
    res.render("single-blog", { ...blog, loggedIn: req.session.loggedIn });
    // res.json(blog);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get a single blog
router.get("/edit-blog/:id", async (req, res) => {
  try {
    const blog = (await Blog.findByPk(req.params.id)).get({ plain: true });
    res.render("update-blog", { ...blog, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.sendStatus(500).send(err);
  }
});

module.exports = router;
