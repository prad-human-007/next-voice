'use client'

import { useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader } from "@/components/ui/dialog";

export interface CardData {
    id: number,
    title: string,
    score: number,
    details: string
}

const ScoreCardList = (
    { cards }: { cards: CardData[] } 
) => {
  const [selectedCard, setSelectedCard] = useState<any | null>(null);

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

export { ScoreCardList };
