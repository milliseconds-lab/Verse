"use strict";
String.prototype.zeroPad = function () {
  return parseInt(this, 10) > 9 ? "" + this : "0" + this;
};
const VERSE = {
  init() {
    console.log("Verse");
    this.addEvent();
    this.reset();
  },
  addEvent() {
    window.addEventListener("resize", this.handleResizeWindow.bind(this));
  },
  reset() {
    window.dispatchEvent(new Event("resize"));
  },
  handleResizeWindow() {
    this._winW = window.innerWidth;
    this._winH = window.innerHeight;
  },
};
VERSE.init();
