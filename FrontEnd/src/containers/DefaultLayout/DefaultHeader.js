import React, {Component} from "react";
import {Link} from "react-router-dom";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem
} from "reactstrap";
import PropTypes from "prop-types";

import {
  AppAsideToggler,
  AppHeaderDropdown,
  AppNavbarBrand,
  AppSidebarToggler
} from "@coreui/react";

import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";
import logo from "../../assets/img/brand/logo.svg";
import sygnet from "../../assets/img/brand/sygnet.svg";

import "toasted-notes/src/styles.css";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.props.history.push("/login");
  };

  handleProfil = () => {
    const {user} = this.props;
    this.props.history.push("/users/" + user.walletAddress);
  };


  render() {
    const {user} = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{src: logo, width: 89, height: 25, alt: "CoreUI Logo"}}
          minimized={{src: sygnet, width: 30, height: 30, alt: "CoreUI Logo"}}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/trades" className="nav-link">
              Trades
            </Link>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/offers" className="nav-link">
              Offers
            </Link>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/settings" className="nav-link">
              Settings
            </Link>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={user.avatar} className="img-avatar" alt={user.email} />
            </DropdownToggle>
            <DropdownMenu right style={{right: "auto"}}>
              <DropdownItem header tag="div" className="text-center">
                <strong>Account Settings</strong>
              </DropdownItem>
              <DropdownItem onClick={this.handleProfil}>
                <i className="fa fa-user" /> 
                Profile
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-wrench" /> Settings
              </DropdownItem>
              <DropdownItem onClick={this.onLogoutClick}>
                <i className="fa fa-lock" /> Logout
              </DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        <AppAsideToggler className="d-lg-none" mobile />
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  {logoutUser}
)(DefaultHeader);
