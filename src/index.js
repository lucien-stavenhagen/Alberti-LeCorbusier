class DynamicGridView {
  constructor() {
    this.imglist = images;
    this.slide = 0;
    this.initView();
  }
  initView() {
    this.createImgCarousel();
    this.createImgGridView();
    this.showNextSlide(0);
  }
  createImgCarousel() {
    const display = document.getElementById("display-carousel");
    while (display.lastChild) {
      display.removeChild(display.lastChild);
    }
    //const shadow = display.attachShadow({ mode: "open" });
    const carouselcontainer = document.createElement("div");
    carouselcontainer.id = "carousel-container";
    carouselcontainer.style.display = "none";
    const t = document.getElementById("carousel");
    if (this.imglist.length === 0) {
      this.utilityMessageStyle(carouselcontainer);
    } else {
      for (let i = 0; i < this.imglist.length; i++) {
        let clone = document.importNode(t.content, true);
        let ftag = clone.querySelector(".carousel-img-frame");
        ftag.style.display = "none";
        let atag = clone.querySelector("a");
        atag.setAttribute("href", this.imglist[i].path);
        let itag = clone.querySelector(".carousel-image");
        itag.setAttribute("src", this.imglist[i].path);
        let stag = clone.querySelector(".carousel-caption");
        stag.innerHTML = this.imglist[i].caption;
        carouselcontainer.appendChild(clone);
      }
    }
    //shadow.appendChild(carouselcontainer);
    display.appendChild(carouselcontainer);
  }
  utilityMessageStyle(container) {
    container.style.boxSizing = "border-box";
    container.style.borderRadius = "4px";
    container.style.display = "block";
    container.style.textAlign = "center";
    container.style.width = "90%";
    container.style.margin = "auto";
    container.style.border = "1px solid rgba(0,0,0,.2)";
    container.style.fontSize = "1.1rem";
    container.style.backgroundColor = "#cecece";
    container.innerHTML = "<p>No images found on server<p>";
  }
  createImgGridView() {
    const display = document.getElementById("display-gridview");
    while (display.lastChild) {
      display.removeChild(display.lastChild);
    }
    //const shadow = display.attachShadow({ mode: "open" });
    const gridcontainer = document.createElement("div");
    gridcontainer.id = "grid-container";
    const t = document.getElementById("grid-view");
    if (this.imglist.length === 0) {
      this.utilityMessageStyle(gridcontainer);
    } else {
      for (let i = 0; i < this.imglist.length; i++) {
        let clone = document.importNode(t.content, true);
        let atag = clone.querySelector("a");
        atag.setAttribute("data-id", this.imglist[i].id);
        atag.setAttribute("href", `slide.html?id=${this.imglist[i].id}`);
        let itag = clone.querySelector(".grid-image");
        itag.setAttribute("src", this.imglist[i].path);
        let stag = clone.querySelector(".grid-caption");
        stag.innerHTML = `<small>${this.imglist[i].caption}</small>`;
        gridcontainer.appendChild(clone);
      }
    }
    //shadow.appendChild(gridcontainer);
    display.appendChild(gridcontainer);
  }
  showNextSlide(direction) {
    if (this.imglist.length === 0) {
      console.log(this.imglist.length);

      return;
    }
    const display = document.getElementById("display-carousel");
    const carouselcontainer = document.getElementById("carousel-container");
    const slides = carouselcontainer.getElementsByClassName(
      "carousel-img-frame"
    );
    if (slides.length >= 1) {
      if (carouselcontainer.style.display === "none") {
        carouselcontainer.style.display = "grid";
      }
      this.slide += direction;
      if (this.slide >= slides.length) {
        this.slide = 0;
      }
      if (this.slide < 0) {
        this.slide = slides.length - 1;
      }
      for (let j = 0; j < slides.length; j++) {
        slides[j].style.display = "none";
      }
      slides[this.slide].style.display = "block";
    }
  }
}

const continuousSlides = gridviewobj => {
  let id;
  let toggle = true;
  const toggleSlides = () => {
    if (toggle) {
      document.getElementById("toggle-carousel").innerHTML = "Carousel On";
      id = setInterval(() => {
        gridviewobj.showNextSlide(1);
      }, 6000);
    } else {
      document.getElementById("toggle-carousel").innerHTML = "Carousel Off";
      clearInterval(id);
    }
    toggle = !toggle;
  };
  return { toggleSlides };
};

const car = new DynamicGridView();
const doSlides = continuousSlides(car);
