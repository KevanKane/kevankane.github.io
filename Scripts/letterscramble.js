const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let links = document.querySelectorAll('a[data-value]');
// let firstThree = Array.from(links).slice(0, 3);

links.forEach(link => {
  let interval = null;
  link.addEventListener('mouseover', () => {
      let iteration = 0;
      
      clearInterval(interval);
      
      interval = setInterval(() => {
        link.innerText = link.innerText
          .split("")
          .map((letter, index) => {
            if(index < iteration) {
              return link.dataset.value[index];
            }
          
            if(link.dataset.value[index] == " " || link.dataset.value[index] == "_"){
              return link.dataset.value[index];
            }else{
              return letters[Math.floor(Math.random() * 15)];
            }
          })
          .join("");
        
        if(iteration >= link.dataset.value.length){ 
          clearInterval(interval);
        }
        
        iteration += 1 / 3;
      }, 30);
  });
});