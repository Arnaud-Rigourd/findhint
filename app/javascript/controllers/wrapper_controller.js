import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="wrapper"
export default class extends Controller {
  static targets = ["scroll", "siteInfo", "contactMessage", "revealContent", "thanksFrame"]

  connect() {
  }

  hide(){
    this.scrollTargets.forEach((s) => {
      if (s.getBoundingClientRect()['y'] < window.innerHeight - 60) {
        s.style = "opacity: 0"
      } else {
        s.style = "opacity: 1"
      }
    })
  }

  reveal() {
    if (!this.contactMessageTarget.classList.contains('hidden')) {
      this.siteInfoTarget.classList.remove('hidden')
      this.thanksFrameTarget.classList.remove('hidden')
      this.thanksFrameTarget.classList.add('flex-center')
      this.scrollTargets['1'].classList.remove('hidden')

      if (this.scrollTargets['1'].getBoundingClientRect()['y'] < window.innerHeight - 60) {
        this.scrollTargets['1'].style = "opacity: 0"
      } else {
        this.scrollTargets['1'].style = "opacity: 1"
      }
    }
  }

  show(e) {
    this.targetHeight = e.target.nextElementSibling.offsetHeight

    if(this.targetHeight === 0) {
      e.target.nextElementSibling.style.height = "fit-content"
    } else {
      e.target.nextElementSibling.style.height = 0
    }
  }

  zoom(e) {
    this.revealImages = document.querySelectorAll('.reveal__content > img')
    this.currentImage = e.target
    this.parent = this.currentImage.parentElement

    this.currentImage.style.transform = "scale3d(1.5, 1.5, 1.5)"
    this.currentImage.style.filter = "none"
    this.currentImage.classList.add('active')
    this.parent.style.minHeight = "65vh"
    e.stopPropagation()

    document.addEventListener('click', (e) => {
      this.revealImages.forEach((i) => {
        if (i.matches('.active')) {
          i.style.transform = "scale3d(1, 1, 1)"
          i.classList.remove('active')
          i.style.filter = "grayscale(1)"
          i.parentElement.style.minHeight = "0"
          e.stopPropagation()
        }
      })
    })
  }
}
