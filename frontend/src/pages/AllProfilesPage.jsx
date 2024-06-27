import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import Title from "../components/Title";
import Spinner from "../components/Spinner";

import { getAllProfiles } from "../features/profiles/profileSlice"
import {} from "./UserProfilePage"


const AllProfilesPage = () => {

	const { profiles, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.profiles
	);

	const { user, isUserLoading, isUserError, isUserSuccess, UserMessage } = useSelector(
		(state) => state.auth
	);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (isError) {
			toast.error(message, { icon: "😭" });
		}

		if (!user) {
			navigate("/login");
		}
		const token = user.access

		const data = {
			"token" : token
		}
		dispatch(getAllProfiles(data));
				
	}, [dispatch, isError, message, user, isUserError, isUserSuccess, UserMessage]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<Title title="User Profiles"/>
			<Container>
				<Row>
					<Col className="mg-top text-center">
						<h1>User Profiles</h1>
						<hr className="hr-text" />
					</Col>
				</Row>
				{
					<>
						<Row className="mt-3">
							{profiles.map((profile) => (
								<Col
									key={profile.id}
									sm={12}
									md={6}
									lg={4}
									xl={3}
								>
									<Link to={`/profile/${profile.id}`}>
										<h5>{profile.username}</h5>
									</Link>
									<h6>{profile.first_name} {profile.last_name} {profile.fathers_name}</h6>
									<h6>{profile.country}, {profile.city}</h6>
								</Col>
							))}
						</Row>
					</>
				}
			</Container>
		</>
	);
};


export default AllProfilesPage;
