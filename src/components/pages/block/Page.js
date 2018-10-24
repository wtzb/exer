import React from 'react';
import { Layout, Breadcrumb, Icon, Tabs, Row, Col, Spin } from 'antd';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';

import HeaderCont from '../../HeaderCont';
import FooterCont from '../../FooterCont';
import Details from './Details';
import Transactions from './Transactions';

import { getBlockData, getTransactions } from '../../../queries/block';

// apollo client setup
const client = new ApolloClient({
    uri: 'https://ethql-alpha.infura.io/graphql'
})

const { Content } = Layout;
const TabPane = Tabs.TabPane;

class Page extends React.Component {

    state = {
        currentTab: this.props.match.path.substr(this.props.match.path.lastIndexOf('/') + 1),
        blockNumber: this.props.match.params.blockNumber
    }

    changeTab = (newTab) => {
        this.props.history.push(newTab);
        this.setState({ currentTab: newTab });
    }
    
    componentWillMount() {
        this.setState({ blockNumber: parseFloat(this.props.match.params.blockNumber) });
        document.title = "Exer - Block " + this.state.blockNumber;
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.block !== prevProps.match.params.block) {
            this.setState({blockNumber: this.props.match.params.transaction})
        }
    }
    

    render() {
        return (
            <ApolloProvider client={client}>
            <Layout>
                <HeaderCont />
                <Row>
                    <Col xs={0} md={4} />
                    <Col xs={32} md={16} className="content">
                        <Row>
                            <Col xs={1} md={0} />
                            <Col xs={23} md={24}>
                                <Breadcrumb style={{ margin: '16px 0' }}>
                                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                                    <Breadcrumb.Item>Block</Breadcrumb.Item>
                                    <Breadcrumb.Item>{this.props.match.params.blockNumber}</Breadcrumb.Item>
                                </Breadcrumb>
                            </Col>
                        </Row>
                        <Layout style={{ padding: '24px', background: '#fff' }}>
                            <span><b>Block Overview</b></span>
                            <Content style={{ minHeight: 550 }}>
                                <Tabs defaultActiveKey={this.state.currentTab} animated={false} onChange={this.changeTab}>
                                    <TabPane tab={<span><Icon type="bars" />Details</span>} key="details">
                                    <Query query={getBlockData} variables={{ blockNumber: this.state.blockNumber }}>
                                        {({ loading, error, data }) => {
                                        if (loading) return <Spin />;
                                        if (error) return 'Couldn\'t get data for ' + this.props.match.params.blockNumber;
                                        if (data.block === null) return 'Either this block doesn\'t exist, or the node hasn\'t picked it up yet.'
                                        return (
                                                <Details blockData={data.block} />
                                            );
                                        }}
                                    </Query>
                                    </TabPane>
                                    <TabPane tab={<span><Icon type="file-search" />Transactions</span>} key="transactions">
                                    <Query query={getTransactions} variables={{ blockNumber: this.state.blockNumber }}>
                                        {({ loading, error, data }) => {
                                        if (loading) return <Spin />;
                                        if (error) return 'Couldn\'t get data for ' + this.props.match.params.blockNumber;
                                        if (data.block === null) return 'Either this block doesn\'t exist, or the node hasn\'t picked it up yet.'
                                        return (
                                                <Transactions blockData={data.block} />
                                            );
                                        }}
                                    </Query>
                                    </TabPane>
                                </Tabs>
                            </Content>
                        </Layout>
                    </Col>
                    <Col xs={0} md={4} />
                </Row>
                <FooterCont />
            </Layout>
            </ApolloProvider>
        )
    }
}

export default Page;

