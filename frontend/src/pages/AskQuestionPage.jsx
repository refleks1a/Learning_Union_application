import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createQuestion, reset } from "../features/questions/questionSlice";

import Title from "../components/Title";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

import { Button, Col, Container, Form, Row } from "react-bootstrap";

import "../index.css";



const AskQuestionPage = () => {

    const [title, setTitle] = useState("");
	const [short_description, setShortDescription] = useState("");
    const [details, setDetails] = useState("");
	const [subject, setSubject] = useState("");
    const [image_1, setImage_1] = useState(null);
	const [image_2, setImage_2] = useState(null);
	const [image_3, setImage_3] = useState(null);

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

		if (!short_description) {
			toast.error("A short description must be provided");
		}

        if (!details) {
			toast.error("Details must be provided");
		}

        if (!subject) {
			toast.error("A subject must be provided");
		}
        
        const token = user.access

		const questionData = {
			"title": title,
            "short_description": short_description,
			"details": details,
            "subject": subject,
            "token": token,
		};

		if (image_1){
			questionData.image_1 = image_1
		}
		if(image_2) {
			questionData.image_2 = image_2
		}
		if(image_3) {
			questionData.image_3 = image_3
		}

        dispatch(createQuestion(questionData));
		if(title && short_description && details && subject && token) {
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
								Ask question
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

							<Form.Group controlId="short_description">
								<Form.Label>Short description</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter short description"
									value={short_description}
									onChange={(e) =>
										setShortDescription(e.target.value)
									}
								/>
							</Form.Group>

                            <Form.Group controlId="details">
								<Form.Label>Details of the question</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter details"
									value={details}
									onChange={(e) =>
										setDetails(e.target.value)
									}
								/>
							</Form.Group>

                            <Form.Group controlId="subject">
								<Form.Label>Subject of the question</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter subject"
									value={subject}
									onChange={(e) =>
										setSubject(e.target.value)
									}
								/>
							</Form.Group>

							<Form.Group controlId="image_1">
								<Form.Label>Image</Form.Label>
								<Form.Control
									type="file"
									placeholder="Upload image"
									onChange={(e) => {
										setImage_1(e.target.files[0])
									}}
								/>
							</Form.Group>

							<Form.Group controlId="image_2">
								<Form.Label>Image 2</Form.Label>
								<Form.Control
									type="file"
									placeholder="Upload image"
									onChange={(e) =>
										setImage_2(e.target.files[0])
									}
								/>
							</Form.Group>

							<Form.Group controlId="image_3">
								<Form.Label>Image 3</Form.Label>
								<Form.Control
									type="file"
									placeholder="Upload image"
									onChange={(e) =>
										setImage_3(e.target.files[0])
									}
								/>
							</Form.Group>
									
							<Button
								type="submit"
								variant="outline-primary"
								className="mt-3"
							>
								Ask!
							</Button>

						</Form>
					</Col>
				</Row>
			</Container>
		</>
	);
};


export default AskQuestionPage;
