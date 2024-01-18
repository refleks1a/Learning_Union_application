import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams, Link } from "react-router-dom";

import { Breadcrumb, Layout, theme, Divider ,Descriptions, Row } from 'antd';
import { Button } from "react-bootstrap";

import moment from "moment";

import "../index.css";

import { getQuestionDetails } from "../features/questions/questionSlice";

import Spinner from "../components/Spinner";
import AnswersList from "../components/AnswersList";
import DetailsBody from "../components/DetailsBody";
import BackButton from "../components/BackButton";


const { Content } = Layout;


const QuestionDetailsPage = () => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	  } = theme.useToken();
	  
	const { uid } = useParams();

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
		  children: question.author_full_name,
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

	const breadcrumb_items = [
		{
			title: <Link to={'/'}>Home</Link>,
		},
		{
			title: <Link to={'/questions/all/'}>Questions</Link>,
		},
		{
			title: "Question details",
		},
	]

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
							{question.title}
						</h1>
					</Divider>
					<Row style={{marginLeft: "60px"}}>
						<Descriptions title="Question Info" items={items} contentStyle={{fontSize: 17}} labelStyle={{fontSize: 17}} />
						<Link to={`/answer/create/${uid}`}>
							<Button size="lg" variant="outline-primary">Answer this question</Button>
						</Link>
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
