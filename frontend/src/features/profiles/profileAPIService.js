import axios from "axios";


// Get users profile
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

const profileAPIService = { getMyProfile };

export default profileAPIService;