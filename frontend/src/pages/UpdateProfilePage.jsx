import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Title from "../components/Title";
import Spinner from "../components/Spinner";

import { Col, Container, Row, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

import PhoneInput from 'react-phone-input-2'
import "react-phone-input-2/lib/style.css";

import { Upload, InputNumber } from "antd";
import { PlusOutlined } from '@ant-design/icons';

import "../index.css";

import { getMyProfile } from "../features/profiles/profileSlice";
import { updateProfile } from "../features/profiles/profileSlice";


const UpdateProfilePage = () => { 

    const { profile, isLoading, isError, message } = useSelector(
		(state) => state.profiles
	);

	const { user, isLoadingUser, isErrorUser, isSuccessUser, messageUser } = useSelector(
		(state) => state.auth
	);

    const [phone_number, setPhone_number] = useState("");
    const [about_me, setAbout_me] = useState("");
    const [gender, setGender] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [education_language, setEducation_language] = useState("");
    const [year_of_study, setYear_of_study] = useState();
    const [degree_type, setDegree_type] = useState("");
    const [university, setUniversity] = useState("")
    const [major, setMajor] = useState("")
    const [who, setWho] = useState("");
    const [profile_photo, setProfile_photo] = useState(null);

    const dispatch = useDispatch();
	const navigate = useNavigate();

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

	}, [dispatch, navigate, user, isError, isErrorUser,
        message, messageUser, isSuccessUser]);
	

	const submitHandler = (e) => {
		e.preventDefault();

        const token = user.access

        const Data = {
            "token": token,
            "username": profile.username,
		};

		if (phone_number) {
			Data.phone_number = phone_number
		}
        if (about_me) {
			Data.about_me = about_me
		}
        if (gender) {
			Data.gender = gender
		}
        if (country) {
			Data.country = country
		}
        if (city) {
			Data.city = city
		}
        if (education_language) {
			Data.education_language = education_language
		}
        if (year_of_study) {
			Data.year_of_study = year_of_study
		}
        if (degree_type) {
			Data.degree_type = degree_type
		}
        if (who) {
			Data.who = who
		}
        if (profile_photo) {
			Data.profile_photo = profile_photo
		}
        if (university) {
			Data.university = university
		}
        if (major) {
			Data.major = major
		}
		console.log(Data)
        dispatch(updateProfile(Data))
        
		if(!isError) {
			navigate(-1)
		}
	};

    if ( isLoading || isLoadingUser ) {
		return <Spinner />;
	}

	return (    
		<>
		    <Title title="Edit profile" />
			<Container style={{background: "white", minHeight: "820px", borderRadius: "17px"}}>
				<Row>
					<Col className="mg-top">
						<section>
							<h1 className="text-center">
                                Edit my profile
							</h1>
							<h5 className="text-center">
								Choose what you want to edit!
							</h5>
							<hr className="hr-text" />
						</section>
					</Col>
				</Row>
				{isLoading && <Spinner />}
				<Row className="mt-3" 
				style={{display: "block", marginLeft: "7.5vh"}}>
					<Col>
                        <Form onSubmit={submitHandler}>
                            <Row >
								<Col>
									
									<Row>
										<FormControl>
											<FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
											<RadioGroup
												row
												aria-labelledby="demo-row-radio-buttons-group-label"
												name="row-radio-buttons-group"
												value={gender}
												onChange={(e) => setGender(e.target.value)}
											>
												<FormControlLabel value="Other" control={<Radio />} label="Other" />
												<FormControlLabel value="Male" control={<Radio />} label="Male" />
												<FormControlLabel value="Female" control={<Radio />} label="Female" />
											</RadioGroup>
										</FormControl>
									</Row>
			
									<Row style={{marginTop: "5px"}}>
										<FormControl variant="standard" style={{width: "250px"}}>
											<InputLabel id="demo-simple-select-standard-label">Country</InputLabel>
											<Select
											labelId="demo-simple-select-standard-label"
											id="demo-simple-select-standard"
											value={country}
											onChange={(e) => setCountry(e.target.value)}
											label="Country"
											>
											<MenuItem value="Azerbaijan">Azerbaijan</MenuItem>
											<MenuItem value="Russia">Russia</MenuItem>
											<MenuItem value="Georgia">Georgia</MenuItem>
											<MenuItem value="Ukraine">Ukraine</MenuItem>
											</Select>
										</FormControl>
										<TextField id="standard-basic" label="City" style={{width: "250px", marginLeft: "40px"}}
										variant="standard" value={city} onChange={(e) => setCity(e.target.value)} />
									</Row>

									<Row style={{marginTop: "25px"}}>
										<FormControl style={{marginTop: "5px"}}>
											<Form.Label>Phone number</Form.Label>
											<PhoneInput 
												country={'az'}
												value={phone_number}
												onChange={setPhone_number}
											/>
										</FormControl>
									</Row>

									<Row style={{marginTop: "25px"}}>
										<FormControl style={{marginTop: "10px"}}>
											<FormLabel id="demo-row-radio-buttons-group-label">Upload</FormLabel>
											<Upload listType="picture-card">
												<button
													style={{
														border: 0,
														background: 'none',
													}}
													type="button"
													onChange={(e) => setProfile_photo(e.target.files[0])}
													>
													<PlusOutlined />
													<div
														style={{
														marginTop: 8,
														}}
													>
														Upload
													</div>
												</button>
											</Upload>
										</FormControl>
									</Row>
									
									<Row style={{marginTop: "10px", marginRight: "15px"}}>
										<TextField id="standard-basic" label="About me" variant="standard"
										value={about_me} onChange={(e) => setAbout_me(e.target.value)} 
										style={{width: "540px"}}
										/>
									</Row>
	
								</Col>
                                <Col>
									
									<Row>
										<FormControl>
											<FormLabel id="demo-row-radio-buttons-group-label">Who are you?</FormLabel>
											<RadioGroup
												row
												aria-labelledby="demo-row-radio-buttons-group-label"
												name="row-radio-buttons-group"
												value={who}
												onChange={(e) => setWho(e.target.value)}
											>
												<FormControlLabel value="other" control={<Radio />} label="Other" />
												<FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
												<FormControlLabel value="student" control={<Radio />} label="Student" />
											</RadioGroup>
										</FormControl>
									</Row>

									<Row style={{marginTop: "5px"}}>

										<FormControl variant="standard" style={{width: "250px"}}>
											<InputLabel id="demo-simple-select-standard-label">University</InputLabel>
											<Select
											labelId="demo-simple-select-standard-label"
											id="demo-simple-select-standard"
											value={university}
											onChange={(e) => setUniversity(e.target.value)}
											label="University"
											>
											<MenuItem value="3">ADA</MenuItem>
											<MenuItem value="4">BHOS</MenuItem>
											<MenuItem value="5">UNEC</MenuItem>
											</Select>
										</FormControl>

										<FormControl variant="standard" style={{width: "250px", marginLeft: "40px"}}>
											<InputLabel id="demo-simple-select-standard-label">Major</InputLabel>
											<Select
											labelId="demo-simple-select-standard-label"
											id="demo-simple-select-standard"
											value={major}
											onChange={(e) => setMajor(e.target.value)}
											label="University"
											>
											<MenuItem value="3">Electrical Engineering</MenuItem>
											<MenuItem value="4">Computer Science</MenuItem>
											<MenuItem value="5">Business Administration</MenuItem>
											</Select>
										</FormControl>
										
									</Row>

									<Row style={{marginTop: "25px"}}>

										<FormControl style={{width: "350px"}}>
											<FormLabel id="demo-row-radio-buttons-group-label" style={{marginTop: "10px"}}>Degree</FormLabel>
											<RadioGroup
												row
												aria-labelledby="demo-row-radio-buttons-group-label"
												name="row-radio-buttons-group"
												value={degree_type}
												onChange={(e) => setDegree_type(e.target.value)}
											>
												<FormControlLabel value="Bachelor" control={<Radio />} label="Bachelor" />
												<FormControlLabel value="Masters" control={<Radio />} label="Masters" />
												<FormControlLabel value="PHD" control={<Radio />} label="PHD" />
											</RadioGroup>
										</FormControl>

										<FormControl style={{width: "150px"}}>
											<FormLabel id="demo-row-radio-buttons-group-label" style={{marginTop: "10px"}}>Course</FormLabel>
											<InputNumber min={1} max={5} 
												value={year_of_study}
												onChange={(e) => setYear_of_study(e)}
												style={{width: "150px", marginTop: "5px"}} 
											/>
										</FormControl>

									</Row>

									<Row style={{marginTop: "10px"}}>
										<FormControl variant="standard" style={{width: "250px"}}>
											<InputLabel id="demo-simple-select-standard-label">Education Language</InputLabel>
											<Select
											labelId="demo-simple-select-standard-label"
											id="demo-simple-select-standard"
											value={education_language}
											onChange={(e) => setEducation_language(e.target.value)}
											label="University"
											>
											<MenuItem value="AZE">Azerbaijani</MenuItem>
											<MenuItem value="RUS">Russian</MenuItem>
											<MenuItem value="ENG">English</MenuItem>
											<MenuItem value="FR">French</MenuItem>
											</Select>
										</FormControl>
									</Row>

                                </Col>
                            </Row>

							<Row>
								<Col>
									<Button
										type="submit"
										variant="outline-success"
										className="mt-4"
										style={{width: "200px"}}
									>
										Edit!
									</Button>
									<Button className="mt-4" variant="outline-danger"
									style={{marginLeft: "12.5px"}} 
									onClick={() => navigate(-1)}
									>
										Cancel
									</Button>
								</Col>
							</Row>

                        </Form>
					</Col>
				</Row>
			</Container>
		</>
	);
};


export default UpdateProfilePage;
