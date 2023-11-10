import dayjs from 'dayjs';

export function getAge(now?: Date) {
	const birthday = dayjs('2022-11-09');
	const years = dayjs(now).diff(birthday, 'years', true).toFixed(2);
	return years;
}
