import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Table } from 'antd';
import web3 from 'web3';
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

class DetailsDisplay extends React.Component {
    static propTypes = {
        addressData: PropTypes.object,
    }

    typeOfWallet = () => {
        if (this.props.addressData.code !== "0x") {
            return(<p><b>Contract Overview</b></p>)
        } else {
            return(<p><b>Overview</b></p>)
        }
    }

    contractCode = () => {
        if (this.props.addressData.code !== "0x") {
            return(
                <div>
                    <Collapse bordered={false}>
                        <Panel header="Contract code (bytes)" key="1">
                            <p style={{'wordWrap' : 'break-word'}}>{this.props.addressData.code}</p>
                        </Panel>
                    </Collapse>
                </div>
            )
        } else {
            return null;
        }
    }

    render() {

        const addressData = this.props.addressData;

        // Needed in case ETH amount > 1000
        let balance = new BigNumber(addressData.balance)
        balance = balance.toFormat()
        balance = balance.split(',').join('')

        const simpleData = [{
            key: 0,
            beforeText: 'Address',
            afterData: addressData.address,
        }, {
            key: 1,
            beforeText: 'Balance',
            afterData: <span>{web3.utils.fromWei(balance, 'ether')} ETH</span>,
        }, {
            key: 2,
            beforeText: 'Transaction count',
            afterData: addressData.transactionCount,
        }];

        return (
            <div>
                <this.typeOfWallet />
                <Table columns={columns} dataSource={simpleData} showHeader={false} pagination={false} bordered={false}/>
                <this.contractCode />
            </div>
        )
    }
}

export default DetailsDisplay;