import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="chat"
export default class extends Controller {
  static targets = ["form", "messages", "chatWrapper"]

  connect() {
    this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight)
  }

  test() {

  }

  sendMessage(e) {
    e.preventDefault()

    // AJAX

    fetch(this.formTarget.action, {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: new FormData(this.formTarget)
    })
      .then(response => response.json())
      .then((data) => {
        if (data.inserted_message) {
          this.messagesTarget.insertAdjacentHTML("beforeend", data.inserted_message)
        }
        this.formTarget.outerHTML = data.form
        this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight)
      })

  }
}
