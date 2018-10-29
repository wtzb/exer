import React from 'react';
import Web3 from 'web3';
import { Query } from 'react-apollo';
import { Table, Icon, Spin } from 'antd';
import { Link } from 'react-router-dom'
import { BigNumber } from 'bignumber.js';

import { getTransactions } from '../../../queries/block';


var web3 = new Web3("https://mainnet.infura.io");

const columns = [{
    title: 'Hash',
    dataIndex: 'hash',
    key: 'hash',
    render: data => <Link to={`/transaction/${data}`} title={data}>{data.substring(0,13)}...</Link>,
}, {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
    render: data => <span>{web3.utils.fromWei(data.toString(), 'ether').length >= 3 ? <span>{web3.utils.fromWei(data.toString(), 'ether').substring(0,6)}...</span> : <span>{web3.utils.fromWei(data.toString(), 'ether')}</span>} ETH</span>,
}, {
    title: 'From',
    dataIndex: 'from',
    key: 'from',
    render: data => <Link to={`/address/${data}`} title={data}>{data.substring(0,10)}...</Link>,
}, {
    title: '',
    dataIndex: 'arrow',
    key: 'arrow',
}, {
    title: 'To',
    dataIndex: 'to',
    key: 'to',
    render: data => <span>{data != null ? <Link to={`/address/${data}`} title={data}>{data.substring(0,10)}...</Link> : '[Contract creation]'}</span>,
}];

class RecentTransactions extends React.Component {
    state = {
        blockNumber: 0,
    }

    componentWillMount() {
        web3.eth.getBlockNumber()
        .then((value)=>{
            this.setState({ blockNumber: value })
        })
    }

    render() {
        return (
            <Query query={getTransactions} variables={{ blockNumber: this.state.blockNumber }}>
                {({ loading, error, data }) => {
                if (loading) return <Spin />;
                if (error) return `Error!: ${error}`;

                    const tableData = [];

                    data.block.transactions.slice(0).reverse().map(transaction => {
                        // Needed in case ETH amount > 1000
                        let value = new BigNumber(transaction.value)
                        value = value.toFormat()

                        tableData.push({
                            key: transaction.index,
                            hash: transaction.hash,
                            value: value,
                            arrow: <Icon type="arrow-right" theme="outlined" />,
                            from: transaction.from.address,
                            to: transaction.to.address,

                        })
                    })
                    return (
                        <Table columns={columns} dataSource={tableData} showHeader={false} pagination={true} bordered={false} scroll={{ x: 600 }} />
                    );
                }}
            </Query>
        )
    }
}

BigNumber.config({
    FORMAT: {
        decimalSeparator: ''
    }
})

export default RecentTransactions;