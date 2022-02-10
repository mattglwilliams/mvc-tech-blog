const updateBlogHandler = async (event) => {
  event.preventDefault();

  const blog_title = document.querySelector("#edit-blog-title").value.trim();
  const blog_content = document
    .querySelector("#edit-blog-content")
    .value.trim();
  const id = window.location.toString().split("/").pop();

  //   console.log(blog_title);
  //   console.log(blog_content);
  //   console.log(id);

  const response = await fetch(`/api/blog/${id}`, {
    method: "PUT",
    body: JSON.stringify({ blog_title, blog_content }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector(".update-btn")
  .addEventListener("click", updateBlogHandler);
