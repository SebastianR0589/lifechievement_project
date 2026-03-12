import Balance from "../../ui/balance/Balance";
import LogoSVG from "./LogoSVG";
import styles from "./Header.module.css";

interface HeaderProps {
  balance: number;
}

export default function Header({ balance }: HeaderProps) {
  return (
    <header className="bg-slate-950 h-24 border-b-4 border-cyan-500 relative">
      <div className={`${styles.logo} absolute left-4 top-1/2 -translate-y-1/2 flex items-center w-[350px]`}>
        <LogoSVG className="w-full text-neonPink" />
      </div>

      <h1 className={`${styles.title} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-neonPink font-neonderthaw text-center`}>
        Lifechievement
      </h1>

      <Balance balance={balance} />
    </header>
  );
}