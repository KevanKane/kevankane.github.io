const trailer = document.getElementById("trailer");

const animateTrailer = (e, interacting, onContact, onLogoWide, onHeader) => {
    const x = e.clientX - trailer.offsetWidth / 2, 
    y = e.clientY - trailer.offsetHeight / 2;
  
    let trailerScale = 1;
    let cTrailerCL = "";
    if(interacting){
        trailerScale = 6;
        cTrailerCL = "select";
    }else if(onLogoWide){
        trailerScale = 7;
        cTrailerCL = "invert";
    }else if(onContact || onHeader){
        trailerScale = 1;
        cTrailerCL = "contact";
    }

    trailer.className = cTrailerCL;
    const keyframes = {
        transform: `translate(${x}px, ${y}px) scale(${trailerScale})`,
    }
  
    trailer.animate(keyframes, { 
        duration: 600, 
        fill: "forwards" 
    });
}

let interval1 = null;
let interval2 = null;

let SavedSelect;
//FadeNonSelected Addition
var workTemplates = document.querySelectorAll('div[class="workTemplate"]');
window.onmousemove = e => {
    const interactable = e.target.closest(".workTemplate");
    const ContactSection = e.target.closest(".ContactSection");
    const KevKaneWide = e.target.closest(".KevKaneWide");
    const Header = e.target.closest(".newHeader");
    const AboutMe = e.target.closest(".HeadAboutMe");

    interacting = interactable !== null;
    workTemplates.forEach(function(div){
        if(interacting){
            if(div == interactable){
                div.style.opacity = 1;
            }else{
                div.style.opacity = 0.25;
            }
        }else{
            div.style.opacity = 1;
        }
    });

    if(trailer != null){
        animateTrailer(e, interactable !== null, ContactSection !== null, KevKaneWide !== null, Header != null || AboutMe != null);
        trailer.dataset.type = interactable !== null ? interactable.dataset.type : "";

        if(SavedSelect != interacting){
            SavedSelect = interacting;
            if(SavedSelect){
                typeText(interval1, trailer.querySelector(".trailer1"), "View", 10, 100);
                typeText(interval2, trailer.querySelector(".trailer2"), "More", 10, 250);
            }
        }
    }
}


const CHARS = "#%&>_?";
function typeText(interval, element, text, speed = 50, delay = 1000) {
    if(interval != null){
        clearInterval(interval);
    }
    element.innerHTML = "";

    const scramble = text.split("").map(char => {
        if (char === "\n" || char === " ") return char;
        return randomChar();
    });

    element.innerHTML = '<span class="glitch-char">' + scramble.join("");

    let iteration = 0;

    setTimeout(() => {
        interval = setInterval(() => {
            element.innerHTML = text
            .split("")
            .map((char, index) => {
                if (char === "\n") return "<br>";
                if (char === " ") return " ";

                if (index < iteration) {
                return char;
                }

                return `<span class="glitch-char">${scramble[index]}</span>`;
            })
            .join("");

            iteration += 0.25;

            if (iteration >= text.length) {
                clearInterval(interval);
                element.innerHTML = text.replace(/\n/g, "<br>");
            }
        }, speed);
    }, delay); 
}

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}