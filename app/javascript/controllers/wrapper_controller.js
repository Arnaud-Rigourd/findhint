import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="wrapper"
export default class extends Controller {
  static targets = ["scroll", "scrollItems", "comingSoon"]

  connect() {
  }

  hide(){
    if (this.scrollTarget.getBoundingClientRect()['y'] < window.innerHeight - 60) {
      this.scrollTarget.style = "opacity: 0"
    } else {
      this.scrollTarget.style = "opacity: 1"
    }
  }


}
