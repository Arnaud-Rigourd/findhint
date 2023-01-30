import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="popover"
export default class extends Controller {
  static targets =['popover', 'popoverContent', 'popoverArrow']
  connect() {
  }

  show() {
    this.popoverContentTarget.classList.remove('hidden')
    this.popoverArrowTarget.classList.remove('hidden')
  }

  hide(){
    this.popoverContentTarget.classList.add('hidden')
    this.popoverArrowTarget.classList.add('hidden')
  }
}
