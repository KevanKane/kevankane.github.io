function Distance(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
}

function getDistanceFromDiv(event, div) {
    const rect = div.getBoundingClientRect();
    const divCenterX = rect.left + rect.width / 2;
    const divCenterY = rect.top + rect.height / 2;
    
    const dx = event.clientX - divCenterX;
    const dy = event.clientY - divCenterY;

    return Math.sqrt(dx * dx + dy * dy);
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
}

const HoverUI = document.getElementById("trailer");

const animateTrailer = (e, interacting) => {
  const x = e.clientX - HoverUI.offsetWidth / 2,
        y = e.clientY - HoverUI.offsetHeight / 2 + 10;
  
  const keyframes = {
    transform: `translate(${x}px, ${y}px) scale(${interacting ? 1 : 0.5})`,
    opacity: `${interacting ? 1 : 0}`
  }

  trailer.animate(keyframes, { 
    duration: 400, 
    fill: "forwards" 
  });
}

function Distance(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
}

function getDistanceFromDiv(event, div) {
    const rect = div.getBoundingClientRect();
    const divCenterX = rect.left + rect.width / 2;
    const divCenterY = rect.top + rect.height / 2;
    
    const dx = event.clientX - divCenterX;
    const dy = event.clientY - divCenterY;

    return Math.sqrt(dx * dx + dy * dy);
}

var workTemplates = document.querySelectorAll('div[class="workTemplate"]');
window.onmousemove = e => {
    const interactable = e.target.closest(".workTemplate"),
    interacting = interactable !== null;

    workTemplates.forEach(function(div){
        if(interacting){
            if(div == interactable){
                div.style.opacity = 1;
            }else{
                div.style.opacity = 0.35;
            }
        }else{
            div.style.opacity = 1;
        }

        workTrailer = div.querySelector(".workTrailer");
        if(workTrailer){
            var rect = div.getBoundingClientRect();
            var xRelativeToDiv = e.clientX - rect.left;
            var yRelativeToDiv = e.clientY - rect.top;

            var RawX = (xRelativeToDiv / div.offsetWidth);
            var RawY = (yRelativeToDiv / div.offsetHeight);

            var x = (RawX*div.offsetWidth)-(workTrailer.offsetWidth/2);
            var y = (RawY*div.offsetHeight)-(workTrailer.offsetHeight/2);

            sameDiv = (interactable == div) && interacting;
            if(true){
                const keyframes = {marginLeft: x + "px", marginTop: y + "px"}
                workTrailer.animate(keyframes,{ 
                    duration: 800, 
                    fill: "forwards" 
                });
            }

            const distance = getDistanceFromDiv(e, workTrailer);
            const scaleKeyframes = {transform: `scale(${(sameDiv) ? 1 + distance/75 : 0})`}
            workTrailer.animate(scaleKeyframes, { 
                duration: 1600, 
                fill: "forwards" 
            });
        }
    });

    // animateTrailer(e, interacting);

    // const icon = document.getElementById("trailer-icon");
    
    // trailer.dataset.type = interacting ? interactable.dataset.type : "";
    
    // if(interacting) {
    //   icon.className = getTrailerClass(interactable.dataset.type);
    // }
}