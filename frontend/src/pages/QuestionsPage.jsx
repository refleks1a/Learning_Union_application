import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Question from "../components/Question";
import Title from "../components/Title";
import Spinner from "../components/Spinner";
import { getQuestions } from "../features/questions/questionSlice";

import { Col, Container, Row, Button } from "react-bootstrap";
import { InputNumber, Checkbox } from "antd";

import { useNavigate } from "react-router-dom";


const QuestionsPage = () => {
	const { questions, isLoading, isError, message } = useSelector(
		(state) => state.questions
	);
	const [solved, setSolved] = useState()

	const [views_gte, setViewsGte] = useState()
	const [views_lte, setViewsLte] = useState()

	const [answers_gte, setAnswersGte] = useState()
	const [answers_lte, setAnswersLte] = useState()

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (isError) {
			toast.error(message, { icon: "😭" });
		}
		const data = {}

		dispatch(getQuestions(data));
	}, [dispatch, isError, message]);

	if (isLoading) {
		return <Spinner/>;
	}

	const filterAnswers = (e) => {
		e.preventDefault();
        const Data = {};

		if(solved){
			Data.solved_status = solved
		}
		if(views_gte){
			Data.num_views_gte = views_gte
		}
		if(views_lte){
			Data.num_views_lte = views_lte
		}
		if(answers_gte){
			Data.num_answers_gte = answers_gte
		}
		if(answers_lte){
			Data.num_answers_lte = answers_lte
		}
		
		dispatch(getQuestions(Data))
	};

	return (
		<div className="mt-3">
			<Title title="Questions List"/>
			<Container style={{ background: "white", borderRadius: "15px", padding: "20px" }}>
				<Row>
					<Col className="text-center" style={{marginTop: "20px"}}>
						<h1>Questions List</h1>
						<hr className="hr-text" />
					</Col>
				</Row>
				<Row style={{marginBottom: "15px"}}>
					<Col>
						<Row className="text-center">
							<Col>
								<h3 style={{position: "relative", top: "25px"}}>Filters</h3>
							</Col>
							<Col>
								<h6>Solution Status</h6>
							</Col>
							<Col>
								<h6>Number of views greater than</h6>
							</Col>
							<Col>
								<h6>Number of views less than</h6>
							</Col>
							<Col>
								<h6>Number of answers greater than</h6>
							</Col>
							<Col>
								<h6>Number of answers less than</h6>
							</Col>
							<Col>
								<Button 
								onClick={(e) => filterAnswers(e)}
								type="button"
								variant="outline-primary"
								style={{width: "120px"}}
								>
									Apply Filters
								</Button>
							</Col>
						</Row>
						
						<Row className="text-center">
							<Col>
							</Col>
							<Col>
								<Checkbox onChange={() => setSolved("True")}>Yes</Checkbox>
								<Checkbox onChange={() => setSolved("False")}>No</Checkbox>
							</Col>
							<Col>
								<InputNumber min={0} defaultValue={1} onChange={(e) => setViewsGte(e)} />
							</Col>
							<Col>
								<InputNumber min={1} defaultValue={1} onChange={(e) => setViewsLte(e)} />
							</Col>
							<Col>
								<InputNumber min={0} defaultValue={1} onChange={(e) => setAnswersGte(e)} />
							</Col>
							<Col>
								<InputNumber min={1} defaultValue={1} onChange={(e) => setAnswersLte(e)} />
							</Col>
							<Col>
								<Button
								onClick={() => navigate(0)}
								variant="outline-warning"
								style={{width: "120px"}}
								>
									Clear filters
								</Button>
							</Col>
						</Row>
					</Col>
				</Row>
				<hr className="hr-text" />
				{
					<Row className="mt-4 ">
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
				}
			</Container>
		</div>
	);
};

export default QuestionsPage;