

let highestZ = 1;

class Paper {
  constructor(paper) {
    this.paper = paper;
    this.holdingPaper = false;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.currentPaperX = 0;
    this.currentPaperY = 0;
    this.init();
  }

  init() {
    this.paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;

    this.paper.addEventListener('mousedown', (e) => this.onMouseDown(e));
    this.paper.addEventListener('mousemove', (e) => this.onMouseMove(e));
    this.paper.addEventListener('mouseup', () => this.onMouseUp());
    this.paper.addEventListener('mouseleave', () => this.onMouseUp());

    this.paper.addEventListener('touchstart', (e) => this.onTouchStart(e));
    this.paper.addEventListener('touchmove', (e) => this.onTouchMove(e));
    this.paper.addEventListener('touchend', () => this.onTouchEnd());
  }

  onMouseDown(e) {
    this.holdingPaper = true;
    this.touchStartX = e.clientX - this.currentPaperX;
    this.touchStartY = e.clientY - this.currentPaperY;
    this.paper.style.zIndex = ++highestZ;
  }

  onMouseMove(e) {
    if (!this.holdingPaper) return;
    this.currentPaperX = e.clientX - this.touchStartX;
    this.currentPaperY = e.clientY - this.touchStartY;
    this.paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;
  }

  onMouseUp() {
    this.holdingPaper = false;
  }

  onTouchStart(e) {
    this.holdingPaper = true;
    const touch = e.touches[0];
    this.touchStartX = touch.clientX - this.currentPaperX;
    this.touchStartY = touch.clientY - this.currentPaperY;
    this.paper.style.zIndex = ++highestZ;
  }

  onTouchMove(e) {
    if (!this.holdingPaper) return;
    const touch = e.touches[0];
    this.currentPaperX = touch.clientX - this.touchStartX;
    this.currentPaperY = touch.clientY - this.touchStartY;
    this.paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;
  }

  onTouchEnd() {
    this.holdingPaper = false;
  }
}

const papers = document.querySelectorAll('.paper');
papers.forEach((paper) => new Paper(paper));
