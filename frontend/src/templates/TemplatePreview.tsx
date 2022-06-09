import { template } from '@babel/core';
import Parser from 'html-react-parser';
import { ForwardedRef, forwardRef, MutableRefObject, useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { serialize } from 'v8';
import { TemplateSize } from '../lib/templates/template';

interface TemplatePreviewProps {
	layout: string,
	style: string,
	size: TemplateSize
}

export const TemplatePreview = forwardRef((props: TemplatePreviewProps, templatePreviewRef: ForwardedRef<HTMLDivElement>) => {

	const [templateScale, setTemplateScale] = useState<number>(1);
	const [minScale, setMinScale] = useState<number>(1);

	const maxScale = 5;

	const templateWrapperRef = useRef<HTMLDivElement>(null);


	useEffect(() => {
		calculateTemplateScale();
	}, [templatePreviewRef]);

	const calculateTemplateScale = () => {
		const innerRef = templatePreviewRef as MutableRefObject<HTMLDivElement>;
		if (innerRef && templateWrapperRef.current) {
			const scale = templateWrapperRef.current.clientWidth / innerRef.current.clientWidth;
			setMinScale(scale);
			setTemplateScale(scale);
		}
	};

	return (
		<>
			<div className="template-preview-wrapper" ref={templateWrapperRef} style={{
				background: 'red',
				width: '400px',
				height: '400px',
				overflow: 'scroll',
			}}>
				<div className="template-preview-inner" style={{
					width: props.size.width * templateScale,
					height: props.size.height * templateScale,
				}}>
					<div className="template-preview-scaler" style={{
						transformOrigin: 'top left',
						transform: `scale(${templateScale})`,
						width: props.size.width,
						height: props.size.height
					}}>
						<div className="template-preview" ref={templatePreviewRef} style={{
							width: props.size.width,
							height: props.size.height
						}}>
						{/* TODO: scaling export to 1200x1200 */}
						{/* TODO: add sanitising for XSS */}
						{Parser(props.layout)}
						<style>{Parser(props.style)}</style>
						</div>
					</div>

				</div>
			</div>
			<Button onClick={() => setTemplateScale(Math.min(templateScale + 0.5, maxScale))}>Zoom In</Button>
			<Button disabled={templateScale <= minScale} onClick={() => setTemplateScale(Math.max(templateScale - 0.5, minScale))}>Zoom Out</Button>
			<Button onClick={calculateTemplateScale}>See All</Button>
		</>
	);
});