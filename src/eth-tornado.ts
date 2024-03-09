import {
  Deposit as DepositEvent,
  Withdrawal as WithdrawalEvent
} from "../generated/ETHTornado/ETHTornado"
import { Deposit, Withdrawal } from "../generated/schema"

import { contractsToInstances } from './contractsToInstances';
export function handleDeposit(event: DepositEvent): void {
  let entity = new Deposit(event.transaction.hash.toHex() + '-' + event.logIndex.toString());

  let result = contractsToInstances.get(event.address.toHexString()).split('-');

  entity.amount = result[1];
  entity.currency = result[0];

 

  entity.from = event.transaction.from;
  entity.index = event.params.leafIndex;
  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp;
  entity.commitment = event.params.commitment;
  entity.transactionHash = event.transaction.hash;

  
  entity.save()
}

export function handleWithdrawal(event: WithdrawalEvent): void {
  let entity = new Withdrawal(event.transaction.hash.toHex() + '-' + event.logIndex.toString());

  let result = contractsToInstances.get(event.address.toHexString()).split('-');

  entity.amount = result[1];
  entity.currency = result[0];

  entity.to = event.params.to;
  entity.fee = event.params.fee;
  entity.index = event.logIndex;
  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp;
  entity.nullifier = event.params.nullifierHash;
  entity.transactionHash = event.transaction.hash;

  entity.save()
}
