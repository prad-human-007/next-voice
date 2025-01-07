'use client'

import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader } from "@/components/ui/dialog";

const ScoreCardList = (
    props: { cards: any}
) => {
  const [selectedCard, setSelectedCard] = useState<any | null>(null);

  const cards = [
    { id: 1, title: "Session 1", score: 85, details: "Detailed insights for session 1." },
    { id: 2, title: "Session 2", score: 92, details: "Detailed insights for session 2." },
    { id: 3, title: "Session 3", score: 78, details: "Detailed insights for session 3." },
  ];

  return (
    <div className="flex flex-col gap-4">
      {cards.map((card) => (
        <Card key={card.id} className="hover:shadow-lg transition">
          <CardHeader>
            <h3>{card.title}</h3>
          </CardHeader>
          <CardContent>
            <p>Score: {card.score}</p>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="text-blue-500 underline"
                  onClick={() => setSelectedCard(card)}
                >
                  View Details
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <h2>{selectedCard?.title}</h2>
                </DialogHeader>
                <p>{selectedCard?.details}</p>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ScoreCardList;
