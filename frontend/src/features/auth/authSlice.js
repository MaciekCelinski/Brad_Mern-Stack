import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authService from "./authService";

// get USER from local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

// Register user
export const register = createAsyncThunk(
	"auth/register",
	async (user, thunkAPI) => {
		try {
			return await authService.register(user);
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

export const authSlice = createSlice({
	name: "auth",
	initialState,
	// reducers can only be sync
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isError = false;
			state.isSuccess = false;
			state.message = "";
		},
	},
	// extraReducers are reducers that will go async
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => (state.isLoading = true))
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.error = true;
				state.message = action.payload;
                state.user = null
			});
	},
});

// console.log("authSlice: ", authSlice)

// exporting a sync reducer
export const { reset } = authSlice.actions;
// exporting all
export default authSlice.reducer;
