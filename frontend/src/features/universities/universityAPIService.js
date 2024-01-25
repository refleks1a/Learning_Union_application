import axios from "axios";


// Get Universities
const getUniversities = async () => {
	const response = await axios.get("/api/v1/universities/all/");
	return response.data;
};


// Get University Details
const getUniversityDetails = async (uid) => {
	const response = await axios.get("/api/v1/universities/university/" + uid + "/");
	return response.data;
};


const universitiesAPIService = { getUniversities, getUniversityDetails };

export default universitiesAPIService;