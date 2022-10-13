export function isDuplicatedName(name, teamList) {
    const names = Object.values(teamList);
    let isDuplicate = false;
    names.map(nameList => {
        if (nameList.includes(name)) {
            isDuplicate = true
        }
    })
    return isDuplicate;
}

export function isCorrectNameLength(name) {
    return name.length > 5;
}