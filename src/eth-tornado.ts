import {
  Deposit as DepositEvent,
  Withdrawal as WithdrawalEvent
} from "../generated/ETHTornado/ETHTornado"
import { Deposit, Withdrawal } from "../generated/schema"

export function handleDeposit(event: DepositEvent): void {
  let entity = new Deposit(event.transaction.hash.toHex() + '-' + event.logIndex.toString());


  entity.amount ="0.1";
  entity.currency = "eth";

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

  entity.amount = "0.1";
  entity.currency = "eth";

  entity.to = event.params.to;
  entity.fee = event.params.fee;
  entity.index = event.logIndex;
  entity.blockNumber = event.block.number;
  entity.timestamp = event.block.timestamp;
  entity.nullifier = event.params.nullifierHash;
  entity.transactionHash = event.transaction.hash;

  entity.save()
}
