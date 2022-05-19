const MOBILE_CAROUSEL = (() => {
  const slider = document.querySelector('.lerp-carousel-track');
  const slides = Array.from(document.querySelector('.lerp-carousel-track').children);

  const resizeListener = () => {
    window.addEventListener('resize', e => LERP_CAROUSEL_APP.init())
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
      resizeListener();
      disableContextMenu();
      setSlidePosition();
      mobileSlideEvents();
    }
  } 

})();

const LERP_CAROUSEL = (() => {
  const slider = document.querySelector('#lerp-carousel');
  const slides = Array.from(document.querySelector('.lerp-carousel-track').children);

  const lerpState = {
    sliderWidth: 0,
    imageWidth: 0,
    current: 0,
    target: 0,
    ease: 1.2
  }

  const resizeListener = () => {
    window.addEventListener('resize', e => LERP_CAROUSEL_APP.init())
  }

  const setSlidePosition = () => {
    slides.forEach((slide, idx) => {      
      slide.style.transform = `translateX(${(slide.getBoundingClientRect().width + 20) * idx}px)` 
    })
  }

  const lerp = (start, end, t) => {
    return start * (1 - t) + end * t;
  }

  const setTransform = (el, transfromation) => {
    el.style.transform = transfromation;
  }

  const setParams = () => {
    lerpState.sliderWidth = slider.getBoundingClientRect().width;
    lerpState.imageWidth = lerpState.sliderWidth / slides.length;
    document.getElementById('lerp').style.height = `${lerpState.sliderWidth - (window.innerWidth - window.innerHeight)}px`;
  }

  const animate2 = () => {
    lerpState.current = parseFloat(lerp(
                                        lerpState.current,
                                        lerpState.target, 
                                        lerpState.ease)).toFixed(2);

    lerpState.target = window.scrollY - (document.querySelector('#lerp').getBoundingClientRect().top + 1000);
    setTransform(slider, `translateX(-${lerpState.current}px)`)
    requestAnimationFrame(animate2);
  }


  return {
    init: () => {
      setSlidePosition();
      setParams();
    },
    animate: () => {
      const sliderRect = slider.getBoundingClientRect();
      const lerpRect = document.querySelector("#lerp").getBoundingClientRect();
      window.addEventListener('scroll', e => {
        if(window.scrollY > document.querySelector('#lerp').getBoundingClientRect().top) {
          animate2()
          
        } 
      })
    }
  }
})()

window.addEventListener('DOMContentLoaded', e => {
  
  const mobile = window.matchMedia('(max-width: 800px)')
  if(mobile.matches) {
    MOBILE_CAROUSEL.init();
  } else {
    LERP_CAROUSEL.init();
    LERP_CAROUSEL.animate();
  }
})
