import axios from "axios";


// Get Questions
const getQuestions = async () => {
	const response = await axios.get("/api/v1/questions/all/");
	return response.data;
};

// Get Question
const getQuestionDetails = async (uid) => {
	const response = await axios.get("/api/v1/questions/question/"+uid+"/")
	return response.data
}

const questionAPIService = { getQuestions, getQuestionDetails };

export default questionAPIService;