import z from "zod";
import { useTranslations } from "next-intl";
export const aboutUsText = [
  {
    title: "מתכונים בהתאמה אישית",
    description:
      "מלאו את העדפותיכם הקולינריות, החל מסוגי המאכלים שאתם אוהבים ועד לאלרגיות או הגבלות תזונתיות, והמערכת שלנו תיצור עבורכם מתכונים ייחודיים ומותאמים אישית לכל ארוחה. גלו את האפשרות לאוכל מדויק לטעמכם, מבלי להתאמץ!",
    img: "/WhoAreWe/feature-fridge.png",
    alt: "fridge icon",
  },

  {
    title: " מגוון רחב של טעמים",
    description:
      " גלו עולם של טעמים עם מתכונים שמעולם לא חשבתם לשלב! המערכת משתמשת בכוח הבינה המלאכותית כדי לחקור שילובי מרכיבים חדשים ומפתיעים, כך שתוכלו ליהנות מחוויות קולינריות בלתי נשכחות בכל פעם שאתם נכנסים למטבח.",
    img: "/WhoAreWe/feature-plate.png",
    alt: "plate icon",
  },
  {
    title: "קל ומהיר לשימוש",
    description:
      " תוך כמה לחיצות פשוטות תוכלו לקבל מתכונים משודרגים ומגוונים שמתאימים בדיוק למה שאתם מחפשים. המערכת שלנו עובדת במהירות ומייצרת עבורכם רעיונות מרעננים לארוחות בכל זמן, כך שתמיד תהיה לכם השראה חדשה ובטעם מדהים.",
    img: "/WhoAreWe/feature-planner.png",
    alt: "plan icon",
  },
];

export const recipeSchemaHebrew = z.object({
  title: z.string().describe("שם המתכון"),
  ingredients: z
    .array(
      z.object({
        name: z.string().describe("שם המרכיב"),
        quantity: z.string().describe("כמות המרכיב, למשל '1 כוס' או '2 כפות'"),
      })
    )
    .describe("רשימת מרכיבים עם כמויות "),
  instructions: z.array(z.string()).describe("הוראות הכנה שלב-אחר-שלב"),
  prepTime: z.string().describe("זמן הכנה, למשל '15 דקות'"),
  cookTime: z.string().describe("זמן בישול, למשל '30 דקות'"),
  servings: z.number().describe("מספר מנות"),
  // tags: z
  //   .array(z.string())
  //   .optional()
  //   .describe("תגיות כמו 'טבעוני', 'ללא גלוטן', וכדומה"),
});
export const recipeSchemaEnglish = z.object({
  title: z.string().describe("Recipe Name"),
  ingredients: z
    .array(
      z.object({
        name: z.string().describe("Ingredient Name"),
        quantity: z
          .string()
          .describe("Ingredient quantity, e.g., '1 cup' or '2 tablespoons'"),
      })
    )
    .describe("List of ingredients with quantities"),
  instructions: z
    .array(z.string())
    .describe("Step-by-step preparation instructions"),
  prepTime: z.string().describe("Preparation time, e.g., '15 minutes'"),
  cookTime: z.string().describe("Cooking time, e.g., '30 minutes'"),
  servings: z.number().describe("Number of servings"),
  // tags: z
  //   .array(z.string())
  //   .optional()
  //   .describe("Tags like 'Vegan', 'Gluten-Free', etc."),
});
