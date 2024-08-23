export type WeatherDetails = {
	humidity: number;
	rain_accumulation: number;
	rain_intensity: number;
	temperature: number;
	wind_direction: number;
	wind_speed: number;
};

export type Location = {
	cityName: string;
	localityName: string;
	localityId: string;
	latitude: number;
	longitude: number;
	device_type: string;
};
