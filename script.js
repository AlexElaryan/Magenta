// ......header slider start 
const mainImg = document.querySelector(".main_img");
const mainImgChilds = document.querySelectorAll(".main_img img");

const SIZE = document.body.clientWidth - 2 * parseInt(getComputedStyle(document.querySelector(".cont")).paddingLeft);
// Or you can took it with mainImg clientWidth 

let imgSize;
let opacityIndex = 2; 
let maxOverflow;
let rightPosition;
let leftPosition;
let minOverflow;
let offset;

let isDragging = false;
let prevPositionX;
let isMoving = false;

// for choosing media or desktop sizes (In this time same but You can change)

if(SIZE > 500){
    imgSize = SIZE * 0.82;
    opacityIndex = 2;
    opacity = .5;
    maxOverflow = Math.trunc(SIZE * 2.66);
    minOverflow = Math.trunc(-SIZE * 2.26);
    leftPosition = -SIZE * 1.44;
    rightPosition = SIZE * 1.84;
    setInitialImagePosition();
}else{
    imgSize = SIZE * 0.82;
    opacityIndex = 2;
    opacity = .5;
    maxOverflow = Math.trunc(SIZE * 2.66);
    minOverflow = -SIZE * 2.26;
    leftPosition = -SIZE * 1.44;
    rightPosition = SIZE * 1.84;

    setInitialImagePosition();
}

// functions

function setInitialImagePosition() {
  mainImgChilds.forEach((img, index) => {
    img.style.left = `${imgSize * index  + leftPosition}px`;
    img.style.opacity = index === opacityIndex ? "1" : `${opacity}`;
    isOverflowingRight();
    isOverflowingLeft();
  });
  
}


function moveImages(imgSize,bool = true) {
  if (!isMoving || !bool) {
    isMoving = true;
    
    if(imgSize > 0){
      if(bool){
        let active = document.querySelector(".elipse_active");
        active.classList.remove("elipse_active");
        active.previousElementSibling ? active.previousElementSibling.classList.add("elipse_active") : elipses[4].classList.add("elipse_active")
      }
      opacityIndex = opacityIndex - 1;
      opacityIndex = opacityIndex === -1 ? 4 : opacityIndex;
    }else{
      if(bool){
        let active = document.querySelector(".elipse_active");
        active.classList.remove("elipse_active")
        active.nextElementSibling ? active.nextElementSibling.classList.add("elipse_active") : elipses[0].classList.add("elipse_active")
      }
      opacityIndex = opacityIndex + 1;
      opacityIndex = opacityIndex === 5 ? 0: opacityIndex;
    }
    mainImgChilds.forEach((img,index) => {
      img.style.left = `${parseFloat(img.style.left) + imgSize}px`;
      img.style.opacity = index === opacityIndex ? "1" : `${opacity}`;
    });

    setTimeout(() => {
      isMoving = false;
    }, 300);
  }
}

function isOverflowingRight() {
  mainImgChilds.forEach((img) => {
    if (parseFloat(img.style.left) >= maxOverflow + imgSize) {
      img.style.transition = "0s";
      img.style.left = `${leftPosition + imgSize}px`;
      setTimeout(() => {
          img.style.transition = ".3s";
      }, 300);

    }else if(parseFloat(img.style.left) >= maxOverflow){
      img.style.transition = "0s";
      img.style.left = `${leftPosition}px`;
      setTimeout(() => {
          img.style.transition = ".3s";
      }, 300);
    }

  }); 
}

function isOverflowingLeft() {
  mainImgChilds.forEach((img) => {
    if ( parseFloat(img.style.left) <= minOverflow - imgSize ) {
      img.style.transition = "0s";
      img.style.left = `${rightPosition - imgSize}px`;
      setTimeout(() => {
        img.style.transition = ".3s";
      }, 300);

    } else if (parseFloat(img.style.left) <= minOverflow){
      img.style.transition = "0s";
      img.style.left = `${rightPosition}px`;
      setTimeout(() => {
        img.style.transition = ".3s";
      }, 300);
    }
  });
}

function startInteraction(e) {
  isDragging = true;
  prevPositionX = e.pageX || e.touches[0].pageX;
}

function endInteraction() {
  isDragging = false;
}

function handleInteraction(e) {
  if (!isDragging) return;
  e.preventDefault();
  const currentPositionX = e.pageX || e.touches[0].pageX;
  const positionDiff = currentPositionX - prevPositionX;
  prevPositionX = currentPositionX;

  if (positionDiff > 10) {
    moveImages(imgSize);
    isOverflowingRight();
  } else if (positionDiff < -10) {
    moveImages(-imgSize);
    isOverflowingLeft();
  }
}

// Event listeners

mainImg.addEventListener("mousedown", startInteraction);
mainImg.addEventListener("mousemove", handleInteraction);
mainImg.addEventListener("mouseup", endInteraction);

if(SIZE < 501){
  mainImg.addEventListener("touchstart", startInteraction);
  mainImg.addEventListener("touchmove", handleInteraction);
  mainImg.addEventListener("touchend", endInteraction);
}

const firsArrowRight = document.querySelector('.right');
const firsArrowLeft = document.querySelector('.left');
const elipses = document.querySelectorAll(".elipse");

firsArrowRight.onclick = ()=>{
  moveImages(-imgSize);
  isOverflowingLeft();
};
firsArrowLeft.onclick = ()=>{
  moveImages(imgSize);
  isOverflowingRight();
};


//  This for elipse click function BUT it works with lop 

// elipses.forEach((el,ind)=>{
//   el.onclick = ()=>{
//     let index = Array.from(elipses).findIndex(el => el.classList.contains('elipse_active')); 
//     let modul = Math.abs(index - ind);
//     let modulCounter;
//     if(modul > 2){
//       modulCounter = 5 - modul;
//     }else{
//       modulCounter = modul;
//     }
//     let diversity = index - ind;
//     while(((diversity < 0 && modul < 3) || (diversity > 0 && modul >= 3)) && modulCounter > 0){
//         moveImages(-imgSize,false);
//         isOverflowingLeft();
//         modulCounter--
//     }
//     while(((diversity > 0 && modul < 3) || (diversity < 0 && modul >= 3)) && modulCounter > 0 ){
//         moveImages(imgSize,false);
//         isOverflowingRight();
//         modulCounter--
//     }
//     elipses[index].classList.remove("elipse_active");
//     el.classList.add("elipse_active")
//   }
// })


// ......header slider end



// slide start

let hoverBlock = document.querySelectorAll(".forHover");
let backBlock = document.querySelectorAll(".back");
let imgBlock = document.querySelectorAll(".item > img");
let hoveredArray = [];

if (window.innerWidth > 1000) {
  hoverBlock.forEach((forHover, index) => {
    forHover.onmouseover = () => {
      if (hoveredArray.indexOf(index) === -1) {
        imgBlock[index].style.transform = "rotateY(180deg)";
        backBlock[index].style.transform = "rotateY(0deg)";
      } else {
        imgBlock[index].style.transform = "rotateY(0deg)";
        backBlock[index].style.transform = "rotateY(-180deg)";
      }
      clearInterval(hoverInterval);
    };
    forHover.onmouseout = () => {
      if (hoveredArray.indexOf(index) !== -1) {
        imgBlock[index].style.transform = "rotateY(180deg)";
        backBlock[index].style.transform = "rotateY(0deg)";
      } else {
        imgBlock[index].style.transform = "rotateY(0deg)";
        backBlock[index].style.transform = "rotateY(-180deg)";
      }

      hoverInterval = setInterval(() => {
        let index = Math.floor(Math.random() * hoverBlock.length);
        if (hoveredArray.indexOf(index) === -1) {
          imgBlock[index].style.transform = "rotateY(180deg)";
          backBlock[index].style.transform = "rotateY(0deg)";
          hoveredArray.push(index);
        } else {
          imgBlock[index].style.transform = "rotateY(0deg)";
          backBlock[index].style.transform = "rotateY(-180deg)";
          hoveredArray = hoveredArray
            .slice(0, hoveredArray.indexOf(index))
            .concat(
              hoveredArray.slice(
                hoveredArray.indexOf(index) + 1,
                hoveredArray.length
              )
            );
        }
      }, 2000);
    };
  });
}

let hoverInterval = setInterval(() => {
  let index = Math.floor(Math.random() * hoverBlock.length);
  if (hoveredArray.indexOf(index) === -1) {
    imgBlock[index].style.transform = "rotateY(180deg)";
    backBlock[index].style.transform = "rotateY(0deg)";
    hoveredArray.push(index);
  } else {
    imgBlock[index].style.transform = "rotateY(0deg)";
    backBlock[index].style.transform = "rotateY(-180deg)";
    hoveredArray = hoveredArray
      .slice(0, hoveredArray.indexOf(index))
      .concat(
        hoveredArray.slice(hoveredArray.indexOf(index) + 1, hoveredArray.length)
      );
  }
}, 2000);

// slide end

// album start
let albumDB = [
  "img/image3.png",
  "img/image13.png",
  "img/image4.png",
  "img/image12.png",
  "img/image9.png",
  "img/image4.png",
  "img/image7.png",
  "img/image9.png",
  "img/image11.png",
  "img/image3.png",
  "img/image5.png",
  "img/image5.png",
  "img/image6.png",
  "img/image11.png",
  "img/image12.png",
  "img/image6.png",
  "img/image8.png",
  "img/image7.png",
  "img/image10.png",
  "img/image10.png",
  "img/image13.png",
  "img/image8.png",
];

let album = document.querySelector(".album");
let forAlbum = document.querySelector(".for-album");
let leftAlbum = document.querySelector(".left-album");
let rightAlbum = document.querySelector(".right-album");
let currentIndex;
let closeAlbum = document.querySelector(".close");

hoverBlock.forEach((el, ind) => {
  el.onclick = () => {
    if (hoveredArray.indexOf(ind) !== -1) {
      if (window.innerWidth > 1000) {
        currentIndex = albumDB.indexOf(
          imgBlock[ind].src.slice(
            imgBlock[ind].src.indexOf("img/"),
            imgBlock[ind].src.length
          )
        );
      }
      else{
        currentIndex = albumDB.indexOf(
          getComputedStyle(backBlock[ind]).backgroundImage.slice(
            getComputedStyle(backBlock[ind]).backgroundImage.indexOf("img/"),
            getComputedStyle(backBlock[ind]).backgroundImage.length - 2
          )
        );
      }
    } else {
        if (window.innerWidth > 1000) {
          currentIndex = albumDB.indexOf(
             getComputedStyle(backBlock[ind]).backgroundImage.slice(
              getComputedStyle(backBlock[ind]).backgroundImage.indexOf("img/"),
              getComputedStyle(backBlock[ind]).backgroundImage.length - 2
              )
          );
        }
        else{
          currentIndex = albumDB.indexOf(
            imgBlock[ind].src.slice(
              imgBlock[ind].src.indexOf("img/"),
              imgBlock[ind].src.length
            )
          );
        }

    }

    album.style.transform = "scale(1)";
    forAlbum.setAttribute(
      "style",
      `
        background:url(${albumDB[currentIndex]});    
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;`
    );
  };
});

leftAlbum.onclick = () => {
  if (currentIndex === 0) {
    currentIndex = albumDB.length - 1;
    forAlbum.setAttribute(
      "style",
      `
        background:url(${albumDB[currentIndex]});    
        background-position: center;
        background-size: cover;
        transition: .5s;
        background-repeat: no-repeat;`
    );
  } else {
    currentIndex--;
    forAlbum.setAttribute(
      "style",
      `
        background:url(${albumDB[currentIndex]});    
        background-position: center;
        background-size: cover;
        transition: .5s;
        background-repeat: no-repeat;`
    );
  }
};

rightAlbum.onclick = () => {
  if (currentIndex === albumDB.length - 1) {
    currentIndex = 0;
    forAlbum.setAttribute(
      "style",
      `
        background:url(${albumDB[currentIndex]});    
        background-position: center;
        transition: .5s;
        background-size: cover;
        background-repeat: no-repeat;`
    );
  } else {
    currentIndex++;
    forAlbum.setAttribute(
      "style",
      `
        background:url(${albumDB[currentIndex]});    
        background-position: center;
        transition: .5s;
        background-size: cover;
        background-repeat: no-repeat;`
    );
  }
};

closeAlbum.onclick = () => {
  album.style.transform = "scale(0)";
};

// album end


let purpleButton = document.querySelectorAll('.purple_btn');
let yellowButton = document.querySelectorAll('.yellow_btn');
let icon = document.querySelectorAll('summary .icon1');
let icon2 = document.querySelectorAll('summary .icon2');

purpleButton.forEach((btn,ind)=>{
  let x = 0;
  btn.onclick = function(){
    if (x == 0) {
      btn.setAttribute('class','button_border__purple');
      icon[ind].setAttribute('style','position: absolute;right: 10px;display: inline-block;width: 27px;height: 27px;transition: transform 0.26s;color: #990D64;');
      x++;
    }
    else if (x == 1) {
      btn.setAttribute('class','purple_btn');
      icon[ind].setAttribute('style','position: absolute;right: 10px;display: inline-block;width: 27px;height: 27px;transition: transform 0.26s;color: #fff;');
      x = 0;
    }
  }
})




yellowButton.forEach((btn,ind)=>{
  let x = 0;
  btn.onclick = function(){
    if (x == 0) {
      btn.setAttribute('class','button_border__yellow');
      icon2[ind].setAttribute('style','position: absolute;right: 10px;display: inline-block;width: 27px;height: 27px;transition: transform 0.26s;color: #FCB450;');
      x++;
    }
    else if (x == 1) {
      btn.setAttribute('class','yellow_btn');
      icon2[ind].setAttribute('style','position: absolute;right: 10px;display: inline-block;width: 27px;height: 27px;transition: transform 0.26s;color: #fff;');
      x = 0;
    }
  }
})



