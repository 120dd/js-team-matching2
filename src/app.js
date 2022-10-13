import View from "./view.js";
import { TeamMatcher } from "./teamMatcher.js";
import { confirmMsg } from "./constants.js";
import { isCorrectNameLength, isDuplicatedName } from "./validator.js";

export class App {
    constructor() {
        this.view = new View();
        this.teamMatcher = new TeamMatcher();
        this.view.registerCrewManageTabEvent(this.requestAddCrew, this.requestDeleteCrew);
        this.view.registerTeamManageTabEvent(this.requestMatchTeam);
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
    
    requestMatchTeam = (courseName, num) => {
        const targetTeamLength = this.teamMatcher.teamList[ courseName ].length;
        if (!this.checkinValidMatchNum(targetTeamLength, num)) {
            return;
        }
        const randomTeamList = this.teamMatcher.matchTeam(courseName, num);
        this.view.renderMatchResult(randomTeamList);
    }
    
    checkinValidMatchNum(targetTeamLength, num) {
        const maxNum = targetTeamLength / 2
        if (maxNum < num) {
            this.view.alert(`매칭 최대값은 ${maxNum}입니다`);
            return false;
        }
        if (num < 1) {
            this.view.alert(`매칭 최소값은 1입니다`);
            return false;
        }
        return true;
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