import React, { Component } from "react";
import PropTypes from "prop-types";
import getContract from "../../utils/getContract";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultFooter extends Component {
  constructor(props) {
    super(props);
    this.state = { account: "", errorMsg: "" };
  }

  async componentDidMount() {
    try {
      const { web3 } = await getContract();
      const [account] = await web3.eth.getAccounts();
      this.setState({ account });
    } catch (error) {
      this.setState({ errorMsg: "Something went wrong !" });
    }
  }
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        {this.state.account.length > 0 ? (
          <span>
            <strong>Your wallet address : </strong> {this.state.account}
          </span>
        ) : (
          <span>
            <strong  color="danger">
              {this.state.errorMsg || "You're not connected to your wallet !"}
            </strong>
          </span>
        )}

        <span className="ml-auto">
          Powered by <a href="electrify.com">Hexagone</a>
        </span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
