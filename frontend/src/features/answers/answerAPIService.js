import axios from "axios";


// Get Answers
const getAnswers = async (uid) => {
	const response = await axios.get("/api/v1/answers/question/" + uid + "/");
	return response.data;
};

// Get Answer Details 
const getAnswerDetails = async (uid) => {
	const response = await axios.get("/api/v1/answers/answer/" + uid + "/");
	return response.data
}


const answerAPIService = { getAnswers, getAnswerDetails };

export default answerAPIService;