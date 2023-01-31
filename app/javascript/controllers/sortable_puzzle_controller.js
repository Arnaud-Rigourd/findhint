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

        console.log(this.tileOrdered)
        console.log(this.sortUrlValue)

        fetch(this.sortUrlValue, {method: "POST",
          headers: { Accept: "application/json", "X-CSRF-Token": csrfToken },
          body: formData
        })
      }
    })
  }
}
