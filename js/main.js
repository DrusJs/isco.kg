//loader element
const loaderElement = document.querySelector('#loader')

function showNotification(text = 'Сохранено') {
  let notification = document.getElementById('notification')
  notification.style.opacity = 1
  notification.lastElementChild.innerHTML = text
  setTimeout(()=>{notification.style.opacity = 0}, 2000)
}

function setLoaderDisplay(time = 2000) {
  loaderElement.classList.add('active')
  document.body.classList.add('no-scroll')
  setTimeout(()=>{
    document.body.classList.remove('no-scroll')
    loaderElement.classList.remove('active')
  }, time)
}

function closeElement(element) {
  document.body.classList.remove('no-scroll')
  element.closest('.active').classList.remove('active')
}
function closeModal(element) {
  document.body.classList.remove('no-scroll')
  element.closest('.modal-wrapper').classList.remove('active')
}
function openModal(id, isClose = true) {
  let previous = document.querySelector('.modal-wrapper.active')
  if (previous && isClose) {
    previous.classList.remove('active')
  }
  document.querySelector(id).classList.add('active')
  document.body.classList.add('no-scroll')
}

function changeOrderStep(now, isNext) {
  let steps = document.querySelectorAll('.order-steps__item')
  if (window.matchMedia("(max-width: 758px)").matches) {
    document.querySelector('header.header').scrollIntoView({ block: "start", behavior: "smooth" });
  }
  if (isNext) {
    steps[now-1].classList.remove('active')
    steps[now-1].classList.add('complete')
    steps[now].classList.add('active')
    now++
    document.querySelector('.order-block.active').classList.remove('active')
    document.querySelector('.order-block[data-ordstep="'+now+'"]').classList.add('active')
  } else {
    steps[now-1].classList.remove('active')
    steps[now-2].classList.remove('complete')
    steps[now-2].classList.add('active')
    now--
    document.querySelector('.order-block.active').classList.remove('active')
    document.querySelector('.order-block[data-ordstep="'+now+'"]').classList.add('active')
  }
}


//catalog actions
const catalogElement = document.querySelector('#catalog')
if (catalogElement) {
  const catalogOpenElement = document.querySelector('#catalog-open')
  const catalogCloseElement = document.querySelectorAll('.catalog-close')
  const catalogSelectElements = document.querySelectorAll('.catalog-nav-select')
//const catalogListElements = document.querySelectorAll('.catalog-nav-list__item')
  const catalogLinkListElements = document.querySelectorAll('.catalog-grid__item .link')

  catalogOpenElement.addEventListener('click', function() {
    catalogElement.classList.add('active')
    document.body.classList.add('no-scroll')
  })

  catalogCloseElements.forEach(el=>{
    el.addEventListener('click', function() {
      catalogElement.classList.remove('active')
      catalogElement.classList.remove('js-subcatalog')
      document.body.classList.remove('no-scroll')
    })
  })

  catalogElement.addEventListener('click', function(event) {
    if (event.target.classList.contains('container') || event.target.classList.contains('catalog')) {
      catalogElement.classList.remove('active')
      catalogElement.classList.remove('js-subcatalog')
      document.body.classList.remove('no-scroll')
    }
  })

  for (let item of catalogSelectElements) {
    item.querySelectorAll('.catalog-nav-select__item').forEach((el)=>{
      el.addEventListener('click', function() {
        if (!el.classList.contains('active')) {
          item.querySelector('.catalog-nav-select__item.active').classList.remove('active')
          el.classList.add('active')
          document.querySelector('.catalog-nav-list.mobile .block.active').classList.remove('active')
          document.querySelectorAll('.catalog-nav-list.mobile .block')[el.dataset.block].classList.add('active')
        }
      })
    })
  }

  // for (let item of catalogListElements) {
  //   item.addEventListener('click', function() {

  //   })
  // }

  for (let item of catalogLinkListElements) {
    item.addEventListener('click', function() {
      setLoaderDisplay(1990)
      setTimeout(()=>{
        window.location.href = 'subcatalog.html';
      }, 2000)
    })
  }
}


//input search action
const inputElement = document.querySelector('#search-input')
const inputResultElement = document.querySelector('#search-input-result')
if (inputElement) {
  const clearInputElement = document.querySelector('#clear-search')

  inputElement.addEventListener('focus', function(event) {
    this.parentElement.classList.add('focus')
    inputResultElement.classList.add('active')
    if (event.target.value) {
      clearInputElement.style.display = 'block'
    }
  })

  clearInputElement.addEventListener('click', function() {
    inputResultElement.classList.remove('active')
    inputElement.value = ''
    inputElement.parentElement.classList.remove('focus')
    this.style.display = 'none'
  })

  inputElement.addEventListener('input', function(event) {
    if (event.target.value) {
      clearInputElement.style.display = 'block'
    }
  });
}


//contacts dropdown action
const contactsDropdownElement = document.querySelector('#contacts-dropdown')
if (contactsDropdownElement) {
  function closeDropdownsElements() {
    if (document.querySelector('.js-dropdown-element.active')) {document.querySelector('.js-dropdown-element.active').classList.remove('active')}
  }
  contactsDropdownElement.addEventListener('click', function() {
    this.parentElement.classList.toggle('active')
  })

  // contactsDropdownElement.addEventListener('touchend', function() {
  //   this.parentElement.classList.toggle('active')
  // })

  // contactsDropdownElement.addEventListener('mouseenter', function() {
  //   //closeDropdownsElements()
  //   this.parentElement.classList.add('active')
  // })

  // contactsDropdownElement.addEventListener('mouseleave', function(event) {
  //   if (!event.relatedTarget.classList.contains('contacts-dropdown__item')) {
  //     this.parentElement.classList.remove('active')
  //   }
  // })

  // contactsDropdownElement.nextElementSibling.addEventListener('mouseleave', function(event) {
  //   if (!event.relatedTarget.classList.contains('js-dropdown-element')) {
  //     this.parentElement.classList.remove('active')
  //   }
  // })
}


//search main dropdown action
const searchDropdownElement = document.querySelector('#search-main-dropdown')
if (searchDropdownElement) {
  const searchDropdownElementItems = searchDropdownElement.parentElement.querySelectorAll('.select-dropdown__item')

  searchDropdownElement.addEventListener('click', function() {
    //closeDropdownsElements()
    this.parentElement.classList.toggle('active')
  })

  for (let item of searchDropdownElementItems) {
    item.addEventListener('click', function() {
      if (!this.classList.contains('active')) {
        searchDropdownElement.nextElementSibling.querySelector('.active').classList.remove('active')
        this.classList.add('active')
        searchDropdownElement.parentElement.classList.remove('active')
        searchDropdownElement.firstElementChild.setAttribute('src', this.firstElementChild.getAttribute('src'))
      }
    })
  }
}


//menu main dropdown action
const menuDropdownElement = document.querySelector('#main-menu')
if (menuDropdownElement) {
  menuDropdownElement.addEventListener('click', function() {
    //closeDropdownsElements()
    if (this.parentElement.classList.contains('js-authentication')) {
      this.parentElement.classList.toggle('active')
    } else {
      openModal('#modal-registration')
    }
    //this.parentElement.classList.toggle('js-authentication')
  })
}


//notice dropdown action

const noticeDropdownElement = document.querySelector('#notice-dropdown')
if (noticeDropdownElement) {
  noticeDropdownElement.addEventListener('click', function() {
    //closeDropdownsElements()
    this.parentElement.classList.toggle('active')
  })

  noticeDropdownElement.nextElementSibling.addEventListener('click', function(event) {
    if (event.target.classList.contains('notice-dropdown-nav__item') && !event.target.classList.contains('active')) {
      noticeDropdownElement.nextElementSibling.querySelector('.notice-dropdown-nav__item.active').classList.remove('active')
      event.target.classList.add('active')
      if (event.target.dataset.style == 'all') {
        noticeDropdownElement.nextElementSibling.querySelectorAll('.notice-dropdown-list__item').forEach((el)=>{
          el.style.display = 'block'
        })
      } else {
        noticeDropdownElement.nextElementSibling.querySelectorAll('.notice-dropdown-list__item').forEach((el)=>{
          el.style.display = 'none'
        })
        noticeDropdownElement.nextElementSibling.querySelectorAll(`.notice-dropdown-list__item.${event.target.dataset.style}`).forEach((el)=>{
          el.style.display = 'block'
        })
      }
    }
  })
}

if (document.querySelector('.profile-container .notice-dropdown-nav')) {
  document.querySelectorAll('.profile-container .notice-dropdown-nav__item').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelector('.profile-container .notice-dropdown-nav__item.active').classList.remove('active')
      el.classList.add('active')
      let notices = document.querySelector('.profile-container .notice-list')
      notices.classList.remove('unread')
      notices.classList.remove('read')
      if (el.dataset.style != 'all') {notices.classList.add(el.dataset.style)}  
    })
  })
}

const footerDropdownElements = document.querySelectorAll('.footer-list__item.header')
if (footerDropdownElements.length) {
  for (let item of footerDropdownElements) {
    item.addEventListener('click', function() {
      item.parentElement.classList.toggle('active')
    })
  }
}

//modal-wrapper
const modalContainerElements = document.querySelectorAll('.modal-wrapper')
if (modalContainerElements.length) {
  for (let item of modalContainerElements) {
    item.addEventListener('click', function(event) {
      if (event.target.classList.contains('modal-wrapper')){
        this.classList.remove('active')
        document.body.classList.remove('no-scroll')
      }
    })
  }
}
//modal login
const modalLoginMethodElements = document.querySelectorAll('.modal-auth-method__item')
if (modalLoginMethodElements.length) {
  for (let item of modalLoginMethodElements) {
    item.addEventListener('click', function() {
      if (!item.classList.contains('active')) {
        document.querySelector('.modal-auth-method__item.active').classList.remove('active')
        item.classList.add('active')

        if (item.dataset.method=='phone') {
          item.parentElement.nextElementSibling.classList.add('phone')
        } else {
          item.parentElement.nextElementSibling.classList.remove('phone')
        }
      }
    })
  }
}

//inputs text
const inputTextElements = document.querySelectorAll('.input .field')
const inputCodeElements = document.querySelectorAll('.modal-code')
function inputBlurEvent(event, element) {
  let isBlur = !element.contains(event.target)
  if (isBlur) {
    element.classList.remove('focus')
    document.onclick = null
  }
}
if (inputCodeElements.length) {
  for (let item of inputCodeElements) {
    item.addEventListener('click', function() {
      let input = item.firstElementChild
      let empty = input.value?null:input
      if (empty) {
        input.focus()
      } else {
        while (input.value) {
          let next = input.nextElementSibling
          if (next) {
          input = input.nextElementSibling
          } else {
            break
          }
        }
      }
    })
    item.querySelectorAll('.modal-code__item').forEach((el)=> {
      el.addEventListener('keypress', function(event) {
        if (el.value) {
          el.value = ''
        }
        if (el.nextElementSibling) {
          el.nextElementSibling.focus()
        } else {
          el.blur()
          el.closest('.modal').querySelector('.primary-button').classList.remove('disabled')
        }
      })
    })
  }
}
if (inputTextElements.length) {
  for (let item of inputTextElements) {
    let input = item.firstElementChild.nextElementSibling
    let container = item.parentElement
    let showPass = item.querySelector('.show-password')

    item.addEventListener('click', function() {
      if (!container.classList.contains('focus')) {
        if (document.querySelector('.input.focus')) {document.querySelector('.input.focus').classList.remove('focus')}
        container.classList.add('focus')
        document.onclick = null
        document.onclick = function(event) {
          inputBlurEvent(event, container)
        }
      }
      input.focus()
    })
    input.addEventListener('input', function() {
      if (input.value && !container.classList.contains('filled')) {
        container.classList.add('filled')
      }
      if (!input.value) { container.classList.remove('filled') }
    })
    if (showPass) {
      showPass.addEventListener('click', function() {
        if (input.type === 'password') {
          input.type = 'text';
        } else {
          input.type = 'password';
        }
        input.focus()
      })
    }
  }
}

//select input
const selectElements =  document.querySelectorAll('.select-primary')
if (selectElements.length) {
  for (let item of selectElements) {
    item.addEventListener('click', function() {
      if (item.classList.contains('active')) {
        item.classList.remove('active')
      } else {
        if (document.querySelector('.select-primary.active')) {document.querySelector('.select-primary.active').classList.remove('active')}
        item.classList.add('active')
      }
      if (window.matchMedia("(max-width: 767.98px)")) {document.body.classList.toggle('no-scroll')}
    })
    item.querySelectorAll('.select-primary-dropdown__item').forEach((el)=>{
      el.addEventListener('click', function() {
        item.querySelector('.value').innerHTML = this.innerHTML
        if (item.querySelector('.select-primary-dropdown__item.active')) {item.querySelector('.select-primary-dropdown__item.active').classList.remove('active')}        
        el.classList.add('active')
      })
    })
  }
}

//files input
const dropFileElements = document.querySelectorAll('.drop-area')

//subcatalog filter dropdown
const subcatalogFilterDropdownElements = document.querySelectorAll('.subcatalog-filter-accordion-head')
if (subcatalogFilterDropdownElements.length) {
  for (let item of subcatalogFilterDropdownElements) {
    item.addEventListener('click', function() {
      item.parentElement.classList.toggle('active')
    })
  }

  var sliderFilter = document.getElementById('noUiSlider');
  noUiSlider.create(sliderFilter, {
      start: [6000, 84000],
      connect: true,    
      behaviour: 'snap',
      step: 1,
      range: {
          'min': 0,
          'max': 90000
      }
  });
  sliderFilter.noUiSlider.on('update', function () { 
    console.log(1);
    sliderFilter.previousElementSibling.firstElementChild.value = Math.floor(sliderFilter.noUiSlider.get(true)[0])
    sliderFilter.previousElementSibling.lastElementChild.value = Math.floor(sliderFilter.noUiSlider.get(true)[1])
  });
  const subcatalogFilterOverflowElements = document.querySelectorAll('.overflow-container-show')
  for (let item of subcatalogFilterOverflowElements) {
    item.addEventListener('click', function() {
      item.classList.toggle('active')
      item.previousElementSibling.classList.toggle('active')
    })
  }

}

function validInputNumber(event) {
  return(event.charCode >= 48 && event.charCode <= 57 && /^\d{0,3}$/.test(this.value))
}
function sliderUpdate(element, value, isFirst) {
  element.parentElement.nextElementSibling.noUiSlider.set([isFirst?value:null, isFirst?null:value]);
}

//product page actions
const productImageContainerElements = document.querySelectorAll('.product-view-img-list')
if (productImageContainerElements.length) {
  const productBlockContainerElements = document.querySelectorAll('.product-view-block-list')
  const productInfoNavElements = document.querySelectorAll('.product-info-nav__item')
  const counterIncrementElements = document.querySelectorAll('.plus')
  const counterDecrementElements = document.querySelectorAll('.minus')
  const addBasketElement = document.querySelector('.product-basket-button.add')
  const orderBasketElement = document.querySelector('.product-basket-button.order')
  for (let item of productImageContainerElements) {
    Array.from(item.children).forEach((el)=>{
      el.addEventListener('click', function() {
        if (!el.classList.contains('active')){
          item.querySelector('.active').classList.remove('active')
          el.classList.add('active')
        }
      })
    })
  }

  for (let item of productBlockContainerElements) {
    Array.from(item.children).forEach((el)=>{
      el.addEventListener('click', function() {
        if (!el.classList.contains('active')){
          item.querySelector('.active').classList.remove('active')
          el.classList.add('active')
        }
      })
    })
  }

  for (let item of productInfoNavElements) {
      item.addEventListener('click', function() {
        if (!item.classList.contains('active')){
          document.querySelector('.product-info-nav__item.active').classList.remove('active')
          item.classList.add('active')
        }
      })
  }
  
  for(let item of counterIncrementElements) {
    item.addEventListener('click', function() {
      if (+item.previousElementSibling.innerHTML==0) {
        addBasketElement.classList.remove('disabled')
        orderBasketElement.classList.remove('disabled')
      }
      item.previousElementSibling.innerHTML = +item.previousElementSibling.innerHTML + 1;
    })
  }
  for(let item of counterDecrementElements) {
    item.addEventListener('click', function() {
      if (+item.nextElementSibling.innerHTML==1) {
        addBasketElement.classList.add('disabled')
        orderBasketElement.classList.add('disabled')
      }
      if (+item.nextElementSibling.innerHTML>=1){
        item.nextElementSibling.innerHTML = +item.nextElementSibling.innerHTML - 1;
      } 
    })
  }
}



//favorites
const favoriteSelectBlockElements = document.querySelectorAll('.favorites-nav__item')
const favoritesGridContainer = document.querySelector('.favorites-block')

if (favoriteSelectBlockElements.length) {
  for (let item of favoriteSelectBlockElements) {
    item.addEventListener('click', function() {
      if (!item.classList.contains('active')) {
        document.querySelector('.favorites-nav__item.active').classList.remove('active')
        favoritesGridContainer.querySelector('.main-grid.active').classList.remove('active')
        item.classList.add('active')
        favoritesGridContainer.querySelectorAll('.main-grid')[item.dataset.index-1].classList.add('active')
      }
    })
  }
}

//Swiper.js
if (document.querySelector('.brand-swiper')){
  var mainSwiper = new Swiper('.main-swiper', {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next.js-main',
        prevEl: '.swiper-button-prev.js-main',
      },
      pagination: {
          el: '.swiper-pagination',
      },
  })

  var mainBrandSwiper = new Swiper('.brand-swiper', {
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 24,
    navigation: {
      nextEl: '.swiper-button-next.js-brand',
      prevEl: '.swiper-button-prev.js-brand',
    },
  })
}
if (document.querySelector('.main-swiper-product')){
  var mainSwiperProduct = new Swiper('.main-swiper-product', {
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next.js-main',
      prevEl: '.swiper-button-prev.js-main',
    },
    pagination: {
        el: '.swiper-pagination',
    },
  })
}

const profileInfoNavElements = document.querySelectorAll('.profile-info-list__item')
if (profileInfoNavElements.length) {
  for (let item of profileInfoNavElements) {
    item.addEventListener('click', function() {
      if (!item.classList.contains('active')) {
        document.querySelector('.profile-info-list__item.active').classList.remove('active')
        item.classList.add('active')
        document.querySelector('.profile-info-block.active').classList.remove('active')
        document.querySelectorAll('.profile-info-block')[item.dataset.block].classList.add('active')
      }
    })
  }
}
const informationListDropdownElements = document.querySelectorAll('.information-list__item')
if (informationListDropdownElements.length) {
  for (let item of informationListDropdownElements) {
    if (item.firstElementChild) {
      item.addEventListener('click', (event) => {
        if (event.target.classList.contains('information-list__item-head')) {item.classList.toggle('active')}
      })
    }
  }
  document.querySelectorAll('.information-list-dropdown__item').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelector('.information-list').classList.add('hide')
      document.querySelector('.information-container').classList.add('active')
    })
  })
}
if (document.querySelector('.vacancy-list__item')) {
  document.querySelectorAll('.vacancy-list__item').forEach(el => {
    el.addEventListener('click', (event) => {
      if (!event.currentTarget.classList.contains('active')) {
        document.querySelector('.vacancy-list__item.active').classList.remove('active')
        el.classList.add('active')
      }
    })
  }) 
}


if (document.getElementById('various-buttons')) {
    Array.from(document.getElementById('various-buttons').children).forEach((el)=>{
      el.addEventListener('click', function() {
        el.parentElement.previousElementSibling.classList.toggle('active')
        if (el.parentElement.previousElementSibling.classList.contains('active')) {
          document.getElementById('various-buttons').children[0].style.display = 'none'
          document.getElementById('various-buttons').children[1].style.display = 'block'
        } else {
          document.getElementById('various-buttons').children[0].style.display = 'block'
          document.getElementById('various-buttons').children[1].style.display = 'none'
        }
      })
    })
}

window.addEventListener('click', (event)=> {
  if (!event.target.classList.contains('search-main-result__item') && !inputElement .contains(event.target)) {
    inputElement.parentElement.classList.remove('focus')
    inputResultElement.classList.remove('active')
  }
})