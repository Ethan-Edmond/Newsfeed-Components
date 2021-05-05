// This is the data we will be using to create our articles. Look at it, then proceed to line 93.
// OPTIONAL: if you're feeling adventurous, try to make this data an export from a different module, and import it here.
// You can read about ES6 modules here: https://exploringjs.com/es6/ch_modules.html#sec_basics-of-es6-modules

import data from './data/articleData';
import { gsap } from "gsap";

/*
  Step 1: Write a component called 'articleMaker' to create an article.
  Your component is a function that takes an article object as its only argument,
  and returns a DOM node looking like the one below:

  <div class="article">
    <h2>{title of the article}</h2>
    <p class="date">{date of the article}</p>

    {three separate paragraph elements}

    <span class="expandButton">+</span>
  </div>

  Step 2: Still inside `articleMaker`, add an event listener to the span.expandButton.
  This listener should toggle the class 'article-open' on div.article.

  Step 3: Don't forget to return something from your function!

  Step 4: Outside your function now, loop over the data. At each iteration you'll use your component
  to create a div.article element and append it to the DOM inside div.articles (see index.html).

  Step 5: Try adding new article object to the data array. Make sure it is in the same format as the others.
  Refresh the page to see the new article.
*/
function articleMaker({title, date, firstParagraph, secondParagraph, thirdParagraph}){
  // creating elems
  const article = document.createElement("div");
  const articleTitle = document.createElement("h2");
  const articleDate = document.createElement("p");
  const articleP1 = document.createElement("p");
  const articleP2 = document.createElement("p");
  const articleP3 = document.createElement("p");
  const articleExpand = document.createElement("span");
  const articleRead = document.createElement("button");
  const articleContent = document.createElement("div");

  // creating structure
  articleContent.append(articleTitle);
  articleContent.append(articleDate);
  articleContent.append(articleP1);
  articleContent.append(articleP2);
  articleContent.append(articleP3);
  articleContent.append(articleRead);
  article.append(articleContent);
  article.append(articleExpand);

  // adding classes
  article.classList.add("article");
  articleDate.classList.add("date");
  articleExpand.classList.add("expandButton");

  // setting text content
  articleTitle.textContent = title;
  articleDate.textContent = date;
  articleP1.textContent = firstParagraph;
  articleP2.textContent = secondParagraph;
  articleP3.textContent = thirdParagraph;
  articleExpand.textContent = "Click to expand";
  articleRead.textContent = "Mark as read";

  // expand button event listener
  articleExpand.addEventListener("click", event => {
    if (articleExpand.textContent === "Click to expand"){
      gsap.to(article, {duration: 0.5, height: "400px", onComplete: function(){
        articleContent.style.height = "400px";
        articleContent.style.overflow = "auto";
      }});
      articleExpand.textContent = "Click to retract";
    } else {
      gsap.to(article, {duration: 0.5, height: "50px", onComplete: function(){
        articleContent.style.height = "50px";
        articleContent.style.overflow = "hidden";
      }});
      articleExpand.textContent = "Click to expand";
    }
  });

  // article scroll event listener
  article.addEventListener("scroll", event => {
    articleExpand.style.bottom = "0";
  });
  // read button event listener
  articleRead.addEventListener("click", event => {
    article.parentNode.removeChild(article);
  });

  return article;
}

let articleContainer = document.querySelector("div.articles");

data.forEach(obj => {
  let article = articleMaker(obj);
  articleContainer.append(article);
});

function articleConstructor(dataObj){
  articleContainer.append(articleMaker(dataObj));
}
