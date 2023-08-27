import { Component } from 'react';
import PropTypes from 'prop-types';
import { BsSearch } from 'react-icons/bs';
import {
  SearchButton,
  SearchForm,
  SearchFormInput,
  SearchHeader,
  SearchLabel,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    input: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.setQuery(this.state.input);
  };

  render() {
    return (
      <SearchHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <BsSearch />
          </SearchButton>
          <SearchLabel>
            <span>Search</span>
          </SearchLabel>
          <SearchFormInput
            type="text"
            value={this.state.input}
            placeholder="Search images"
            onChange={e => this.setState({ input: e.target.value })}
          />
        </SearchForm>
      </SearchHeader>
    );
  }
}

Searchbar.propTypes = {
  setQuery: PropTypes.func.isRequired,
};
