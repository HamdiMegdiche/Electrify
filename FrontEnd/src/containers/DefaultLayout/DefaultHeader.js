import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Badge,
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
import logo from "../../assets/img/brand/logo.svg";
import sygnet from "../../assets/img/brand/sygnet.svg";

const propTypes = {
  children: PropTypes.node
};

const Style = {
  textDecoration: "none",
  color: "#000"
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: "CoreUI Logo" }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: "CoreUI Logo" }}
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
              <i className="icon-bell" />
              <Badge pill color="danger">
                1
              </Badge>
            </DropdownToggle>
            <DropdownMenu right style={{ right: "auto" }}>
              <DropdownItem header tag="div" className="text-center">
                <strong>Notifications</strong>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-warning" /> First Notification
              </DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img
                src={"../../assets/img/avatars/1.jpg"}
                className="img-avatar"
                alt="admin@bootstrapmaster.com"
              />
            </DropdownToggle>
            <DropdownMenu right style={{ right: "auto" }}>
              <DropdownItem header tag="div" className="text-center">
                <strong>Account Settings</strong>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-user" />{" "}
                <Link to={"/users/0"} style={Style}>
                  Profile
                </Link>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-wrench" />{" "}
                <Link to={"/users/0"} style={Style}>
                  Settings
                </Link>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-usd" /> Payments
                <Badge color="secondary">42</Badge>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-file" /> History
                <Badge color="primary">42</Badge>
              </DropdownItem>
              <DropdownItem header tag="div" className="text-center">
                <strong>Security</strong>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-shield" /> Lock Account
              </DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}>
                <i className="fa fa-lock" /> Logout
              </DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
