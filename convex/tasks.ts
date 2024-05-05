import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const createRecipe = mutation({
  args: { title: v.string(), recipe: v.string(), isFavorite: v.boolean() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated call to mutation");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
    if (!user) {
      throw new Error("Unauthenticated call to mutation");
    }
    await ctx.db.insert("recipes", {
      isFavorite: args.isFavorite,
      recipe: args.recipe,
      title: args.title,
      userId: user._id,
    });
  },
});
export const user = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated call to mutation");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
    if (!user) {
      throw new Error("Unauthenticated call to mutation");
    }
    return user;
  },
});
export const getFavRecipe = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated call to mutation");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
    if (!user) {
      throw new Error("Unauthenticated call to mutation");
    }
    const recipesFav = await ctx.db
      .query("recipes")
      .order("desc")
      .filter((q) => q.eq(q.field("userId"), user._id))
      .filter((q) => q.eq(q.field("isFavorite"), true))
      .collect();
    return recipesFav;
  },
});

export const getCurrentRecipe = query({
  args: { recipeId: v.string() },
  handler: async (ctx, args) => {
    const currentRecipe = await ctx.db
      .query("recipes")
      .filter((q) => q.eq(q.field("_id"), args.recipeId))
      .collect();
    return currentRecipe;
  },
});
export const EditFav = mutation({
  args: { recipeId: v.id("recipes"), stats: v.boolean() },
  handler: async (ctx, args) => {
    const newFav = await ctx.db.patch(args.recipeId, {
      isFavorite: args.stats,
    });
    return newFav;
  },
});

export const addCount = mutation({
  args: { userId: v.any(), count: v.number() },

  handler: async (ctx, args) => {
    const addCoundHandler = await ctx.db.patch(args.userId, {
      count: args.count,
    });
    return addCoundHandler;
  },
});

export const getRecipe = query({
  args: {},

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated call to mutation");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
    if (!user) {
      throw new Error("Unauthenticated call to mutation");
    }
    const recipes = await ctx.db
      .query("recipes")
      .order("desc")
      .filter((q) => q.eq(q.field("userId"), user._id))
      .collect();
    return recipes;
  },
});

export const getAllRecipe = query({
  args: {},
  handler: async (ctx, _) => {
    const allRecipes = await ctx.db.query("recipes").collect();
    return allRecipes;
  },
});

export const deleteRecipe = mutation({
  args: { recipeId: v.id("recipes") },
  handler: async (ctx, args) => {
    const deleteRec = await ctx.db.delete(args.recipeId);
    return deleteRec;
  },
});
