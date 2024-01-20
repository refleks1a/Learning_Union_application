import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams, Link } from "react-router-dom";

import { Breadcrumb, Layout, theme, Divider ,Descriptions, Row } from 'antd';
import { Button } from "react-bootstrap";

import moment from "moment";

import Spinner from "../components/Spinner";
import DetailsBody from "../components/DetailsBody";
import BackButton from "../components/BackButton";
import Title from "../components/Title";

import { getAnswerDetails, isSolutionAnswer } from "../features/answers/answerSlice";
import { getMyProfile } from "../features/profiles/profileSlice";

import "../index.css";


const AnswerDetailsPage = () => {
	const { Content } = Layout;
	const { uid } = useParams();

  	const { answer, isLoading, isError, message } = useSelector(
		(state) => state.answers
	);

	const { profile, isProfileLoading, isProfileError, messageProfile } = useSelector(
		(state) => state.profiles
	);

	const { user, isLoadingUser, isErrorUser, isSuccessUser, messageUser } = useSelector(
		(state) => state.auth
	);

	const {
		token: { colorBgContainer, borderRadiusLG },
	  } = theme.useToken();	

  	const dispatch = useDispatch();
	const dispatch_profile = useDispatch();

	useEffect(() => {
		if (isError) {
			toast.error(message, { icon: "😭" });
		}

		if (isProfileError) {
			toast.error(messageProfile, { icon: "😭" });
		}

		if (user) {
			const data = {
				"token": user.access
			}

			dispatch_profile(getMyProfile(data))
		}

		dispatch(getAnswerDetails(uid));
	}, [dispatch, dispatch_profile, isError, message, uid, isErrorUser,
		isSuccessUser, messageUser]);

	const isSolutionHandle = async () => {
		const data = {
			"token": user.access,
			"uid": uid,
		}

		if (answer.is_solution) {
			data.is_solution = false
		} else {
			data.is_solution = true
		}

		dispatch(isSolutionAnswer(data))
		window.location.reload();
	}
		
	if (isLoading || isProfileLoading || isLoadingUser) {
		return <Spinner/>;
	}

	const items_description = [
		{
			key: '1',
			label: 'Author',
			children: <Link to={`/profile/${answer.author_uid}`}>{answer.username} ({answer.full_name})</Link> ,
		},
		{
			key: '2',
			label: 'Status',
			children: answer.is_solution ? (
			"Solution") : (
				"Not Solution"
			)
		},
		{
			key: '3',
			label: 'Date answered',
			children: moment(answer.date_answered).format("YYYY/MM/DD kk:mm:ss"),
		},
		{
			key: '4',
			label: 'Date modified',
			children: moment(answer.date_modified).format("YYYY/MM/DD kk:mm:ss"),
		},

	];

	const breadcrumb_items = [
		{
			title: <Link to={'/'}>Home</Link>,
		},
		{
			title: <Link to={'/questions/all/'}>Questions</Link>,
		},
		{
			title: <Link to={`/question/${answer.question_uid}`}>Question Details</Link>,
		},
		{
			title: "Answer Details",
		},
	]

	return (
	<Layout>
		<Title title="Answer details" />
		<Layout 
			style={{minHeigh: 900}}>
			<Layout
				style={{padding: '24px 24px ',}}>
				<Content
					style={{
					padding: 24,
					margin: 0,
					minHeight: 280,
					background: colorBgContainer,
					borderRadius: borderRadiusLG,
					}}>
					<Row style={{marginLeft: "60px"}}>
						<Breadcrumb style={{ margin: '16px 0' }} items={breadcrumb_items}></Breadcrumb>
					</Row>
					<Row style={{marginLeft: "60px"}}>
						<BackButton/>
					</Row>
					<Divider>
						<h1 style={{
							textAlign: 'center',
							fontWeight: 450,
							fontSize: 32,
						}}>
							{answer.title}
						</h1>
					</Divider>
					<Row style={{marginLeft: "60px"}}>
						<Descriptions title="Answer Info" items={items_description} contentStyle={{fontSize: 17,}} labelStyle={{fontSize: 17}} />
						{answer.question_author_uid == profile.id ? (
							<Button onClick={() => isSolutionHandle()} variant="outline-warning" >
								Change solution status
							</Button>
						) : (null)}
					</Row>
					<Divider/>
					<DetailsBody item={answer} item_name={"answer"}/>
				</Content>
			</Layout>
		</Layout>
	</Layout>	
  );
};


export default AnswerDetailsPage;
