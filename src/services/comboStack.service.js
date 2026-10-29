import { getComboStacksApi } from "../api/combo-stack.api";

export const DEFAULT_STACKS = [
  {
    id: "muscle",
    name: "Muscle & recovery",
    tagline: "Post-workout repair & mass support",
    categories: ["Whey Protein", "Creatine Monohydrate", "BCAA & Amino Acids"],
    labels: ["Whey Protein", "Creatine", "BCAA & Intra"],
  },
  {
    id: "strength",
    name: "Workout essentials",
    tagline: "Pre-workout pump & intra hydration",
    categories: ["Pre Workout", "Creatine Monohydrate", "BCAA & Amino Acids"],
    labels: ["Pre Workout", "Creatine", "BCAA & Intra"],
  },
  {
    id: "shred",
    name: "Muscle & shred",
    tagline: "Lean definition with metabolic support",
    categories: ["Whey Protein", "Wellness & Health", "BCAA & Amino Acids"],
    labels: ["Whey Protein", "Fat Burner", "BCAA & Intra"],
  },
  {
    id: "bulk",
    name: "Build your bulk",
    tagline: "Maximum size & raw strength foundation",
    categories: ["Whey Protein", "Creatine Monohydrate"],
    labels: ["Whey Protein", "Creatine"],
  },
  {
    id: "endurance",
    name: "Fat burn & cardio",
    tagline: "Thermogenic energy & muscle preservation",
    categories: ["Wellness & Health", "BCAA & Amino Acids"],
    labels: ["Fat Burner", "BCAA & Recovery"],
  },
];

export function normalizeComboStacks(data) {
  const list = Array.isArray(data?.comboStacks) ? data.comboStacks : [];
  const valid = list
    .filter(stack => stack && stack.status !== false && typeof stack.name === "string" && stack.name.trim() && Array.isArray(stack.categories) && stack.categories.length > 0)
    .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))
    .map((stack, index) => {
      const cleanCategories = stack.categories.map(c => String(c).trim()).filter(Boolean);
      const cleanLabels = Array.isArray(stack.labels) && stack.labels.length === cleanCategories.length
        ? stack.labels.map(l => String(l).trim())
        : cleanCategories;
      return {
        id: stack._id || stack.id || `stack-${index}`,
        name: stack.name.trim(),
        tagline: stack.tagline || "",
        categories: cleanCategories,
        labels: cleanLabels,
      };
    });

  return valid.length > 0 ? valid : DEFAULT_STACKS;
}

export async function fetchComboStacks({ signal } = {}) {
  try {
    const response = await getComboStacksApi(signal);
    return normalizeComboStacks(response.data?.data || response.data);
  } catch (error) {
    console.warn("Could not fetch remote combo stacks, using defaults:", error?.message || error);
    return DEFAULT_STACKS;
  }
}

