const REV_SLIDER = (() => {
  const state = REV_CAROUSEL_STATE
  const slider = document.querySelector('.reviews-carousel-track');
  let slides;
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

  const getReviews = () => {
    let reviews;
    console.log(slider.dataset.reviewType)
    if(slider.dataset.reviewType == 'all' || slider.dataset.reviewType == null) 
      reviews = state.getAllReviews();
    else {
      reviews = state.getReviewType(slider.dataset.reviewType);
      reviews.length == 0 ? reviews = state.getAllReviews() :
                       reviews = reviews;

    }
    populateReviewTrack(reviews);
  }

  const populateReviewTrack = (reviews) => {
    slider.innerHTML = '';
    reviews.forEach(r => {
      slider.innerHTML += `
      <div class="reviews-carousel-item">
        <div class="r-carousel-item-inner-container">
          <div class="r-carousel-img">
            <img src="${r.img}" alt="">
            <p class="reviewer-name">${r.name} ${r.profession != '' ? ' - ' + r.profession : ''}</p>
          </div>
          <div class="r-carousel-item-text-content text-center" style="margin: 0 auto; max-width: 600px;">
            <p>${r.content}</p>
          </div>
        </div>
      </div>
      `
    });

    slides = Array.from(slider.children);
    setSlidePosition();
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
      slide.addEventListener('mousemove', touchMove);
    })  
  }

  const desktopSlideEvents = () => {
    if(document.querySelector('.arrows')) {
      const arrows = Array.from(document.querySelectorAll('.arrow'));
      arrows.forEach( a => {
        a.addEventListener('click', arrowChangeSlide)
    });
    }
  }

  const arrowChangeSlide = (e) => {
    console.log(e.target);
    if(e.target.parentElement.classList.contains('arrow-right')) {
      if(mobileState.currentIdx === slides.length - 1) return;
      mobileState.currentIdx += 1;
      changeDot();
    } else {
      if(mobileState.currentIdx === 0) return;
      mobileState.currentIdx -= 1;
      changeDot();
    }
    setPositionByIdx();
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
        getReviews();
        resizeListener();
        disableContextMenu();
        createDots();
        if(window.matchMedia('(max-width: 1000px)').matches) {
          mobileSlideEvents();
        } else {
          desktopSlideEvents();
        }
    }
  } 

})();

window.addEventListener('DOMContentLoaded', e => {

  REV_SLIDER.init()
})
