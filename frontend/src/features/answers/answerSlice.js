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
	},
});


export const { reset } = answerSlice.actions;
export default answerSlice;