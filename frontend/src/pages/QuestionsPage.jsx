import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Question from "../components/Question";
import Title from "../components/Title";
import Spinner from "../components/Spinner";
import { getQuestions } from "../features/questions/questionSlice";


const QuestionsPage = () => {
	const { questions, isLoading, isError, message } = useSelector(
		(state) => state.questions
	);

	const dispatch = useDispatch();

	useEffect(() => {
		if (isError) {
			toast.error(message, { icon: "😭" });
		}
		dispatch(getQuestions());
	}, [dispatch, isError, message]);
	if (isLoading) {
		return <Spinner />;
	}
	return (
		<>
			<Title title="Questions List"/>
			<Container>
				<Row>
					<Col className="mg-top text-center">
						<h1>Questions List</h1>
						<hr className="hr-text" />
					</Col>
				</Row>
				{
					<>
						<Row className="mt-3">
							{questions.map((question) => (
								<Col
									key={question.uid}
									sm={12}
									md={6}
									lg={4}
									xl={3}
								>
									<Question question={question} />
								</Col>
							))}
						</Row>
					</>
				}
			</Container>
		</>
	);
};

export default QuestionsPage;