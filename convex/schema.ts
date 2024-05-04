import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    id: v.string(),
    email: v.string(),
    name: v.string(),
    method: v.string(),
    count: v.number(),
    imgURL: v.string(),
  }),
  recipes: defineTable({
    title: v.string(),
    recipe: v.string(),
    userId: v.string(), // Reference to the users table
    userImg: v.string(),
    isFavorite: v.boolean(),
  }).index("userId", ["userId"]),
});
