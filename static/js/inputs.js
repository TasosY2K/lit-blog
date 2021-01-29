const runInputs = () => {
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

    const siteImgInput = document.getElementById("siteImgInput");
    const iconImgInput = document.getElementById("iconImgInput");

    if (
        document.body.contains(siteImgInput) &&
        document.body.contains(iconImgInput)
    ) {
        siteImgInput.addEventListener("change", (e) => {
            const reader = new FileReader();
            reader.onload = () => {
                const output = document.getElementById("siteImgPreview");
                output.src = reader.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        });

        iconImgInput.addEventListener("change", (e) => {
            const reader = new FileReader();
            reader.onload = () => {
                const output = document.getElementById("iconImgPreview");
                output.src = reader.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        });
    }
};

if (window.addEventListener) window.addEventListener("load", runInputs, false);
else if (window.attachEvent) window.attachEvent("onload", runInputs);
else window.onload = runInputs;
