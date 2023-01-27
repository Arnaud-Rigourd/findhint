import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="hint"
export default class extends Controller {
  static targets = ["hint", "imageTrack", "image"]

  connect() {
    window.addEventListener('mousedown', (e) => {
      this.imageTrackTarget.dataset.mouseDownAt = e.clientX
    })

    window.addEventListener('mousemove', (e) => {
      if(this.imageTrackTarget.dataset.mouseDownAt === '0') return;

      this.mouseDelta = parseFloat(this.imageTrackTarget.dataset.mouseDownAt) - e.clientX
      this.maxDelta = window.innerWidth / 2
      this.percentage = (this.mouseDelta / this.maxDelta) * 100
      this.nextPercentage = parseFloat(this.imageTrackTarget.dataset.prevPercentage) + this.percentage

      // limit nextPercentage range
      this.nextPercentage = (this.nextPercentage < 0) ? 0 : (this.nextPercentage > 100) ? 100 : this.nextPercentage;

      this.imageTrackTarget.dataset.percentage = this.nextPercentage

      // set up animation on images to smooth effect
      this.imageTrackTarget.animate({
        transform: `translate(-${this.nextPercentage}%, 0)`},
        {duration: 1200, fill: "forwards"})

      // dynamic X value on transform
      this.imageTrackTarget.style.transform = `translate(-${this.nextPercentage}%, 0)`


      this.imageTargets.forEach((i) => {
        i.animate({
          objectPosition: `${100 - this.nextPercentage}% 50%`},
          {duration: 1200, fill: "forwards"})

        i.style = `object-position: ${100 - this.nextPercentage}% 50%`
      })
    })

    window.addEventListener('mouseup', (e) => {
      this.imageTrackTarget.dataset.mouseDownAt = '0'

      // Store the percentage value
      this.imageTrackTarget.dataset.prevPercentage = this.imageTrackTarget.dataset.percentage
    })
  }
}
