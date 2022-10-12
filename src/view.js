import { $ } from "./utils/dom.js";
import { TEMPLATES } from "./templates.js";
import { SELECTORS } from "./constants.js";

export default class {
    constructor() {
        this.renderHeader();
        this.renderMain();
        this.registerHeaderEvent();
    }
    
    renderHeader() {
        $("app").innerHTML = TEMPLATES.HEADER;
    }
    
    renderMain() {
        $("app").insertAdjacentHTML("beforeend", TEMPLATES.MAIN);
    }
    
    registerHeaderEvent() {
        $("app").addEventListener("click", (e) => {
            if (e.target.id === SELECTORS.CREW_TAB) {
                console.log(11);
            }
            if (e.target.id === SELECTORS.TEAM_TAB) {
                console.log(22);
            }
        })
    }
}