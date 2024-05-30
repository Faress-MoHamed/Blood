export const AddToLocalStorage = (key, data, expiredDate) => {
	window.localStorage.setItem(key, data, {
		expiredDate: expiredDate || 0,
	});
};
