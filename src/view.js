import { $ } from "./utils/dom.js";
import { TEMPLATES } from "./templates.js";
import { COURSE_NAMES_EN, COURSE_NAMES_KR, SELECTORS } from "./constants.js";
import { TeamMatcher } from "./teamMatcher.js";

export default class {
    constructor() {
        this.teamMatcher = new TeamMatcher();
        this.currentCourse = "";
        this.renderHeader();
        this.renderMain();
        this.registerHeaderEvent();
    }
    
    renderHeader() {
        $(SELECTORS.APP).innerHTML = TEMPLATES.HEADER;
    }
    
    renderMain() {
        $(SELECTORS.APP).insertAdjacentHTML("beforeend", TEMPLATES.MAIN);
    }
    
    renderCourseSelectSection() {
        $(SELECTORS.MAIN).innerHTML = TEMPLATES.COURSE_SELECT_SECTION;
    }
    
    renderCourseDetailSection() {
        $(SELECTORS.COURSE_SELECT_DETAIL).innerHTML = TEMPLATES
        .COURSE_DETAIL_SECTION(
            this.currentCourse,
            this.teamMatcher.teamList[ COURSE_NAMES_EN[ this.currentCourse ] ]
        );
    }
    
    registerHeaderEvent() {
        $(SELECTORS.APP).addEventListener("click", (e) => {
            if (e.target.id === SELECTORS.CREW_TAB) {
                this.renderCourseSelectSection();
            }
            if (e.target.id === SELECTORS.TEAM_TAB) {
                console.log(22);
            }
        })
    }
    
    registerCrewManageTabEvent(addCrewFn, deleteCrewFn) {
        $(SELECTORS.MAIN).addEventListener("click", (e) => {
            e.preventDefault();
            if (e.target.id === SELECTORS.FRONTEND_COURSE_INPUT
                ||
                e.target.id === SELECTORS.BACKEND_COURSE_INPUT) {
                this.currentCourse = COURSE_NAMES_KR[ e.target.value ];
                this.renderCourseDetailSection();
            }
            if (e.target.id === SELECTORS.ADD_CREW_BUTTON) {
                addCrewFn(COURSE_NAMES_EN[ this.currentCourse ], $(SELECTORS.CREW_NAME_INPUT).value)
            }
            if (e.target.className === SELECTORS.DELETE_CREW_BUTTON) {
                deleteCrewFn(COURSE_NAMES_EN[ this.currentCourse ], e.target.dataset.idx);
            }
        })
    }
    
    alert(msg) {
        alert(msg);
    }
    
    confirm(msg) {
        return confirm(msg);
    }
}