import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

import { Layout, Descriptions, Divider } from 'antd';

import { Col, Container, Row } from "react-bootstrap";

import moment from "moment";

import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import Title from "../components/Title";

import "../index.css";

import { getUniversityDetails } from "../features/universities/universitySlice";


const UniversityDetailsPage = () => {
	const params = useParams()
	const { Content } = Layout;
	
	const { university, isLoading, isError, message } = useSelector(
		(state) => state.universities
	)

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (isError) {
			toast.error(message, { icon: "😭" });
		}
		
		const uid = params.uid

		dispatch(getUniversityDetails(uid));
	}, [dispatch, isError, message]);


	if (isLoading) {
		return <Spinner/>
	}
	console.log(university)
	const items = [
		{
			key: '1',
			label: 'Name',
			children: university.name
		},
		{
			key: '2',
			label: 'Address',
			children: university.address
		},
		{
			key: '3',
			label: 'Date created',
			children:  university.date_created
		},
		{
			key: '4',
			label: 'Number of teachers',
			children: university.num_teachers
		},
		{
			key: '5',
			label: 'Number of students',
			children: university.num_students
		},
		{
			key: '6',
			label: 'Number of students registered',
			children: university.num_students_registered
		},
		{
			key: '7',
			label: 'Number of teachers registered',
			children: university.num_students_registered
		},
		{
			key: '8',
			label: 'Contact number',
			children: university.phone_number
		},
		{
			key: '9',
			label: 'Head organization',
			children: university.head_organization ? (university.head_organization): (null)
		},
		{
			key: '10',
			label: 'Rector',
			children: university.rector
		},
		{
			key: '11',
			label: 'Website',
			children: university.website
		},
		{
			key: '12',
			label: 'Activity LVL',
			children: university.activity_lvl
		},

	];

	return (
		<div>
			<Title title="University Details" />
			<Container 
			style={{ background: "white", borderRadius: "15px", padding: "20px"}}>
				<Row>
					<Col className="mt-5">
						<BackButton/>
						<section>
							<h1 className="text-center">
                                {university.name} {university.short_name ? (
									"(" + university.short_name + ")"
								) : (null)}
							</h1>
							<hr className="hr-text" />
						</section>
					</Col>
				</Row>
				{isLoading && <Spinner />}
				<Row className="mt-3">
					<Descriptions title="University Info" items={items} contentStyle={{fontSize: 17}} labelStyle={{fontSize: 17}} />
				</Row>
				<Divider/>
				<Row>
					<h4>Description</h4>
					<p>{university.description}</p>
				</Row>
			</Container>
		</div>	
  );
};


export default UniversityDetailsPage;
