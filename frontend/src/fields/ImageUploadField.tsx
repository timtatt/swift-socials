import { AbstractField, BasicFieldSummary, FieldEditorProps, FieldProps, FieldType, FieldComponents, FieldSummaryProps, Field } from "./Field";
import { Form, Button, Modal, InputGroup } from 'react-bootstrap';
import { ChangeEvent, useState } from "react";
import ReactCrop, { PercentCrop } from 'react-image-crop';
import 'react-image-crop/src/ReactCrop.scss'
import placeholder from './../assets/placeholder.jpeg';

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
	const [showCropModal, setShowCropModal] = useState<boolean>(false);

	const onImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
		const image = event.target.files && event.target.files.length > 0 ? event.target.files[0] : null;
		setUploadedImage(image);
		setShowCropModal(true);
	}

	const cropImage = () => {
		if (uploadedImage && crop) {

			const uploadedImageUrl = URL.createObjectURL(uploadedImage);
			const img = new Image();

			img.onload = () => {
				URL.revokeObjectURL(img.src);

				const canvas = document.createElement('canvas');
				canvas.height = img.height * crop.height / 100;
				canvas.width = img.width * crop.width / 100;

				const ctx = canvas.getContext('2d');
				ctx?.drawImage(img, -crop.x * img.width / 100, -crop.y * img.height / 100);

				const croppedImageUrl = canvas.toDataURL('image/png');
				onFieldUpdate(croppedImageUrl);
			};
			
			img.src = uploadedImageUrl;
			setShowCropModal(false);

		}
	}


	return (
		<>
			<Modal size="lg" show={showCropModal} onHide={() => setShowCropModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Crop &amp; Set Image</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{uploadedImage ? (
						<>
							<div style={{ position: 'relative' }}>
								<ReactCrop crop={crop} onChange={(_, crop) => setCrop(crop)} aspect={field.settings.aspectRatio} keepSelection={true}>
									<img alt="Uploaded file preview" src={URL.createObjectURL(uploadedImage)} style={{ maxHeight: '60vh', maxWidth: '100%' }} />
								</ReactCrop>
							</div>
						</>
					) : ''}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowCropModal(false)}>
						Cancel
					</Button>
					<Button variant="primary" onClick={cropImage} disabled={typeof crop === 'undefined'}>
						Use Image
					</Button>
				</Modal.Footer>
			</Modal>
			<Form.Group>
				<Form.Label>{field.label}</Form.Label>
				<InputGroup>
					<Form.Control type="file" onChange={onImageUpload} accept="image/*" />
					<Button onClick={() => setShowCropModal(true)}>Recrop Image</Button>
				</InputGroup>	
			</Form.Group>
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
		return placeholder;
	}


}