import View from './view/view.js';
import { TeamMatcher } from './teamMatcher.js';
import { ALERT_MSG, confirmMsg } from './constants.js';
import { isCorrectNameLength, isDuplicatedName } from './validator.js';

const MATCHING_MIN_NUM = 1;
const MAX_NUM_DIVIDER = 2;

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
	};

	requestDeleteCrew = (currentCourse, idx) => {
		if (!this.view.confirm(confirmMsg)) {
			return;
		}
		this.teamMatcher.deleteCrew(currentCourse, idx);
		this.view.renderCourseDetailSection();
	};

	requestMatchTeam = (courseName, num) => {
		const targetTeamLength = this.teamMatcher.teamList[courseName].length;
		if (!this.checkinValidMatchNum(targetTeamLength, num)) {
			return;
		}
		const randomTeamList = this.teamMatcher.matchTeam(courseName, num);
		this.view.renderMatchResult(randomTeamList);
	};

	checkinValidMatchNum(targetTeamLength, num) {
		const maxNum = targetTeamLength / MAX_NUM_DIVIDER;
		if (maxNum < num) {
			this.view.alert(`매칭 최대값은 ${maxNum}입니다`);
			return false;
		}
		if (num < MATCHING_MIN_NUM) {
			this.view.alert(`매칭 최소값은 ${MATCHING_MIN_NUM}입니다`);
			return false;
		}
		return true;
	}

	invalidCrewNameCheck(crewName, teamList) {
		if (isDuplicatedName(crewName, teamList)) {
			this.view.alert('중복된 이름입니다');
			return true;
		}
		if (isCorrectNameLength(crewName)) {
			this.view.alert(ALERT_MSG.MAX_NAME_OVER);
			return true;
		}
		return false;
	}
}
