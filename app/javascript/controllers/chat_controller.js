import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="chat"
export default class extends Controller {
  static targets = ["messages", "historicMessages", 'test']

  connect() {
    this.historicMessagesTarget.scrollTo(0, this.historicMessagesTarget.scrollHeight)
  }

  // scrollTop() {
  //   this.historicMessagesTarget.scrollTo(0, this.historicMessagesTarget.scrollHeight)
  // }
}
