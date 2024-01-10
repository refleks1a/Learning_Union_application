import axios from "axios";

//get questions
const getQuestions = async () => {
	const response = await axios.get("/api/v1/questions/all/");
	return response.data;
};

const questionAPIService = { getQuestions };

export default questionAPIService;