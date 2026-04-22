export const AUTH_KEY = 'AUTH_KEY';

export const ITINERARY_KEY = 'itinerary';

export const list_id = (list_type, num) => `CBVqwaDe3Fj8LxvqtTE2E_${list_type}_${num}`;

export const time_key = 'DDufrl6fFchtVhhL1c8nk';

export function fileToUrl(file) {
	return new Promise((res, rej) => {
		const reader = new FileReader();
		reader.onloadend = () => res(reader.result);
		reader.onerror = rej;

		reader.readAsDataURL(file);
	});
}

export const tick = (time) =>
	new Promise((res) => (time ? setTimeout(res, time) : requestAnimationFrame(res)));
