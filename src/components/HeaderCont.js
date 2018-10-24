import React from 'react';
import { Layout, Row, Col, Input, Icon } from 'antd';
import '../css/index.css';
import web3 from 'web3';
import { withRouter, Link } from "react-router-dom";

const { Header } = Layout;
const { Content } = Layout;
const Search = Input.Search;


class HeaderCont extends React.Component {
    loadSearch = (value) => {
        value = value.replace(/\s+/, "");

        if (web3.utils.isAddress(value) === true) {
            // Address
            this.props.history.push(`/address/${value}`);
        } else if (value.length === 66 && web3.utils.isHex(value) === true) {
            // Transaction hash
            this.props.history.push(`/transaction/${value}`);
        } else if (!isNaN(value)) {
            // Block number
            this.props.history.push(`/block/${value}`);
        } else {
            // No idea
            this.props.history.push(`/404`);
        }
    }

    render() {
        return(
            <Header className="header" style={{padding: 0}}>
                <Content style={{color: 'white'}}>
                    <Row style={{color: 'white'}}>
                        <Col xs={1} md={4}></Col>
                        <Col xs={11} md={8} style={{whiteSpace: 'nowrap'}}><Link to="/"><Icon type="build" theme="outlined" style={{display: 'inline', fontSize: '27.5px', color: 'white', marginRight: '5px'}} /><h1 style={{color: 'white', display: 'inline'}}>Exer</h1></Link></Col>
                        <Col xs={11} md={8}>
                        <Search
                            placeholder="Search Address/Block/Transaction"
                            onSearch={value => this.loadSearch(value)}
                            />
                        </Col>
                        <Col xs={1} md={4}></Col>
                    </Row>
                </Content>
            </Header>
        )
    }
}

export default withRouter(HeaderCont);
