import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import LinearProgress from '@material-ui/core/LinearProgress';

import Downshift from 'downshift';

import './FilterAutoCompleteMultiple.css';

const AutocompleteWrapper = styled.div`
  .MuiPaper-elevation1 {
    display: block !important;
    position: absolute;
    min-width: 300px;
    border: 1px solid #652dd0;
    border-radius: 0px 0px 8px 8px;
    z-index: 10000;
  }
  @media (max-width: 767px) {
    .MuiPaper-elevation1 {
      min-width: 120px !important;
    }
  }
`;

function renderInput(inputProps) {
  const { InputProps, classes, ref, loading, ...other } = inputProps;

  return (
    <>
      <TextField
        InputProps={{
          inputRef: ref,
          classes: {
            root: classes.inputRoot,
            input: classes.inputInput,
          },
          ...InputProps,
        }}
        {...other}
      />
      {loading && (
        <LinearProgress/>
      )}
    </>
  );
}

function renderSuggestion({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem,
}) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
        fontFamily:'Assistant'
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

class AutocompleteInput extends Component {
  state = {
    inputValue: '',
    selectedItem: [],
  };

  handleKeyDown = (event) => {
    const { onFilterChange } = this.props;
    let { inputValue, selectedItem } = this.state;

    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === 'Backspace'
    ) {
      selectedItem.splice(selectedItem.length - 1, 1);

      this.setState({
        selectedItem,
      });

      onFilterChange(selectedItem);
    }
  };

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
    const { onInputChange } = this.props;

    onInputChange(event.target.value)
  };

  handleChange = (item) => {
    const { onFilterChange } = this.props;
    let { selectedItem } = this.state;

    if (selectedItem.indexOf(item) === -1) {
      selectedItem = [item];
    }

    this.setState({
      inputValue:selectedItem[0]
    })

    onFilterChange(selectedItem[0]);
  };

  getSuggestions(value) {
    const { inputSuggestions } = this.props;

    return inputSuggestions
  }

  render() {
    const { classes, placeholder, id, loading } = this.props;
    const { inputValue, selectedItem } = this.state;

    return (
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={this.handleChange}
        selectedItem={selectedItem}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue: inputValue2,
          selectedItem: selectedItem2,
          highlightedIndex,
        }) => (
          <div className={classes.container} id={id}>
            {renderInput({
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                startAdornment: selectedItem.map((item) => (
                 <div>{item}</div>
                )),
                onChange: this.handleInputChange,
                onKeyDown: this.handleKeyDown,
                placeholder,
              }),
              loading
            })}
            {isOpen ? (
              <AutocompleteWrapper>
              <Paper className={classes.paper} square>
                {this.getSuggestions(inputValue2).map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion.label }),
                    highlightedIndex,
                    selectedItem: selectedItem2,
                  })
                )}
              </Paper>
              </AutocompleteWrapper>
            ) : null}
          </div>
        )}
      </Downshift>
    );
  }
}

export default AutocompleteInput;
