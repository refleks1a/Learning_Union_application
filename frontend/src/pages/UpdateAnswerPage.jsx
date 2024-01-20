import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { updateAnswer, uploadAnswerImage, reset } from "../features/answers/answerSlice";

import Title from "../components/Title";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

import { Button, Col, Container, Form, Row } from "react-bootstrap";

import "../index.css";


const UpdateAnswerPage = () => {    
    const { uid } = useParams();

    const { answer, isAnswerLoading, isAnswerError, messageAnswer } = useSelector(
		(state) => state.answers
	);
    const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

    const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
    const [image_1, setImage_1] = useState(null);
    const [image_2, setImage_2] = useState(null);
    const [image_3, setImage_3] = useState(null);

    const dispatch = useDispatch();
    const dispatch_answer = useDispatch();
    const dispatch_upload_image = useDispatch();

	const navigate = useNavigate();

    useEffect(() => {
		if (isError) {
			toast.error(message);
		}

        if (isAnswerError){
            toast.error(messageAnswer)
        }

		if (!user) {
			navigate("/login");
		}

		dispatch(reset());
	}, [isError, isAnswerError, isSuccess, message, messageAnswer,
        user, navigate, dispatch, dispatch_answer]);

	const submitHandler = (e) => {
		e.preventDefault();

        const token = user.access

        const answerData = {
            "uid": uid,
            "token": token,
		};

		if (title) {
			answerData.title = title
		}
		if (description) {
			answerData.description = description
		}

        dispatch_answer(updateAnswer(answerData));
        
        const answer_image_data = {
            "uid": uid,
            "token": token,
        }

        if(image_1){
            answer_image_data.image_1 = image_1
        }
        if(image_2){
            answer_image_data.image_2 = image_2
        }
        if(image_3){
            answer_image_data.image_3 = image_3
        }

        if(image_1 || image_2 || image_3) {
            dispatch_upload_image(uploadAnswerImage(answer_image_data))
        }

		if(!isAnswerError && !isError) {
			navigate(-1)
		}
	};

    return (    
		<>
		    <Title title="Edit answer" />
			<Container>
				<Row>
					<Col className="mg-top text-center">
						<section>
							<h1>
                                Edit answer
							</h1>
							<hr className="hr-text" />
						</section>
					</Col>
				</Row>
				<BackButton/>
				{isLoading && isAnswerLoading && <Spinner />}
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


export default UpdateAnswerPage;
