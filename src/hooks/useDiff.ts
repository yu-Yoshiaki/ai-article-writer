import { useMemo } from "react";
import { DiffChunk } from "../types";

export function useDiff(original: string, patched: string) {
  const diffChunks = useMemo(() => {
    return calculateDiff(original, patched);
  }, [original, patched]);

  return { diffChunks };
}

function calculateDiff(original: string, patched: string): DiffChunk[] {
  // シンプルな差分計算アルゴリズム
  // 実際のプロダクションでは diff-match-patch ライブラリを使用

  if (original === patched) {
    return [{ type: "equal", content: original }];
  }

  // 単語レベルでの差分計算
  const originalWords = original.split(/(\s+)/);
  const patchedWords = patched.split(/(\s+)/);

  const chunks: DiffChunk[] = [];
  let i = 0,
    j = 0;

  while (i < originalWords.length || j < patchedWords.length) {
    if (i >= originalWords.length) {
      // 残りは全て追加
      chunks.push({ type: "add", content: patchedWords.slice(j).join("") });
      break;
    }

    if (j >= patchedWords.length) {
      // 残りは全て削除
      chunks.push({ type: "remove", content: originalWords.slice(i).join("") });
      break;
    }

    if (originalWords[i] === patchedWords[j]) {
      // 同じ単語
      chunks.push({ type: "equal", content: originalWords[i] });
      i++;
      j++;
    } else {
      // 異なる単語 - 簡単な処理として削除→追加
      chunks.push({ type: "remove", content: originalWords[i] });
      chunks.push({ type: "add", content: patchedWords[j] });
      i++;
      j++;
    }
  }

  return chunks;
}
