import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['text', 'divTexts', 'url']

  connect() {
    // console.log('Hello from Highlight !!!')
  }

  reveal() {
    this.textTarget.classList.add('hidden')
    this.urlTarget.classList.remove('hidden')
  }

  copy() {
    // Copy the selection
    this.selectedElement = window.getSelection()
    this.range = document.createRange()

    this.range.selectNode(this.selectedElement.anchorNode)
    window.getSelection().addRange(this.range)
    document.execCommand("copy")
    window.getSelection().removeAllRanges()

    // Add a div to inform the user that the text has been copied (doesn't work)

    // this.span = document.createElement('span')
    // this.span.innerHTML = "<br /> <p class='copied'>Copié dans le presse-papier</p>"

    // console.log(this.selectedElement)
    // this.selectedElement.surroundContents(span)
  }
}
