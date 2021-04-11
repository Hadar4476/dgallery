import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as actions from '../../../../../store/actions';
import {
  checkValidity,
  checkPostArtValidity,
} from '../../../../../shared/utility';

import classes from './PostModal.module.css';

import Input from '../../../../UI/Input/Input';
import Error from '../../../../UI/Error/Error';

const animateCSSClasses = {
  fadeIn: 'animate__animated animate__fadeIn',
  fadeInDown: 'animate__animated animate__fadeInDown',
};

const PostModal = (props) => {
  const darkBoxClasses = [classes.DarkBox, animateCSSClasses.fadeIn];
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);
  const history = useHistory();

  const {
    formModal,
    error,
    onUpdateFormModal,
    onPostFormSubmit,
    postData,
    hideModal,
    onValidationFailed,
  } = props;

  useEffect(() => {
    if (postData.image) {
      history.push('/');
    }
  }, [postData, history]);

  const inputChangedHandler = ({ target }, controlName) => {
    const updatedFormControls = { ...formModal };
    if (controlName === 'image') {
      const form = new FormData();
      const file = target.files[0];
      form.append('imageFile', file);

      if (file) {
        const source = URL.createObjectURL(file);
        imageRef.current.src = source;
        imageWrapperRef.current.className = classes.ImageWrapper;
        const fileInputWrapper = document.querySelector('#file_input_wrapper');
        fileInputWrapper.className = classes.Hide;

        updatedFormControls[controlName].value = file;
        updatedFormControls[controlName].valid = checkValidity(
          file.name,
          controlName
        );
      }
    } else {
      const { value } = target;
      updatedFormControls[controlName].value = value;
      updatedFormControls[controlName].valid = checkValidity(
        value,
        controlName
      );
    }
    onUpdateFormModal(updatedFormControls);
  };

  const onResetInput = (controlName) => {
    const updatedFormControls = { ...formModal };
    updatedFormControls[controlName].value = '';
    updatedFormControls[controlName].valid = false;
    onUpdateFormModal(updatedFormControls);
  };

  const removeImage = () => {
    imageRef.current.src = '';
    imageWrapperRef.current.className = classes.Hide;
    const fileInputWrapper = document.querySelector('#file_input_wrapper');
    fileInputWrapper.className = classes.FileInput;
  };

  const onPostSubmitHandler = (event) => {
    event.preventDefault();
    if (!isFormValid) return;
    let mapFormToPost = {};
    for (let key in formModal) {
      mapFormToPost[key] = formModal[key].value;
    }
    const { error } = checkPostArtValidity({
      caption: mapFormToPost.caption,
      image: mapFormToPost.image.name,
    });
    if (error) return onValidationFailed(error.details[0].message);
    onPostFormSubmit(mapFormToPost);
  };

  const formElementsArray = [];
  for (let key in formModal) {
    formElementsArray.push({
      id: key,
      config: formModal[key],
    });
  }

  const mapFormInputsValidations = formElementsArray.map(
    (item) => item.config.valid
  );
  let isFormValid = false;
  if (mapFormInputsValidations.every((item) => item)) {
    isFormValid = true;
  }

  let form = null;
  if (props.display) {
    form = (
      <React.Fragment>
        <div className={darkBoxClasses.join(' ')} onClick={hideModal}></div>
        <form className={classes.PostModal} encType='multipart/form-data'>
          <i className='fas fa-times' onClick={hideModal}></i>
          <h1>Create Post</h1>
          <Error error={error} />
          <div className={classes.FormGroupsWrapper}>
            {formElementsArray.map((item) => (
              <Input
                key={item.id}
                fieldName={item.id}
                elementType={item.config.elementType}
                labelHTML={item.config.labelHTML}
                elementConfig={item.config.elementConfig}
                value={item.config.value}
                invalid={!item.config.valid}
                changed={(event) => inputChangedHandler(event, item.id)}
                resetInput={(event) => onResetInput(item.id)}
              />
            ))}
            <div className={classes.Hide} ref={imageWrapperRef}>
              <i className='fas fa-times-circle' onClick={removeImage}></i>
              <img
                className={classes.Image}
                ref={imageRef}
                src=''
                alt='user file'
              />
            </div>
          </div>
          <button
            className={classes.Confirm}
            disabled={!isFormValid}
            onClick={(event) => onPostSubmitHandler(event)}
          >
            Post
          </button>
        </form>
      </React.Fragment>
    );
  }

  return form;
};

const mapStateToProps = (state) => {
  return {
    formModal: state.gallery.formModal,
    postData: state.gallery.postData,
    error: state.gallery.submitPostError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateFormModal: (updatedFormModal) =>
      dispatch(actions.updateFormModal(updatedFormModal)),
    onPostFormSubmit: (newPost) => dispatch(actions.submitPost(newPost)),
    onValidationFailed: (error) => dispatch(actions.submitPostFail(error)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);
