import { gql } from 'apollo-boost';

const getBlockData = gql`
query blockData($blockNumber:BlockNumber) {
    block(number: $blockNumber) {
      number
      timestamp
      hash
      transactionCount
      difficulty
      totalDifficulty
      gasLimit
      gasUsed
      extraData
      transactionsRoot
      stateRoot
      receiptsRoot
      mixHash
      miner {
        address
      }
    }
  }  
`

const getTransactions = gql`
query blockTransactions($blockNumber:BlockNumber) {
    block(number: $blockNumber) {
      transactionCount
      transactions {
        index
        hash
        from {
          address
        }
        to {
          address
        }
        value
        gas
        gasPrice
      }
    }
  }  
`

const getRecentBlocks = gql`
query blockTransactions($blockStart:BlockNumber, $blockEnd:BlockNumber) {
  blocksRange(numberRange: [$blockStart, $blockEnd]) {
    number
    hash
    transactionCount
    timestamp
    gasLimit
    gasUsed
    }
  }  
`

export {getBlockData, getTransactions, getRecentBlocks} 