"use strict";
VERSE.MAIN = {
  init() {
    console.log("Verse Main");
    this.dom();
    this.render();
    this.addEvent();
    this.reset();
  },
  dom() {
    this.$main = document.getElementById("main");
  },
  render() {},
  addEvent() {},
  reset() {},
};
VERSE.MAIN.init();
