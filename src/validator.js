import { MAX_NAME_LENGTH } from './constants.js';

export function isDuplicatedName(name, teamList) {
	const names = Object.values(teamList);
	let isDuplicate = false;
	names.map(nameList => {
		if (nameList.includes(name)) {
			isDuplicate = true;
		}
	});
	return isDuplicate;
}

export function isCorrectNameLength(name) {
	return name.length > MAX_NAME_LENGTH;
}
