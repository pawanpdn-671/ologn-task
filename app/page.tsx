"use client";

import Loader from "@/components/Loader";
import SearchBar from "@/components/searchbar";
import WeatherFeed from "@/components/weatherfeed";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchWeather } from "@/redux/weatherSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
	const [loading, setLoading] = useState(true);
	const { data, loading: loading2, error, location } = useSelector((state: RootState) => state.weather);
	const dispatch = useDispatch<AppDispatch>();

	const fetchData = async () => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				console.log(position);
				const { latitude, longitude } = position.coords;
				dispatch(fetchWeather({ latitude, longitude }));
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

	return (
		<main className="min-h-screen max-w-3xl mx-auto px-5 pb-20">
			<div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
				<div className="absolute left-0 right-0 top-0 -z-10 m-auto h-full sm:h-[510px] w-full rounded-full bg-fuchsia-300 opacity-20 blur-[100px]"></div>
			</div>
			<header className="pt-5 pb-10 text-center">
				<h1 className="text-center text-2xl font-extrabold bg-gradient-to-r from-fuchsia-600 via-pink-500 to-red-400 inline-block text-transparent bg-clip-text">
					WeatherWhiz
				</h1>
				<div className="mt-6 md:mt-10 ">
					<SearchBar />
				</div>
			</header>

			<section className="mt-0 md:mt-5">
				{loading || loading2 ? (
					<div className="w-full flex justify-center pt-5">
						<Loader className="!w-10 !h-10" />
					</div>
				) : data && Object.keys(data?.locality_weather_data)?.length > 0 ? (
					<WeatherFeed weatherData={data.locality_weather_data} location={location} />
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
