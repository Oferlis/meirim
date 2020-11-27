import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import MUIModal from '@material-ui/core/Modal';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Login from 'pages/Login'
import Register from 'pages/Register/'
import EmailVerified from 'pages/Register/emailVerified'
import { ModalActions } from 'redux/actions'
import { ModalSelectors } from 'redux/selectors'
import { device } from 'style';

const StyledModal = styled(MUIModal)`
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: scroll;
`;

const StyledIcon = styled(CloseIcon)`
	color: gray;
	cursor: pointer;
`;

const ModalWrapper = styled.div`
	padding-top: 0.5em;
	padding-right: 0.5em;
`;

const ModalContentWRapper = styled.div`
	display:flex;
	flex-direction: column;
	background-color: #ffffff;
	border-radius: 15px 15px;
	max-width: 93vw;
    @media ${device.tablet} {
      max-width: initial;
    }
`;

const IconWrapper = styled.div`
	padding-top: 0.5em;
	padding-right: 0.5em;
`;

const modalComponents = {
	login: Login,
	register: Register,
	emailVerified: EmailVerified,
}

const Modal = ({ id }) => {
	const { open, modalType } = ModalSelectors()
	const ModalChildren = modalComponents[modalType]

	return (
		<ModalWrapper id={`wrapper-${id}`}>
			<StyledModal id={id} open={open}>
				<ModalContentWRapper>
					<IconWrapper>
						<StyledIcon onClick={ModalActions().close} />
					</IconWrapper>
					{modalType && <ModalChildren/>}
				</ModalContentWRapper>
			</StyledModal>
		</ModalWrapper>
	);
};

Modal.propTypes = {
	children: PropTypes.object.isRequired,
	id: PropTypes.string.isRequired,
};

export default Modal;
