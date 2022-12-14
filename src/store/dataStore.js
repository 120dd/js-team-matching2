export const save = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const load = key => JSON.parse(localStorage.getItem(key));
