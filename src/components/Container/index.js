import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as telegramActions from '../../actions/telegramActions';
import { View } from 'react-native';

class Container extends Component {
	render() {
		const { children } = this.props;

		const myState = {
			telegram: this.props.telegram,
			actions: this.props.actions,
		};

		const renderChildren = Array.isArray(children) ?
			children.map((child, key) => React.cloneElement(child, { key, ...myState }))
			:
			React.cloneElement(children, {...myState});

		return (
			<View style={{ flex: 1 }}>
				{renderChildren}
			</View>
		);
	}
}

Container.propTypes = {
	telegram: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
	return {
		telegram: state.telegram,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(telegramActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
