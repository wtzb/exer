import { gql } from 'apollo-boost';

const getAddressData = gql`
query addressData($address:Address!) {
    account(address: $address){
        address
        balance
        code
        type
        transactionCount
     }
  }  
`

export {getAddressData} 