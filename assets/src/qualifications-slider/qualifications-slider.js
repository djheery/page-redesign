const QUAL_SLIDER = (() => {
  const slider = document.querySelector('.slider-track');
  const slides = Array.from(document.querySelector('.slider-track').children);

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
    })
  }
  
  const mobileSlideEvents = () => {
    slides.forEach((slide, idx) => {
      const slideImage = slide.querySelector('img');
      slideImage.addEventListener('dragstart', e => e.preventDefault());
      slide.addEventListener('touchstart', touchStart(idx))
      slide.addEventListener('touchend', touchEnd)
      slide.addEventListener('touchmove', touchMove)

      slide.addEventListener('mousedown', touchStart(idx))
      slide.addEventListener('mouseup', touchEnd)
      slide.addEventListener('mouseleave', touchEnd)
      slide.addEventListener('mousemove', touchMove)
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

    if(movedBy > 100 && mobileState.currentIdx > 0)
      mobileState.currentIdx -= 1;

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
  }

  const setPositionByIdx = () => {
    mobileState.currentTranslate = mobileState.currentIdx * (-window.innerWidth);
    mobileState.prevTranslate = mobileState.currentTranslate;
    animateSlider();
  }
  
  return {
    init: () => {
      if (window.matchMedia('max-width: 500px')) {
        resizeListener();
        disableContextMenu();
        setSlidePosition();
        mobileSlideEvents();

      }
    }
  } 

})();

window.addEventListener('DOMContentLoaded', e => {
  if(window.matchMedia('(max-width: 1000px)').matches) {
    QUAL_SLIDER.init()
  } else {
    console.log('called')
  }
})