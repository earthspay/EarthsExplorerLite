import React from 'react';
import PropTypes from 'prop-types';

import ServiceFactory from '../../services/ServiceFactory';
import Error from '../Error';
import {Loading} from './Loading.view';

export class Loader extends React.Component {
    static propTypes = {
        errorTitle: PropTypes.string,
        loadingTitle: PropTypes.string,
        fetchData: PropTypes.func.isRequired
    };

    state = {
        loading: false,
        hasError: false
    };

    componentDidMount() {
        this.setState({loading: true});
        this.props.fetchData()
            .then(value => {
                this.setState({loading: false});

                return value;
            })
            .catch(error => {
                console.log(error);

                ServiceFactory
                    .global()
                    .errorReportingService()
                    .captureException(error);

                this.setState({
                    loading: false,
                    hasError: true
                });
            });
    }

    render() {
        if (this.state.loading) {
            return <Loading />;
        }

        if (this.state.hasError) {
            return <Error title={this.props.errorTitle} />;
        }

        return this.props.children;
    }
}
