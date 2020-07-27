import * as Yup from 'yup';

export const demoFormSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, 'Name must be at least 2 characters')
		.max(100, 'Maximum 100 characters')
		.required('Name is required'),
	age: Yup.number()
		.min(13, 'You must be 13 or over to use this form')
		.max(130, "That doesn't look correct"),
});
