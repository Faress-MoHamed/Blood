export const AddToSessionStorage = (key, data, expiredDate) => {
	window.sessionStorage.setItem(key, data, {
		expiredDate: expiredDate || 0,
	});
};
