import axios from "axios";
import FormData from "form-data";


// Get Questions
const getQuestions = async (data) => {
	const response = await axios.get("/api/v1/questions/all/", 
	{params: data});
	return response.data;
};


// Get Question
const getQuestionDetails = async (uid) => {
	const response = await axios.get("/api/v1/questions/question/"+uid+"/")
	return response.data
}


// Delete question
const deleteQuestion = async (data) => {
	const config = {
		headers: {
			"Authorization" : `Bearer ${data.token}`
		},
	};
	const response  = await axios.delete("/api/v1/questions/delete/" + data.uid + "/", config)
	return response.data
}


// Update question
const updateQuestion = async (data) => {
	let formData = new FormData();

	if(data.title){
		formData.set("title", data.title);
	}
	if(data.short_description){
		formData.set("short_description", data.short_description);
	}
	if(data.details){
		formData.set("details", data.details);
	}
	if(data.subject){
		formData.set("subject", data.subject);
	}
	
	const config = {
		headers: {
			"Content-Type": 'multipart/form-data',
			"Authorization" : `Bearer ${data.token}`
		},
	};

	const response  = await axios.patch("/api/v1/questions/update/" + data.uid + "/", formData, config)
	return response.data
}


// Upload question image
const uploadQuestionImage = async (data) => {
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

	const response  = await axios.post("/api/v1/questions/question/" + data.uid + "/upload-image/", formData, config)
	return response.data
}


// Create question
const createQuestion = async (data) => {
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

	formData.set('title', data.title);
	formData.set('short_description', data.short_description);
	formData.set('details', data.details);
	formData.set('subject', data.subject);

	const config = {
		headers: {
			"Content-Type": 'multipart/form-data',
			"Authorization" : `Bearer ${data.token}`,
		},
	};

	const response  = await axios.post("/api/v1/questions/create/", formData, config)
	return response.data
}


const questionAPIService = { getQuestions, getQuestionDetails,
	 deleteQuestion, createQuestion, updateQuestion, uploadQuestionImage };

export default questionAPIService;
