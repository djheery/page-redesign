const FAMILY_TOPICS_STATE = (() => {
  const state = {
    current_topic: -1
  }

  const section_content = [
    {
      topic_name: 'Marriage Between US & UK Citizens',
      topic_heading: 'Marriage Between US & UK Citizens',
      topic_content: 'When U.S. and U.K. citizens decide to get married, there are tax rules and regulations that should be observed. The observation of these tax regulations ensures that you both save money on your tax liability, and understand the processes that you will be required to observe.',
      topic_sub_sections: [
        {
          sub_section_name: 'Obtaining Social Security',
          sub_section_img: '/assets/images/marriage-1.jpg',
          sub_section_link: '#'
        }, 
        {
          sub_section_name: 'Tax Allowances',
          sub_section_img: '/assets/images/marriage-2.jpg',
          sub_section_link: '#'
        },
        // {
        //   sub_section_name: 'Tax Obligations',
        //   sub_section_img: '/assets/images/btc-coin.png',
        //   sub_section_link: '#'
        // },
        // {
        //   sub_section_name: 'Filing Jointly',
        //   sub_section_img: '/assets/images/btc-coin.png',
        //   sub_section_link: '#'
        // },
      ]
    },
    {
      topic_name: 'Family Tax Reliefs',
      topic_heading: 'Child, Widow and Marriage Tax Reliefs',
      topic_content: 'There are various tax reliefs associated with the taxation of families. Understanding these reliefs will help you save on your tax liability.',
      topic_sub_sections: [
        {
          sub_section_name: 'Child Tax Reliefs',
          sub_section_img: '/assets/images/fam-1.jpg',
          sub_section_link: ''
        },
        {
          sub_section_name: 'Widow Tax Reliefs',
          sub_section_img: '/assets/images/fam-2.jpg',
          sub_section_link: '#'
        },
        // {
        //   sub_section_name: 'Marriage Tax Reliefs',
        //   sub_section_img: '/assets/images/rsu2.jpg',
        //   sub_section_link: '#'
        // }
      ]
    },
    {
      topic_name: 'Relocating your Family <span class="tab-d-none"> to the US or UK</span>',
      topic_heading: 'Relocating to the U.S. or U.K. with Family',
      topic_content: 'Relocating to the U.S or U.K. can be a stressful process. The difference in taxation between the two countries is fairly drastic. Understanding these tax process\' and the differences is vital to ensure the smooth relocation of your family.',
      topic_sub_sections: [
        {
          sub_section_name: 'Relocating to the U.S.',
          sub_section_img: '/assets/images/reloc-1.jpg',
          sub_section_link: ''
        },
        {
          sub_section_name: 'Relocating to the U.K.',
          sub_section_img: '/assets/images/reloc-2.jpg',
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

