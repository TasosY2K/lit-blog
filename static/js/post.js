const editPost = (id) => {
    document
        .getElementById("editForm")
        .setAttribute("action", "/post/edit/" + id);

    fetch("/post/content/" + id)
        .then((response) => response.json())
        .then((data) => {
            window.editQuill.setContents(JSON.parse(data.content));
            document.getElementById("editTitle").value = data.title;
            document.getElementById("editImgPreview").src =
                "/img/" + data.image;
        });
};

const deletePost = (id) => {
    document
        .getElementById("deleteForm")
        .setAttribute("action", "/post/delete/" + id);
};

const runPost = () => {
    window.editPost = editPost;
    window.deletePost = deletePost;
};

if (window.addEventListener) window.addEventListener("load", runPost, false);
else if (window.attachEvent) window.attachEvent("onload", runPost);
else window.onload = runPost;
