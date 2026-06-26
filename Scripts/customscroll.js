//smoothScroll
var contentHeight = Math.max(
    document.body.scrollHeight, 
    document.body.offsetHeight, 
    document.documentElement.clientHeight, 
    document.documentElement.scrollHeight, 
    document.documentElement.offsetHeight
);
navbar = document.getElementById("mainHeader");
footer = document.getElementById("footer");
about = document.getElementById("about");
aboutH = document.getElementById("aboutHead");

aboutH1 = document.getElementById("a_head1");
aboutH2 = document.getElementById("a_head2");
aboutH3 = document.getElementById("a_head3");

let allAboutElements = {};
allSkills = document.getElementsByClassName('SkillTemplate');
if(aboutH){
    allAboutElements = [
        ...document.getElementsByClassName('AboutLabel'),
        ...document.getElementsByClassName('SkillsTitle'),
        ...document.getElementsByClassName('ServicesTemplate'),
        ...document.getElementsByClassName('CollabQuote'),
        ...document.getElementsByClassName('CollabResponse')[0].children
    ];
}

copyBtn = document.getElementById("copyEmailBtn");
copyNotice = copyBtn.querySelector(".CopyNotice");

const body = document.body;
const scrollWrap = document.getElementsByClassName("customscroll")[0];
const speed = 0.075;

let FooterSize;

var offset = 0;
let aboutHAnimation = false;
let aboutHScroll = 0;
function smoothScroll(){
    let wrapHeight = scrollWrap.getBoundingClientRect().height;
    body.style.height = Math.round(wrapHeight) + "px";

    offset += ((window.scrollY || window.pageYOffset) - offset) * speed;
    var scroll = "translateY(-" + offset + "px) translateZ(0)";

    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    var maxScrollTop = contentHeight - viewportHeight;

    if(navbar){
        let NavBarInitiate = 0;
        if(aboutH){
            NavBarInitiate = 250*3;
        }
        
        var HomeLerp = clamp(offset-NavBarInitiate, 0, Infinity)/100;
        HomeLerp = clamp(HomeLerp, 0, 1);

        navbar.style.paddingTop = 25 * (1-HomeLerp) + "px";
        navbar.style.backgroundColor =  "hsl(0, 0%, 2%, " + 0.75 * (HomeLerp) + ")";
        navbar.style.backdropFilter = "blur("+ 10 * (HomeLerp) +"px)";
        navbar.style.outlineColor = "hsl(0 0% 50%/" + 0.25 * (HomeLerp) + ")";
    }
    if(footer){
        FooterSize = footer.getBoundingClientRect().height;
        var FooterEffect = FooterSize/2 + 100;
        body.style.marginBottom = FooterSize + "px";

        if(offset > maxScrollTop-FooterSize){
            var ContactValue = (offset-maxScrollTop+FooterSize)/FooterSize;
            footer.style.marginBottom = (FooterEffect-(ContactValue*FooterEffect))*-1 + "px";
            footer.style.opacity = ContactValue;
            footer.style.transform = "scale(" + (1.1 + ContactValue * (1 - 1.1)) + ")";

            var blurAmount = 2.5;
            footer.style.filter = "blur("+ (blurAmount + ContactValue * ( 0 - blurAmount )) +"px)"
        }else{
            footer.style.opacity = 0;
        }

        if(about){
            let AboutSize = about.getBoundingClientRect().height * 2;
            var ContactValue = (offset-maxScrollTop+AboutSize)/AboutSize;
            ContactValue = Math.min(Math.max(ContactValue, 0), 1);

            const Portrait = about.querySelector(".AboutContainer").querySelector(".AboutPortrait");

            var posStart = 100;
            var posEnd = 30;
            Portrait.style.backgroundPositionY = (posStart + ContactValue * (posEnd - posStart)) + "%";

            var ZoomValue = (offset-maxScrollTop+(AboutSize/2)+FooterSize)/(AboutSize/2);
            ZoomValue = Math.min(Math.max(ZoomValue, 0), 1);
            
            var sizeStart = 150;
            var sizeEnd = 100;
            Portrait.style.backgroundSize = (sizeStart + (1 - Math.pow(1 - ZoomValue, 3)) * (sizeEnd - sizeStart)) + "%";

            // aboutTexts
            var aboutTexts = document.getElementById('aboutText').querySelectorAll("a");
            var clientHeight = document.documentElement.clientHeight;
            for (const element of aboutTexts){
                var elementPos = element.getBoundingClientRect().top + offset;
                var elementHeight = element.getBoundingClientRect().height;
                var ContactValue = (offset-elementPos+clientHeight-50)/(elementHeight+200);
                ContactValue = Math.min(Math.max(ContactValue, 0), 1);

                element.style.opacity = 0.05 + ContactValue;
                element.style.transform = "scale(" + lerp(0.975, 1, (1 - Math.pow(1 - ContactValue, 3))) + ")";
            }
        }

        if(copyBtn){
            const EmailLabel = copyBtn.parentElement.querySelector(".EmailButton");

            copyBtn.addEventListener("click", () => {
                navigator.clipboard.writeText(EmailLabel.textContent);

                copyNotice.classList.add("animate");
                copyNotice.classList.remove("animate");
                void copyNotice.offsetWidth;
                
                copyNotice.classList.add("animate");
            });
        }

        if(aboutH){
            var ImagePop = 250;
            var ContactWhole = offset/(ImagePop*3);
            var ContactValueH = clamp((offset-ImagePop*3)/1000, 0, 1);

            if(offset < (ImagePop*3)*3){
                var ContactValue1 = clamp(offset/ImagePop, 0, 1);
                setAboutH(aboutH1, ContactValue1, ContactValueH * 0.9 / 0.75);

                var ContactValue2 = clamp((offset-ImagePop)/ImagePop, 0, 1);
                setAboutH(aboutH2, ContactValue2, ContactValueH * 0.8 / 0.75);

                var ContactValue3 = clamp((offset-ImagePop*2)/ImagePop, 0, 1);
                setAboutH(aboutH3, ContactValue3, ContactValueH / 0.75);

                aboutH.style.backgroundSize = lerp(100, 105, -(Math.cos(Math.PI * ContactValueH) - 1) / 2) + "%";
                aboutHScroll = (lerp(0, -300, ContactValueH));
                if(aboutHAnimation){
                    aboutH.style.transform = "translateY(" + aboutHScroll + "px)";
                }

                aboutH.style.opacity = lerp(1, 0, (ContactValueH-0.25));
                aboutH.style.filter = "blur("+ (lerp(0, 5, (ContactValueH-0.25))) +"px)"
            }else{
                aboutH.style.opacity = 0;
            }

            var clientHeight = document.documentElement.clientHeight;
            for (const element of allAboutElements){
                var elementPos = element.getBoundingClientRect().top + offset;
                var elementHeight = element.getBoundingClientRect().height;
                var ContactValue = (offset-elementPos+clientHeight-100)/(elementHeight+200);
                ContactValue = Math.min(Math.max(ContactValue, 0), 1);

                element.style.opacity = 0.05 + ContactValue;
                element.style.transform = "scale(" + (0.975 + (1 - Math.pow(1 - ContactValue, 3)) * (1 - 0.975)) + ")";
            }

            var skillPos = allSkills[0].getBoundingClientRect().top + offset;
            var skillHeight = allSkills[0].getBoundingClientRect().height;
            var skillValue = (offset-skillPos+clientHeight)/(skillHeight+300);
            skillValue = Math.min(Math.max(skillValue, 0), 1);
            for (let i = 0; i < allSkills.length; i++) {
                const size = 1 / allSkills.length;
                const start = i * size;
                const end = start + size;

    
                allSkills[i].style.opacity = lerp(0.05, 1, clamp((skillValue - start) / size, 0, 1));
            }
        }
    }

    scrollWrap.style.transform = scroll;//SmoothScroll
    callScroll = requestAnimationFrame(smoothScroll);
}
smoothScroll();

if(aboutH){
    function playAnimation(duration) {
        const startTime = performance.now();

        function frame(currentTime) {
            const elapsed = (currentTime - startTime) / 1000;
            const rawestvalue = Math.min(elapsed / duration, 1);
            const value = 1 - Math.pow(1 - rawestvalue, 4);

            aboutH.style.transform = "translateY(" + (lerp(200, aboutHScroll, value)) + "px) scale("+ (lerp(1.5, 1, value)) +")";

            if(value < 1) {
                requestAnimationFrame(frame);
            }else{
                aboutHAnimation = true;
            }
        }

        requestAnimationFrame(frame);
    }

    playAnimation(1);
}
function setAboutH(targetElement, value, valueH){
    var EasedValue = 1 - (1 - value) * (1 - value);
    targetElement.style.backgroundSize = lerp(210, 100, EasedValue) + "%";
    targetElement.style.transform = "scale(" + lerp(0, 1, EasedValue) + ") translateY(-" + lerp(0, 300, valueH) + "px)";
}

function lerp(a, b, value){
    return a + value * ( b - a )
}
function clamp( val, min, max ){
    return Math.min( Math.max( val, min ), max )
}

//ButtonChangePos
if(document.getElementById("backToTop")){
    $('.backToTop').on('click', function (e) {
        $('html, body').animate({scrollTop: 0}, 600, "easeInOutQuad");
    });
}

if(document.getElementById("Contact")){
    $('#Contact').on('click', function (e) {
        $('html, body').animate({scrollTop: contentHeight}, 600, "easeInOutQuad");
    });
}

//BackToTopRotate
const backToTopDiv = document.getElementById("backToTopLabel");

let rotation = 0;

function backToTopLabelRotate() {
    if(backToTopDiv != null){
        rotation += 0.25; // degrees per frame
        backToTopDiv.style.transform = `rotate(${rotation}deg)`;

        requestAnimationFrame(backToTopLabelRotate);
    }
}
backToTopLabelRotate();