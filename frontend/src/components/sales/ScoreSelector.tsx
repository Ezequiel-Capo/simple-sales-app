"use client";

import { Button } from "@/components/ui/button";

interface ScoreSelectorProps {
  currentScore: number | null;
  onSelect: (score: number) => void;
  disabled?: boolean;
}

export const ScoreSelector = ({ currentScore, onSelect, disabled }: ScoreSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {[1, 2, 3, 4, 5].map((score) => {
        const selected = currentScore === score;
        return (
          <Button
            key={score}
            type="button"
            size="sm"
            variant={selected ? "primary" : "outline"}
            onClick={() => onSelect(score)}
            disabled={disabled}
            className="min-w-9"
          >
            {score}
          </Button>
        );
      })}
    </div>
  );
};
