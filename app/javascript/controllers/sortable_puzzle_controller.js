import { Controller } from "@hotwired/stimulus"
import Sortable from "sortablejs"

export default class extends Controller {
  static targets = ['tile', 'tiles', 'contactMessage']
  static values = { sortUrl: String }

  connect() {
    Sortable.create(this.element, {
      ghostClass: "ghost",
      animation: 150,
      onEnd: (event) => {
        const csrfToken = document.getElementsByName("csrf-token")[0].content;

        this.tileOrdered = []
        this.tileTargets.forEach((t) => {
          this.tileOrdered.push(parseInt(t.dataset.tileId, 10))
        })

        const formData = new FormData();
        formData.append("tileOrdered", this.tileOrdered)

        fetch(this.sortUrlValue, {method: "POST",
          headers: { Accept: "application/json", "X-CSRF-Token": csrfToken },
          body: formData
        })

        // Check if tiles are in the correct order

        this.rightOrder = [-5,	7,	-6,	5,	-7,	4,	-1,	2]
        this.currentOrder = []
        this.rightCurrentOrder = []
        this.rightCurrentOrderSum = 0

        for (let i = 0; i < 8; i++) {
          this.currentOrder.push(this.tileOrdered[i + 1] - this.tileOrdered[i])
        }

        for (let i = 0; i < 8; i++) {
          this.rightCurrentOrder.push(this.rightOrder[i] - this.currentOrder[i])
        }

        this.rightCurrentOrder.forEach((item) => {
          if (item !== 0) {
            this.rightCurrentOrderSum += 1
          }
        })

        if (this.rightCurrentOrderSum === 0) {
          this.tilesTarget.style = "grid-gap: 0"

          setTimeout(() => {
            this.tileTargets.forEach((tile) => {
              tile.style = "opacity: 0.5"
            })

            this.contactMessageTarget.classList.remove('hidden')
            this.contactMessageTarget.style.opacity = "1"
          }, 580);
        }
      }
    })
  }
}
