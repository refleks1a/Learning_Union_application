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

// Create Answer
const createAnswer = async (answerData) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization" : `Bearer ${answerData.token}`
		},
	};
	
	const response = await axios.post("/api/v1/answers/create/", answerData, config)
	return response.data
}


const answerAPIService = { getAnswers, getAnswerDetails, createAnswer };

export default answerAPIService;