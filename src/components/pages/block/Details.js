import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Table } from 'antd';
import moment from 'moment';
import web3 from 'web3';
import { Link } from 'react-router-dom'


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

class DetailsDisplay extends React.Component {
    static propTypes = {
        blockData: PropTypes.object,
    }

    toUtf8 = (data) => {
        try {
            return web3.utils.hexToUtf8(data);
        } catch(error){
            return error;
        }
    }

    render() {
        const blockData = this.props.blockData;

        const simpleData = [{
            key: 0,
            beforeText: 'Block',
            afterData: blockData.number,
        }, {
            key: 1,
            beforeText: 'Hash',
            afterData: blockData.hash,
        }, {
            key: 2,
            beforeText: 'Time',
            afterData: moment.unix(blockData.timestamp).fromNow() +' (' + moment.unix(blockData.timestamp).format('MMMM Do YYYY, h:mm:ss A Z') + ' UTC)',
        }, {
            key: 3,
            beforeText: 'Transactions',
            afterData: blockData.transactionCount + ' transactions',
        }, {
            key: 4,
            beforeText: 'Mined by',
            afterData: <Link to={`/address/${blockData.miner.address}`} title={blockData.miner.address}>{blockData.miner.address}</Link>,
        }, {
            key: 5,
            beforeText: 'Difficulty',
            afterData: blockData.difficulty.toLocaleString(),
        }, {
            key: 6,
            beforeText: 'Gas',
            afterData: blockData.gasUsed.toLocaleString() + ' / ' + blockData.gasLimit.toLocaleString() + ' (' + Math.round(((blockData.gasUsed / blockData.gasLimit) * 100) * 100 ) / 100 + '%)',
        }, {
            key: 7,
            beforeText: 'Extra data',
            afterData: this.toUtf8(blockData.extraData) + ' (raw hex: ' + blockData.extraData + ')',
        }];


        const advancedData = [{
            key: 0,
            beforeText: 'transactionsRoot',
            afterData: blockData.transactionsRoot,
        }, {
            key: 1,
            beforeText: 'stateRoot',
            afterData: blockData.stateRoot,
        }, {
            key: 2,
            beforeText: 'receiptsRoot',
            afterData: blockData.receiptsRoot,
        }, {
            key: 3,
            beforeText: 'mixHash',
            afterData: blockData.mixHash,
        }
        ];

        return (
            <div>
                <Table columns={columns} dataSource={simpleData} showHeader={false} pagination={false} bordered={false}/>
                <Collapse bordered={false}>
                    <Panel header="Advanced details" key="1">
                        <Table columns={columns} dataSource={advancedData} showHeader={false} pagination={false} bordered={false}/>
                    </Panel>
                </Collapse>
            </div>
        )
    }
}

export default DetailsDisplay;