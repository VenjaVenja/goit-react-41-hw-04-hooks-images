import { useState } from 'react';
import propTypes from 'prop-types';
import { FaSearchengin } from 'react-icons/fa';
import { Header, Form, Button, SearchSvg, Input } from './Searchbar.styled';
// import { toast } from "react-toastify";

export const Searchbar = ({ onSubmit }) => {
  const [searchImg, setSearchImg] = useState('');

  const onImgChange = event => {
    const { value } = event.currentTarget;
    setSearchImg(value);
  };

  const heandleSubmit = event => {
    event.preventDefault();

    if (searchImg.trim() === '') {
      alert('Your request is not correct.');
      return;
    }
    onSubmit(searchImg);
  };

  return (
    <Header>
      <Form onSubmit={heandleSubmit}>
        <Button type="submit">
          <SearchSvg>
            <FaSearchengin />
          </SearchSvg>
        </Button>

        <Input
          type="text"
          name="searchImg"
          value={searchImg}
          onChange={onImgChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};