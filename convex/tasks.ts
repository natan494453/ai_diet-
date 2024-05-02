import { mutation } from "./_generated/server";
import { v } from "convex/values";
export const createUser = mutation({
  args: {
    id: v.string(),
    email: v.string(),
    name: v.string(),
    method: v.string(),
  },
  handler: async (ctx, args) => {
    const newUser = await ctx.db.insert("users", {
      id: args.id,
      email: args.email,
      method: args.method,
      name: args.name,
    });
    return newUser;
  },
});
