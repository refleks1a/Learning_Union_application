import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

import Spinner from "../components/Spinner";
import Title from "../components/Title";
import { getMyProfile } from "../features/profiles/profileSlice";

import { deleteQuestion } from "../features/questions/questionSlice";
import { deleteAnswer } from "../features/answers/answerSlice";

import "../index.css"

import {
	MDBCol,
	MDBContainer,
	MDBRow,
	MDBCard,
	MDBCardText,
	MDBCardBody,
	MDBCardImage,
	MDBCardTitle,
	MDBListGroup,
	MDBListGroupItem,
	MDBCardFooter,
} from 'mdb-react-ui-kit';

import { Badge, Button, Popover, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";

import CloseButton from 'react-bootstrap/CloseButton';


const MyProfilePage = () => {
	const { profile, isLoading, isError, message } = useSelector(
		(state) => state.profiles
	);

	const { user, isLoadingUser, isErrorUser, isSuccessUser, messageUser } = useSelector(
		(state) => state.auth
	);

	const dispatch_question_delete = useDispatch();
	const dispatch_answer_delete = useDispatch();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Delete question
	async function handleQuestionDelete(uid) {

		const delete_question_data = {
			"token": user.access,
			"uid": uid,
		};

		dispatch_question_delete(deleteQuestion(delete_question_data));
		window.location.reload(false);
	}

	// Delete answer
	async function handleAnswerDelete(uid) {

		const delete_answer_data = {
			"token": user.access,
			"uid": uid,
		};

		dispatch_answer_delete(deleteAnswer(delete_answer_data));
		window.location.reload(false);
	}

	useEffect(() => {
		if (isError) {
			toast.error(message, { icon: "😭" });
		}

		if (isErrorUser) {
			toast.error(messageUser, { icon: "😭" });
		}

		if (!user) {
			navigate("/login");
		}
		
		const data = {
			"token": user.access
		}

		dispatch(getMyProfile(data));
	}, [dispatch, navigate, user, isError, isErrorUser, message, messageUser,
		isSuccessUser, dispatch_answer_delete, dispatch_question_delete,]);
	

	// Delete answer button trigger modal
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const handleOk = (uid) => {
		handleAnswerDelete(uid);
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};


	// Delete question button trigger modal
	const [isQuestionModalOpen, setQuestionIsModalOpen] = useState(false);
	const showQuestionModal = () => {
		setQuestionIsModalOpen(true);
	};
	const handleQuestionOk = (uid) => {
		handleQuestionDelete(uid);
		setQuestionIsModalOpen(false);
	};
	const handleQuestionCancel = () => {
		setQuestionIsModalOpen(false);
	};


	if ( isLoading || isLoadingUser ) {
		return <Spinner />;
	}

	let num_questions = 0;
	let num_answers = 0;
	let questions = []
	let answers = []
	let major = {}
	let university = {}
	let formatted_phone_number = ""

	if(profile.phone_number){
		formatted_phone_number =  "(" + profile.phone_number.substr(0,4) + ") " +
		profile.phone_number.substr(4,2) + "-" + profile.phone_number.substr(6,3) + "-" +
		profile.phone_number.substr(9,2) + "-" + profile.phone_number.substr(11,2)
	}
	if(profile.questions){
		num_questions = profile.questions.length
		questions = profile.questions
	}
	if(profile.answers){
		num_answers = profile.answers.length
		answers = profile.answers
	}
	if(profile.major){
		major = profile.major
	}
	if(profile.university){
		university = profile.university
	}

	return (
		<section style={{ backgroundColor: '#eee' }}>
		<Title title="My profile" />
		<MDBContainer className="py-5 mt-5">
  
		<MDBRow>
			<MDBCol lg="4">
			<MDBCard className="mb-4">
				{profile.top_helper ? (
					<Badge.Ribbon text="Top helper" color="cyan"/>
				) : (null)}
				{profile.is_student ? (
					<Badge.Ribbon text="Student" color="purple" style={{marginTop: '30px'}}/>
				) : (null)}
				{profile.is_teacher ? (
					<Badge.Ribbon text="Teacher" color="magenta" style={{marginTop: '30px'}}/>
				) : (null)}
				<MDBCardBody className="text-center">
					<MDBCardImage
						src={profile.profile_photo}
						alt="avatar"
						className="rounded-circle"
						style={{ width: '150px' }}
						fluid />
					<p className="text-muted mb-1">{profile.username}</p>
					<p className="text-muted mb-4">{profile.country}, {profile.city}</p>
					<div className="d-flex justify-content-center mb-2">
					<Link to={"/profile/update"}>
						<Button variant="primary" >Change(update) profile info</Button>
					</Link>
					</div>
				</MDBCardBody>
			</MDBCard>
  
				<MDBCard alignment='center'>
					<MDBCardBody>
						<MDBCardTitle>About Me</MDBCardTitle>
						<MDBCardText>{profile.about_me}</MDBCardText>
					</MDBCardBody>
					<MDBCardFooter className='text-muted'>rating: {profile.rating} </MDBCardFooter>
					<MDBCardFooter className='text-muted'>Number of questions: {num_questions} </MDBCardFooter>
					<MDBCardFooter className='text-muted'>Number of answers: {num_answers} </MDBCardFooter>
				</MDBCard>

			</MDBCol>
			<MDBCol lg="8">

				<MDBCard className="mb-4">
					<MDBCardBody>
					<MDBRow>
						<MDBCol sm="3">
						<MDBCardText>Full Name</MDBCardText>
						</MDBCol>
						<MDBCol sm="9">
						<MDBCardText className="text-muted">{profile.first_name} {profile.last_name} {profile.fathers_name} </MDBCardText>
						</MDBCol>
					</MDBRow>
					<hr />
					<MDBRow>
						<MDBCol sm="3">
						<MDBCardText>Email</MDBCardText>
						</MDBCol>
						<MDBCol sm="9">
						<MDBCardText className="text-muted">{profile.email}</MDBCardText>
						</MDBCol>
					</MDBRow>
					<hr />
					<MDBRow>
						<MDBCol sm="3">
						<MDBCardText>Phone</MDBCardText>
						</MDBCol>
						<MDBCol sm="9">
						<MDBCardText className="text-muted">{formatted_phone_number}</MDBCardText>
						</MDBCol>
					</MDBRow>
					<hr />
					<MDBRow>
						<MDBCol sm="3">
						<MDBCardText>Gender</MDBCardText>
						</MDBCol>
						<MDBCol sm="9">
						<MDBCardText className="text-muted">{profile.gender}</MDBCardText>
						</MDBCol>
					</MDBRow>
					<hr />
					<MDBRow>
						<MDBCol sm="3">
						<MDBCardText>University</MDBCardText>
						</MDBCol>
						<MDBCol sm="9">
						<MDBCardText className="text-muted">{university.name}</MDBCardText>
						</MDBCol>
					</MDBRow>
					<hr />
					<MDBRow>
						<MDBCol sm="3">
						<MDBCardText>Major</MDBCardText>
						</MDBCol>
						<MDBCol sm="9">
						<MDBCardText className="text-muted">{major.name}</MDBCardText>
						</MDBCol>
					</MDBRow>
					<hr />
					<MDBRow>
						<MDBCol sm="3">
						<MDBCardText>Language of eduction</MDBCardText>
						</MDBCol>
						<MDBCol sm="9">
						<MDBCardText className="text-muted">{profile.education_language}</MDBCardText>
						</MDBCol>
					</MDBRow>
					<hr />
					<MDBRow>
						<MDBCol sm="3">
						<MDBCardText>Year of education</MDBCardText>
						</MDBCol>
						<MDBCol sm="9">
						<MDBCardText className="text-muted">{profile.year_of_study}</MDBCardText>
						</MDBCol>
					</MDBRow>
					<hr />
					<MDBRow>
						<MDBCol sm="3">
						<MDBCardText>Type of degree</MDBCardText>
						</MDBCol>
						<MDBCol sm="9">
						<MDBCardText className="text-muted">{profile.degree_type}</MDBCardText>
						</MDBCol>
					</MDBRow>
					</MDBCardBody>
				</MDBCard>
  
				<MDBRow>
					
					<MDBCol md="6">
						<MDBCard className="mb-4 mb-md-0">
							<MDBCardBody style={{minHeight: "146px"}}>
								<MDBCardTitle style={{textAlign: 'center'}}>{profile.username}'s Answers</MDBCardTitle>
								<MDBListGroup light numbered style={{ minWidth: '22rem' }}>
									{answers.map((answer) => (
										<MDBListGroupItem className='d-flex justify-content-between align-items-start mb-3' key={answer.uid}>
											<div className='ms-2 me-auto'>
												<Link to={`/answer/${answer.uid}`}>
													<div className='fw-bold'>{answer.title}</div>
												</Link>
												{answer.description.substr(0, 40)}...
											</div>

											<div style={{display: "flex", alignItems: "center", padding: "12px"}}>
												<Popover content={<h6 style={{color: 'red'}}>Delete answer</h6>} trigger="hover">
													<CloseButton onClick={showModal}/>
													<Modal title="Delete answer" 
														open={isModalOpen} onOk={() => handleOk(answer.uid)} onCancel={handleCancel} 
														footer={[
															<Button key="back" onClick={handleCancel}>
															Cancel
															</Button>,
															<Button key="submit" type="primary" onClick={() => handleOk(answer.uid)} danger>
															Delete
															</Button>,
														]}
													>
														<p>Are you sure that you want to delete this answer?
															If yes, press "Delete" button, else press cancel. (The answer is deleted forever)
														</p>
													</Modal>
												</Popover>
								
												<Popover content={<h6 style={{color: 'green'}}>Edit answer</h6>} trigger="hover">
													<EditOutlined className="edit_img" onClick={()=> navigate(`/answer/${answer.uid}/update`)} />
												</Popover>
											</div>
											
										</MDBListGroupItem>
									))}
								</MDBListGroup>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
  
					<MDBCol md="6">
						<MDBCard className="mb-4 mb-md-0">
							<MDBCardBody style={{minHeight: "146px"}}>
								<MDBCardTitle style={{textAlign: 'center'}}>{profile.username}'s Questions</MDBCardTitle>
								<MDBListGroup light numbered style={{ minWidth: '22rem' }}>
									{questions.map((question) => (
										<MDBListGroupItem className='d-flex justify-content-between align-items-start mb-1' key={question.uid}>
											<div className='ms-2 me-auto'>
												<Link to={`/question/${question.uid}`}>
													<div className='fw-bold'>{question.title}</div>
												</Link>
												{question.short_description.substring(0, 40)}...
											</div>
											
											<div style={{display: "flex", alignItems: "center", padding: "12px"}}>
												<Popover content={<h6 style={{color: 'red'}}>Delete question</h6>} trigger="hover">
													<CloseButton onClick={showQuestionModal} />
													<Modal title="Delete question" 
														open={isQuestionModalOpen} onOk={() => handleQuestionOk(question.uid)} onCancel={handleQuestionCancel} 
														footer={[
															<Button key="back" onClick={handleQuestionCancel}>
															Cancel
															</Button>,
															<Button key="submit" type="primary" onClick={() => handleQuestionOk(question.uid)} danger>
															Delete
															</Button>,
														]}
													>
														<p>Are you sure that you want to delete this question?
															If yes, press "Delete" button, else press cancel. (The question is deleted forever)
														</p>
													</Modal>
												</Popover>

												<Popover content={<h6 style={{color: 'green'}}>Edit question</h6>} trigger="hover">
													<EditOutlined className="edit_img" onClick={()=> navigate(`/question/${question.uid}/update`)} />
												</Popover>
											</div>

										</MDBListGroupItem>
									))}
								</MDBListGroup>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>

				</MDBRow>

			</MDBCol>
		</MDBRow>
		</MDBContainer>
	  </section>
	);
};


export default MyProfilePage;
