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

    const createImgInput1 = document.getElementById("createImgInput1");
    const createImgInput2 = document.getElementById("createImgInput2");
    const createImgInput3 = document.getElementById("createImgInput3");

    const editImgInput1 = document.getElementById("editImgInput1");
    const editImgInput2 = document.getElementById("editImgInput2");
    const editImgInput3 = document.getElementById("editImgInput3");

    if (
        document.body.contains(createImgInput1) &&
        document.body.contains(createImgInput2) &&
        document.body.contains(createImgInput3) &&
        document.body.contains(editImgInput1) &&
        document.body.contains(editImgInput2) &&
        document.body.contains(editImgInput3)
    ) {
        createImgInput1.addEventListener("change", (e) => {
            const reader = new FileReader();
            reader.onload = () => {
                const output = document.getElementById("createImgPreview1");
                output.src = reader.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        });

        createImgInput2.addEventListener("change", (e) => {
            const reader = new FileReader();
            reader.onload = () => {
                const output = document.getElementById("createImgPreview2");
                output.src = reader.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        });

        createImgInput3.addEventListener("change", (e) => {
            const reader = new FileReader();
            reader.onload = () => {
                const output = document.getElementById("createImgPreview3");
                output.src = reader.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        });

        editImgInput1.addEventListener("change", (e) => {
            const reader = new FileReader();
            reader.onload = () => {
                const output = document.getElementById("editImgPreview1");
                output.src = reader.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        });

        editImgInput2.addEventListener("change", (e) => {
            const reader = new FileReader();
            reader.onload = () => {
                const output = document.getElementById("editImgPreview2");
                output.src = reader.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        });

        editImgInput3.addEventListener("change", (e) => {
            const reader = new FileReader();
            reader.onload = () => {
                const output = document.getElementById("editImgPreview3");
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
