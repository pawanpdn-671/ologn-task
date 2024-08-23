import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/redux/redux-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Weather App",
	description: "Get live weather information on a single click.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ReduxProvider>{children}</ReduxProvider>
			</body>
		</html>
	);
}
