const addBlogFormHandler = async (event) => {
  event.preventDefault();

  const blog_title = document.querySelector("#edit-blog-title").value.trim();
  const blog_content = document
    .querySelector("#edit-blog-content")
    .value.trim();

  //   console.log(title);
  //   console.log(content);

  if (blog_title && blog_content) {
    const response = await fetch("/api/blog/add-blog", {
      method: "POST",
      body: JSON.stringify({ blog_title, blog_content }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#add-blog-form")
  .addEventListener("submit", addBlogFormHandler);
