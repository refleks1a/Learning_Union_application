import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import majorAPIService from "./majorAPIService";


const initialState = {
	majors: [],
	major: {},
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};


// get all majors
export const getMajors = createAsyncThunk(
	"majors/getAll",
	async (_, thunkAPI) => {
		try {
			return await majorAPIService.getMajors();
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


// get major details
export const getMajorDetails = createAsyncThunk(
	"majors/details",
	async (uid, thunkAPI) => {
		try {
			return await majorAPIService.getMajorDetails(uid);
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


export const majorSlice = createSlice({
	name: "major",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getMajors.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getMajors.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.majors = action.payload.results;
			})
			.addCase(getMajors.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})


			.addCase(getMajorDetails.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getMajorDetails.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.major = action.payload;
			})
			.addCase(getMajorDetails.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});


	},
});


export const { reset } = majorSlice.actions;
export default majorSlice;
