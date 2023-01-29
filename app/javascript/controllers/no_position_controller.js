import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="no-position"
export default class extends Controller {
  static targets = ['no']

  connect() {
    // console.log(this.noTarget.getBoundingClientRect()['x'])
    // console.log(this.noTarget.getBoundingClientRect()['y'])
  }

  changePosition(){
    this.xPosition = this.#range(-5, 10)
    this.yPosition = this.#range(-2, 5)

    this.noTarget.style.transform = `translate(${this.#sample(this.xPosition) * 20}px, ${this.#sample(this.yPosition) * 20}px)`
  }

  #range(start, end) {
    this.range = [];
    for (let i = start; i <= end; i++) {
        this.range.push(i);
    }
    return this.range;
  }

  #sample(array) {
    return array[Math.floor ( Math.random() * array.length )]
  }
}
