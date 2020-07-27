import React from 'react';
import styled from 'styled-components';

export interface FormInputProps {
	id: string;
	name: string;
	value?: string | number;
	labelText: string;
	placeholder?: string;
	type: 'text' | 'number';
	showError?: boolean;
	errorMessage?: string;
	modified: boolean;
	required?: boolean;
	onChange(e: React.ChangeEvent<any>): void;
}

export const FormInput: React.FC<FormInputProps> = ({
	id,
	name,
	value,
	labelText,
	type,
	placeholder,
	showError,
	errorMessage,
	modified,
	required,
	onChange,
}) => {
	return (
		<InputContainer data-testid={`input-${name}`}>
			<StyledLabel htmlFor={name} data-testid={`input-${name}__label`}>
				{labelText}
				{required ? '*' : ''}
			</StyledLabel>
			<StyledInput
				id={id}
				name={name}
				onChange={onChange}
				type={type}
				value={value}
				placeholder={placeholder}
				modified={modified}
				data-testid={`input-${name}__input`}
			/>
			{showError && (
				<ErrorMessage data-testid={`input-${name}__error`}>
					{errorMessage}
				</ErrorMessage>
			)}
		</InputContainer>
	);
};

const InputContainer = styled('div')`
	display: flex;
	align-items: center;
	width: 300px;
	flex-wrap: wrap;
`;

const StyledLabel = styled('label')`
	flex: 1;
	font-family: Arial, Helvetica, sans-serif;
`;

const StyledInput = styled('input')<{ modified: boolean }>`
	flex: 3;
	outline-color: ${({ modified }) => (modified ? 'blue' : 'black')}!important;
	border-color: ${({ modified }) => (modified ? 'blue' : 'black')}!important;
	padding: 5px;
	margin: 5px;
`;
const ErrorMessage = styled('div')`
	color: red;
	display: flex;
	flex: 100%;
	justify-content: flex-end;
	margin: 0 5px;
`;

export default FormInput;
