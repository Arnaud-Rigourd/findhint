import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="wrapper"
export default class extends Controller {
  static targets = ["scroll", "scrollItems"]

  connect() {
    // console.log(this.scrollTarget)
  }

  hide(){
    // this.scrollTarget.classList.add('hidden')
    console.log(this.scrollTarget.getBoundingClientRect()['y'])
    console.log(window.innerHeight)
    if (this.scrollTarget.getBoundingClientRect()['y'] < window.innerHeight - 60) {
      this.scrollTarget.style = "opacity: 0"
    } else {
      this.scrollTarget.style = "opacity: 1"
    }
  }
}
