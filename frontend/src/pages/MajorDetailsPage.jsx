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

import { getMajorDetails } from "../features/majors/majorSlice";


const MajorDetailsPage = () => {
	const params = useParams()
	const { Content } = Layout;
	
	const { major, isLoading, isError, message } = useSelector(
		(state) => state.majors
	)

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (isError) {
			toast.error(message, { icon: "😭" });
		}
		
		const uid = params.uid

		dispatch(getMajorDetails(uid));
	}, [dispatch, isError, message]);


	if (isLoading) {
		return <Spinner/>
	}

    const items = [
		{
			key: '1',
			label: 'Name',
			children: major.name
		},
		{
			key: '2',
			label: 'Number of students registered',
			children: major.num_students
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
                                {major.name}
							</h1>
							<hr className="hr-text" />
						</section>
					</Col>
				</Row>
				{isLoading && <Spinner />}
				<Row className="mt-3">
					<Descriptions title="Major Info" items={items} contentStyle={{fontSize: 17}} labelStyle={{fontSize: 17}} />
				</Row>
			</Container>
		</div>	
  );
};


export default MajorDetailsPage;
