import axios from "axios";
import FormData from "form-data";


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
	let formData = new FormData();
	if(answerData.image_1){
		formData.set('image_1', answerData.image_1);
	}
	if(answerData.image_2){
		formData.set('image_2', answerData.image_2);
	}
	if(answerData.image_3) {
		formData.set('image_3', answerData.image_3);
	}
	
	formData.set('uid', answerData.uid);
	formData.set('title', answerData.title);
	formData.set('description', answerData.description);
	
	const config = {
		headers: {
			"Content-Type": 'multipart/form-data',
			"Authorization" : `Bearer ${answerData.token}`
		},
	};
	
	const response = await axios.post("/api/v1/answers/create/", formData, config)
	return response.data
}


// Delete Answer
const deleteAnswer = async (data) => {
	const config = {
		headers: {
			"Authorization" : `Bearer ${data.token}`
		},
	};
	const response = await axios.delete("/api/v1/answers/delete/" + data.uid + "/", config);
	return response.data
}


// Update Answer
const updateAnswer = async (data) => {
	let formData = new FormData();

	if(data.title){
		formData.set("title", data.title);
	}
	if(data.description){
		formData.set("description", data.description);
	}

	const config = {
		headers: {
			"Content-Type": 'multipart/form-data',
			"Authorization" : `Bearer ${data.token}`
		},
	};

	const response  = await axios.patch("/api/v1/answers/update/" + data.uid + "/", formData, config)
	return response.data
}


// Upload answer image
const uploadAnswerImage = async (data) => {
	let formData = new FormData();

	if(data.image_1){
		formData.set('image_1', data.image_1);
	}
	if(data.image_2){
		formData.set('image_2', data.image_2);
	}
	if(data.image_3) {
		formData.set('image_3', data.image_3);
	}

	const config = {
		headers: {
			"Content-Type": 'multipart/form-data',
			"Authorization" : `Bearer ${data.token}`,
		},
	};

	const response  = await axios.post("/api/v1/answers/answer/" + data.uid + "/upload-image/", formData, config)
	return response.data
}


const answerAPIService = { getAnswers, getAnswerDetails,
	createAnswer, deleteAnswer, updateAnswer, uploadAnswerImage };

export default answerAPIService;
