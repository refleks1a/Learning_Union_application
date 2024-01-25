import axios from "axios";


// Get Majors
const getMajors = async () => {
	const response = await axios.get("/api/v1/majors/all/");
	return response.data;
};


// Get Major Details
const getMajorDetails = async (uid) => {
	const response = await axios.get("/api/v1/majors/major/" + uid + "/");
	return response.data;
};


const majorAPIService = { getMajors, getMajorDetails };

export default majorAPIService;
