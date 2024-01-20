import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { updateQuestion, uploadQuestionImage, deleteQuestionImage, reset } from "../features/questions/questionSlice";

import Title from "../components/Title";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Checkbox } from "antd";

import "../index.css";


const UpdateQuestionPage = () => {    
    const { uid } = useParams();

    const { question, isQuestionLoading, isQuestionError, messageQuestion } = useSelector(
		(state) => state.questions
	);
    const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

    const [title, setTitle] = useState("");
	const [short_description, setShortDescription] = useState("");
    const [details, setDetails] = useState("");
	const [subject, setSubject] = useState("");
    const [image_1, setImage_1] = useState(null);
    const [image_2, setImage_2] = useState(null);
    const [image_3, setImage_3] = useState(null);
    const [image_num, setImage_num] = useState(0);

    const dispatch = useDispatch();
    const dispatch_question = useDispatch();
    const dispatch_upload_image = useDispatch();

	const navigate = useNavigate();

    useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (!user) {
			navigate("/login");
		}

		dispatch(reset());
	}, [isError, isQuestionError, isSuccess, message, messageQuestion,
        user, navigate, dispatch, dispatch_question]);

	const submitHandler = (e) => {
		e.preventDefault();

        const token = user.access

        const questionData = {
            "uid": uid,
            "token": token,
		};

		if (title) {
			questionData.title = title
		}
		if (short_description) {
			questionData.short_description = short_description
		}
        if (details) {
			questionData.details = details
		}
        if (subject) {
			questionData.subject = subject
		}

        dispatch_question(updateQuestion(questionData));
        
        const question_image_data = {
            "uid": uid,
            "token": token,
            "image_num": image_num,
        }

        
        if(image_1){
            question_image_data.image_1 = image_1
            dispatch_upload_image(uploadQuestionImage(question_image_data))
        }
        if(image_2){
            question_image_data.image_2 = image_2
            dispatch_upload_image(uploadQuestionImage(question_image_data))
        }
        if(image_3){
            question_image_data.image_2 = image_2
            dispatch_upload_image(uploadQuestionImage(question_image_data))
        }

		if(!isQuestionError && !isError) {
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
                                Edit question
							</h1>
							<hr className="hr-text" />
						</section>
					</Col>
				</Row>
				<BackButton/>
				{isLoading && isQuestionLoading && <Spinner />}
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
								<Form.Label>Image 1</Form.Label>
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
									placeholder="Input image"
									onChange={(e) =>
										setImage_2(e.target.files[0])
									}
								/>
							</Form.Group>

                            <Form.Group controlId="image_3">
								<Form.Label>Image 3</Form.Label>
								<Form.Control
									type="file"
									placeholder="Input image"
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
								Edit!
							</Button>

						</Form>
					</Col>
				</Row>
			</Container>
		</>
	);
};


export default UpdateQuestionPage;
