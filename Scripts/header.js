var contentHeight = Math.max(
    document.body.scrollHeight, 
    document.body.offsetHeight, 
    document.documentElement.clientHeight, 
    document.documentElement.scrollHeight, 
    document.documentElement.offsetHeight
);

//DynamicClock
let hour = "";
let minute = "";
let ampm = "";
let clockRefreshCounter = 5;
const clocklabel = document.getElementById('clockLabel');
function updateJakartaTime() {
  clockRefreshCounter += 1;
  if(clockRefreshCounter > 5){
    const now = new Date();
    const jakartaTime = new Date(
        now.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })
    );

    hour = jakartaTime.getHours();
    minute = jakartaTime.getMinutes();
    ampm = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12;
    hour = hour ? hour : 12;

    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;

    clockRefreshCounter = 0;
  }

  if(clockRefreshCounter % 2){
    clocklabel.textContent = hour + " " + minute + " " + ampm;
  }else{
    clocklabel.textContent = hour + ":" + minute + " " + ampm;
  }
}

updateJakartaTime();
setInterval(updateJakartaTime, 1000);

//WelcomeAnimation
const HeadS = document.getElementById("headSection");
function playAnimation(duration){
    const startTime = performance.now();

    function frame(currentTime) {
        const elapsed = (currentTime - startTime) / 1000;
        const rawestvalue = Math.min(elapsed / duration, 1);
        const value = 1 - Math.pow(1 - rawestvalue, 4);

        // console.log(value);

        var a = 250;
        HeadS.style.marginTop = a + value * (0 - a) + "px";

        if (rawestvalue < 1) {
            requestAnimationFrame(frame);
        }
    }

    requestAnimationFrame(frame);
}
playAnimation(1);

const projectSection = document.getElementById('projectSection');
const HeadLabel = document.getElementById("headLabel");
// const HeadMessage = HeadLabel.innerHTML;
function playTextAnimation(duration){
    const startTime = performance.now();

    const FirstMessage = "Games played, games built - ";
    const SecondMessage = "devoting my";
    const ThirdMessage = "passions into digital’s tapestry.";
    const CombinedLength = FirstMessage.length + SecondMessage.length + ThirdMessage.length;
    function frame(currentTime) {
        const elapsed = (currentTime - startTime) / 1000;
        const rawestvalue = Math.min(elapsed / duration, 1);
        const value = 1 - Math.pow(1 - rawestvalue, 4);

        const length = Math.floor(CombinedLength * value);
        const SecondSlice = Math.min(Math.max(length - FirstMessage.length, 0), Infinity);
        const ThirdSlice = Math.min(Math.max(length - FirstMessage.length - SecondMessage.length, 0), Infinity);

        let LineBreak = '<br><span class="InvisibleLabel">.';
        if(ThirdSlice > 1){
          LineBreak = "<br>";
        }
        HeadLabel.innerHTML = FirstMessage.slice(0, length) + '<span class="highlightedHeadLabel">' + SecondMessage.slice(0, SecondSlice) + LineBreak + ThirdMessage.slice(0, ThirdSlice);

        // const length = Math.floor(HeadMessage.length * rawestvalue);
        // HeadLabel.innerHTML = HeadMessage.slice(0, length);

        if (rawestvalue < 1) {
          requestAnimationFrame(frame);
        }
    }

    requestAnimationFrame(frame);
}

function playProjectAnimation(duration){
    const startTime = performance.now();
    function frame(currentTime) {
        const elapsed = (currentTime - startTime) / 1000;
        const rawestvalue = Math.min(elapsed / duration, 1);
        const value = 1 - Math.pow(1 - rawestvalue, 4);

        projectSection.style.opacity = 0.1 + value;

        if (rawestvalue < 1) {
          requestAnimationFrame(frame);
        }
    }

    requestAnimationFrame(frame);
}

const WorkLabel = document.getElementById("projectHeader");
function playWorkTextAnimation(duration){
    const startTime = performance.now();

    function frame(currentTime) {
        const elapsed = (currentTime - startTime) / 1000;
        const rawestvalue = Math.min(elapsed / duration, 1);
        const value = 1 - (1 - rawestvalue) * (1 - rawestvalue);

        let Text = 'Selected Works';
        const length = Math.floor(Text.length * value);
        WorkLabel.innerHTML = Text.slice(0, length);

        if (rawestvalue < 1) {
          requestAnimationFrame(frame);
        }
    }

    requestAnimationFrame(frame);
}

function RelabelWorks(){
  var workTemplates = document.querySelectorAll('div[class="workTemplate"]');

  let projectCount = 1;
  for (const element of workTemplates) {
    element.querySelector(".workCount").innerHTML = "#" + projectCount.toString().padStart(2, '0');
    projectCount += 1;
  }
}

if(window.innerHeight < window.innerWidth){
  document.getElementById('phoneBlocker').classList.add("disable");
}
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

//Work
if(WorkLabel){
  RelabelWorks();

  // projectSection.style.opacity = 0.1;
  playWorkTextAnimation(1);
  // setTimeout(() => {
  //   playProjectAnimation(3);
  // }, 150);
}

//Home
if(HeadLabel && projectSection){
  RelabelWorks();
  
  playTextAnimation(1.5);
  projectSection.style.opacity = 0.1;
  setTimeout(() => {
    playProjectAnimation(3);
  }, 150);
}

//About
const aboutHd = document.getElementById("aboutHead");
if(aboutHd){
  var HeaderLabel = aboutHd.querySelector(".AboutHeaderLabel");
  var HeaderTitle = aboutHd.querySelector(".AboutHeaderTitle");
  playAboutAnimation(HeaderLabel, HeaderTitle, 1);
}

function playAboutAnimation(label, title, duration){
    const startTime = performance.now();
    function frame(currentTime) {
        const elapsed = (currentTime - startTime) / 1000;
        const rawestvalue = Math.min(elapsed / duration, 1);
        // const value = 1 - Math.pow(1 - rawestvalue, 4);

        SetAboutTitle(title, rawestvalue);
        SetAboutLabel(label, rawestvalue);

        if (rawestvalue < 1) {
          requestAnimationFrame(frame);
        }
    }

    requestAnimationFrame(frame);
}

function SetAboutTitle(title, x){
  var AboutTitle1 = "devoting my passions";
  var AboutTitle2 = "into digital’s tapestry.";

  const value = x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

  const length1 = Math.floor((AboutTitle1.length) * clamp(value*2,0,1));
  const length2 = Math.floor((AboutTitle2.length) * clamp((value-0.5)*2,0,Infinity));
  const line1 = `${AboutTitle1.slice(0, length1)}<span class="HiddenLabel">${AboutTitle1.slice(length1)}</span>`;
  const line2 = `${AboutTitle2.slice(0, length2)}<span class="HiddenLabel">${AboutTitle2.slice(length2)}</span>`;
  title.innerHTML = line1 + "<br>" + line2;
}
function SetAboutLabel(label, x){
  const value = 1 - (1 - x) * (1 - x);

  var AboutLabel = "All in or nothing";
  const labelLength = Math.floor(AboutLabel.length * value);
  label.innerHTML = "[ " + AboutLabel.slice(0, labelLength) + " ]";
}