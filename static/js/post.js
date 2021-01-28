const editPost = (id) => {
    document
        .getElementById("editForm")
        .setAttribute("action", "/post/edit/" + id);

    fetch("/post/content/" + id)
        .then((response) => response.json())
        .then((data) => {
            window.editQuill.setContents(JSON.parse(data.content));
            document.getElementById("editTitle").value = data.title;
            document.getElementById("editImgPreview").src = "/img/" + data.image;
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

    const createImgInput = document.getElementById("createImgInput");
    const editImgInput = document.getElementById("editImgInput");
    
     if (
        document.body.contains(createImgInput) &&
        document.body.contains(editImgInput)
    ) {
        createImgInput.addEventListener("change", (e) => {
            const reader = new FileReader();
            reader.onload = () => {
                const output = document.getElementById("createImgPreview");
                output.src = reader.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        });
    
        editImgInput.addEventListener("change", (e) => {
            const reader = new FileReader();
            reader.onload = () => {
                const output = document.getElementById("editImgPreview");
                output.src = reader.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        });
    }
};

if (window.addEventListener) window.addEventListener("load", runPost, false);
else if (window.attachEvent) window.attachEvent("onload", runPost);
else window.onload = runPost;
