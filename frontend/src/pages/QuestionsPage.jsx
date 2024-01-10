import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Title from "../components/Title";

const QuestionsPage = () => {

	return (
		<>
			<Title title="Questions List" />
			<Container>
				<Row>
					<Col className="mg-top text-center">
						<h1>Questions List</h1>
						<hr className="hr-text" />
						<p>Questions will be displayed here</p>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default QuestionsPage;