import React from 'react';
import PropTypes from 'prop-types';
import MUIButton from '@material-ui/core/Button';
import styled from 'styled-components';

const StyledButton = styled(MUIButton)`
	font-size: 16px !important;
	font-stretch: normal;
	line-height: 1.5;
	letter-spacing: normal;
	text-align: center; 
    color: #ffffff !important;
    background-color: #652dd0 !important;
    min-height: 3.7em;
    border-radius: 12px !important;
    font-weight: 700 !important;
    border: 1px solid #652dd0 !important;
    
    .MuiButton-label  {
    	font-family: Assistant !important;
    }
    &:hover {
      background-color: #4d20b2 !important;
    }
    &:focus {
       outline: none;
    }
    
    ${({ simple }) => simple && `
        font-weight: 600 !important;
        color: #652dd0 !important;
        border: none !important;
        background-color: #ffffff !important;
        min-height: auto !important;
        padding: 0 !important;
        transition: 0.3s !important;
        > span {
            line-height: 1 !important;
        }
       &:hover {
          color: #8f5de2 !important;
          background-color: transparent !important;
       }
    `}
    
    ${({ altColor }) => altColor && `
        color: #652dd0 !important;
        background-color: #ffffff !important;
       &:hover {
          background-color: rgba(101, 45, 208, 0.04) !important;
       }
    `}
       
    ${({ small }) => small && `
        font-weight: 400 !important;
        padding: 0.03rem 0.6rem !important;
        border-radius: 4px !important;
        min-height: 1em;
    `}

`;

const Button = ({ text, id, onClick, small, altColor, simple }) => (
	<StyledButton id={id} small={small} onClick={onClick} altColor={altColor} simple={simple} disableRipple={simple}>
		{text}
	</StyledButton>
);

Button.defaultProps = {
	small: false,
	altColor: false,
	simple: false
}

Button.propTypes = {
	id: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	small: PropTypes.bool,
	altColor: PropTypes.bool,
	simple: PropTypes.bool
};

export default Button;
