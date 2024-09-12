// This is the data we will be using, study it but don't change anything, yet.

import { gsap } from "gsap";

let menuItems = [
  'Students',
  'Faculty',
  "What's New",
  'Tech Trends',
  'Music',
  'Log Out'
];

/*
  Step 1: Write a component called 'menuMaker' to create a menu like the markup below:

  <div class="menu">
    <ul>
      {each menu item as an <li>}
    </ul>
  </div>

  The 'menuMaker' takes an array of menu items as its only argument.

  Step 2: Inside the function, iterate over the array creating a list item <li> element for each item in the array.
  Add those items to the <ul>

  Step 3: Still inside your function, select from the DOM the menu button (the element with a class of 'menu-button').

  Step 4: Add a click event listener to the menu button. When clicked it should toggle the class 'menu--open' on div.menu (your div with a 'menu' class).

  Step 5: Don't forget to return your div.menu.

  Step 6: Use 'menuMaker' to create a menu using the 'menuItems' array, and append the returned menu to the header.
*/

function menuMaker(itemAry){
  const menu = document.createElement("div");
  menu.classList.add("menu");
  menu.style.left = "-350px";
  const list = document.createElement("ul");
  itemAry.forEach(item => {
    let listItem = document.createElement("li");
    listItem.textContent = item;
    list.append(listItem);
  });
  menu.append(list);

  const menuButton = document.querySelector("img.menu-button");
  menuButton.addEventListener("click", event => {
    if (menu.style.left === "-350px") {
      gsap.to(menu, {duration: 0.2, left: 0, onStart: function(){
        menu.classList.add("menu-open");
      }});
    } else {
      gsap.to(menu, {duration: 0.2, left: "-350px", onComplete: function(){
          menu.classList.remove("menu-open");
      }});
    }
  });
  return menu;
}

const header = document.querySelector("div.header");
header.append(menuMaker(menuItems));
