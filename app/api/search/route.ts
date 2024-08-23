import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { Location } from "@/utils/type";

const filePath = path.resolve("./public/data/locationStation.json");
const fileData = fs.readFileSync(filePath, "utf-8");
const locations: Location[] = JSON.parse(fileData);

export async function GET(request: Request) {
	const url = new URL(request.url);
	const query = url.searchParams.get("query") || "";

	if (!query) {
		return NextResponse.json(locations);
	}

	const lowerCaseQuery = query.toLowerCase();

	const filteredLocations = locations.filter(
		(location) =>
			location.cityName.toLowerCase().includes(lowerCaseQuery) ||
			location.localityName.toLowerCase().includes(lowerCaseQuery),
	);

	return NextResponse.json(filteredLocations);
}
