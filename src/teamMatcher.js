export class TeamMatcher {
    constructor() {
        if (TeamMatcher.instance) {
            return TeamMatcher.instance;
        }
        TeamMatcher.instance = this;
        this.teamList = {
            frontend: ["크리스", "준"],
            backend: ["밥"]
        }
    }
    
    addCrew(courseName, crewName) {
        this.teamList[ courseName ].push(crewName);
    }
    
    deleteCrew(courseName, idx) {
        this.teamList[ courseName ].splice(idx, 1);
    }
}