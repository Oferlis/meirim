import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';

const StyledLink = withTheme(styled(RouterLink)`
  font-family: ${props => props.theme.fontFamily} !important;
  font-size: 16px;
  font-weight: ${(props) => props.fontWeight};
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  text-decoration: ${(props) => props.underline};
  color: ${props => props.theme.palette.primary.main};
  cursor: pointer;
  
  .MuiTypography-body1 {
      font-family: ${props => props.theme.fontFamily} !important;
  }
  

`);

const Link = ({ id, text, fontWeight, onClick, url, textDecoration }) => (
	<StyledLink id={id} to={url} fontWeight={fontWeight} onClick={onClick} textDecoration={textDecoration}>{text}</StyledLink>
);

Link.defaultProps = {
	fontWeight: '400',
	url: '',
	textDecoration: 'underline'
};

Link.propTypes = {
	onClick: PropTypes.func,
	text: PropTypes.string,
	id: PropTypes.string,
	url: PropTypes.string,
	fontWeight: PropTypes.string,
	textDecoration: PropTypes.string
};

export default Link;
