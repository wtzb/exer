import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Table, } from 'antd';
import web3 from 'web3';
import { Link } from 'react-router-dom'
import { BigNumber } from 'bignumber.js';

const columns = [{
    title: 'Hash',
    dataIndex: 'hash',
    key: 'hash',
    render: hashData => <Link to={`/transaction/${hashData}`} title={hashData}>{hashData.substring(0,18)}...</Link>,
    width: 200,
}, {
    title: 'From',
    dataIndex: 'from',
    key: 'from',
    render: fromData => <Link to={`/address/${fromData}`} title={fromData}>{fromData.substring(0,14)}...</Link>,
    width: 200,
}, {
    title: '',
    dataIndex: 'arrow',
    key: 'arrow',
    width: 10,
},  {
    title: 'To',
    dataIndex: 'to',
    key: 'to',
    render: toData => <span>{toData != null ? <Link to={`/address/${toData}`} title={toData}>{toData.substring(0,14)}...</Link> : '[Contract creation]'}</span>,
    width: 200,
}, {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
    render: valueData => <span>{web3.utils.fromWei(valueData.toString(), 'ether')} ETH</span>,
    width: 200,
}, {
    title: 'Gas',
    dataIndex: 'gas',
    key: 'gas',
    render: gasData => <span>{gasData.toLocaleString()}</span>,
    width: 100,
}, {
    title: 'Gas Price',
    dataIndex: 'gasPrice',
    key: 'gasPrice',
    render: gasPriceData => <span>{web3.utils.fromWei(gasPriceData.toString(), 'gwei')} GWei</span>,
    width: 200,
}];

class TransactionsDisplay extends React.Component {
    static propTypes = {
        blockData: PropTypes.object,
    }

    render() {
        const data = [];

        this.props.blockData.transactions.map(transaction => {
            // Needed in case ETH amount > 1000
            let value = new BigNumber(transaction.value)
            value = value.toFormat()
            value = value.split(',').join('')

            data.push({
                key: transaction.index,
                hash: transaction.hash,
                from: transaction.from.address,
                arrow: <Icon type="arrow-right" theme="outlined" />,
                to: transaction.to.address,
                value: value,
                gas: transaction.gas,
                gasPrice: transaction.gasPrice,
            })
        })

        return (
            <div>
                <p>{this.props.blockData.transactionCount} transactions found:</p>
                <Table columns={columns} dataSource={data} scroll={{ x: 1200 }}/>
            </div>
        )
    }
}

export default TransactionsDisplay;

