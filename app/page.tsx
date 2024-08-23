"use client";

import Loader from "@/components/Loader";
import SearchBar from "@/components/searchbar";
import WeatherFeed from "@/components/weatherfeed";
import { WeatherDetails } from "@/utils/type";
import { useEffect, useState } from "react";

export default function Home() {
	const [coordinates, setCoordinates] = useState<{
		lat: number | null;
		long: number | null;
	}>({
		lat: null,
		long: null,
	});
	const [weatherData, setWeatherData] = useState<WeatherDetails | {}>({});

	const [loading, setLoading] = useState(true);
	const apiKey = "96fda65f5f9830cd4a5c8fa63f881f85";

	const fetchWeatherData = async () => {
		setLoading(true);
		try {
			const res = await fetch(
				`https://www.weatherunion.com/gw/weather/external/v0/get_weather_data?latitude=${coordinates.lat}&longitude=${coordinates.long}`,
				{
					headers: {
						"X-Zomato-Api-Key": apiKey,
					},
				},
			);
			const data = await res.json();
			setWeatherData(data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const fetchData = async () => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;

				setCoordinates({
					lat: latitude,
					long: longitude,
				});
				setLoading(false);
			},
			(err) => {
				console.log(err);
				setLoading(false);
			},
		);
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (coordinates.lat && coordinates.long) {
			setLoading(true);
			fetchWeatherData();
		}
	}, [coordinates]);

	return (
		<main className="min-h-screen max-w-3xl mx-auto">
			<div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
				<div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
			</div>
			<header className="py-10">
				<SearchBar />
			</header>

			<section className="mt-10">
				{loading ? (
					<div className="w-full flex justify-center pt-5">
						<Loader className="!w-10 !h-10" />
					</div>
				) : Object.keys(weatherData)?.length > 0 ? (
					<WeatherFeed weatherData={weatherData} />
				) : (
					<p className="text-xl text-center leading-4 font-medium text-muted-foreground">
						No Weather Information. <br />
						<span className="text-sm font-normal mt-4 inline-block text-gray-500">
							Allow app to access location or search and select a location to view the weather information.
						</span>
					</p>
				)}
			</section>
		</main>
	);
}
