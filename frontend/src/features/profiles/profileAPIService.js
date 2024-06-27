import axios from "axios";


// Get all profiles
const getAllProfiles = async (data) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization" : `Bearer ${data.token}`
		},
	};
	const response = await axios.get("/api/v1/profile/all/", config);
	return response.data;
};


// Get my profile
const getMyProfile = async (data) => {
    const config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization" : `Bearer ${data.token}`
		},
	};

	const response = await axios.get("/api/v1/profile/me/", config);
	return response.data;
};


// Get user's profile
const getProfile = async (data) => {
    const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const response = await axios.get("/api/v1/profile/" + data.uid + "/", config);
	return response.data;
};


// Update my profile
const updateProfile = async (data) => {
	let formData = new FormData();
	console.log(data)
	if(data.username){
		formData.set("username", data.username);
	}
	if(data.phone_number){
		formData.set("phone_number", "+"+ data.phone_number);
	}
	if(data.about_me){
		formData.set("about_me", data.about_me);
	}
	if(data.gender){
		formData.set("gender", data.gender);
	}
	if(data.country){
		formData.set("country", data.country);
	}
	if(data.city){
		formData.set("city", data.city);
	}
	if(data.education_language){
		formData.set("education_language", data.education_language);
	}
	if(data.year_of_study){
		formData.set("year_of_study", data.year_of_study);
	}
	if(data.degree_type){
		formData.set("degree_type", data.degree_type);
	}
	if(data.who == "other") {
		formData.set("is_other", true)
		formData.set("is_student", false)
		formData.set("is_teacher", false)
	}
	if(data.who == "teacher") {
		formData.set("is_teacher", true)
		formData.set("is_student", false)
		formData.set("is_other", false)
	}
	if(data.who == "student") {
		formData.set("is_student", true)
		formData.set("is_teacher", false)
		formData.set("is_other", false)
	}
	if (data.university) {
		formData.set("university", data.university);
	}
	if (data.major) {
		formData.set("major", data.major)
	}
	if(data.profile_photo){
		formData.set("profile_photo", data.profile_photo);
	}
	
	const config = {
		headers: {
			"Content-Type": 'multipart/form-data',
			"Authorization" : `Bearer ${data.token}`
		},
	};

	const response  = await axios.patch("/api/v1/profile/update/", formData, config)
	return response.data
}


const profileAPIService = { getMyProfile, getProfile,
	updateProfile, getAllProfiles };

export default profileAPIService;
