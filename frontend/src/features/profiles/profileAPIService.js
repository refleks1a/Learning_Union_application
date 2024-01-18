import axios from "axios";


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

// Get users profile
const getProfile = async (data) => {
    const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const response = await axios.get("/api/v1/profile/" + data.uid + "/", config);
	return response.data;
};


const profileAPIService = { getMyProfile, getProfile };

export default profileAPIService;