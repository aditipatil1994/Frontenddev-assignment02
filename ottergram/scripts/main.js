var DETAIL_IMAGE_SELECTOR = "[data-image-role='target']";
var DETAIL_TITLE_SELECTOR = "[data-image-role='title']";
var DETAIL_FRAME_SELECTOR = "[data-image-role='frame']";
var THUMBNAIL_LINK_SELECTOR = "[data-image-role='trigger']";
var HIDDEN_DETAIL_CLASS = "hidden-detail";
var TINY_EFFECT_CLASS = "is-tiny";
var ESC_KEY = 27;

function setDetails(imageUrl, titleText) {
  "use strict";

  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute("src", imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-url");
}

function titleFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-title");
}

function setDetailsFromThumb(thumbnail) {
  "use strict";
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  thumb.addEventListener("click", function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
    showDetails();
  });
}

function getThumbnailsArray() {
  "use strict";
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function hideDetails() {
  "use strict";
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
  "use strict";
  var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function() {
    frame.classList.remove(TINY_EFFECT_CLASS);
  }, 50);
}

function addKeyPressHandler() {
  "use strict";
  document.body.addEventListener("keyup", function(event) {
    event.preventDefault();

    if (event.keyCode === ESC_KEY) {
      hideDetails();
    }
  });
}

function initializeEvents() {
  "use strict";
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  addKeyPressHandler();
}

function getCurrentIndex(thumbnailArray, detailImage) {
  for (var i = 0; i < thumbnailArray.length; i++) {
    if (thumbnailArray[i].href == detailImage.src) {
      return i;
    }
  }
  return -1;
}


function mySlide(param) {
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  var thumbnailArray = getThumbnailsArray();
  var currentIndex = getCurrentIndex(thumbnailArray, detailImage);
  if (param === "next") {
    currentIndex = (currentIndex + 1) % thumbnailArray.length;

  } else {
    currentIndex = (currentIndex - 1 + thumbnailArray.length) % thumbnailArray.length;
  }
  setDetails(thumbnailArray[currentIndex].href, thumbnailArray[currentIndex].getAttribute("data-image-title"));
}

mySlide();

initializeEvents();
