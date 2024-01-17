import axios from "axios";


// Get users profile
const getMyProfile = async (token) => {
    const config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization" : `Bearer ${token}`
		},
	};
	const response = await axios.get("/api/v1/profiles/me/", config);
	return response.data;
};

const profileAPIService = { getMyProfile };

export default profileAPIService;