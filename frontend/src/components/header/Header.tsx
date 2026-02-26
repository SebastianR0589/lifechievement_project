export default function Header() {
  return (
    <header className="bg-slate-950 h-24 flex items-center justify-center border-b-4 border-cyan-500">
      <h1
        className="text-5xl text-neonPink"
        style={{
          textShadow: `
            0 0 5px #ff00ff,
            0 0 10px #ff00ff,
            0 0 20px #ff00ff,
            0 0 40px #ff66ff
          `,
          animation: "flicker 2s infinite",
         fontFamily: "'Neonderthaw', cursive"
        }}
      >
        Lifechievement
      </h1>
      <style>
        {`
          @keyframes flicker {
            0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
            20%, 22%, 24%, 55% { opacity: 0.4; }
          }
        `}
      </style>
    </header>
  );
}