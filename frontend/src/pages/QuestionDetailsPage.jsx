import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams, Link } from "react-router-dom";
import { Breadcrumb, Layout, theme, Divider ,Descriptions, Image, Col, Row } from 'antd';

import Carousel from 'react-bootstrap/Carousel';

import moment from "moment";

import "../index.css";
import Spinner from "../components/Spinner";
import { getQuestionDetails } from "../features/questions/questionSlice";
import AnswersList from "../components/AnswersList";
import DetailsBody from "../components/DetailsBody";


const { Content } = Layout;


const QuestionDetailsPage = () => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	  } = theme.useToken();
	  
	const { uid } = useParams();
	const user = localStorage.getItem("user")

	const { question, isLoading, isError, message } = useSelector(
		(state) => state.questions
	);

	const dispatch_questions = useDispatch();
	
	useEffect(() => {
		if (isError) {
			toast.error(message, { icon: "😭" });
		}

		dispatch_questions(getQuestionDetails(uid));
	}, [dispatch_questions, isError, message, uid]);

	if (isLoading) {
		return <Spinner/>;
	}

	const items = [
		{
		  key: '1',
		  label: 'Author',
		  children: user.username,
		},
		{
		  key: '2',
		  label: 'Subject',
		  children: question.subject,
		},
		{
		  key: '3',
		  label: 'Status',
		  children: question.solved_status ? (
			"Solved") : (
				"Not Solved"
			)
		  ,
		},
		{
		  key: '4',
		  label: 'Date asked',
		  children: moment(question.date_asked).format("YYYY/MM/DD kk:mm:ss"),
		},
		{
		  key: '5',
		  label: 'Date modified',
		  children: moment(question.date_modified).format("YYYY/MM/DD kk:mm:ss"),
		},
		{
			key: '6',
			label: 'Date last viewed',
			children: moment(question.date_last_view).format("YYYY/MM/DD kk:mm:ss"),
		},
		
	];
	return (
	<Layout>
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
						<Breadcrumb style={{ margin: '16px 0' }}>
							<Breadcrumb.Item><Link to={'/'}>Home</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to={'/questions/all/'}>Questions</Link></Breadcrumb.Item>
							<Breadcrumb.Item>Question details</Breadcrumb.Item>
						</Breadcrumb>
					</Row>
					<Divider>
						<h1 style={{
							textAlign: 'center',
							fontWeight: 450,
							fontSize: 32,
						}}>
							{question.title}
						</h1>
					</Divider>
					<Row style={{marginLeft: "60px"}}>
						<Descriptions title="Question Info" items={items} contentStyle={{fontSize: 17,}} labelStyle={{fontSize: 17}} />
					</Row>
						
					<Divider/>
					<DetailsBody item={question} item_name={"question"}/>
					<AnswersList question_uid={uid}/>
				</Content>
			</Layout>
		</Layout>
	</Layout>	
  );
};

export default QuestionDetailsPage;