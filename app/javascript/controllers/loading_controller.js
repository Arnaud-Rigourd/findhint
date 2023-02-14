import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="loading"
export default class extends Controller {
  static targets = ["yesBtn", "yesLink", "noBtn", "loadingContainer", "title", "mainContainer", "yesNoDiv"]

  connect() {
  }

  loading() {
    this.paragraphes = document.querySelectorAll('p')
    this.darkContrast = "#291f1f5d"

    this.yesLinkTarget.style = "animation-play-state: paused"
    this.yesBtnTarget.style = "animation-play-state: paused"
    this.noBtnTarget.style = "animation-play-state: paused"

    setTimeout(() => {
      this.loadingContainerTarget.classList.remove('hidden')
      this.loadingContainerTarget.classList.add('flex-center')
      this.loadingContainerTarget.style.backdropFilter = "contrast(0.5)"
      this.yesNoDivTarget.style.filter = "opacity(0.2)"

      this.paragraphes.forEach((p) => {
        p.style.color = `${this.darkContrast}`
      })

      this.titleTarget.style.color = `${this.darkContrast}`
    }, 300);
  }
}
