import type { Section } from "../types";

export const mockArticleData: Section[] = [
  {
    id: "1",
    title: "Introduction",
    content: "",
    variations: [
      "Curry rice is a beloved dish that combines the rich flavors of Indian spices with Japanese cooking techniques.",
      "Discover the art of making perfect curry rice, a fusion dish that has become a staple in Japanese cuisine.",
      "Learn how to create restaurant-quality curry rice in your own kitchen with this comprehensive guide.",
    ],
    selectedVariation: 0,
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Ingredients",
    content: "",
    variations: [
      "For this recipe, you need: curry roux blocks, onions, carrots, potatoes, meat of choice, and Japanese rice.",
      "Gather these essential ingredients: premium Japanese rice, curry powder or roux, vegetables, and protein.",
      "The key components for perfect curry rice include: short-grain rice, curry sauce base, and fresh vegetables.",
    ],
    selectedVariation: 0,
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Preparation Steps",
    content: "",
    variations: [
      "Begin by washing the rice thoroughly and cooking it in a rice cooker. Meanwhile, cut vegetables into uniform pieces.",
      "Start with rice preparation using the proper washing technique. While it cooks, prep your vegetables uniformly.",
      "First, rinse the rice until water runs clear. As it cooks, prepare your vegetables in consistent sizes.",
    ],
    selectedVariation: 0,
    order: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
