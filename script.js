let imgsLen = 200,
  imgsPath = "imgs/",
  el = document.querySelector("#scroll-model"),
  content = document.querySelector(".content"),
  imgs = false,
  imgsCur = 0;
  // step = 1; 

function CreateImages() {
  for (let i = 0; i < imgsLen; i++) {
    el.insertAdjacentHTML("beforeend", `<img src="${imgsPath}${i + 1}.jpg"/>`);
  }
  imgs = el.querySelectorAll("img");
  imgs.forEach((img) => (img.style.opacity = "0")); // Скрываем все изображения с помощью opacity
  setTimeout(RotateScroll, 100);
}

CreateImages();

function RotateScroll() {
  imgs[imgsCur].style.opacity = "1";

  let ticking = false;
  let isAbsolute = false; // Флаг для отслеживания позиции элемента

  function update() {
    // Проверяем, стала ли позиция элемента absolute
    if (el.style.position === "absolute") {
      isAbsolute = true;
    } else {
      isAbsolute = false;
    }

    // Если позиция absolute, останавливаем обновление изображений
    if (!isAbsolute) {
      // Замедляем смену изображений, используя логарифмическую функцию
      let scrollPercentage = window.scrollY / window.innerHeight;
      let i = Math.floor(Math.log(1 + scrollPercentage) * (imgsLen / Math.log(10)));

      // Убеждаемся, что i находится в пределах допустимых индексов
      i = Math.max(0, Math.min(i, imgsLen - 1));

      if (imgsCur !== i) {
        imgs[imgsCur].style.opacity = "0";
        imgs[i].style.opacity = "1";
        imgsCur = i;
        console.log(imgsCur);
      }
    }

    // Проверяем, достиг ли пользователь блока с классом content
    if (window.scrollY + window.innerHeight >= content.offsetTop) {
      el.style.position = "absolute";
    } else {
      el.style.position = "fixed";
    }

    ticking = false;
  }

  window.addEventListener("scroll", function (e) {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("load", function () {
    setTimeout(function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }, 0); 
  });
});
