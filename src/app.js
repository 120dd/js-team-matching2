import View from "./view.js";
import { TeamMatcher } from "./teamMatcher.js";
import { confirmMsg } from "./constants.js";
import { isCorrectNameLength, isDuplicatedName } from "./validator.js";

export class App {
    constructor() {
        this.view = new View();
        this.teamMatcher = new TeamMatcher();
        this.view.registerCrewManageTabEvent(this.requestAddCrew, this.requestDeleteCrew);
    }
    
    requestAddCrew = (currentCourse, crewName) => {
        if (this.invalidCrewNameCheck(crewName, this.teamMatcher.teamList)) {
            return;
        }
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
    
    invalidCrewNameCheck(crewName, teamList) {
        if (isDuplicatedName(crewName, teamList)) {
            this.view.alert("중복된 이름입니다");
            return true;
        }
        if (isCorrectNameLength(crewName)) {
            this.view.alert("이름은 5글자까지만 가능합니다");
            return true;
        }
        return false;
    }
}