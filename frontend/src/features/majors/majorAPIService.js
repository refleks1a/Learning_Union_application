import axios from "axios";


// Get Majors
const getMajors = async () => {
	const response = await axios.get("/api/v1/majors/all/");
	return response.data;
};

const majorAPIService = { getMajors };

export default majorAPIService;