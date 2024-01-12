import axios from "axios";


// Get Universities
const getUniversities = async () => {
	const response = await axios.get("/api/v1/universities/all/");
	return response.data;
};

const universitiesAPIService = { getUniversities };

export default universitiesAPIService;