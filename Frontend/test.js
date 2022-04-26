const { assert } = require("chai");
const { expect } = require("chai");
const { JSDOM } = require("jsdom");

const srv = "http://127.0.0.1:3000";

const getDOM = async () => {
  const dom = await JSDOM.fromURL(srv, { runScripts: "dangerously", resources: "usable" });
  const testElement = dom.window.document.getElementById("weatherCards");
  const StartChildCount = testElement.childElementCount;
  while (testElement.childElementCount === StartChildCount) {
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  return dom;
};

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//const d = new Date();
//let todayNum = d.getDay();
let todayNum = 1;

describe("Front End Testing - VanillaJS", () => {
  let dom;
  beforeEach(async () => {
    dom = await getDOM();
  });

  for (let i = 0; i < 6; i++) {
    describe(`Day ${i}`, () => {
      const dayNum = todayNum + i;
      const dayName = weekdays[dayNum];
      it(`Is at Index Position ${i} in HTMLCollection`, () => {
        expect([...dom.window.document.getElementById("weatherCards").children][i].id).to.equal(`day${i}`);
      });
      it("Week Day Name is Correct", () => {
        expect(dom.window.document.getElementById(`day${i}_dayName`).textContent).to.equal(dayName);
      });
      it("image is on the card", () => {
        expect(dom.window.document.getElementById(`day${i}_img`).nodeName).to.equal("IMG");
      });
      it("daily low temperature is a float", () => {
        const elem = dom.window.document.getElementById(`day${i}_low`).textContent;
        assert.ok(!isNaN(elem) && elem.toString().indexOf(".") != -1);
      });
      it("daily high temperature is a float", () => {
        const elem = dom.window.document.getElementById(`day${i}_high`).textContent;
        assert.ok(!isNaN(elem) && elem.toString().indexOf(".") != -1);
      });
    });
  }
});
