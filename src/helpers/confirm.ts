export function isSuccessfulTransaction(receipt: any): boolean {
  return receipt.status === '0x1' || receipt.status === true;
}
