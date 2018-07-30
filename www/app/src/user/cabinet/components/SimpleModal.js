import React, { Component } from 'react';
import './simpleModal.css';

class SimpleModal extends Component {
	constructor(props) {
		super(props);

		this.handleKeyUp = this.handleKeyUp.bind(this);
	}

	componentDidMount() {
	  window.addEventListener('keyup', this.handleKeyUp, false);
	  document.addEventListener('click', this.handleOutsideClick, false);
	}

	componentWillUnmount() {
	  window.removeEventListener('keyup', this.handleKeyUp, false);
	  document.removeEventListener('click', this.handleOutsideClick, false);
	}

	handleKeyUp(e) {
	  const { onCloseRequest } = this.props;
	  const keys = {
	    27: () => {
	      e.preventDefault();
	      onCloseRequest();
	      window.removeEventListener('keyup', this.handleKeyUp, false);
	    },
	  };

	  if (keys[e.keyCode]) { keys[e.keyCode](); }
	}

	render () {
		const {
			onCloseRequest,
			children,
		} = this.props;
		
		return (
			<div className="modalOverlay">
				<div className="modal" ref={node => (this.modal = node)}>
					<div className="modalContent">
						{children}
					</div>
				</div>

				<button	type="button" className="closeButton" onClick={onCloseRequest} />
			</div>
		);
	}
}


export default SimpleModal;