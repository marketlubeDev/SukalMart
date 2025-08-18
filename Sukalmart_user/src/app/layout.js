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
