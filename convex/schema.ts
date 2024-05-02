import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    id: v.string(),
    email: v.string(),
    name: v.string(),
    method: v.string(),
  }),
  recipes: defineTable({
    title: v.string(),
    recipe: v.string(),
    userId: v.id("users"),
    isFavorite: v.boolean(),
  }).index("userId", ["userId"]),
});
