import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  recipes: defineTable({
    title: v.string(), // Recipe title
    description: v.optional(v.string()), // Optional short description
    ingredients: v.array(
      v.object({
        name: v.string(), // Ingredient name
        quantity: v.string(), // Quantity, e.g., "1 cup", "2 tbsp"
      })
    ), // Array of ingredients with name and quantity
    instructions: v.array(v.string()), // Step-by-step instructions
    prepTime: v.string(), // Preparation time, e.g., "15 minutes"
    cookTime: v.string(), // Cooking time, e.g., "30 minutes"
    servings: v.number(), // Number of servings
    tags: v.optional(v.array(v.string())), // Optional tags, e.g., ["vegan", "gluten-free"]
    userId: v.id("users"), // Reference to user
    isFavorite: v.boolean(), // Favorite flag
  }).index("userId", ["userId"]),
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
    img: v.optional(v.string()),
    email: v.optional(v.string()),
    count: v.number(),
  }).index("by_token", ["tokenIdentifier"]),
});
