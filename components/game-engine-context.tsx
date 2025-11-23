"use client";
import {createContext, useContext, useState} from "react";
import {GameEngine} from "@/game/main-engine";
import { MockGameEngine } from "@/game/engines/presentation/mock-main-engine";

type GameEngineContextType = {
  engine: GameEngine;
  triggerUpdate: () => void;
};

const GameEngineContext = createContext<GameEngineContextType | undefined>(
  undefined
);

export function GameEngineProvider({children}: {children: React.ReactNode}) {
  const [engine] = useState(() => new MockGameEngine());
  const [, setUpdateCounter] = useState(0);

  const triggerUpdate = () => {
    setUpdateCounter((prev) => prev + 1);
  };

  return (
    <GameEngineContext.Provider value={{engine, triggerUpdate}}>
      {children}
    </GameEngineContext.Provider>
  );
}

export function useGameEngine() {
  const context = useContext(GameEngineContext);
  if (!context) {
    throw new Error("useGameEngine must be used within a GameEngineProvider");
  }
  return context;
}
