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

// get all questions
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
				state.questions = action.payload;
			})
			.addCase(getQuestions.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = questionSlice.actions;
export default questionSlice;