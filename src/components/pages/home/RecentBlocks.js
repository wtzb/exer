import React from 'react';
import Web3 from 'web3';
import { Query } from 'react-apollo';
import { Table, Spin } from 'antd';
import { Link } from 'react-router-dom'
import moment from 'moment';

import { getRecentBlocks } from '../../../queries/block';

var web3 = new Web3("https://mainnet.infura.io");

const columns = [{
    title: 'Number',
    dataIndex: 'number',
    key: 'number',
    render: data => <Link to={`/block/${data}/details`}>{data}</Link>,
}, {
    title: 'Hash',
    dataIndex: 'hash',
    key: 'hash',
    render: data => data.substring(0,14) + '...',
}, {
    title: 'Time',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: data => moment.unix(data).format('h:mm:ss A'),
}, {
    title: 'Txns',
    dataIndex: 'txns',
    key: 'txns',
    render: data => <span><Link to={`/block/${data.number}/transactions`}>{data.transactionCount}</Link> txns</span>,
}, {
    title: 'Gas',
    dataIndex: 'gas',
    key: 'gas',
    render: data => 'Gas: ' + Math.round(((data.gasUsed / data.gasLimit) * 100) * 100 ) / 100 + '%',
}];

class RecentBlocks extends React.Component {
    state = {
        blockStart: 0,
        blockEnd: 0
    }

    componentWillMount() {
        web3.eth.getBlockNumber()
        .then((value)=>{
            this.setState({ blockStart: value-9, blockEnd: value })
        })
    }

    render() {
        return (
            <Query query={getRecentBlocks} variables={{ blockStart: this.state.blockStart, blockEnd: this.state.blockEnd}}>
                {({ loading, error, data }) => {
                if (loading) return <Spin />;
                if (error) return `Error!: ${error}`;
                
                    const tableData = [];

                    data.blocksRange.slice(0).reverse().map(block => {
                        tableData.push({
                            key: block.number,
                            number: block.number,
                            hash: block.hash,
                            timestamp: block.timestamp,
                            txns: block,
                            gas: block,
                        })
                    })
                    return (
                        <Table columns={columns} dataSource={tableData} showHeader={false} pagination={false} bordered={false} scroll={{ x: 600 }} />
                    );
                }}
            </Query>
        )
    }
}

export default RecentBlocks