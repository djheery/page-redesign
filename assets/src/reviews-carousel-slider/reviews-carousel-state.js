const REV_CAROUSEL_STATE = (() => {
  const reviews = [
    {
      name: "Tom Parr",
      content: "I used Bambridge Accountants to deal with a tricky tax situation involving earnings from the UK and the US, as well as a complicated tax exemption. They dealt with the paperwork quickly and in a way that was hassle-free for me. Thanks!",
      img: "/s/t-review.png",
      profession: '',
      type: ['investment']
    },
    {
      name: "Leo Morgan",
      content: "I used Bambridge Accountants to come into US tax compliance using Streamlined Procedures. I consider myself an \"accidental American\" with no ties to US at all. Alistair and the team made the process very easy for someone like me with no knowledge of US tax.",
      img: "/s/l-review.png",
      profession: '',
      type: ['investment']
    },
    {
      name: "Darren Higgs",
      content: "We have recently moved our business premises and I was seeking an accountant closer to us when we found Bambridge Accountants. We received a free consultation to discuss our requirements which was very helpful. I am extremely impressed by their efficiency, and they now handle all aspects of our accounts.",
      img: "/s/d-review.png",
      profession: '',
      type: ['investment']
    },
    {
      name: 'Ellice King',
      content: "Bambridge have been amazing. We used callie marles and she has been such a great help from start to end. She made the whole tax return so easy from the beginning. Have used this firm for 2 years now and wouldnt go anywhere else. Amazing customer service so helpful!!",
      img: "/s/e-review.png",
      profession: '',
      type: ['investment']
    }
  ]

  return {
    getAllReviews: () => {
      return reviews;
    },
    getReviewType: (type) => {
      let reviewArray = [];
      reviews.forEach(r => {
        if(r.type.find(t => t === type))
          reviewArray.push(r);
      })

      return reviewArray;
    }
  }
})();