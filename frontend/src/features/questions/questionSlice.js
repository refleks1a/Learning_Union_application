import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import questionAPIService from "./questionAPIService";


const initialState = {
	questions: [],
	question: {},
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};


// Get all questions
export const getQuestions = createAsyncThunk(
	"questions/getAll",
	async (_, thunkAPI) => {
		try {
			return await questionAPIService.getQuestions();
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


// Get question details
export const getQuestionDetails = createAsyncThunk(
	"questions/getDetails",
	async (uid, thunkAPI) => {
		try {
			return await questionAPIService.getQuestionDetails(uid);
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


// Delete question
export const deleteQuestion = createAsyncThunk(
	"questions/delete",
	async (data, thunkAPI) => {
		try {
			return await questionAPIService.deleteQuestion(data);
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


// Create question
export const createQuestion = createAsyncThunk(
	"questions/create",
	async (data, thunkAPI) => {
		try {
			return await questionAPIService.createQuestion(data);
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


export const questionSlice = createSlice({
	name: "question",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder


			.addCase(getQuestions.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getQuestions.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.questions = action.payload.results;
			})
			.addCase(getQuestions.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})


			.addCase(getQuestionDetails.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getQuestionDetails.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.question = action.payload;
			})
			.addCase(getQuestionDetails.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})


			.addCase(deleteQuestion.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteQuestion.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.question = action.payload;
			})
			.addCase(deleteQuestion.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})


			.addCase(createQuestion.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createQuestion.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.question = action.payload;
			})
			.addCase(createQuestion.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})

			
	},
});


export const { reset } = questionSlice.actions;
export default questionSlice;
