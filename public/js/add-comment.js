async function commentFormHandler(event) {
  event.preventDefault();

  const comment_desc = document
    .querySelector(".new-comment-content")
    .value.trim();

  const blog_id = window.location.toString().split("/").pop();

  if (comment_desc) {
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        blog_id,
        comment_desc,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector(".add-comment-btn")
  .addEventListener("click", commentFormHandler);
