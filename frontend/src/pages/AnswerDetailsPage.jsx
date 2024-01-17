import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams, Link } from "react-router-dom";
import { Breadcrumb, Layout, theme, Divider ,Descriptions, Row } from 'antd';

import moment from "moment";

import Spinner from "../components/Spinner";
import DetailsBody from "../components/DetailsBody";
import BackButton from "../components/BackButton";

import { getAnswerDetails } from "../features/answers/answerSlice";

import "../index.css";


const AnswerDetailsPage = () => {
	const { Content } = Layout;
	const { uid } = useParams();


  	const { answer, isLoading, isError, message } = useSelector(
		(state) => state.answers
	);
	const {
		token: { colorBgContainer, borderRadiusLG },
	  } = theme.useToken();	

  	const dispatch = useDispatch();

	useEffect(() => {
		if (isError) {
			toast.error(message, { icon: "😭" });
		}
		dispatch(getAnswerDetails(uid));
	}, [dispatch, , isError, , message, , uid]);

	if (isLoading) {
		return <Spinner/>;
	}

	const items_description = [
		{
		  key: '1',
		  label: 'Author',
		  children: `${answer.username} (${answer.full_name})`,
		},
		{
		  key: '3',
		  label: 'Status',
		  children: answer.is_solution ? (
			"Solution") : (
				"Not Solution"
			)
		  ,
		},
		{
		  key: '4',
		  label: 'Date answered',
		  children: moment(answer.date_answered).format("YYYY/MM/DD kk:mm:ss"),
		},
		{
		  key: '5',
		  label: 'Date modified',
		  children: moment(answer.date_modified).format("YYYY/MM/DD kk:mm:ss"),
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
						<Breadcrumb style={{ margin: '16px 0' }} >
							<Breadcrumb.Item><Link to={'/'}>Home</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to={'/questions/all/'}>Questions</Link></Breadcrumb.Item>
							<Breadcrumb.Item><Link to={`/question/${answer.question_uid}`}>Question Details</Link></Breadcrumb.Item>
							<Breadcrumb.Item>Answer Details</Breadcrumb.Item>
						</Breadcrumb>
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
