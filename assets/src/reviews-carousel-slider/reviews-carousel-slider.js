const REV_SLIDER = (() => {
  const slider = document.querySelector('.reviews-carousel-track');
  const slides = Array.from(slider.children);
  const dotContainer = document.querySelector(".reviews-carousel-dots");
  let dots;


  const resizeListener = () => {
    window.addEventListener('resize', e => QUAL_SLIDER.init)
  }

  const disableContextMenu = () => {
    window.oncontextmenu = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }

  const mobileState = {
    isDragging: false,
    startPos: 0,
    currentTranslate: 0,
    prevTranslate: 0,
    animationID: 0,
    currentIdx: 0,
  }

  const setSlidePosition = () => {
    slides.forEach((slide, idx) => {      
      slide.style.transform = `translateX(${slide.getBoundingClientRect().width * idx}px)` 
      console.log(slide);
      console.log(slide.getBoundingClientRect().width)
    })

  }


  const createDots = () => {
    slides.forEach((s, idx) => {

      if(idx == 0) {
        dotContainer.innerHTML += `
          <div class="dot dot-active"></div>
        `
      } else {
        dotContainer.innerHTML += `
          <div class="dot"></div>
        `
      }
    })
    dots = Array.from(dotContainer.querySelectorAll('.dot'));
  }
  
  const mobileSlideEvents = () => {
    slides.forEach((slide, idx) => {
      slide.addEventListener('touchstart', touchStart(idx))
      slide.addEventListener('touchend', touchEnd)
      slide.addEventListener('touchmove', touchMove)

      slide.addEventListener('mousedown', touchStart(idx))
      slide.addEventListener('mouseup', touchEnd)
      slide.addEventListener('mouseleave', touchEnd)
      slide.addEventListener('mousemove', touchMove)
    })  
  }


  const changeDot = () => {
    dots.forEach((d, idx) => {
      if(idx === mobileState.currentIdx) {
        d.classList.add('dot-active');
      } else {
        d.classList.remove('dot-active');
      }
    })
  }

  const touchStart = (idx) => {
    return (e) => {
      mobileState.currentIdx = idx;
      mobileState.startPos = getPostionX(e)
      mobileState.isDragging = true;
      mobileState.ID = requestAnimationFrame(animation);
    }
  }

  const touchEnd = () => {
    mobileState.isDragging = false;
    const movedBy = mobileState.currentTranslate - mobileState.prevTranslate;

    if(movedBy < -100 && mobileState.currentIdx < slides.length - 1)
      mobileState.currentIdx += 1;
      changeDot();

    if(movedBy > 100 && mobileState.currentIdx > 0)
      mobileState.currentIdx -= 1;
      changeDot();

    setPositionByIdx();

    cancelAnimationFrame(mobileState.animationID)
  }

  const touchMove = (e) => {
    if(mobileState.isDragging) {
      const currentPosition = getPostionX(e);
      mobileState.currentTranslate = mobileState.prevTranslate +
                                     currentPosition - 
                                     mobileState.startPos;
    } 
  }

  const getPostionX = (e) => {
    return e.type.includes('mouse') ? e.pageX : 
                                      e.touches[0].clientX;
  }

  const animation = () => {
    animateSlider();
    if(mobileState.isDragging) requestAnimationFrame(animation)
  }
  
  const animateSlider = () => {
    slider.style.transform = `translateX(${mobileState.currentTranslate}px)`;
    console.log(-window.innerWidth, slides[0].getBoundingClientRect().width)
  }

  const setPositionByIdx = () => {
    mobileState.currentTranslate = mobileState.currentIdx * (-document.body.clientWidth);
    mobileState.prevTranslate = mobileState.currentTranslate;
    animateSlider();
  }
  
  return {
    init: () => {
      if (window.matchMedia('max-width: 768px')) {
        resizeListener();
        disableContextMenu();
        setSlidePosition();
        createDots();
        mobileSlideEvents();
      }
    }
  } 

})();

window.addEventListener('DOMContentLoaded', e => {

  REV_SLIDER.init()
})
