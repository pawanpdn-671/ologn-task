import { WeatherDetails } from "@/utils/type";
import React from "react";

type Props = {
	weatherData: WeatherDetails | {};
};

const WeatherFeed = ({ weatherData }: Props) => {
	return <div>WeatherFeed</div>;
};

export default WeatherFeed;
