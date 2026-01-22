import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getTopics = async (req, res) => {
  try {
    const { category } = req.params;
    const dataPath = path.join(__dirname, "..", "data", "topicsData.json");
    const rawData = await fs.readFile(dataPath, "utf-8");
    const allTopics = JSON.parse(rawData);

    const categoryData = allTopics[category];

    if (!categoryData) {
      return res.status(404).send("Topic category not found");
    }

    res.render("topics", {
      categoryName: categoryData.name,
      subtitle: categoryData.subtitle,
      topics: categoryData.topics,
      categorySlug: category
    });
  } catch (error) {
    console.error("Error loading topics:", error);
    res.status(500).send("Error loading topics");
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const dataPath = path.join(__dirname, "..", "data", "topicsData.json");
    const rawData = await fs.readFile(dataPath, "utf-8");
    const allTopics = JSON.parse(rawData);

    const categories = Object.keys(allTopics).map((key) => ({
      slug: key,
      name: allTopics[key].name,
      subtitle: allTopics[key].subtitle,
      topicCount: allTopics[key].topics.length
    }));

    res.render("categories", { categories });
  } catch (error) {
    console.error("Error loading categories:", error);
    res.status(500).send("Error loading categories");
  }
};
