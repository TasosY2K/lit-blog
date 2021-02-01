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

const editProject = (id) => {
    document
        .getElementById("editForm")
        .setAttribute("action", "/project/edit/" + id);

    fetch("/project/content/" + id)
        .then((response) => response.json())
        .then((data) => {
            window.editQuill.setContents(JSON.parse(data.content));
            document.getElementById("editTitle").value = data.title;
            document.getElementById("editImgPreview1").src =
                "/img/" + data.image1;
            document.getElementById("editImgPreview2").src =
                "/img/" + data.image2;
            document.getElementById("editImgPreview3").src =
                "/img/" + data.image3;
        });
};

const deleteProject = (id) => {
    document
        .getElementById("deleteForm")
        .setAttribute("action", "/project/delete/" + id);
};

const runPost = () => {
    window.editPost = editPost;
    window.deletePost = deletePost;
    window.editProject = editProject;
    window.deleteProject = deleteProject;

    const abtContent = document.getElementById("bgContent");
    if (window.aboutQuill && document.body.contains(abtContent)) {
        window.aboutQuill.setContents(JSON.parse(abtContent.innerHTML));
    }
};

if (window.addEventListener) window.addEventListener("load", runPost, false);
else if (window.attachEvent) window.attachEvent("onload", runPost);
else window.onload = runPost;
