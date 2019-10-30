import { images } from "./imgdb";

const urlobj = new URL(window.location.href);
const parms = new URLSearchParams(urlobj.search);
const display = document.getElementById("display");
// hack
const getID = () => {
  for (const [key, value] of parms) {
    if (key == "id") {
      return value;
    }
  }
};
const displayItem = id => {
  if (!id) {
    display.innerHTML = "ID in parameter malformed";
    return;
  }
  let info = images.find(item => item.id === id);
  if (!info) {
    display.innerHTML = `no entry found for id ${id}`;
    return;
  } else {
    let t = document.getElementById("slide-display");
    let clone = document.importNode(t.content, true);
    let par = clone.querySelector("p");
    if (info.description) {
      par.innerHTML = info.description;
      clone.querySelector(".slide-container").classList.add("two-rows");
    } else {
      par.style.display = "none";
      clone.querySelector(".slide-container").classList.add("one-row");
    }
    let img = clone.querySelector(".slide-container figure img");
    img.setAttribute("src", info.path);
    let caption = clone.querySelector(".slide-container figure figcaption");
    caption.innerHTML = info.caption;

    display.appendChild(clone);
  }
};
let id = getID();

displayItem(id);
