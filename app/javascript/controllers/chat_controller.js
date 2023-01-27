import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="chat"
export default class extends Controller {
  static targets = ["form", "messages", "nextStageBtn", "chatWrapper", "formInput"]

  connect() {
    // console.log(this.formInputTarget)
    this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight)
  }

  sendMessage(e) {
    e.preventDefault()

    fetch(this.formTarget.action, {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: new FormData(this.formTarget)
    })
      .then(response => response.json())
      .then((data) => {
        if (data.inserted_message) {
          this.messagesTarget.insertAdjacentHTML("beforeend", data.inserted_message)

          if (typeof(data.inserted_bot_message) !== 'undefined') {
            this.messagesTarget.insertAdjacentHTML("beforeend", data.inserted_bot_message)
          } else if (typeof(data.inserted_close_answer) !== 'undefined') {
            this.messagesTarget.insertAdjacentHTML("beforeend", data.inserted_close_answer)
          }

          if (typeof(data.inserted_button) !== 'undefined') {
            this.nextStageBtnTarget.innerHTML = `${data.inserted_button}`
          }

        }
        this.formTarget.outerHTML = data.form
        this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight)
        this.formInputTarget.focus()
      })

  }
}
