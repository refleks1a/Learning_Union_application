import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileAPIService from "./profileAPIService";


const initialState = {
	profiles: [],
	profile: {},
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};

// get my profile
export const getMyProfile = createAsyncThunk(
	"profile/getMe",
	async (data, thunkAPI) => {
		try {
			return await profileAPIService.getMyProfile(data);
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

// get user's profile
export const getProfile = createAsyncThunk(
	"profile/getProfile",
	async (data, thunkAPI) => {
		try {
			return await profileAPIService.getProfile(data);
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


export const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getMyProfile.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getMyProfile.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.profile = action.payload;
			})
			.addCase(getMyProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})


			.addCase(getProfile.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getProfile.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.profile = action.payload;
			})
			.addCase(getProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
	},
});


export const { reset } = profileSlice.actions;
export default profileSlice;
