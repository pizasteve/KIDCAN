const header = document.querySelector('header')
const slider = document.querySelector('.slider')

window.addEventListener('scroll', () => {
  header.classList.add('header-moved')

  const val = +String(scrollY / window.innerHeight)
    ? +String(scrollY / window.innerHeight)
        .split('.')[1]
        ?.slice(0, 2)
    : 0
  if (window.scrollY === 0 || (val < 20 && val >= 3)) {
    header.classList.remove('header-moved')
  }
})

function generateSliderElements() {

  return elements
    .map((item, index, array) => `<img onload='this.style.opacity = 1' src=${
        Math.floor(array.length / 2) !== index ? item.empty : item.full
      } class=${
        Math.floor(array.length / 2) !== index
          ? 'screen-without'
          : 'screen-with'
      }></img>`).join('')
}

let elements = [
  {
    empty: './assets/screens-without/88.png',
    full: './assets/screens-with-phones/22.png',
  },
  {
    empty: './assets/screens-without/99.png',
    full: './assets/screens-with-phones/33.png',
  },
  {
    empty: './assets/screens-without/1111.png',
    full: './assets/screens-with-phones/11.png',
  },
  {
    empty: './assets/screens-without/66.png',
    full: './assets/screens-with-phones/55.png',
  },
  {
    empty: './assets/screens-without/1010.png',
    full: './assets/screens-with-phones/44.png',
  },
]

window.addEventListener('load', () => {
  slider.innerHTML += generateSliderElements()
})

slider.addEventListener('click', (e) => {
  console.log(e.target.src)
  const currentIndex = elements.findIndex((item) =>
    e.target.src.endsWith(item.empty.slice(2) || item.full.slice(2))
  )
  console.log(currentIndex)
  let leftSide = elements.slice(0, currentIndex)
  let rightSide = elements.slice(currentIndex + 1, elements.length)

  for (let i = leftSide.length; i < elements.length / 2 - 1; i++) {
    leftSide.unshift(rightSide.pop())
  }

  for (let i = rightSide.length; i < elements.length / 2 - 1; i++) {
    rightSide.push(leftSide.shift())
  }
  elements = [...leftSide, elements[currentIndex], ...rightSide]

  slider.innerHTML = generateSliderElements()
})

const sandwitchBtn = document.querySelector('.secondary-navbar')
const navbarContent = document.querySelector('.navbar-content')
const navabarContentItems = document.querySelectorAll('.navbar-content > navbar-item')
const logo = document.querySelector('.logo')

let activated = false;

sandwitchBtn.addEventListener('click', () => {
  toggleNavBar()
})

function toggleNavBar() {
  activated = !activated
  if (activated) {
    header.classList.add('header-sandwitch-activated')
    navbarContent.classList.add('navbar-content-sandwitch-activated')
    logo.classList.add('logo-sandwitch-activated')
    sandwitchBtn.classList.add('sandwitch-activated')
    document.querySelector('.sandwitch').style.display = 'none'
    document.querySelector('.close').style.display = 'block'
    document.querySelector('.main-section').classList.add('.main-section-activated')
  } else {
    header.classList.remove('header-sandwitch-activated')
    navbarContent.classList.remove('navbar-content-sandwitch-activated')
    logo.classList.remove('logo-sandwitch-activated')
    sandwitchBtn.classList.remove('sandwitch-activated')
    document.querySelector('.sandwitch').style.display = 'block';
    document.querySelector('.close').style.display = 'none';
    document.querySelector('.main-section').classList.remove('.main-section-activated')
  }
}

navbarContent.addEventListener('click', (e) => {
  if (e.target.tagName === 'P') {
    setTimeout(toggleNavBar, 150)
  }
})
