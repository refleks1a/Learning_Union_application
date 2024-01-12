import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Major from "../components/Major";
import Title from "../components/Title";
import Spinner from "../components/Spinner";
import { getMajors } from "../features/majors/majorSlice";


const MajorsPage = () => {
	const { majors, isLoading, isError, message } = useSelector(
		(state) => state.majors
	);

	const dispatch = useDispatch();

	useEffect(() => {
		if (isError) {
			toast.error(message, { icon: "😭" });
		}
		dispatch(getMajors());
	}, [dispatch, isError, message]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<Title title="Majors List"/>
			<Container>
				<Row>
					<Col className="mg-top text-center">
						<h1>Majors List</h1>
						<hr className="hr-text" />
					</Col>
				</Row>
				{
					<>
						<Row className="mt-3">
							{majors.map((major) => (
								<Col
									key={major.uid}
									sm={12}
									md={6}
									lg={4}
									xl={3}
								>
									<Major major={major} />
								</Col>
							))}
						</Row>
					</>
				}
			</Container>
		</>
	);
};


export default MajorsPage;
