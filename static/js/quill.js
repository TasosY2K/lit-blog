import Quill from "quill";
import "quill/dist/quill.snow.css";

const runQuill = () => {
    const createContainer = document.getElementById("createQuill");
    const editContainer = document.getElementById("editQuill");
    if (
        document.body.contains(createContainer) &&
        document.body.contains(editContainer)
    ) {
        const createPostContent = new Quill(createContainer, { theme: "snow" });
        const editPostContent = new Quill(editContainer, { theme: "snow" });

        window.editQuill = editPostContent;

        createPostContent.on("text-change", () => {
            document.getElementById("createInput").value = JSON.stringify(
                createPostContent.getContents().ops
            );
        });

        editPostContent.on("text-change", () => {
            document.getElementById("editInput").value = JSON.stringify(
                editPostContent.getContents().ops
            );
        });
    }
};

if (window.addEventListener) window.addEventListener("load", runQuill, false);
else if (window.attachEvent) window.attachEvent("onload", runQuill);
else window.onload = runQuill;
