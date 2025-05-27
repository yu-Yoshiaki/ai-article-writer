import { useState, useEffect } from "react";
import { Document, Section } from "../types";
import { v4 as uuidv4 } from "uuid";

export function useDocument() {
  const [document, setDocument] = useState<Document | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 初期化時にサンプルドキュメントを作成
    initializeDocument();
  }, []);

  const initializeDocument = () => {
    const sampleDocument: Document = {
      id: uuidv4(),
      title: "PatchWrite サンプルドキュメント",
      sections: [],
      userId: "sample-user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const sampleSections: Section[] = [
      {
        id: uuidv4(),
        title: "はじめに",
        content:
          "PatchWriteは、AIと協調しながら記事を部分的に生成・リライトできるWebライティングツールです。段落単位でのAIパッチ機能、差分可視化、履歴ツリーが特徴です。",
        variations: [],
        selectedVariation: 0,
        order: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        title: "主な機能",
        content:
          "AIパッチ機能では、要約、拡張、トーン変更の3つの操作が可能です。変更内容は差分ハイライトで視覚的に確認でき、適用前にプレビューできます。すべての変更は履歴として保存され、任意の版にロールバックできます。",
        variations: [],
        selectedVariation: 0,
        order: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        title: "使い方",
        content:
          "段落をクリックするか、ホバー時に表示される魔法のボタン（🪄）をクリックしてAIパッチメニューを開きます。希望する操作を選択し、プレビューで確認してから適用してください。",
        variations: [],
        selectedVariation: 0,
        order: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    setDocument(sampleDocument);
    setSections(sampleSections);
    setIsLoading(false);
  };

  const updateSection = (sectionId: string, content: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, content, updatedAt: new Date().toISOString() }
          : section
      )
    );
  };

  const createRevision = (
    sectionId: string,
    content: string,
    operation: string
  ) => {
    // TODO: 実際のリビジョン作成ロジックを実装
    console.log("Creating revision:", { sectionId, content, operation });
  };

  return {
    document,
    sections,
    isLoading,
    updateSection,
    createRevision,
  };
}
