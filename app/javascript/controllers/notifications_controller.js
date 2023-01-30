import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="notifications"
export default class extends Controller {
  static targets =['notif', 'input']

  submit(e) {
    this.validAnswers = ["please", "stp", 'svp', "s'il te plait", "s'il te plaît", "s il te plait", "s il te plaît", "s'il-te-plait", "s'il-te-plaît"]

    this.inputInArray = this.inputTarget.value.split(" ")
    this.validatingArray = []

    if (this.inputTarget.value !== "") {

      this.inputInArray.forEach((word) => {

        if (this.validAnswers.includes(word)) {
          this.validatingArray.push(word)
        }
      })

      if (this.validatingArray.length === 0) {
        this.notifTarget.classList.remove('hidden')
      }

    } else {
      e.preventDefault()
    }
  }
}
