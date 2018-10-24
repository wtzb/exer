import React from 'react';
import PropTypes from 'prop-types';
import { Table, Collapse } from 'antd';
import moment from 'moment';
import Web3 from 'web3';
import { Link } from 'react-router-dom'
import { BigNumber } from 'bignumber.js';

const Panel = Collapse.Panel;

const columns = [{
    title: '',
    dataIndex: 'beforeText',
    key: 'beforeText',
    width: 200,
}, {
    title: '',
    dataIndex: 'afterData',
    key: 'afterData',
}];

var web3 = new Web3("https://mainnet.infura.io");


class DetailsDisplay extends React.Component {
    static propTypes = {
        transactionData: PropTypes.object,
    }

    state = {
        currentBlockNumber: 0,
        blockConfirmations: "N/A",
    };

    componentWillMount() {
        if (this.props.pending !== true) {
            web3.eth.getBlockNumber()
            .then((value)=>{
                this.setState({ currentBlockNumber: value, blockConfirmations: value-this.props.transactionData.block.number+1});
            });
        }
    }

    inputData = () => {
        if (this.props.transactionData.inputData !== null) {
            return(
                <div>
                    <Collapse bordered={false}>
                        <Panel header="Input data (bytes)" key="1">
                            <b>Raw:</b>
                            <p style={{'wordWrap' : 'break-word'}}>{this.props.transactionData.inputData}</p>
                        </Panel>
                    </Collapse>
                </div>
            )
        } else {
            return null;
        }
    }

    render() {

        const transactionData = this.props.transactionData;

        // Needed in case ETH amount > 1000
        let value = new BigNumber(transactionData.value)
        value = value.toFormat()
        value = value.split(',').join('')

        const simpleData = [{
            key: 0,
            beforeText: 'Hash',
            afterData: transactionData.hash,
          }, {
            key: 1,
            beforeText: 'Status',
            afterData:
            <span style={(transactionData.status === "SUCCESS") ? {color: "green"} : (transactionData.status === "FAILED") ? {color: "red"} : {color: "orange"}}>{(transactionData.status == null) ? "PENDING" : transactionData.status}</span>
          }, {
            key: 2,
            beforeText: 'Blocknumber',
            afterData: <span>
            {(this.props.pending === true) ? <i>(Pending)</i> :
                <span><Link to={`/block/${transactionData.block.number}`} title={transactionData.block.number}>{transactionData.block.number}</Link> ({this.state.blockConfirmations} confirmation{this.state.blockConfirmations !== 1 ? 's' : ''})</span>
            }</span>
          }, {
            key: 3,
            beforeText: 'Timestamp',
            afterData: <span>
            {(this.props.pending === true) ? <i>(Pending)</i> :
            (moment.unix(transactionData.block.timestamp).fromNow()) +' (' + moment.unix(transactionData.block.timestamp).format('MMMM Do YYYY, h:mm:ss A Z') + ' UTC)'
            }</span>
          }, {
            key: 4,
            beforeText: 'From',
            afterData: <Link to={`/address/${transactionData.from.address}`} title={transactionData.from.address}>{transactionData.from.address}</Link>
          }, {
            key: 5,
            beforeText: 'To',
            afterData: <span>
            {(transactionData.to.address === null) ? <span>[Contract creation]</span> :
            <Link to={`/address/${transactionData.to.address}`} title={transactionData.from.address}>{transactionData.to.address}</Link>
            }</span>
          }, {
            key: 6,
            beforeText: 'Value',
            afterData: <span>{web3.utils.fromWei(value, 'ether')} ETH</span>
          }, {
            key: 7,
            beforeText: 'Gas',
            afterData: <span>{transactionData.gas.toLocaleString()}</span>

          }, {
            key: 8,
            beforeText: 'Gas Price',
            afterData: <span>{web3.utils.fromWei(transactionData.gasPrice.toString(), 'ether')} ETH ({web3.utils.fromWei(transactionData.gasPrice.toString(), 'gwei')} GWei)</span>

          }, {
            key: 9,
            beforeText: 'Nonce | Index',
            afterData: <span>{transactionData.nonce} | {transactionData.index}</span>
          }];

        return (
            <div>
                <Table columns={columns} dataSource={simpleData} showHeader={false} pagination={false} bordered={false}/>
                <this.inputData />
            </div>
        )
    }
}

export default DetailsDisplay;