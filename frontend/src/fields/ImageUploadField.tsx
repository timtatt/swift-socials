import { AbstractField, BasicFieldSummary, FieldEditorProps, FieldProps, FieldType, FieldComponents, FieldSummaryProps, Field } from "./Field";
import { Form, Button } from 'react-bootstrap';
import { ChangeEvent, InputHTMLAttributes, useState } from "react";
import placeholder from './../assets/placeholder.jpeg';
import ReactCrop, { Crop, PercentCrop } from 'react-image-crop';
import 'react-image-crop/src/ReactCrop.scss'

interface ImageUploadFieldSettings {
	aspectRatio: number,
}

const ImageUploadFieldEditor = (props: FieldEditorProps) => {

	const field = props.field as Field<ImageUploadFieldSettings>;
	const onFieldUpdate = props.onFieldUpdate;

	const updateDefaultValue = (event: ChangeEvent<HTMLInputElement>) => {
		field.defaultValue = event.target.value;
		onFieldUpdate(field);
	};

	return (
		<>
			<Form.Group className="mb-3">
				<Form.Label>Default Value</Form.Label>
				<Form.Control defaultValue={field.defaultValue} onChange={updateDefaultValue} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Aspect Ratio</Form.Label>
				<Form.Select defaultValue={field.settings.aspectRatio} onChange={event => { field.settings.aspectRatio = Number(event.target.value); onFieldUpdate(field); }}>
					<option value={1}>1:1</option>
					<option value={2}>2:1</option>
				</Form.Select>
			</Form.Group>
		</>
	);
}

const ImageUploadFieldRender = (props: FieldProps) => {

	const field = props.field as Field<ImageUploadFieldSettings>;
	const onFieldUpdate = props.onFieldUpdate;

	const [crop, setCrop] = useState<PercentCrop>();
	const [uploadedImage, setUploadedImage] = useState<File | null>(null);
	const [croppedImage, setCroppedImage] = useState<string | null>(null);

	const onImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
		const image = event.target.files && event.target.files.length > 0 ? event.target.files[0] : null;
		setUploadedImage(image);
	}

	const cropImage = () => {
		if (uploadedImage && crop) {

			const url = URL.createObjectURL(uploadedImage);
			var img = new Image();

			img.onload = function () {
				URL.revokeObjectURL(img.src);

				const canvas = document.createElement('canvas');
				canvas.height = img.height * crop.height / 100;
				canvas.width = img.width * crop.width / 100;

				const ctx = canvas.getContext('2d');
				console.log(crop);
				console.log(img.height, img.width);
				ctx?.drawImage(img, -crop.x * img.width / 100, -crop.y * img.height / 100);

				setCroppedImage(canvas.toDataURL('image/png'))
			};

			img.src = url;
		}
	}


	return (
		<>
			<Form.Group>
				<Form.Label>{field.label}</Form.Label>
				<Form.Control type="file" onChange={onImageUpload} accept="image/*" />
			</Form.Group>
			{uploadedImage ? (
				<>
					<div style={{position: 'relative'}}>
						<ReactCrop crop={crop} onChange={(_, crop) => setCrop(crop)} aspect={field.settings.aspectRatio}>
							<img src={URL.createObjectURL(uploadedImage)} style={{ maxHeight: '400px', maxWidth: '100%' }} />
						</ReactCrop>
					</div>
					<Button onClick={cropImage}>Crop</Button>
				</>
			) : ''}
			{croppedImage ? <img src={croppedImage} /> : ''}
		</>
	);
}

export class ImageUploadField extends AbstractField {
	type = FieldType.TEXT_FIELD

	static COMPONENTS: FieldComponents = {
		fieldSummary: (props: FieldSummaryProps) => <BasicFieldSummary {...props} />,
		fieldEditor: (props: FieldEditorProps) => <ImageUploadFieldEditor {...props} />,
		field: (props: FieldProps) => <ImageUploadFieldRender {...props} />
	}

	getDefaultValue() {
		return this.field.defaultValue;
	}


}