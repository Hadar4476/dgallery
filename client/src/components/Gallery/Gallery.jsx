import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import $ from 'jquery';

import * as actions from '../../store/actions';

import classes from './Gallery.module.css';

import GalleryItem from './GalleryItem/GalleryItem';
import Paganation from './Paganation/Paganation';
import SearchBar from './SearchBar/SearchBar';
import Suggestions from './Suggestions/Suggestions';
import Spinner from '../UI/Spinner/Spinner';

const Gallery = (props) => {
  const { gallery, onInitGallery, postData, onSearchForPost } = props;

  const [galleryState, setGalleryState] = useState([]);

  const [suggestionsState, setSuggestionsState] = useState([]);

  const [searchInputState, setSearchInputState] = useState('');

  const [currentPageState, setCurrentPageState] = useState(0);

  const postsPerPage = 9;
  const pagesVisited = currentPageState * postsPerPage;

  let galleryItems = null;
  if (galleryState.length) {
    galleryItems = galleryState
      .slice(pagesVisited, pagesVisited + postsPerPage)
      .map((item) => (
        <GalleryItem
          key={item._id}
          postId={item._id}
          userId={item.userId}
          username={item.username}
          source={item.image}
          caption={item.caption}
          iconBGColor={item.iconBGColor}
        />
      ));
  }

  const pageCount = Math.ceil(gallery.length / postsPerPage);

  const bodyClasses = [classes.Body, 'container'];

  const galleryItemsWrapperClasses = [
    classes.GalleryItemsWrapper,
    'row row-cols-1 row-cols-xs-2 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-3',
  ];

  useEffect(() => {
    $(window).scrollTop(0);
  }, []);

  useEffect(() => {
    onInitGallery();
  }, [postData, onInitGallery]);

  useEffect(() => {
    setGalleryState([...gallery].reverse());
  }, [gallery]);

  const inputChangedHandler = ({ target }) => {
    const { value } = target;
    if (!value) {
      setSuggestionsState([]);
      return onInitGallery();
    }
    const updatedGallery = [...gallery];
    const filterUpdatedGallery = updatedGallery.filter((item) =>
      item.caption.toLowerCase().includes(value.trim().toLowerCase())
    );
    setSearchInputState(value);
    setSuggestionsState(filterUpdatedGallery);
  };

  const onSearchSubmit = () => {
    const trimSearchInput = searchInputState.trim();
    if (!trimSearchInput) return;
    const isSearchInputInsideGallery = galleryState.some((item) =>
      item.caption.toLowerCase().includes(trimSearchInput.toLowerCase())
    );
    if (!isSearchInputInsideGallery) return;
    onSearchForPost(searchInputState);
    setCurrentPageState(0);
    setSuggestionsState([]);
  };

  const onSuggestionItemSubmit = (caption) => {
    setGalleryState([...gallery].reverse());
    setSuggestionsState([]);
    setCurrentPageState(0);
    onSearchForPost(caption);
  };

  const resetSearchBar = () => {
    setSuggestionsState([]);
  };

  const onChangePage = (pageNumber) => {
    if (currentPageState === pageNumber) return;
    $(window).scrollTop(0);
    setCurrentPageState(pageNumber);
  };

  return (
    <div className={classes.Gallery}>
      <Spinner />
      <SearchBar
        suggestionsItems={suggestionsState}
        changed={inputChangedHandler}
        submit={onSearchSubmit}
      />
      <Suggestions
        suggestionsItems={suggestionsState}
        submit={onSuggestionItemSubmit}
      />
      <div className={bodyClasses.join(' ')}>
        <div
          className={galleryItemsWrapperClasses.join(' ')}
          onClick={resetSearchBar}
        >
          {galleryItems}
        </div>
      </div>
      <Paganation
        pageCount={pageCount}
        onChangePage={onChangePage}
        currentPage={currentPageState}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    gallery: state.gallery.gallery,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onInitGallery: () => dispatch(actions.initGallery()),
    onSearchForPost: (searchInput) =>
      dispatch(actions.searchForPost(searchInput)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
