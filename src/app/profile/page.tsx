import { CardData, ScoreCardList } from "@/components/ScoreCardList"

export default function Profile() {
    
      const cards = [
        { id: 1, title: "Session 1", score: 85, details: "Detailed insights for session 1." },
        { id: 2, title: "Session 2", score: 92, details: "Detailed insights for session 2." },
        { id: 3, title: "Session 3", score: 78, details: "Detailed insights for session 3." },
      ];

    return(
        <div className="flex flex-col w-full h-screen justify-center items-center">
            <div className="flex flex-col w-full max-w-2xl ">
                <ScoreCardList cards={cards}/>
            </div>
            
        </div>
        
    )
}