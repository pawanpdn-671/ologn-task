"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { WeatherDetails } from "@/utils/type";

type Props = {};

const Page = (props: Props) => {
	const params = useParams();
	const localityId = params.localityId;
	const [loading, setLoading] = useState<boolean>(false);
	const [weatherInfo, setWeatherInfo] = useState<WeatherDetails | {}>({});

	const apiKey = "96fda65f5f9830cd4a5c8fa63f881f85";

	const fetchLocationDetails = async () => {
		try {
			setLoading(true);
			const response = await fetch(
				`https://www.weatherunion.com/gw/weather/external/v0/get_locality_weather_data?locality_id=${localityId}`,
				{
					headers: {
						"X-Zomato-Api-Key": apiKey,
					},
				},
			);
			const data = await response.json();
			if (data.status === "200") {
				setWeatherInfo(data?.locality_weather_data ?? {});
			}
		} catch (error) {
			console.error("Error fetching cities:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (localityId) {
			fetchLocationDetails();
		}
	}, [localityId]);

	return <div>Page</div>;
};

export default Page;
