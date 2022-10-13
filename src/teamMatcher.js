import { getLocalStorage, setLocalStorage } from "./store/localStorage.js";

export class TeamMatcher {
    constructor() {
        if (TeamMatcher.instance) {
            return TeamMatcher.instance;
        }
        TeamMatcher.instance = this;
        this.teamList = getLocalStorage("teamList") || {
            frontend: [],
            backend: []
        }
    }
    
    addCrew(courseName, crewName) {
        this.teamList[ courseName ].push(crewName);
        setLocalStorage("teamList", this.teamList);
    }
    
    deleteCrew(courseName, idx) {
        this.teamList[ courseName ].splice(idx, 1);
        setLocalStorage("teamList", this.teamList);
    }
    
    matchTeam(courseName, num) {
        const targetCourse = this.teamList[ courseName ];
        const targetCourseIdx = this.teamList[ courseName ].map((v, idx) => idx);
        const randomCrewsIdx = MissionUtils.Random.shuffle(targetCourseIdx);
        const randomCrew = randomCrewsIdx.map(v => targetCourse[ v ]);
        const teamNum = Math.floor(randomCrew.length / num);
        const randomCrewList = [];
        for (let i = 0 ; i < teamNum ; i ++) {
            randomCrewList.push([]);
        }
        randomCrew.forEach((name, idx) => {
            const newIdx = idx % teamNum;
            randomCrewList[ newIdx ].push(name);
        });
        return randomCrewList;
    }
}