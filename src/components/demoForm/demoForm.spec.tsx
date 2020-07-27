import React from 'react';
import { MockAppContext } from '../../helpers/testHelpers';
import {
	render,
	cleanup,
	fireEvent,
	screen,
	act,
} from '@testing-library/react';
import faker from 'faker';
import DemoForm from './demoForm';

afterEach(cleanup);

const renderComponent = (defaultName: string) =>
	render(
		<MockAppContext>
			<DemoForm defaultName={defaultName} />
		</MockAppContext>
	);

const submitForm = () => fireEvent.click(screen.getByTestId('submit-button'));
const resetForm = () => fireEvent.click(screen.getByTestId('reset-button'));
const updateName = (newName: string) =>
	fireEvent.change(screen.getByTestId('input-name__input'), {
		target: { value: newName },
	});

test('<DemoForm/> - renders without error', () => {
	renderComponent(faker.name.firstName());
});

test('<DemoForm/> - renders the default input value for name but does not show it below input', async () => {
	const defaultName = faker.name.firstName();

	renderComponent(defaultName);

	expect(screen.getByTestId('input-name__input')).toHaveValue(defaultName);

	expect(screen.queryByTestId('output-name')).not.toBeInTheDocument();
});

test('<DemoForm/> - shows the default value under the input when submitted after no other action', async () => {
	const defaultName = faker.name.firstName();

	renderComponent(defaultName);

	act(() => {
		submitForm();
	});

	const output = await screen.findByTestId('output-name');

	expect(output).toHaveTextContent(defaultName);
});

test('<DemoForm/> - Shows an updated input value under the name input after submission ', async () => {
	const defaultName = faker.name.firstName();
	const newName = faker.name.findName();

	renderComponent(defaultName);

	act(() => {
		updateName(newName);
		submitForm();
	});

	const output = await screen.findByTestId('output-name');

	expect(output).toHaveTextContent(newName);
});

test('<DemoForm/> - Shows an error and no output if no name is supplied', async () => {
	const defaultName = faker.name.firstName();

	renderComponent(defaultName);

	act(() => {
		updateName('');
		submitForm();
	});

	const output = await screen.findByTestId('output-name');
	const error = await screen.findByTestId('input-name__error');

	expect(output).not.toBeInTheDocument();
	expect(error).toHaveTextContent('Name is required');
});
