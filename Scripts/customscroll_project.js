const body = document.body;
const scrollWrap = document.getElementsByClassName("customscroll")[0];
const speed = 0.075;

var contentHeight = Math.max(
    document.body.scrollHeight, 
    document.body.offsetHeight, 
    document.documentElement.clientHeight, 
    document.documentElement.scrollHeight, 
    document.documentElement.offsetHeight
);

banner = document.getElementById("banner");
footerTitle = document.getElementById("footerTitle");
footerDesc = document.getElementById("footerDesc");
moreProject = document.getElementById("moreProject");

const allElements = [
    ...document.getElementsByClassName('NormalText'),
    ...document.getElementsByClassName('ImageSection'),
    ...document.getElementsByClassName('VideoSection')
];

function playAnimation(duration) {
    const startTime = performance.now();

    function frame(currentTime) {
        const elapsed = (currentTime - startTime) / 1000;
        const rawestvalue = Math.min(elapsed / duration, 1);
        const value = 1 - Math.pow(1 - rawestvalue, 4);

        var a = 250;
        scrollWrap.style.marginTop = a + value * (0 - a) + "px";

        if (value < 1) {
            requestAnimationFrame(frame);
        }
    }

    requestAnimationFrame(frame);
}
playAnimation(1);

var offset = 0;
function smoothScroll(){
    let wrapHeight = scrollWrap.getBoundingClientRect().height;
    body.style.height = Math.round(wrapHeight) + "px";

    offset += ((window.scrollY || window.pageYOffset) - offset) * speed;
    var scroll = "translateY(-" + offset + "px) translateZ(0)";

    scrollWrap.style.transform = scroll;
    callScroll = requestAnimationFrame(smoothScroll);

    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    var maxScrollTop = contentHeight - viewportHeight;

    if(banner){
        let BannerSize = banner.getBoundingClientRect().height + 100;
        var ContactValue = (offset-maxScrollTop)/BannerSize;
        ContactValue = Math.min(Math.max(ContactValue, 0), 1);

        var posStart = 100;
        var posEnd = 0;
        banner.style.backgroundPositionY = (posStart + ContactValue * (posEnd - posStart)) + "%";
    }

    var clientHeight = document.documentElement.clientHeight;
    for (const element of allElements){
        var elementPos = element.getBoundingClientRect().top + offset;
        var elementHeight = element.getBoundingClientRect().height;
        var ContactValue = (offset-elementPos+clientHeight-100)/(elementHeight+200);
        ContactValue = Math.min(Math.max(ContactValue, 0), 1);

        element.style.opacity = 0.05 + ContactValue;
        element.style.transform = "scale(" + (0.975 + (1 - Math.pow(1 - ContactValue, 3)) * (1 - 0.975)) + ")";
    }

    const TitleText = "More Work";
    if(footerTitle){
        var elementPos = footerTitle.getBoundingClientRect().top + offset;
        var elementHeight = footerTitle.getBoundingClientRect().height;
        var ContactValue = (offset-elementPos+clientHeight-50)/(elementHeight+200);
        ContactValue = Math.min(Math.max(ContactValue, 0), 1);
        
        var TypingCursor = '<span class="glitch-char">_';
        if(ContactValue > 0.99){
            TypingCursor = "";
        }
        const length = Math.floor(TitleText.length * ContactValue);
        footerTitle.innerHTML = TitleText.slice(0, length) + TypingCursor;
    }

    const DescText = "devoting my passions into digital’s tapestry";
    if(footerDesc){
        var elementPos = footerDesc.getBoundingClientRect().top + offset;
        var elementHeight = footerDesc.getBoundingClientRect().height;
        var ContactValue = (offset-elementPos+clientHeight)/(elementHeight+70);
        ContactValue = Math.min(Math.max(ContactValue, 0), 1);

        var TypingCursor = '<span class="glitch-char">_';
        if(ContactValue > 0.99){
            TypingCursor = "";
        }

        const length = Math.floor(DescText.length * ContactValue);
        footerDesc.innerHTML = DescText.slice(0, length) + TypingCursor;
    }

    if(moreProject){
        var elementPos = moreProject.getBoundingClientRect().top + offset;
        var elementHeight = moreProject.getBoundingClientRect().height + 120;
        var ContactValue = (offset-elementPos+clientHeight)/(elementHeight);
        ContactValue = Math.min(Math.max(ContactValue, 0), 1);

        var ContactValue1 = ContactValue*2;
        var ContactValue2 = (ContactValue-0.5)*2;

        moreProject.children[0].style.opacity = ContactValue1;
        moreProject.children[1].style.opacity = ContactValue2;
        // console.log(ContactValue);
    }
}
smoothScroll();

const HeadLabel = document.getElementById("headLabel");
const HeadMessage = HeadLabel.innerHTML;
console.log(HeadMessage);
function playTextAnimation(duration){
    const startTime = performance.now();

    function frame(currentTime) {
        const elapsed = (currentTime - startTime) / 1000;
        const rawestvalue = Math.min(elapsed / duration, 1);
        const value = 1 - (1 - rawestvalue) * (1 - rawestvalue);

        const length = Math.floor(HeadMessage.length * value);
        HeadLabel.innerHTML = HeadMessage.slice(0, length);

        if (value < 1) {
          requestAnimationFrame(frame);
        }
    }

    requestAnimationFrame(frame);
}
playTextAnimation(1);