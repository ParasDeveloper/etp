!(function () {
  "use strict";
  class t {
    constructor(t, e, i = [], n = 2e3, s = "|", r = "black", o = 200, l = 500) {
      (this.element = t),
        (this.strings = i),
        (this.period = n),
        (this.currentIndex = 0),
        (this.isDeleting = !1),
        (this.text = ""),
        (this.textWrapper = document.createElement("span")),
        this.element.appendChild(this.textWrapper),
        (this.writingMaxTime = o),
        (this.deletingTime = l),
        this.appendCursor(e, s, r),
        this.tick();
    }
    appendCursor(t, n = "|", s = "black") {
      const r = document.createElement("span");
      r.classList.add(`blinking-cursor-${t}`),
        (r.textContent = n),
        this.element.appendChild(r),
        i(e(t, s));
    }
    tick() {
      this.currentIndex = this.currentIndex % this.strings.length;
      const t = this.strings[this.currentIndex];
      this.isDeleting
        ? (this.text = t.substring(0, this.text.length - 1))
        : (this.text = t.substring(0, this.text.length + 1)),
        (this.textWrapper.textContent = this.text);
      let e = this.writingMaxTime - 100 * Math.random();
      this.isDeleting && (e /= 2),
        this.isDeleting || this.text != t
          ? this.isDeleting &&
            "" === this.text &&
            ((this.isDeleting = !1),
            this.currentIndex++,
            (e = this.deletingTime))
          : ((e = this.period), (this.isDeleting = !0)),
        setTimeout(() => {
          this.tick();
        }, e);
    }
  }
  const e = (t, e) =>
      `\n.blinking-cursor-${t} { color: ${e}; -webkit-animation: 1s blink step-end infinite; -moz-animation: 1s blink step-end infinite; -ms-animation: 1s blink step-end infinite; -o-animation: 1s blink step-end infinite; animation: 1s blink step-end infinite; } @keyframes blink{from,to{color:transparent}50%{color:${e}}}@-moz-keyframes blink{from,to{color:transparent}50%{color:${e}}}@-webkit-keyframes blink{from,to{color:transparent}50%{color:${e}}}@-ms-keyframes blink{from,to{color:transparent}50%{color:${e}}}@-o-keyframes blink{from,to{color:transparent}50%{color:${e}}}\n`,
    i = (t) => {
      const e = document.createElement("style");
      (e.textContent = t), document.head.appendChild(e);
    };
  document.querySelectorAll("[udesly-typewriter]").forEach((e, i) => {
    const n =
      e
        .getAttribute("udesly-typewriter")
        .split("|")
        .map((t) => t.trim()) || [];
    if (!n.length || "" == n[0])
      return void console.error("Please insert some texts separated by |");
    n.unshift(e.textContent), (e.textContent = "");
    const s = parseInt(e.getAttribute("period"), 10) || 1e3,
      r = e.getAttribute("cursor") || "|",
      o = e.getAttribute("color") || "black",
      l = parseInt(e.getAttribute("writing"), 10) || 200,
      a = parseInt(e.getAttribute("deleting"), 10) || 500;
    new t(e, i, n, s, r, o, l, a);
  });
})();
