import React from 'react';
import { connect } from 'react-redux';

import classes from './Spinner.module.css';

const Spinner = (props) => {
  const { loading } = props;

  return (
    <div className={loading ? classes.Darkbox : null}>
      <div className={loading ? classes.Spinner : null}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.gallery.loading,
  };
};

export default connect(mapStateToProps)(Spinner);
