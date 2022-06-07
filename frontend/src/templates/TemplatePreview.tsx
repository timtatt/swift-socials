import Parser from 'html-react-parser';

interface TemplatePreviewProps {
	layout: string,
	style: string
}

export default function TemplatePreview(props: TemplatePreviewProps) {
	return (
		<div>
			<div style={{
				background: 'red',
				width: '400px',
				height: '400px'
			}}>
				{/* TODO: scaling export to 1200x1200 */ }
				{/* TODO: add sanitising for XSS */}
				{Parser(props.layout)}
				<style>{Parser(props.style)}</style>
			</div>
		</div>
	);
}