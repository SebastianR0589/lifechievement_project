  type BalanceProps = {
    balance: number;
  }

export default function Balance({ balance }: BalanceProps) {

    return (
        <div>Balance: {balance}</div>
    )

}