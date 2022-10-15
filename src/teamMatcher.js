import { load, save } from './store/dataStore.js';

export class TeamMatcher {
	static #instance;

	constructor() {
		if (TeamMatcher.#instance) return TeamMatcher.#instance;
		this.teamList = load('teamList') || {
			frontend: [],
			backend: [],
		};
		TeamMatcher.#instance = this;
	}

	addCrew(courseName, crewName) {
		this.teamList[courseName].push(crewName);
		save('teamList', this.teamList);
	}

	deleteCrew(courseName, idx) {
		this.teamList[courseName].splice(idx, 1);
		save('teamList', this.teamList);
	}

	matchTeam(courseName, num) {
		const targetCourse = this.teamList[courseName];
		const randomCrew = this.makeRandomIdxList(targetCourse.length).map(v => targetCourse[v]);
		const matchedTeamList = [];
		let extraIdx = 0;
		while (randomCrew.length !== 0) {
			if (randomCrew.length > num) {
				matchedTeamList.push(randomCrew.splice(0, num));
			} else {
				matchedTeamList[extraIdx].push(randomCrew.splice(0, 1));
				extraIdx += 1;
			}
		}
		return matchedTeamList;
	}

	makeRandomIdxList(length) {
		const newIdx = [];
		for (let i = 0; i < length; i++) {
			newIdx.push(i);
		}
		return MissionUtils.Random.shuffle(newIdx);
	}
}
