//loader element
const loaderElement = document.querySelector('#loader')

function setLoaderDisplay(time = 2000) {
  loaderElement.classList.add('active')
  document.body.classList.add('no-scroll')
  setTimeout(()=>{
    document.body.classList.remove('no-scroll')
    loaderElement.classList.remove('active')
  }, time)
}

//catalog actions
const catalogElement = document.querySelector('#catalog')
if (catalogElement) {
  const catalogOpenElement = document.querySelector('#catalog-open')
  const catalogCloseElement = document.querySelector('#catalog-close')
  const catalogSelectElements = document.querySelectorAll('.catalog-nav-select__item')
  const catalogListElements = document.querySelectorAll('.catalog-nav-list__item')
  const catalogLinkListElements = document.querySelectorAll('.catalog-grid__item .link')
  let catalogActiveSelectElement = document.querySelector('.catalog-nav-select__item.active')

  catalogOpenElement.addEventListener('click', function() {
    catalogElement.classList.add('active')
    document.body.classList.add('no-scroll')
  })

  catalogCloseElement.addEventListener('click', function() {
    catalogElement.classList.remove('active')
    document.body.classList.remove('no-scroll')
  })

  // for (let item of catalogSelectElements) {
  //   item.addEventListener('click', function() {
  //     if (!item.classList.contains('active')) {
  //       item.classList.add('active')
  //       catalogActiveSelectElement.classList.remove('active')
  //       catalogActiveSelectElement = item
  //     }
  //   })
  // }

  // for (let item of catalogListElements) {
  //   item.addEventListener('click', function() {

  //   })
  // }

  for (let item of catalogLinkListElements) {
    item.addEventListener('click', function() {
      setLoaderDisplay(1160)
      setTimeout(()=>{
        window.location.href = 'subcatalog.html';
      },1200)
    })
  }
}


//input search action
const inputElement = document.querySelector('#search-input')
if (inputElement) {
  const clearInputElement = document.querySelector('#clear-search')
  const inputResultElement = document.querySelector('#search-input-result')

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

  inputElement.addEventListener('blur', function() {
    this.parentElement.classList.remove('focus')
    inputResultElement.classList.remove('active')
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
  const searchDropdownElementItems = Array.from(searchDropdownElement.nextElementSibling.children)

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
    this.parentElement.classList.toggle('active')
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
      start: [0, 90000],
      connect: true,    
      behaviour: 'snap',
      step: 1,
      range: {
          'min': 0,
          'max': 90000
      }
  });
  sliderFilter.noUiSlider.on('update', function () { 
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