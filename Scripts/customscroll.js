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

copyBtn = document.getElementById("copyEmailBtn");
copyNotice = copyBtn.querySelector(".CopyNotice");

const body = document.body;
const scrollWrap = document.getElementsByClassName("customscroll")[0];
const speed = 0.075;

let FooterSize;

var offset = 0;
function smoothScroll(){
    let wrapHeight = scrollWrap.getBoundingClientRect().height;
    body.style.height = Math.round(wrapHeight) + "px";

    offset += ((window.scrollY || window.pageYOffset) - offset) * speed;
    var scroll = "translateY(-" + offset + "px) translateZ(0)";

    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    var maxScrollTop = contentHeight - viewportHeight;

    if(navbar){
        var HomeLerp = offset/100;
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
                element.style.transform = "scale(" + (0.975 + (1 - Math.pow(1 - ContactValue, 3)) * (1 - 0.975)) + ")";
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
    }

    scrollWrap.style.transform = scroll;//SmoothScroll
    callScroll = requestAnimationFrame(smoothScroll);
}
smoothScroll();

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