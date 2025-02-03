const InfoCards = () => {
    const cards = [
      {
        image: "/trumpcard.png",
        title: "$TRUMP",
        description: "Connect Wallet and Claim your $Trump",
        className:"w-240 h-240 object-cover mb-6 pt-2"
      },
      {
        image: "/melaniacardstrstr3.png",
        title: "$MELANIA",
        description: "Connect Wallet and Claim your $Melania",
        className:"w-240 h-240 object-cover mb-6 pt-4"
      },
      {
        image: "/maga.webp",
        title: "$MAGA",
        description: "Connect Wallet and Claim your $MAGA",
        className:"w-80 h-80 object-cover mb-4 pt-4"
      }
    ];
  
    return (
      <div className=" mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-[#eee3b6] shadow-2xl rounded-xl p-6 flex flex-col items-center transform transition-transform hover:scale-105"
          >
            <img src={card.image} alt={card.title} className={card.className} />
            <h3 className="text-lg font-bold mb-2 text-red-500">{card.title}</h3>
            <p className="text-sm text-black text-center">{card.description}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default InfoCards;
  