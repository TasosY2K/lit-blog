import Quill from "quill";
import "quill/dist/quill.snow.css";

import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

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
            document.getElementById(
                "createInputText"
            ).value = createPostContent.getText();
        });

        editPostContent.on("text-change", () => {
            document.getElementById("editInput").value = JSON.stringify(
                editPostContent.getContents().ops
            );
            document.getElementById(
                "editInputText"
            ).value = editPostContent.getText();
        });
    }

    const aboutContainer = document.getElementById("aboutContainer");

    if (document.body.contains(aboutContainer)) {
        const aboutContent = new Quill(aboutContainer, { theme: "snow" });

        window.aboutQuill = aboutContent;

        aboutContent.on("text-change", () => {
            document.getElementById("aboutInput").value = JSON.stringify(
                aboutContent.getContents().ops
            );
            document.getElementById("aboutText").value = aboutContent.getText();
        });
    }

    const bgContent = document.getElementById("bgContent");
    const postContainer = document.getElementById("postContainer");

    if (
        document.body.contains(bgContent) &&
        document.body.contains(postContainer)
    ) {
        const html = JSON.parse(bgContent.innerHTML);

        const converter = new QuillDeltaToHtmlConverter(html, {});

        const htmlRendered = converter.convert();

        postContainer.innerHTML = htmlRendered;
    }
};

if (window.addEventListener) window.addEventListener("load", runQuill, false);
else if (window.attachEvent) window.attachEvent("onload", runQuill);
else window.onload = runQuill;
