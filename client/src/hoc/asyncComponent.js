import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
  return class extends Component {
    state = {
      component: null,
    };

    componentDidMount() {
      importComponent().then((component) =>
        this.setState({ component: component.default })
      );
    }

    render() {
      const Cmp = this.state.component;
      return Cmp ? <Cmp {...this.props} /> : null;
    }
  };
};

export default asyncComponent;
