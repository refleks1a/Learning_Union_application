import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import universityAPIService from "./universityAPIService";


const initialState = {
	universities: [],
	university: {},
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};


// Get all universities
export const getUniversities = createAsyncThunk(
	"universities/getAll",
	async (_, thunkAPI) => {
		try {
			return await universityAPIService.getUniversities();
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


// Get university details
export const getUniversityDetails = createAsyncThunk(
	"universities/details",
	async (uid, thunkAPI) => {
		try {
			return await universityAPIService.getUniversityDetails(uid);
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


export const universitySlice = createSlice({
	name: "university",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUniversities.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUniversities.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.universities = action.payload.results;
			})
			.addCase(getUniversities.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})


			.addCase(getUniversityDetails.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUniversityDetails.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.university = action.payload;
			})
			.addCase(getUniversityDetails.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})


	},
});


export const { reset } = universitySlice.actions;
export default universitySlice;
