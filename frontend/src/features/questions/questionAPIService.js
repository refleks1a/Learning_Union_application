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

// Delete question
const deleteQuestion = async (data) => {
	console.log("3")
	const config = {
		headers: {
			"Authorization" : `Bearer ${data.token}`
		},
	};
	const response  = await axios.delete("/api/v1/questions/delete/" + data.uid + "/", config)
	return response.data
}


const questionAPIService = { getQuestions, getQuestionDetails, deleteQuestion };

export default questionAPIService;
