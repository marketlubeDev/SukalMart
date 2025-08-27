import "./globals.css";
import Nav from "../layout/user/Nav";
import Footer from "../layout/user/Footer";
import { WishlistProvider } from "./_components/context/WishlistContext";

export const metadata = {
	title: "Souqalmart",
	description: "Souqalmart storefront",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" type="image/svg+xml" href="/souqalmart-logo.svg" />
				<link rel="alternate icon" href="/favicon.ico" />
			</head>
			<body className="antialiased">
				<WishlistProvider>
					<Nav />
					{children}
					<Footer />
				</WishlistProvider>
			</body>
		</html>
	);
}
