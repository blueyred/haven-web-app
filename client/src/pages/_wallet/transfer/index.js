// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { transfer } from "../../../actions";
import history from "../../../history.js";

// Relative Imports
import Page from "../../../components/_layout/page";
import Body from "../../../components/_layout/body";
import Menu from "../../../components/_layout/menu";
import Header from "../../../components/_layout/header";
import Status from "../../../components/_layout/status/";
import Input from "../../../components/_inputs/input";
import Form from "../../../components/_inputs/form";
import Dropdown from "../../../components/_inputs/dropdown";
import Footer from "../../../components/_inputs/footer";
import Transaction from "../../../components/_transactions/transfer";
import Tab from "../../../components/tab/index.js";

import { Container } from "./styles";

const options = [
  { asset: "Haven Token", ticker: "XHV" },
  { asset: "United States Dollar", ticker: "xUSD" },
  { asset: "Australian Dollar", ticker: "xAUD" }
];

class Transfer extends Component {
  state = {
    status: false,
    send_asset: "Select Asset",
    send_amount: "",
    send_ticker: "",
    recipient_address: "",
    validated: true,
    time: 7,
    firstTabState: true,
    secondTabState: false
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  };

  setSendAsset = ({ asset, ticker }) => {
    // Call back function from Dropdown
    this.setState({
      send_asset: asset,
      send_ticker: ticker
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.transferOuts !== this.props.transferOuts) {
      history.push("/wallet/assets/XHV");
    }
  }

  handleSubmit = () => {
    this.props.transfer(this.state.recipient_address, this.state.send_amount);
  };

  toggleSend = () => {
    this.setState({
      firstTabState: true,
      secondTabState: false
    });
  };

  toggleReceive = () => {
    this.setState({
      firstTabState: false,
      secondTabState: true
    });
  };

  render() {
    const {
      status,
      send_asset,
      send_amount,
      send_ticker,
      recipient_address,
      loading
    } = this.state;

    return (
      <Page>
        <Menu />
        <Body>
          <Header
            title="Transfer"
            description="Send or receive assets to and from your Haven Vault"
          />
          <Tab
            firstTabLabel="Send"
            secondTabLabel="Receive"
            firstTabState={this.state.firstTabState}
            secondTabState={this.state.secondTabState}
            toggleSend={this.toggleSend}
            toggleReceive={this.toggleReceive}
          />
          {this.state.firstTabState ? (
            <>
              <Form>
                <Dropdown
                  label="Send Asset"
                  placeholder="Select Asset"
                  name="send_asset"
                  ticker={send_ticker}
                  value={send_asset}
                  options={options}
                  onClick={this.setSendAsset}
                />
                <Input
                  label="Amount"
                  placeholder="Enter amount"
                  type="number"
                  name="send_amount"
                  value={send_amount}
                  onChange={this.handleChange}
                />
                <Input
                  label="Recipient"
                  placeholder="Enter recipient address"
                  width="true"
                  name="recipient_address"
                  value={recipient_address}
                  onChange={this.handleChange}
                />
              </Form>
              <Container>
                <Transaction state={this.state} />
                <Footer
                  onClick={this.handleSubmit}
                  loading={loading}
                  label="Transfer"
                  validated={this.state.validated}
                />
              </Container>
            </>
          ) : (
            <>
              <Form>
                <Dropdown
                  label="Receiving Asset"
                  placeholder="Select Asset"
                  name="send_asset"
                  width="true"
                  ticker={send_ticker}
                  value={send_asset}
                  options={options}
                  onClick={this.setSendAsset}
                />

                <Input
                  label="Address"
                  placeholder="Enter recipient address"
                  width="true"
                  name="recipient_address"
                  value={recipient_address}
                  onChange={this.handleChange}
                />
              </Form>
              <Container>
                <Footer
                  onClick={this.handleSubmit}
                  loading={loading}
                  label="Copy"
                  validated={this.state.validated}
                />
              </Container>
            </>
          )}
        </Body>
        {status && (
          <Status>
            <span role="img" aria-label="Money">
              💸
            </span>
            <span>
              {this.props.latestTransfer.error}
              {this.props.latestTransfer.info}
            </span>
            Congrats, your transfer was submitted. Redirecting you in{" "}
            {this.state.time}'s
          </Status>
        )}
      </Page>
    );
  }
}

export const mapStateToProps = state => ({
  latestTransfer: state.transfer,
  transferOuts: state.transferList.out
});

export default connect(
  mapStateToProps,
  { transfer }
)(Transfer);
