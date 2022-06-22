import { Button, Popover, OverlayTrigger, ButtonProps } from 'react-bootstrap';
import { useState } from 'react';

type ButtonWithConfirmProps = ButtonProps & {
	confirmText: string,
	confirmButtonText: string,
	onConfirm?: () => void
};

export const ButtonWithConfirm = (props: ButtonWithConfirmProps) => {
	const [showPopover, setShowPopover] = useState<boolean>(false);

	const popover = (
			<Popover>
				<Popover.Header>{props.confirmText}</Popover.Header>
				<Popover.Body className="text-end">
					<Button onClick={() => setShowPopover(false)} size="sm" variant="outline-secondary" className="me-2">Cancel</Button>
					<Button size="sm" variant={props.variant} onClick={props.onConfirm}>{props.confirmButtonText}</Button>
				</Popover.Body>
			</Popover>
	)

	return (
		<>
			<span onBlur={() => setShowPopover(false)}>
				<OverlayTrigger show={showPopover} onToggle={show => setShowPopover(show)} trigger="click" overlay={popover}>
					<Button {...props}>Hello</Button>
				</OverlayTrigger>
			</span>
		</>
	)
}
