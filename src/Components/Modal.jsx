import React from "react";

export default function Modal({handleClose,children}) {
	return (
		<div className="flex justify-center items-center h-full z-50 absolute inset-0 bg-black bg-opacity-50">
			<div className="relative z-50">
				<button onClick={handleClose} className="absolute top-0 right-0 p-2">
					Close
				</button>
				{children}
			</div>
		</div>
	);
}
