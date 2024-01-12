import axios from "axios";


// Get Questions
const getQuestions = async () => {
	const response = await axios.get("/api/v1/questions/all/");
	return response.data;
};

const questionAPIService = { getQuestions };

export default questionAPIService;