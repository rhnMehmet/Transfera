export default function Dashboard() {
  const transfers = [
    {
      player: "Victor Osimhen",
      from: "Napoli",
      to: "Chelsea",
      fee: "€105M",
      status: "Güçlü İhtimal",
    },
    {
      player: "Theo Hernández",
      from: "Milan",
      to: "Bayern Münih",
      fee: "€62M",
      status: "Takip Ediliyor",
    },
    {
      player: "Bruno Guimarães",
      from: "Newcastle",
      to: "PSG",
      fee: "€88M",
      status: "AI Önerisi",
    },
  ];

  const players = [
    {
      name: "Jamal Musiala",
      team: "Bayern Münih",
      role: "AMF / Kanat",
      value: "€110M",
      change: "+8.4%",
    },
    {
      name: "Victor Osimhen",
      team: "Napoli",
      role: "Santrfor",
      value: "€95M",
      change: "+5.2%",
    },
    {
      name: "Arda Güler",
      team: "Real Madrid",
      role: "10 Numara",
      value: "€45M",
      change: "+12.1%",
    },
  ];

  const teams = [
    "Real Madrid",
    "Manchester City",
    "Galatasaray",
    "Bayern Münih",
    "Juventus",
    "Fenerbahçe",
  ];

  return (
    <div className="min-h-screen bg-[#02081d] text-white px-6 py-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-8 bg-[#0b1230] border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center">
          <div>
            <span className="text-xs text-cyan-300 bg-cyan-400/10 px-3 py-1 rounded-full">
              TRANSFERA • AI DESTEKLİ PLATFORM
            </span>

            <h1 className="text-4xl md:text-5xl font-bold mt-4">
              Futbol transferlerini veriye dayalı yönetin.
            </h1>

            <p className="text-gray-400 mt-3">
              Oyuncu analizleri, transfer tahminleri ve canlı veri paneli.
            </p>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            <button className="bg-cyan-400 text-black px-6 py-2 rounded-xl">
              Giriş Yap
            </button>
            <button className="border border-white/20 px-6 py-2 rounded-xl">
              Kayıt Ol
            </button>
          </div>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-6">

          {/* TRANSFER CARDS */}
          <div className="bg-[#031d49] p-6 rounded-3xl border border-cyan-500/20">
            <h2 className="text-xl font-bold mb-4">
              Gündemdeki Olası Büyük Hamleler
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              {transfers.map((t, i) => (
                <div key={i} className="bg-[#071b43] p-4 rounded-2xl">
                  <h3 className="font-semibold">{t.player}</h3>
                  <p className="text-gray-400 text-sm">
                    {t.from} → {t.to}
                  </p>
                  <p className="text-cyan-300 font-bold mt-3">{t.fee}</p>
                  <span className="text-xs bg-white/10 px-2 py-1 rounded mt-2 inline-block">
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* TEAM SEARCH */}
          <div className="bg-[#0b1230] p-6 rounded-3xl border border-white/10">
            <h3 className="text-xl font-bold mb-3">Takım Ara</h3>

            <input
              placeholder="Takım adı yaz..."
              className="w-full p-2 bg-[#091634] rounded mb-3"
            />

            <div className="flex flex-wrap gap-2">
              {teams.map((team, i) => (
                <span key={i} className="bg-white/10 px-3 py-1 rounded-full text-sm">
                  {team}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* PLAYERS + PROFILE */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-6 mt-6">

          {/* PLAYERS */}
          <div className="bg-[#0b1230] p-6 rounded-3xl border border-white/10">
            <h2 className="text-xl font-bold mb-4">
              Öne Çıkan Oyuncular
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              {players.map((p, i) => (
                <div key={i} className="bg-[#071b43] p-4 rounded-2xl">
                  <div className="h-24 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded mb-3"></div>

                  <h3>{p.name}</h3>
                  <p className="text-gray-400 text-sm">{p.team}</p>
                  <p className="text-gray-500 text-xs">{p.role}</p>

                  <div className="flex justify-between mt-3">
                    <span className="text-cyan-300 font-bold">{p.value}</span>
                    <span className="text-green-400 text-xs">{p.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PROFILE */}
          <div className="bg-[#0b1230] p-6 rounded-3xl border border-white/10">
            <h3 className="text-xl font-bold mb-4">Profil Özeti</h3>

            <p className="text-gray-400 text-sm">Kullanıcı</p>
            <p className="font-semibold mb-3">Mehmet Orhan</p>

            <p className="text-gray-400 text-sm">Favori Takımlar</p>
            <p className="mb-3">Galatasaray, Real Madrid</p>

            <p className="text-gray-400 text-sm">Favori Oyuncular</p>
            <p>Arda Güler, Musiala</p>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-white/10 p-3 rounded">
                <p className="text-sm text-gray-400">Bildirim</p>
                <p>Açık</p>
              </div>
              <div className="bg-white/10 p-3 rounded">
                <p className="text-sm text-gray-400">AI Raporu</p>
                <p>12 adet</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}