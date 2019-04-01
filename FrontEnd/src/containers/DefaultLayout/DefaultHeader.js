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
import getContract from "../../utils/getContract";
import beep from "../../assets/beep.mp3";

const propTypes = {
  children: PropTypes.node
};


const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      avatar: "../../assets/img/avatars/1.jpg",
      email: "",
      soundFile: "../../assets/beep.mp3",
      walletAddress: "",
      notif: [],
      badgeVisible: true,
      badgeCount: 0,
      nbrPayments: 0
    };
  }

  async getNbrMyTransaction(contract, user) {
    const totalTrans = await contract.methods.transCount().call();

    let transactions = 0;

    for (let i = 0; i < totalTrans; i++) {
      const tr = await contract.methods.transactions(i).call();

      const trans = {
        from: tr[0],
        to: tr[1]
      };
      if (trans.from === user.walletAddress) transactions++;
    }
    return transactions;
  }

  async componentDidMount() {
    let user = JSON.parse(localStorage.getItem("user"));
    const { contract } = await getContract();

    if (user) {
      const { id, avatar, email, walletAddress } = user;
      const nbrPayments = await this.getNbrMyTransaction(contract, user);
      this.setState({ id, avatar, email, walletAddress, nbrPayments });
    }

    contract.events
      .message()
      .on("data", async event => {
        let time = new Date(event.returnValues[4] * 1000).toLocaleString();
        // time = time.format
        const trans = {
          from: event.returnValues[0],
          to: event.returnValues[1],
          unitPrice: event.returnValues[1],
          quantity: event.returnValues[3],
          time
        };

        if (trans.to === this.state.walletAddress) {
          // get notifications
          new Audio(beep).play();

          const notifs = this.state.notif;
          notifs.unshift(trans);
          notifs.slice(-4); // get only last 4 notifs

          //get nbr payements
          const nbrPayments = await this.getNbrMyTransaction(contract, user);

          this.setState({
            notif: notifs,
            badgeVisible: true,
            badgeCount: this.state.badgeCount + 1,
            nbrPayments
          });

          console.log("trnsaction confrimed !");
        }
      })
      .on("error", console.error);
  }

  handleClickBell = () => {
    this.setState({ badgeVisible: false, badgeCount: 0 });
  };
  handleProfil = () => {
    // eslint-disable-next-line no-restricted-globals
    location.href = `/users/${this.state.walletAddress}`;
  };

  render() {
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
          <NavItem className="px-3" onClick={this.reload}>
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
              <i className="icon-bell" onClick={this.handleClickBell} />
              {this.state.badgeVisible && this.state.badgeCount > 0 ? (
                <Badge pill color="danger">
                  {this.state.badgeCount}
                </Badge>
              ) : null}
            </DropdownToggle>
            <DropdownMenu right style={{ right: "auto" }}>
              <DropdownItem header tag="div" className="text-center">
                <strong>Notifications</strong>
              </DropdownItem>
              {this.state.notif.length > 0 ? (
                this.state.notif.map((n, idx) => {
                  return (
                    <DropdownItem key={idx}>
                      <i className="fa fa-info" />
                      {`Recieved ${n.quantity / 1000} kWh Ether on ${n.time}`}
                    </DropdownItem>
                  );
                })
              ) : (
                <DropdownItem>
                  <i className="fa fa-info" />
                  {`No notifications`}
                </DropdownItem>
              )}
            </DropdownMenu>
          </AppHeaderDropdown>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img
                src={this.state.avatar}
                className="img-avatar"
                alt={this.state.email}
              />
            </DropdownToggle>
            <DropdownMenu right style={{ right: "auto" }}>
              <DropdownItem header tag="div" className="text-center">
                <strong>Account Settings</strong>
              </DropdownItem>
              <DropdownItem onClick={this.handleProfil}>
                <i className="fa fa-user" />{" "}
                {/* <Link to={`/users/${this.state.walletAddress}`} style={Style}> */}
                Profile
                {/* </Link> */}
              </DropdownItem>
              <DropdownItem onClick={this.handleProfil}>
                <i className="fa fa-wrench" />{" "}
                {/* <Link to={`/users/${this.state.walletAddress}`} style={Style}> */}
                Settings
                {/* </Link> */}
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-usd" /> Payments
                <Badge color="primary">{this.state.nbrPayments}</Badge>
              </DropdownItem>
              {/* <DropdownItem header tag="div" className="text-center">
                <strong>Security</strong>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-shield" /> Lock Account
              </DropdownItem> */}
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
