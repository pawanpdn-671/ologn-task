"use client";

import { useDebounce } from "@/hooks/useDebouce";
import { AppDispatch } from "@/redux/store";
import { fetchWeather, setLocation } from "@/redux/weatherSlice";
import { Location } from "@/utils/type";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "./Loader";

const SearchBar = () => {
	const [showSearchSuggestion, setShowSearchSuggestion] = useState<boolean>(false);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [searchResults, setSearchResults] = useState<Location[]>([]);

	const popupRef = useRef<HTMLDivElement>(null);
	const debounceInput = useDebounce(searchQuery, 500);
	const dispatch = useDispatch<AppDispatch>();

	const fetchLocationList = async (input: string) => {
		try {
			setLoading(true);
			const response = await fetch(`/api/search?query=${input}`);
			const data = await response.json();
			setSearchResults(data);
		} catch (error) {
			console.error("Error fetching cities:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (searchQuery?.trim()) {
			fetchLocationList(debounceInput);
		} else {
			setSearchResults([]);
		}
	}, [debounceInput]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const popup = popupRef?.current;
			const input = document.getElementById("search-place");

			if (popup && !popup.contains(event.target as Node) && event.target !== input) {
				setShowSearchSuggestion(false);
			}
		};

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	const handleCityClick = (id: string, local: string, city: string) => {
		dispatch(fetchWeather({ locationId: id }));
		dispatch(setLocation(`${local}, ${city}`));
		setSearchQuery("");
	};

	return (
		<div className="w-full md:w-[600px] mx-auto relative">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 20 20"
				fill="none"
				className="w-[20px] h-[20px] absolute left-[18px] top-1/2 -translate-y-1/2">
				<circle cx="9.16671" cy="9.16667" r="5.83333" stroke="#797A7C" stroke-width="2" />
				<path d="M19 19L14 14" stroke="#797A7C" stroke-width="2" stroke-linecap="round" />
			</svg>
			<input
				id={"search-place"}
				type={"text"}
				value={searchQuery}
				className={
					"h-[50px] w-full rounded-full border hover:border-fuchsia-300 border-slate-300 pl-[50px] pr-5 outline-none focus:border-fuchsia-200 focus:border-2 transition-all"
				}
				onFocus={() => setShowSearchSuggestion(true)}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
			{showSearchSuggestion && searchQuery && (
				<div
					ref={popupRef}
					className="absolute top-[calc(100%+10px)] border bg-white z-50 rounded-xl shadow-md w-full py-2 right-0 max-h-[500px] overflow-y-auto">
					{loading ? (
						<Loader />
					) : searchResults?.length > 0 ? (
						<ul className="text-sm list-none no-underline font-normal">
							{searchResults?.map((location, index) => (
								<li
									className="text-left cursor-pointer py-2 px-4 hover:bg-fuchsia-50 hover:text-fuchsia-500 transition-all"
									key={location.localityId}
									onClick={() =>
										handleCityClick(location.localityId, location.localityName, location.cityName)
									}>
									{location.localityName}, {location.cityName}
								</li>
							))}
						</ul>
					) : (
						<p className="text-sm p-4 text-slate-700 font-medium w-full text-center">No results found</p>
					)}
				</div>
			)}
		</div>
	);
};

export default SearchBar;
