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


// Get all profiles
export const getAllProfiles = createAsyncThunk(
	"profile/getAllProfiles",
	async (data, thunkAPI) => {
		try {
			return await profileAPIService.getAllProfiles(data);
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


// Get my profile
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


// Get user's profile
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


// Update user's profile
export const updateProfile = createAsyncThunk(
	"profile/updateProfile",
	async (data, thunkAPI) => {
		try {
			return await profileAPIService.updateProfile(data);
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

			
			.addCase(updateProfile.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateProfile.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.profile = action.payload;
			})
			.addCase(updateProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})


			.addCase(getAllProfiles.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllProfiles.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.profiles = action.payload;
			})
			.addCase(getAllProfiles.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})


	},
});


export const { reset } = profileSlice.actions;
export default profileSlice;
