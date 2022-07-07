const INVESTMENT_TOPICS_STATE = (() => {
  const state = {
    current_topic: -1
  }

  const section_content = [
    {
      topic_name: '<span class="tab-d-none">US and UK</span> Tax on Cryptocurrency',
      topic_heading: 'Tax on Cryptocurrency',
      topic_content: 'Cryptocurrency is a constantly growing and evolving area of focus in both the U.S. and U.K. tax system. We are committed to staying ahead of the curve of all developments involving cryptocurrency in the U.S. and U.K. tax system to ensure tax obligations are met and liability minimized.',
      topic_sub_sections: [
        {
          sub_section_name: 'UK Tax on Cryptocurrency',
          sub_section_img: '/assets/images/litecoin-cryptocurrency-on-the-tablet-2021-08-28-09-05-42-utc.png',
          sub_section_link: '#'
        }, 
        {
          sub_section_name: 'US Tax on Cryptocurrency',
          sub_section_img: '/assets/images/cryptocurrency-logo-of-btc-coin-2021-09-03-05-04-44-utc.png',
          sub_section_link: '#'
        }
      ]
    },
    {
      topic_name: '<span class="tab-d-none">US and UK</span> Tax on RSUs',
      topic_heading: 'Tax on RSUs',
      topic_content: 'RSUs are a very common form of investment in both the U.S. and the U.K. . We have been dealing with RSUs in both the U.K. and the U.S. for over 15 years and have a high level of expertise in the area. Click below for insights into RSUs, how they are taxed and how they can benefit you, and your financial situation.',
      topic_sub_sections: [
        {
          sub_section_name: 'UK Tax on RSUs',
          sub_section_img: '/assets/images/rsu1.jpg',
          sub_section_link: ''
        },
        {
          sub_section_name: 'US Tax on RSUs',
          sub_section_img: '/assets/images/rsu2.jpg',
          sub_section_link: '#'
        }
      ]
    },
    {
      topic_name: '<span class="tab-d-none">US and UK</span> Tax on Real Estate',
      topic_heading: 'Tax on Real Estate',
      topic_content: 'Real estate is a constantly fluctuating area when it comes to taxation and legislation. We offer comprehensive guides on how to navigate tax in real estate and save you money on your tax liability. If there are any questions that you cannot find the answer too below, do not hesitate to get in contact with us.',
      topic_sub_sections: [
        {
          sub_section_name: 'UK Tax on Real Estate',
          sub_section_img: '/assets/images/ra1.jpg',
          sub_section_link: ''
        },
        {
          sub_section_name: 'US Tax on Real Estate',
          sub_section_img: '/assets/images/ra2.jpg',
          sub_section_link: ''
        }
      ]
    }
  ]

  return {
    get_topics: () => section_content,
    update_state: (idx) => {
      if(state.current_topic == idx)
        return false;
      else {
        state.current_topic = idx;
        return true;
      }
    }, 
    get_state: () => {

    } 
  }
})()

