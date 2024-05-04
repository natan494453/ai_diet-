import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
export const createUser = mutation({
  args: {
    id: v.string(),
    email: v.string(),
    name: v.string(),
    method: v.string(),
    imgUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const newUser = await ctx.db.insert("users", {
      id: args.id,
      email: args.email,
      method: args.method,
      name: args.name,
      imgURL: args.imgUrl,
      count: 0,
    });
    return newUser;
  },
});

export const createRecipe = mutation({
  args: {
    title: v.string(),
    userId: v.string(),
    recipe: v.string(),
    userImg: v.string(),
    isFavorite: v.boolean(),
  },
  handler: async (ctx, args) => {
    const newRecipe = await ctx.db.insert("recipes", {
      isFavorite: args.isFavorite,
      recipe: args.recipe,
      title: args.title,
      userId: args.userId,
      userImg: args.userImg,
    });
    return newRecipe;
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
export const getuser = query({
  args: { userId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("id"), args.userId))
      .collect();
    return user;
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
  args: { userId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const recipes = await ctx.db
      .query("recipes")
      .order("desc")
      .filter((q) => q.eq(q.field("userId"), args.userId))
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

export const getFavRecipe = query({
  args: { userId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const recipesFav = await ctx.db
      .query("recipes")
      .order("desc")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .filter((q) => q.eq(q.field("isFavorite"), true))
      .collect();
    return recipesFav;
  },
});

export const deleteRecipe = mutation({
  args: { recipeId: v.id("recipes") },
  handler: async (ctx, args) => {
    const deleteRec = await ctx.db.delete(args.recipeId);
    return deleteRec;
  },
});
