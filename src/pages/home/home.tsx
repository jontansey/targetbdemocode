import React from 'react';
import { Row, Col, Container } from 'react-grid-system';
import { DemoForm } from '../../components';

const Home: React.FC = () => (
	<Container fluid>
		<Row>
			<Col xs={12}>
				<h1 style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
					A Simple Form
				</h1>
				<DemoForm defaultName="Jon Tansey" />
			</Col>
		</Row>
	</Container>
);

export default Home;
