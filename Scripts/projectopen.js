const projectTransition = document.getElementById("projectTransition");
const transitionLabel = projectTransition.querySelector("a");
const allWork = document.getElementsByClassName("workTemplate");

let TargetName = "";
for (const element of allWork){
    element.addEventListener("click", () => {
        const href = element.dataset.href;

        if(href != null){
            TargetName = element.querySelector(".workTitle").innerHTML;
            transitionLabel.innerText = '<span class="HiddenLabel">' + TargetName;
            projectTransition.style.height = "0%";

            playAnimation(0.8);

            setTimeout(() => {
                fadeOutBody(0.25);
                setTimeout(() => {
                    window.location.href = href;
                }, 260);
            }, 800);
        }
    });
}

function playAnimation(duration) {
    const startTime = performance.now();

    function frame(currentTime) {
        const elapsed = (currentTime - startTime) / 1000;
        const rawestvalue = Math.min(elapsed / duration, 1);
        const value = 1 - Math.pow(1 - rawestvalue, 4);

        projectTransition.style.height = ""+ lerp(0, 100, value) +"%";

        const length = Math.floor(TargetName.length * (lerp(0, 1.5, rawestvalue)));
        const visible = TargetName.slice(0, length);
        const remaining = TargetName.slice(length);
        transitionLabel.innerHTML = `${visible}<span class="HiddenLabel">${remaining}</span>`;

        if (value < 1) {
            requestAnimationFrame(frame);
        }
    }

    requestAnimationFrame(frame);
}

window.addEventListener("pageshow", (event) => {
    document.body.style.opacity = 1;
    projectTransition.style.height = "0%";
});

var allContact = document.getElementsByClassName("Contact");
if(allContact){
    for (const element of allContact) {
        // console.log(child.innerHTML); 
        element.addEventListener("click", () => {
            const href = element.dataset.href;
            if(href != null){
                FadeBack(href);
            }
        });
    }
}
var mainLogo = document.getElementById("backToHome");
var allHeaderNav = document.getElementsByClassName("navLabel");
if(allHeaderNav){
    if(mainLogo){
        mainLogo.addEventListener("click", () => {
            const href = mainLogo.dataset.href;
            FadeBack(href);
        });
    }

    for (const element of allHeaderNav) {
        // console.log(child.innerHTML); 
        element.addEventListener("click", () => {
            const href = element.dataset.href;
            FadeBack(href);
        });
    }
}

var projectMore = document.getElementsByClassName("ProjectMoreButton");
if(projectMore[0]){
    projectMore[0].addEventListener("click", () => {
        const href = projectMore[0].dataset.href;
        FadeBack(href);
    });
}

var allFooterNav = document.getElementsByClassName("menuJump");
if(allFooterNav){
    for (const element of allFooterNav) {
        // console.log(child.innerHTML); 
        element.addEventListener("click", () => {
            const href = element.dataset.href;
            FadeBack(href);
        });
    }
}
var projectBack = document.getElementsByClassName("BackButton");
if(projectBack[0]){
    projectBack[0].addEventListener("click", () => {
        const href = projectBack[0].dataset.href;
        FadeBack(href);
    });
}

function FadeBack(href){
    if(href != null){
        fadeOutBody(0.25);
        setTimeout(() => {
            window.location.href = href;
        }, 260);
    }
}

function fadeOutBody(duration) {
    const startTime = performance.now();

    function frame(currentTime) {
        const elapsed = (currentTime - startTime) / 1000;
        const rawestvalue = Math.min(elapsed / duration, 1);
        const value = rawestvalue * rawestvalue;

        document.body.style.opacity = 1-value;

        if (value < 1) {
            requestAnimationFrame(frame);
        }
    }

    requestAnimationFrame(frame);
}

function lerp(a, b, value){
    return a + value * ( b - a )
}