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

// get profile
export const getMyProfile = createAsyncThunk(
	"profiles/getMe",
	async (token, thunkAPI) => {
		try {
            console.log(token)
			return await profileAPIService.getMyProfile(token);
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
				state.profile = action.payload.results;
			})
			.addCase(getMyProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});


export const { reset } = profileSlice.actions;
export default profileSlice;
