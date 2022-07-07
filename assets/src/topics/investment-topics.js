const INVESTMENT_TOPICS = (() => {
  const state = INVESTMENT_TOPICS_STATE;
  const sectionLinksContainer = document.querySelector('.desktop-topics');
  const sectionContentContainer = document.querySelector('.selected-content-section');
  const scTrack = document.querySelector('.sc-content-items-track');
  const topics = INVESTMENT_TOPICS_STATE.get_topics();
  const transitionSection = document.querySelector('.transition-section');
  const mobile = window.matchMedia('(max-width: 767px)');
  let linkArray;


  const addTopicChangeListener = () => {
    linkArray.forEach(t => t.addEventListener('click', changeTopic));
  }

  const changeTopic = (e) => {
    const idx = e.target.dataset.topic ? e.target.dataset.topic : 
                                         e.target.parentElement.dataset.topic;
    if(state.update_state(idx)) {
      transitionSection.classList.add('transition-active');
      setTimeout(() => {
        populateContent(idx);
        populateSlides(idx);
        transitionSection.classList.remove('transition-active');
      }, 400)
    }
    transitionSection.classList.add('transition-back');
    console.log(idx);
    setLinkActive(idx);
    e.preventDefault();
  }

  const setLinkActive = (idx) => {
    linkArray.forEach(l => {
      l.dataset.topic === idx ? l.classList.add('topic-active') :
                                l.classList.remove('topic-active');
    })
  }

  const populateLinks = () => {
    sectionLinksContainer.innerHTML = '';
    topics.forEach((t, idx) => {
      if(idx == 0) {
        sectionLinksContainer.innerHTML += `
        <div class="topic topic-active" data-topic="${idx}">
          <a href="" role="button">${t.topic_name}</a>
        </div>
        `
      } else {
        sectionLinksContainer.innerHTML += `
        <div class="topic" data-topic="${idx}">
          <a href="" role="button" >${t.topic_name}</a>
        </div>
        `
      }
    })

    storeLinkArray();
  }

  const populateContent = (idx) => {
    const updateCurrentTopic = state.update_state();
    if(updateCurrentTopic) {
      const contentToPopulate = topics[idx];
      sectionContentContainer.innerHTML = `
        <h3 class="text-gray text-upper">${topics[idx].topic_heading}</h3>
        <p>${topics[idx].topic_content}</p>
      `
    }
  }

  const populateSlides = (idx) => {
    const contentToPopulate = topics[idx].topic_sub_sections;
    scTrack.innerHTML = '';
    contentToPopulate.forEach(cp => {
      scTrack.innerHTML += `
      <div class="sc-item">
        <div class="sc-item__inner-container">
          <div class="sc-item-img">
            <img src="${cp.sub_section_img}" alt="">
          </div>
          <div class="sc-item-link text-center">
            <a href="">${cp.sub_section_name}</a>
          </div>
        </div>
      </div>
      `

    });
    if(mobile.matches) 
      SC_CONTENT.init(scTrack);
  }

  const storeLinkArray = () => {
    linkArray = [];
    linkArray = Array.from(document.querySelectorAll('.topic'));
    addTopicChangeListener();
  }





  return {
    init: () => {
      populateLinks();
      populateContent(0);
      populateSlides(0);
    }
  }

})(INVESTMENT_TOPICS_STATE, SC_CONTENT)


INVESTMENT_TOPICS.init(INVESTMENT_TOPICS_STATE, SC_CONTENT);

// window.addEventListener('DOMContentLoaded', e => {
//   if(window.matchMedia('(max-width: 767px)').matches) {
//     SC_CONTENT.init()
//   } else {
//     console.log('called')
//   }
// })