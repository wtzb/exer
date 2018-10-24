import React from 'react';
import HeaderCont from '../../HeaderCont';
import FooterCont from '../../FooterCont';
import { Layout, Breadcrumb, Col, Row } from 'antd';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import RecentBlocks from './RecentBlocks';
import RecentTransactions from './RecentTransactions';


const { Content } = Layout;

// apollo client setup
const client = new ApolloClient({
    uri: 'https://ethql-alpha.infura.io/graphql',
})

class Home extends React.Component {
    componentDidMount() {
        document.title = "Exer - Home";
    }

    render() {
        return (
            <ApolloProvider client={client} >
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
                                </Breadcrumb>
                            </Col>
                        </Row>
                        <Layout style={{ padding: '24px 0', background: '#fff' }}>
                            <Content style={{ padding: '0 24px', minHeight: 650 }}>
                                <Row gutter={32}>
                                    <Col xs={24} md={12} style={{marginBottom: '50px'}}>
                                        <h3 style={{textAlign: 'center'}}>Recent Blocks</h3>
                                        <RecentBlocks />
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <h3 style={{textAlign: 'center'}}>Recent Transactions</h3>
                                        <RecentTransactions />
                                    </Col>
                                </Row>
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

export default Home;