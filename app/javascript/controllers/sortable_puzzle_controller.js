import { Controller } from "@hotwired/stimulus"
import Sortable from "sortablejs"

export default class extends Controller {
  static targets = ['tile']
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

        // console.log(this.tileOrdered)

        fetch(this.sortUrlValue, {method: "POST",
          headers: { Accept: "application/json", "X-CSRF-Token": csrfToken },
          body: formData
        })

        // 29, 34, 36, 30, 35, 28, 32, 31, 33
        // this.tileOrdered[1] - this.tileOrdered[0] === 5
        // [5, 2, -6, 5, -7, 4, -1, 2]

        this.rightOrder = [5, 2, -6, 5, -7, 4, -1, 2]
        this.currentOrder = []

        for (let i = 0; i < 8; i++) {
          // this.currentNum = this.tileOrdered[i + 1] - this.tileOrdered[i]
          this.currentOrder.push(this.tileOrdered[i + 1] - this.tileOrdered[i])
        }
        // console.log(this.currentOrder)
        this.rightCurrentOrder = []

        for (let i = 0; i < 8; i++) {
          this.rightCurrentOrder.push(this.rightOrder[i] - this.currentOrder[i])
        }

        console.log(this.rightCurrentOrder)

        this.rightCurrentOrderSum = 0

        this.rightCurrentOrder.forEach((item) => {
          if (item !== 0) {
            this.rightCurrentOrderSum += 1
          }
        })

        if (this.rightCurrentOrderSum === 0) {
          // Insérer le message dans le DOM
          console.log('Tu as gagné champion !')
        }
      }
    })
  }
}
