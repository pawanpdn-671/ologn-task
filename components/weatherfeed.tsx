import { WeatherDetails } from "@/utils/type";
import React from "react";
import WeatherCard from "./weathercard";

type Props = {
	weatherData: WeatherDetails;
	location: string;
};

const WeatherFeed = ({ weatherData, location }: Props) => {
	const { humidity, rain_accumulation, rain_intensity, temperature, wind_direction, wind_speed } = weatherData;

	return (
		<div>
			<h2 className="text-center font-extrabold text-2xl sm:text-3xl md:text-4xl">{location}</h2>
			<section className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
				<WeatherCard type={"Humidity"} value={humidity} src={"/assets/humidity.png"} />
				<WeatherCard type={"Rain Accumulation"} value={rain_accumulation} src={"/assets/rain.png"} />
				<WeatherCard type={"Rain Intensity"} value={rain_intensity} src={"/assets/sensory.png"} />
				<WeatherCard
					type={"Temperature"}
					value={temperature ? `${temperature}°C` : 0}
					src={"/assets/thermometer.png"}
				/>
				<WeatherCard type={"Wind Direction"} value={wind_direction} src={"/assets/north.png"} />
				<WeatherCard type={"Wind Speed"} value={wind_speed} src={"/assets/windy.png"} />
			</section>
		</div>
	);
};

export default WeatherFeed;
