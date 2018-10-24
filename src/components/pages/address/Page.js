import React from 'react';
import { Layout, Breadcrumb, Row, Col, Spin } from 'antd';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';

import HeaderCont from '../../HeaderCont';
import FooterCont from '../../FooterCont';
import Details from './Details';
import { getAddressData } from '../../../queries/address';


// apollo client setup
const client = new ApolloClient({
    uri: 'https://ethql-alpha.infura.io/graphql'
})

const { Content } = Layout;

class Page extends React.Component {

    state = {
        address: this.props.match.params.address
    }

    componentWillMount() {
        document.title = "Exer - Address " + this.props.match.params.address + " details";
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.match.params.address !== prevProps.match.params.address) {
            this.setState({address: this.props.match.params.address})
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
                                    <Breadcrumb.Item>Address</Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        {this.props.match.params.address}
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            </Col>
                        </Row>
                        <Layout style={{ padding: '0 0', background: '#fff' }}>
                            <Content style={{ padding: '24px', minHeight: 350 }}>
                                <Query query={getAddressData} variables={{ address: this.state.address }}>
                                    {({ loading, error, data }) => {
                                    if (loading) return <Spin />;
                                    if (error) return 'Couldn\'t get data for ' + this.state.address;
                                    return (
                                            <Details addressData={data.account} />
                                        );
                                    }}
                                </Query>
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