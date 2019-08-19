import "./style.scss";

import * as Logo from './logo.svg';

class TypeWriter {
  constructor(elem, words, delay = 3000) {
    this.elem = elem;
    this.words = words;
    this.delay = parseInt(delay, 10);
    this.txt = '';
    this.wordIndex = 0;
    this.isDeleting = false;
    this.type();
  }

  type() {
    // get the correct word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // set txt according to isDeleting
    if(this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.elem.innerHTML = `<span class="typewriter-txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 150;
    if(this.isDeleting) {
      typeSpeed /= 2;
    }

    // calculate the delay and setting isDeleting
    if(!this.isDeleting && (this.txt === fullTxt)) {
      // end of word
      this.isDeleting = true;
      typeSpeed = this.delay;
    } else if(this.isDeleting && (this.txt === '')) {
      // start of word
      this.isDeleting = false;
      // pause before starting to type
      typeSpeed = 500;
      // next word
      this.wordIndex++;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

const startTypeWriter = () => {
  const elem = document.getElementById("typewriter");
  const words = JSON.parse(elem.getAttribute("data-words"));
  const delay = elem.getAttribute("data-delay");
  
  new TypeWriter(elem, words, delay);
}

document.addEventListener("DOMContentLoaded", startTypeWriter);
