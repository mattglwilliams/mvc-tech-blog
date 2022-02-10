const deleteBlogHandler = async (event) => {
  event.preventDefault();

  const id = window.location.toString().split("/").pop();

  const response = await fetch(`/api/blog/${id}`, {
    method: "DELETE",
    body: JSON.stringify({ blog_id: id }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector(".delete-btn")
  .addEventListener("click", deleteBlogHandler);
