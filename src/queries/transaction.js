import { gql } from 'apollo-boost';

const getTransactionData = gql`
query transactionData($transactionHash: Bytes32) {
    transaction(hash: $transactionHash){
      hash
      nonce
      index
      from {
        address
      }
      to {
        address
      }
      value
      gasPrice
      gas
      inputData
      status
      block {
        hash
        number
        timestamp
      }
      decoded {
        ... on ERC20Transfer {
          tokenContract {
            symbol
          }
          from {
            account {
            	address
            }
            tokenBalance
          }
          to {
            account {
              address
            }
          }
          value
        }
      }
    }
  }
`

const getTransactionDataPending = gql`
query transactionData($transactionHash: Bytes32) {
    transaction(hash: $transactionHash){
      hash
      nonce
      index
      from {
        address
      }
      to {
        address
      }
      value
      gasPrice
      gas
      inputData
      decoded {
        ... on ERC20Transfer {
          tokenContract {
            symbol
          }
          from {
            account {
            	address
            }
            tokenBalance
          }
          to {
            account {
              address
            }
          }
          value
        }
      }
    }
  }
`

export {getTransactionData, getTransactionDataPending}