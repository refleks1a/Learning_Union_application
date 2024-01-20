import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import answerAPIService from "./answerAPIService";


const initialState = {
	answers: [],
	answer: {},
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};


// get all answers
export const getAnswers = createAsyncThunk(
	"answers/getAll",
	async (uid, thunkAPI) => {
		try {
			return await answerAPIService.getAnswers(uid);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);


// get answer details
export const getAnswerDetails = createAsyncThunk(
	"answers/getDetails",
	async (uid, thunkAPI) => {
		try {
			return await answerAPIService.getAnswerDetails(uid);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);


// create answer
export const createAnswer = createAsyncThunk(
	"answers/create",
	async (data, thunkAPI) => {
		try {
			return await answerAPIService.createAnswer(data);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);


// Delete answer
export const deleteAnswer = createAsyncThunk(
	"answers/delete",
	async (data, thunkAPI) => {
		try {
			return await answerAPIService.deleteAnswer(data);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);


// Update answer
export const updateAnswer = createAsyncThunk(
	"answers/update",
	async (data, thunkAPI) => {
		try {
			return await answerAPIService.updateAnswer(data);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);


// Upload answer image
export const uploadAnswerImage = createAsyncThunk(
	"answers/uploadImage",
	async (data, thunkAPI) => {
		try {
			return await answerAPIService.uploadAnswerImage(data);
		}
		catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
)


export const answerSlice = createSlice({
	name: "answer",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAnswers.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAnswers.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.answers = action.payload;
			})
			.addCase(getAnswers.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})


			.addCase(getAnswerDetails.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAnswerDetails.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.answer = action.payload;
			})
			.addCase(getAnswerDetails.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})


			.addCase(createAnswer.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createAnswer.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.answer = action.payload;
			})
			.addCase(createAnswer.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})


			.addCase(deleteAnswer.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteAnswer.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.answer = action.payload;
			})
			.addCase(deleteAnswer.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})


			.addCase(updateAnswer.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateAnswer.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.answer = action.payload;
			})
			.addCase(updateAnswer.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})


			.addCase(uploadAnswerImage.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(uploadAnswerImage.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.answer = action.payload;
			})
			.addCase(uploadAnswerImage.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			
			
	},
});


export const { reset } = answerSlice.actions;
export default answerSlice;