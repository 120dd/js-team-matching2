import { $ } from "./utils/dom.js";
import { TEMPLATES } from "./templates.js";
import {
  COURSE_NAMES_EN,
  COURSE_NAMES_KR,
  SELECTORS
} from "./constants.js";
import { TeamMatcher } from "./teamMatcher.js";

const Menus = {
  CREW: 'CREW',
  TEAM: 'TEAM',
}

const Courses = {
  FRONTEND_COURSE: 'FRONTEND_COURSE',
  BACKEND_COURSE: 'BACKEND_COURSE',
}

const ViewEvents = {
  MENU_SELECTED: 'MENU_SELECTED',
  COURSE_SELECTED: 'COURSE_SELECTED',
  ADD_CREW_REQUESTED: 'ADD_CREW_REQUESTED',
  DELETE_CREW_REQUESTED: 'DELETE_CREW_REQUESTED',
  COURSE_MISSION_MANAGEMENT_SELECTED: 'COURSE_MISSION_MANAGEMENT_SELECTED',
  MATCHING_REQUESTED: 'MATCHING_REQUESTED',
  REMATCHING_REQUESTED: 'REMATCHING_REQUESTED',
};

export default class {
  constructor() {
    this.teamMatcher = new TeamMatcher();
    this.currentCourse = "";
    this.render();

    this.eventHandlers = new Map();
    this.registerEvents();
    this.registerHandlers();
  }

  render() {
    $(SELECTORS.APP).innerHTML = TEMPLATES.HEADER;
    $(SELECTORS.APP).insertAdjacentHTML("beforeend", TEMPLATES.MAIN);
  }

  registerEvents() {
    $(SELECTORS.APP).addEventListener("click", (e) => {
      e.preventDefault();
      const menu = this.mapEventToMenu(e);
      this.callEventHandler(ViewEvents.MENU_SELECTED, menu);
    });

    $(SELECTORS.MAIN).addEventListener("click", (e) => {
      e.preventDefault();
      const course = this.mapEventToCourse(e);
      this.callEventHandler(ViewEvents.COURSE_SELECTED, course);
    });
  }

  registerHandlers() {
    this.eventHandlers.set(ViewEvents.MENU_SELECTED, menu => {
      switch (menu) {
        case Menus.CREW: return this.renderCourseSelectSection();
        case Menus.TEAM: return this.renderTeamMatchingSection();
        default: throw new Error(`Not supported menu: ${menu}`);
      }
    });

    this.eventHandlers.set(ViewEvents.COURSE_SELECTED, course => {
      this.currentCourse = COURSE_NAMES_KR[course];
      this.renderCourseDetailSection();
    });
  }

  callEventHandler(event, data) {
    this.eventHandlers.get(event).call(this, data);
  }

  mapEventToMenu(e) {
    switch (e.target.id) {
      case SELECTORS.CREW_TAB: return Menus.CREW;
      case SELECTORS.TEAM_TAB: return Menus.TEAM;
      default: throw new Error(`Not supported menu selected event: ${e.target.id}`);
    }
  }

  mapEventToCourse(e) {
    switch (e.target.id) {
      case SELECTORS.FRONTEND_COURSE_INPUT: return Courses.FRONTEND_COURSE;
      case SELECTORS.BACKEND_COURSE_INPUT: return Courses.BACKEND_COURSE;
      default: throw new Error(`Not supported course selected event: ${e.target.id}`);
    }
  }

  renderCourseSelectSection() {
    $(SELECTORS.MAIN).innerHTML = TEMPLATES.COURSE_SELECT_SECTION;
  }

  renderCourseDetailSection() {
    $(SELECTORS.COURSE_SELECT_DETAIL).innerHTML = TEMPLATES
      .COURSE_DETAIL_SECTION(
        this.currentCourse,
        this.teamMatcher.teamList[COURSE_NAMES_EN[this.currentCourse]]
      );
  }

  renderTeamMatchingSection() {
    $(SELECTORS.MAIN).innerHTML = TEMPLATES.MISSION_SELECT_SECTION;
  }

  renderTeamMatchingSectionDetail(crewName, missionName) {
    $(SELECTORS.TEAM_MATCHING_DETAIL).innerHTML = TEMPLATES
      .TEAM_MATCHING_DETAIL(
        crewName,
        missionName,
        this.teamMatcher.teamList[$(SELECTORS.COURSE_SELECT).value]
      );
  }

  renderMatchResult(matchResult) {
    const courseName = $(SELECTORS.COURSE_SELECT)
      .options[$(SELECTORS.COURSE_SELECT).selectedIndex].text;
    const missionName = $(SELECTORS.MISSION_SELECT)
      .options[$(SELECTORS.MISSION_SELECT).selectedIndex].text;
    $(SELECTORS.TEAM_MATCHING_DETAIL).innerHTML = TEMPLATES.MATCH_RESULT_SECTION(
      courseName,
      missionName,
      matchResult,
    );
  }

  registerCrewManageTabEvent(addCrewFn, deleteCrewFn) {
    $(SELECTORS.MAIN).addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.id === SELECTORS.FRONTEND_COURSE_INPUT
        ||
        e.target.id === SELECTORS.BACKEND_COURSE_INPUT) {
        this.currentCourse = COURSE_NAMES_KR[e.target.value];
        this.renderCourseDetailSection();
      }
      if (e.target.id === SELECTORS.ADD_CREW_BUTTON) {
        addCrewFn(COURSE_NAMES_EN[this.currentCourse], $(SELECTORS.CREW_NAME_INPUT).value)
      }
      if (e.target.className === SELECTORS.DELETE_CREW_BUTTON) {
        deleteCrewFn(COURSE_NAMES_EN[this.currentCourse], e.target.dataset.idx);
      }
    })
  }

  registerTeamManageTabEvent(matchFn) {
    $(SELECTORS.MAIN).addEventListener("click", (e) => {
      e.preventDefault();
      const courseName = $(SELECTORS.COURSE_SELECT)
        .options[$(SELECTORS.COURSE_SELECT).selectedIndex].text;
      const missionName = $(SELECTORS.MISSION_SELECT)
        .options[$(SELECTORS.MISSION_SELECT).selectedIndex].text;
      if (e.target.id === SELECTORS.SHOW_TEAM_MATCHER_BUTTON ||
        e.target.id === SELECTORS.REMATCH_BUTTON) {
        this.renderTeamMatchingSectionDetail(courseName, missionName);
      }
      if (e.target.id === SELECTORS.MATCH_TEAM_BUTTON) {
        matchFn(COURSE_NAMES_EN[courseName], $(SELECTORS.TEAM_MEMBER_COUNT_INPUT).value);
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
