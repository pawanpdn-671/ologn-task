import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface WeatherState {
	data: any;
	loading: boolean;
	error: string | null;
	location: string;
}

const initialState: WeatherState = {
	data: null,
	loading: false,
	error: null,
	location: "",
};

interface FetchWeatherByLocationId {
	locationId: string;
}

interface FetchWeatherByCoordinates {
	latitude: number;
	longitude: number;
}

type FetchWeatherArgs = FetchWeatherByLocationId | FetchWeatherByCoordinates;

function isCoordinates(args: FetchWeatherArgs): args is FetchWeatherByCoordinates {
	return (args as FetchWeatherByCoordinates).latitude !== undefined;
}

export const fetchWeather = createAsyncThunk("weather/fetchWeather", async (args: FetchWeatherArgs) => {
	const apiKey = "96fda65f5f9830cd4a5c8fa63f881f85";
	let url: string;

	if (isCoordinates(args)) {
		const { latitude, longitude } = args;
		url = `https://www.weatherunion.com/gw/weather/external/v0/get_weather_data?latitude=${latitude}&longitude=${longitude}`;
	} else {
		const { locationId } = args;
		url = `https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data?locality_id=${locationId}`;
	}

	const response = await fetch(url, {
		headers: {
			"X-Zomato-Api-Key": apiKey,
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch weather data");
	}

	return await response.json();
});

const weatherSlice = createSlice({
	name: "weather",
	initialState,
	reducers: {
		setLocation: (state, action) => {
			state.location = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchWeather.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchWeather.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(fetchWeather.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Something went wrong";
			});
	},
});

export const { setLocation } = weatherSlice.actions;
export default weatherSlice.reducer;
