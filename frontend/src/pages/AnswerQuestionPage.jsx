import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createAnswer, reset } from "../features/answers/answerSlice";

import Title from "../components/Title";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

import { Button, Col, Container, Form, Row } from "react-bootstrap";

import "../index.css";



const AnswerQuestionPage = () => {
    const { uid } = useParams();

    const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

    const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

    useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (!user) {
			navigate("/login");
		}

		dispatch(reset());
	}, [isError, isSuccess, message, user, navigate, dispatch]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (!title) {
			toast.error("A title must be provided");
		}

		if (!description) {
			toast.error("A description must be provided");
		}
        
        const token = user.access
		const answerData = {
            uid,
			title,
			description,
            token,
		};
        dispatch(createAnswer(answerData));
		if(uid && title && description && token) {
			navigate(-1)
		}
	};

	return (
        <>
			<Title title="login" />
			<Container>
				<Row>
					<Col className="mg-top text-center">
						<section>
							<h1>
								Answer
							</h1>
							<hr className="hr-text" />
						</section>
					</Col>
				</Row>
				<BackButton/>
				{isLoading && <Spinner />}
				<Row className="mt-3">
					<Col className="justify-content-center">
						<Form onSubmit={submitHandler}>

							<Form.Group controlId="title">
								<Form.Label>Title</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter title"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</Form.Group>

							<Form.Group controlId="description">
								<Form.Label>Description</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter description"
									value={description}
									onChange={(e) =>
										setDescription(e.target.value)
									}
								/>
							</Form.Group>
									
							<Button
								type="submit"
								variant="outline-primary"
								className="mt-3"
							>
								Answer!
							</Button>

						</Form>
					</Col>
				</Row>
			</Container>
		</>
	);
};


export default AnswerQuestionPage;
