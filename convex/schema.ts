import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  recipes: defineTable({
    title: v.string(),
    recipe: v.string(),
    userId: v.id("users"),
    isFavorite: v.boolean(),
  }).index("userId", ["userId"]),
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
    img: v.optional(v.string()),
    email: v.optional(v.string()),
    count: v.number(),
  }).index("by_token", ["tokenIdentifier"]),
});
