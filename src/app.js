import View from "./view.js";
import { TeamMatcher } from "./teamMatcher.js";
import { confirmMsg } from "./constants.js";

export class App {
    constructor() {
        this.view = new View();
        this.teamMatcher = new TeamMatcher();
        this.view.registerCrewManageTabEvent(this.requestAddCrew, this.requestDeleteCrew);
    }
    
    requestAddCrew = (currentCourse, crewName) => {
        this.teamMatcher.addCrew(currentCourse, crewName);
        this.view.renderCourseDetailSection();
    }
    
    requestDeleteCrew = (currentCourse, idx) => {
        if (!this.view.confirm(confirmMsg)) {
            return;
        }
        this.teamMatcher.deleteCrew(currentCourse, idx);
        this.view.renderCourseDetailSection();
    }
}