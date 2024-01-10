import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Title from "../components/Title";
import Spinner from "../components/Spinner";
import { getQuestions, reset } from "../features/questions/questionSlice";


const QuestionsPage = () => {
	const { questions, isLoading, isError, message } = useSelector(
		(state) => state.questions
	);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getQuestions());
	}, [dispatch]);

	if (isLoading) {
		return <Spinner />;
	}
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