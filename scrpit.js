// Zoom Animation on Scroll
const zoomContentElements = document.querySelectorAll(".zoom-content");

window.addEventListener("scroll", () => {
    zoomContentElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            element.classList.remove("animate"); // Reset animation
            void element.offsetWidth; // Trigger reflow to reset animation
            element.classList.add("animate"); // Apply animation again
        }
    });
});

// Video Playback Control
const video = document.querySelector("video");
if (window.matchMedia('(prefers-reduced-motion)').matches) {
    video.removeAttribute("autoplay");
    video.pause();
}

// Fade-in Effect on Scroll
document.addEventListener('DOMContentLoaded', function() {
    const fadeIns = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -20px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);

    fadeIns.forEach(fadeIn => {
        appearOnScroll.observe(fadeIn);
    });
});

// Carousel with Drag and Scroll
const lerp = (f0, f1, t) => (1 - t) * f0 + t * f1;
const clamp = (val, min, max) => Math.max(min, Math.min(val, max));

class DragScroll {
  constructor(obj) {
    this.$el = document.querySelector(obj.el);
    this.$wrap = this.$el.querySelector(obj.wrap);
    this.$items = this.$el.querySelectorAll(obj.item);
    this.$bar = this.$el.querySelector(obj.bar);
    this.init();
  }
  
  init() {
    this.progress = 0;
    this.speed = 0;
    this.oldX = 0;
    this.x = 0;
    this.playrate = 0;
    this.bindings();
    this.events();
    this.calculate();
    this.raf();
  }
  
  bindings() {
    ['events', 'calculate', 'raf', 'handleWheel', 'move', 'handleTouchStart', 'handleTouchMove', 'handleTouchEnd'].forEach(i => { this[i] = this[i].bind(this); });
  }
  
  calculate() {
    this.progress = 0;
    this.wrapWidth = this.$items[0].clientWidth * this.$items.length;
    this.$wrap.style.width = `${this.wrapWidth}px`;
    this.maxScroll = this.wrapWidth - this.$el.clientWidth;
  }
  
  handleWheel(e) {
    this.progress += e.deltaY;
    this.move();
  }
  
  handleTouchStart(e) {
    e.preventDefault();
    this.dragging = true;
    this.startX = e.clientX || e.touches[0].clientX;
    this.$el.classList.add('dragging');
  }

  handleTouchMove(e) {
    if (!this.dragging) return false;
    const x = e.clientX || e.touches[0].clientX;
    this.progress += (this.startX - x) * 2.5;
    this.startX = x;
    this.move();
  }

  handleTouchEnd() {
    this.dragging = false;
    this.$el.classList.remove('dragging');
  }
  
  move() {
    this.progress = clamp(this.progress, 0, this.maxScroll);
  }
  
  events() {
    window.addEventListener('resize', this.calculate);
    window.addEventListener('wheel', this.handleWheel);
    this.$el.addEventListener('touchstart', this.handleTouchStart);
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleTouchEnd);
    window.addEventListener('mousedown', this.handleTouchStart);
    window.addEventListener('mousemove', this.handleTouchMove);
    window.addEventListener('mouseup', this.handleTouchEnd);
    document.body.addEventListener('mouseleave', this.handleTouchEnd);
  }
  
  raf() {
    requestAnimationFrame(this.raf);
    this.x = lerp(this.x, this.progress, 0.1);
    this.playrate = this.x / this.maxScroll;
    this.$wrap.style.transform = `translateX(${-this.x}px)`;
    this.$bar.style.transform = `scaleX(${0.18 + this.playrate * 0.82})`;
    this.speed = Math.min(100, this.oldX - this.x);
    this.oldX = this.x;
    this.scale = lerp(this.scale, this.speed, 0.1);
    this.$items.forEach(i => {
      i.style.transform = `scale(${1 - Math.abs(this.speed) * 0.002})`;
      i.querySelector('img').style.transform = `scaleX(${1 + Math.abs(this.speed) * 0.004})`;
    });
  }
}

/*--------------------
// Instances
--------------------*/
const scroll = new DragScroll({
  el: '.carousel',
  wrap: '.carousel--wrap',
  item: '.carousel--item',
  bar: '.carousel--progress-bar',
});

/*--------------------
// One raf to rule them all
--------------------*/
const raf = () => {
  requestAnimationFrame(raf);
  scroll.raf();
};
raf();

// Subscription Form Validation
function subscribe() {
    const email = document.getElementById('email').value;
    const isAgeConfirmed = document.getElementById('age-confirmation').checked;
  
    if (!email) {
      alert('Please enter a valid email address.');
      return;
    }
    if (!isAgeConfirmed) {
      alert('Please confirm that you are at least 18 years old.');
      return;
    }
  
    alert('Thank you for subscribing, ${email}!');
  }
  function subscribe() {
    const email = document.getElementById('email').value;
    const isAgeConfirmed = document.getElementById('age-confirmation').checked;

    if (!email) {
        alert('Please enter a valid email address.');
        return;
    }
    if (!isAgeConfirmed) {
        alert('Please confirm that you are at least 18 years old.');
        return;
    }

    alert('Thank you for subscribing, ${email}!');
}
// Mobile Menu Toggle
const btn = document.getElementById("btn");
if (btn) {
  btn.addEventListener("click", () => {
    const headerMenu = document.querySelector("header ul");
    if (headerMenu) {
      headerMenu.classList.toggle("show");
    }
  });
}

// Chatbot Feature
document.querySelector(".chatbot-toggle").addEventListener("click", () => {
  const chatWindow = document.querySelector(".chatbot-window");
  chatWindow.classList.toggle("hidden"); // Improved visibility toggle
});

document.querySelector("#sendMessage").addEventListener("click", () => {
  const userInput = document.querySelector("#userInput").value;
  const chatMessages = document.querySelector("#chatMessages");

  if (userInput.trim() !== "") {
    // Display user message
    chatMessages.innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;
    document.querySelector("#userInput").value = "";

    // Simple bot response (can be enhanced)
    setTimeout(() => {
      const botResponse = getBotResponse(userInput);
      chatMessages.innerHTML += `<div><strong>Bot:</strong> ${botResponse}</div>`;
      chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll
    }, 1000);
  }
});

function getBotResponse(input) {
  const responses = {
    "hello": "Hi there! How can I assist you?",
    "courses": "We offer interactive coding courses. Check out the 'Courses' section!",
    "practice": "Our platform includes coding challenges to improve your skills.",
    "default": "I'm not sure about that. Can you try rephrasing your question?"
  };
  return responses[input.toLowerCase()] || responses["default"];
}
