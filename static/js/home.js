const runHome = () => {
    const backGround = document.getElementById("bgImg");
    if (document.body.contains(backGround)) {
        document.getElementById("body").style.backgroundImage = "url('" + backGround.innerHTML + "')";
    }
}

if (window.addEventListener) window.addEventListener("load", runHome, false);
else if (window.attachEvent) window.attachEvent("onload", runHome);
else window.onload = runHome;
