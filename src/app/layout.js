import "./globals.css";
import Nav from "../layout/user/Nav";
import Footer from "../layout/user/Footer";

export const metadata = {
	title: "Souqalmart",
	description: "Souqalmart storefront",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="antialiased">
				<Nav />
				{children}
				<Footer />
			</body>
		</html>
	);
}
