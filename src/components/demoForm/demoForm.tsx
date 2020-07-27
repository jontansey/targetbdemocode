import React from 'react';
import { useFormik } from 'formik';

import { Row, Col, Container } from 'react-grid-system';
import Button from '@material-ui/core/Button';

import { demoFormSchema } from './schema';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { FORM_DATA } from '../../gql/queries/formData';
import { FormInput } from '..';

interface DemoFormProps {
	defaultName: string;
}

const DemoForm: React.FC<DemoFormProps> = ({ defaultName }) => {
	const client = useApolloClient();

	const initialValues = { name: defaultName, age: '' };

	const { loading, error, data } = useQuery(FORM_DATA);
	const setFormData = (name: string, age: string) =>
		client.writeData({ data: { name, age } });

	const {
		handleChange,
		handleSubmit,
		values,
		touched,
		errors,
		resetForm,
	} = useFormik({
		initialValues,
		validationSchema: demoFormSchema,
		onSubmit: (values, actions) => {
			setFormData(values.name, values.age);
			actions.setSubmitting(false);
		},
		enableReinitialize: true,
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	const { name, age } = data;

	return (
		<Container fluid>
			<Row>
				<Col xs={12}>
					<form onSubmit={handleSubmit}>
						<FormInput
							id="name-input"
							labelText="Name: "
							onChange={handleChange}
							value={values.name}
							name="name"
							type="text"
							placeholder="e.g. Jon, Paul"
							showError={touched.name === true && errors.name !== undefined}
							errorMessage={errors.name}
							modified={
								values.name !== name && values.name !== initialValues.name
							}
							required={true}
						/>
						{name && <pre data-testid="output-name">{name}</pre>}

						<FormInput
							id="age-input"
							labelText="Age: "
							onChange={handleChange}
							value={values.age}
							name="age"
							type="number"
							showError={touched.age === true && errors.age !== undefined}
							errorMessage={errors.age}
							modified={values.age !== age && values.age !== initialValues.age}
						/>
						{age && <pre data-testid="output-age">{age}</pre>}

						<div
							style={{
								display: 'flex',
								width: '300px',
								justifyContent: 'space-between',
								marginTop: '40px ',
							}}
						>
							<Button
								color="secondary"
								variant="outlined"
								onClick={() => {
									resetForm();
									setFormData('', '');
								}}
								data-testid="reset-button"
							>
								reset
							</Button>

							<Button
								type="submit"
								color="primary"
								variant="contained"
								data-testid="submit-button"
							>
								Submit
							</Button>
						</div>
					</form>
				</Col>
			</Row>
		</Container>
	);
};

export default DemoForm;
