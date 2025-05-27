import { useState } from "react";
import type { Article } from "../types";

const MAX_HISTORY = 50;

interface LocalEditorHistory {
  past: Article[];
  present: Article | null;
  future: Article[];
}

export function useHistory() {
  const [history, setHistory] = useState<LocalEditorHistory>({
    past: [],
    present: null,
    future: [],
  });

  const push = (article: Article) => {
    setHistory((prev) => ({
      past: prev.present
        ? [...prev.past.slice(-MAX_HISTORY), prev.present]
        : prev.past,
      present: article,
      future: [],
    }));
  };

  const undo = () => {
    setHistory((prev) => {
      if (prev.past.length === 0 || !prev.present) return prev;

      const previous = prev.past[prev.past.length - 1];
      return {
        past: prev.past.slice(0, -1),
        present: previous,
        future: [prev.present, ...prev.future],
      };
    });
  };

  const redo = () => {
    setHistory((prev) => {
      if (prev.future.length === 0 || !prev.present) return prev;

      const next = prev.future[0];
      return {
        past: [...prev.past, prev.present],
        present: next,
        future: prev.future.slice(1),
      };
    });
  };

  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  return {
    current: history.present,
    push,
    undo,
    redo,
    canUndo,
    canRedo,
  };
}
