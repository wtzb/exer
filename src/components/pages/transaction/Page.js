import React from 'react';
import { Layout, Breadcrumb, Row, Col, Spin } from 'antd';
import ApolloClient from 'apollo-boost';
import Web3 from 'web3';
import { ApolloProvider, Query } from 'react-apollo';

import HeaderCont from '../../HeaderCont';
import FooterCont from '../../FooterCont';

import Details from './Details';

import { getTransactionData, getTransactionDataPending } from '../../../queries/transaction';

var web3 = new Web3("https://mainnet.infura.io");

// apollo client setup
const client = new ApolloClient({
    uri: 'https://ethql-alpha.infura.io/graphql',
})

const { Content } = Layout;

class Page extends React.Component {
    state = {
        loading: true,
        transaction: this.props.match.params.transaction,
        dataToLoad: ''
    };

    componentWillMount() {
        document.title = "Exer - Transaction " + this.props.match.params.transaction + " details";
        this.loadTransactionDetails(this.state.transaction);
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.transaction !== prevProps.match.params.transaction) {
            this.setState({transaction: this.props.match.params.transaction})
        }
    }

    loadTransactionDetails = (transaction) => {
        if (web3.utils.isHex(transaction) === true){
            web3.eth.getTransaction(transaction)
            .then((data)=>{
                if (data !== null) {
                    this.setState({ web3getTransaction: data })
                    if (data.blockNumber === null) {
                        // Tx is pending
                        this.setState({ pending: true, dataToLoad: getTransactionDataPending, loading: false })
                    } else {
                        // Tx is mined (can be success/failed)
                        this.setState({ pending: false, dataToLoad: getTransactionData, loading: false })
                    }
                } else {
                    // Could not find transaction
                    this.setState({ loading: false, dataToLoad: getTransactionData})
                }
            });
        } else {
            this.setState({ loading: false, dataToLoad: getTransactionData})
        }
    }

    render() {
        return (
            <ApolloProvider client={client} >
            <Layout>
                <HeaderCont />
                <Row>
                    <Col xs={0} md={4}/>
                    <Col xs={32} md={16} className="content">
                        <Row>
                            <Col xs={1} md={0} />
                            <Col xs={23} md={24}>
                                <Breadcrumb style={{ margin: '16px 0' }}>
                                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                                    <Breadcrumb.Item>Transaction</Breadcrumb.Item>
                                    <Breadcrumb.Item>{this.props.match.params.transaction.substring(0,22)}...</Breadcrumb.Item>
                                </Breadcrumb>
                            </Col>
                        </Row>
                        <Layout style={{ padding: '0 0', background: '#fff' }}>
                            <Content style={{ padding: '24px', minHeight: 280 }}>
                                <p><b>Transaction Overview</b></p>
                                {this.state.loading === false &&
                                <Query query={this.state.dataToLoad} variables={{ transactionHash: this.state.transaction }}>
                                    {({ loading, error, data }) => {
                                    if (loading) return <Spin />;
                                    if (error) return 'Couldn\'t get data for ' + this.state.transaction;
                                    if (data.transaction === null) return 'Either this transaction doesn\'t exist, or the node hasn\'t picked it up yet.'
                                        return (
                                            <Details transactionData={data.transaction} pending={this.state.pending} />
                                        );
                                    }}
                                </Query>
                                }
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