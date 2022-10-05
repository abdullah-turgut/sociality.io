//ELEMENTS
const sideNav = document.querySelector('.side-nav');
const offcanvas = document.querySelector('.offcanvas');
const brandNames = document.querySelectorAll('.brand-name');
const accordionMenu = document.querySelector('.accordion-menu');
const acc = document.querySelectorAll('.accordion');
const notificationBadge = document.querySelector('.badge');
const accItem = document.querySelectorAll('.accordion-item');
const feedItem = document.querySelector('#feed');
const menuBar = document.querySelector('.fa-bars');
const postsByDate = document.querySelector('.posts-by-date');

//DISPLAY DATA
feedItem.addEventListener('click', () => {
  postsByDate.innerHTML = '';
  getData();
});

//CSS SCRIPTS
// Responsive Menu Bar on smaller screen(< 1024 px)

/* Burger menu events */
menuBar.addEventListener('click', () => {
  if (menuBar.className === 'fa-solid fa-bars') {
    sideNav.style.display = 'flex';
    offcanvas.style.display = 'block';
    menuBar.classList.add('opened');
  } else {
    sideNav.style.display = 'none';
    offcanvas.style.display = 'none';
    menuBar.classList.remove('opened');
  }
});

/* In case if resized while displays none*/
window.addEventListener('resize', () => {
  let visualWidth = window.visualViewport.width;
  if (visualWidth > 1076) {
    sideNav.style.display = 'flex';
    offcanvas.style.display = 'block';
  } else {
    sideNav.style.display = 'none';
    offcanvas.style.display = 'none';
  }
});

/* Brand Name Buttons*/
brandNames.forEach((element) => {
  element.addEventListener('click', () => {
    /*Get notification info*/
    accordionMenuData(element);
    /*Check whether clicked or not*/
    if (element.classList.value === 'brand-name') {
      /* Remove styles when click on other brands */
      brandNames.forEach((e) => {
        e.classList.remove('clicked');
      });
      /* Add styles to the clicked brand*/
      element.classList.add('clicked');
      openNav();
    } else {
      element.classList.remove('clicked');
      closeNav();
    }
  });
});

/* Accordion Menu */
acc.forEach((element) => {
  element.addEventListener('click', () => {
    element.classList.toggle('active');
    let panel = element.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
});

accItem.forEach((item) => {
  item.addEventListener('click', () => {
    accItem.forEach((e) => {
      e.classList.remove('selected');
      e.childNodes[0].style.color = 'rgb(231, 231, 231)';
    });
    if (item.classList.value === 'accordion-item') {
      item.classList.add('selected');
      item.childNodes[0].style.color = '#e0115f';
    }
  });
});

//FUNCTIONS
/*Offcanvas Accordion from left(>1024px)*/
function openNav() {
  offcanvas.style.width = '190px';
  offcanvas.style.left = '60px';
  accordionMenu.style.display = 'block';
}

function closeNav() {
  offcanvas.style.width = '190px';
  offcanvas.style.left = '250px';
}

/* Accordion Menu Function (Get notification, href etc.) */
function accordionMenuData(item) {
  /*This is now only for applicant project. In real project, these data will be collected from DB*/
  if (item.id === 'brand2') {
    notificationBadge.innerText = '29';
    notificationBadge.style.display = 'block';
  } else {
    notificationBadge.style.display = 'none';
  }
}

/* Date Format Function */
function dateFormat(date) {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  if (date.length === 10) {
    //Post Date
    let arrDate = date.split('-');
    let formattedDate =
      arrDate[2] + ' ' + monthNames[Number(arrDate[1]) - 1] + ' ' + arrDate[0];

    return formattedDate;
  } else {
    //Create Date (2021-06-17 08:40:52)
    let arrDate = date.split(' ');
    let dateClock = arrDate[1].split(':');
    if (Number(dateClock[2]) > 0) {
      //If seconds bigger than 0, format minute
      let formattedDate =
        dateFormat(arrDate[0]) +
        ' - ' +
        dateClock[0] +
        ':' +
        (Number(dateClock[1]) + 1);
      return formattedDate;
    } else {
      //If seconds equal to zero
      let formattedDate =
        dateFormat(arrDate[0]) + ' - ' + dateClock[0] + ':' + dateClock[1];
      return formattedDate;
    }
  }
}

/* Status Color & Action Icons Function */
function statusCode(num) {
  let statusArr;
  switch (num) {
    case 0 /*Need Approval (Yellow)*/:
      statusArr = ['#f7bf38', 'fa-solid fa-check', 'fa-regular fa-trash-can'];
      break;
    case 1 /*Scheduled (Green)*/:
      statusArr = ['#3ac183', 'fa-solid fa-ban', 'fa-regular fa-trash-can'];
      break;
    case 2 /*Publishing (Blue)*/:
      statusArr = ['#67b1f2', 'fa-solid fa-ban', 'fa-regular fa-trash-can'];
      break;
    case 3 /*Published (Gray)*/:
      statusArr = ['#acacac', 'no-display', 'fa-regular fa-trash-can'];
      break;
    case 4 /*Error (Red)*/:
      statusArr = ['#fb6450', 'no-display', 'fa-regular fa-trash-can'];
      break;
  }

  return statusArr;
}

/* Channel Icon Function */
function channelName(name) {
  let channelArr;
  switch (name) {
    case 'instagrambusiness': //Instagram and Instagram Icons
      channelArr = [
        'fa-brands fa-instagram',
        'fa-regular fa-thumbs-up',
        'fa-regular fa-comment',
        'fa-solid fa-share-nodes',
        'fa-regular fa-eye',
      ];
      break;
    case 'facebook': //Facebook and Facebook Icons
      channelArr = [
        'fa-brands fa-facebook-f',
        'fa-regular fa-thumbs-up',
        'fa-regular fa-comment',
        'fa-solid fa-share-nodes',
        'fa-regular fa-eye',
      ];
      break;
    case 'twitter': //Twitter and Twitter Icons
      channelArr = [
        'fa-brands fa-twitter',
        'fa-regular fa-heart',
        'fa-solid fa-retweet',
        'fa-regular fa-comment',
        'fa-regular fa-eye',
      ];
      break;
  }

  return channelArr;
}

/* Distinguish URL From Text Function*/
function linkify(text) {
  let urlRegex =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  return text.replace(urlRegex, function (url) {
    return '<a href="' + url + '">' + url + '</a>';
  });
}

/* Replace Broken Image Function */
function replaceBrokenImg(image) {
  image.onerror = '';
  image.src = 'no-post-image.png';
  return true;
}

/* Data.json to HTML Elements function */
function createContentByPostDate(arr) {
  arr.forEach((post_date) => {
    let postDateHtml = `<div class="post-date">
                            ${dateFormat(post_date[0])}
                        </div> 

                        <div class="card-list"></div>`; //HTML Element for posts

    postsByDate.insertAdjacentHTML('afterbegin', postDateHtml); //Insert them

    let lastElementIndex = 0; //Last index of .card-list nodeList
    let lastDiv = document.querySelectorAll('.card-list')[lastElementIndex];

    post_date[1].forEach((post_card) => {
      let cardHtml = `
      <div class="post-card">

        <a 
            class="post-status"
            href="${post_card['link'] ? post_card['link'] : '#'}"   
            target="${post_card['link'] ? '_blank' : ''}" 
            style="background-color:${statusCode(post_card['status'])[0]}">

                <i class="${channelName(post_card.account['channel'])[0]}"></i>

        </a>

        <div class="post-body">
            <div class="post-title">
                <div class="alt-date">
                    ${dateFormat(post_card['created_at'])}
                </div>

                <div class="card-action-icon">
                    <i class="${statusCode(post_card['status'])[1]}"></i>
                    <i class="${statusCode(post_card['status'])[2]}"></i>
                    <i class="${statusCode(post_card['status'])[3]}"></i>
                    <i class="fa-solid fa-ellipsis"></i>
                </div>
            </div>

            <p class="post-text">
                ${linkify(post_card.entry['message'])}
            </p>

            <div class="post-image">

              <img 
                src="${post_card.entry.image}" 
                alt="" 
                onerror="replaceBrokenImg(this)">

            </div>

            <div class="post-statistics">
              <ul>
                <li>
                    <i class="${
                      channelName(post_card.account['channel'])[1]
                    }"></i>
                </li>
                <li>
                    <i class="${
                      channelName(post_card.account['channel'])[2]
                    }"></i>
                </li>
                <li>
                    <i class="${
                      channelName(post_card.account['channel'])[3]
                    }"></i>
                </li>
                <li>
                    <i class="${
                      channelName(post_card.account['channel'])[4]
                    }"></i>
                </li>
              </ul>
            </div>
        </div>
        `;

      lastDiv.insertAdjacentHTML('afterbegin', cardHtml);
    });
  });
}

//GET DATA FROM DATA.JSON
let data = [];
async function getData() {
  try {
    const response = await fetch('data.json');
    data = await response.json();
    data = Object.entries(data.posts_by_date);
    createContentByPostDate(data);
  } catch (error) {
    //Handle Error here!
  }
}
