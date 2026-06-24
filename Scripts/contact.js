const words = ["great", "amazing", "memorable", "meaningful"];

const element = document.getElementById("changing-word");

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const currentWord = words[wordIndex];

  if (!deleting) {
    // Typing
    element.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      deleting = true;
      setTimeout(type, 1500); // pause when word is complete
      return;
    }
  } else {
    // Deleting
    element.textContent = currentWord.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  const speed = deleting ? 50 : 100;
  setTimeout(type, speed);
}

type();