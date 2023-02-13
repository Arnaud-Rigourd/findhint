import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="wrapper"
export default class extends Controller {
  static targets = ["scroll", "siteInfo", "contactMessage", "revealContent"]

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
}
