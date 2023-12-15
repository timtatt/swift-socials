import pkg from '@/../package.json'
import { Header } from "@/common/components/Header";

export default function RootLayout({ children }: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Header version={pkg.version} />
				{children}
				
				</body>
		</html>
	);
}