import { Header } from './Header';

type LayoutProps = {
	children?: React.ReactNode
}

export const Layout = (props: LayoutProps) => {
	return (
		<>
			<Header />
			{props.children}
		</>
		
	)
};