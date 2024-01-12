import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import University from "../components/University";
import Title from "../components/Title";
import Spinner from "../components/Spinner";
import { getUniversities } from "../features/universities/universitySlice";


const UniversitiesPage = () => {
	const { universities, isLoading, isError, message } = useSelector(
		(state) => state.universities
	);

	const dispatch = useDispatch();

	useEffect(() => {
		if (isError) {
			toast.error(message, { icon: "😭" });
		}
		dispatch(getUniversities());
	}, [dispatch, isError, message]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<Title title="Universities List"/>
			<Container>
				<Row>
					<Col className="mg-top text-center">
						<h1>Universities List</h1>
						<hr className="hr-text" />
					</Col>
				</Row>
				{
					<>
						<Row className="mt-3">
							{universities.map((university) => (
								<Col
									key={university.uid}
									sm={12}
									md={6}
									lg={4}
									xl={3}
								>
									<University university={university} />
								</Col>
							))}
						</Row>
					</>
				}
			</Container>
		</>
	);
};


export default UniversitiesPage;
