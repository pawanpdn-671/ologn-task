import Image from "next/image";
import React from "react";

type Props = {
	type: string;
	value: number | string;
	src: string;
};

const WeatherCard = ({ type, src, value }: Props) => {
	return (
		<div className="p-5 rounded-lg bg-white/40 backdrop-blur-sm border border-fuchsia-100">
			<div className="flex gap-2 items-center">
				<Image src={src} alt={`${type} icon`} width={40} height={40} />
				<span className="text-lg font-medium">{type}</span>
			</div>
			<div className="mt-5">
				<h3 className="text-center font-extrabold text-[#c16ca4] text-2xl md:text-3xl">{value}</h3>
				{!value && value !== 0 && <p className="text-sm text-center text-slate-600">No Info</p>}
			</div>
		</div>
	);
};

export default WeatherCard;
