import { Header } from './Header';

type LayoutProps = {
	version: string
	children?: React.ReactNode
}

export const Layout = (props: LayoutProps) => {
	return (
		<>
			<Header version={props.version} />
			{props.children}
		</>
		
	)
};