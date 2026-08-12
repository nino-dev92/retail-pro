import { Types } from "mongoose";
import * as categoryService from "../../src/services/category.service";

describe("Category Service", () => {
  describe("allCategories", () => {
    beforeEach(async () => {
      for (let i = 1; i <= 5; i++) {
        await categoryService.addCategory({
          name: ` category${i}`,
          description: `category${i}`,
        });
      }
    });
    it("Should return all categories in db", async () => {
      const categories = await categoryService.allCategories();
      expect(categories).not.toBe(null);
      expect(categories.categories.length).toBe(5);
    });
    it("should return all categories with the search string", async () => {
      const categories = await categoryService.allCategories("category");
      expect(categories).not.toBe(null);
      expect(categories.categories.length).toBe(5);
    });
  });

  describe("when no categories exist", () => {
    it("should return an empty array", async () => {
      const categories = await categoryService.allCategories();

      expect(categories.categories).toEqual([]);
    });
  });

  describe("addCategory", () => {
    let dbCategory: any;
    beforeEach(async () => {
      dbCategory = await categoryService.addCategory({
        name: "Books",
        description: "Reading material",
      });
    });
    it("Should add a category to the db", async () => {
      const category = await categoryService.addCategory({
        name: "Electronics",
        description: "Electrical products",
      });
      expect(category.name).toBe("Electronics");
    });
    it("Should throw an error if category name already exists", async () => {
      await expect(
        categoryService.addCategory({ name: "Books", description: "desc" }),
      ).rejects.toThrow("Category already exists");
    });
  });
  describe("editCategory", () => {
    let dbCategory: any;
    beforeEach(async () => {
      dbCategory = await categoryService.addCategory({
        name: "Books",
        description: "Reading material",
      });
    });

    it("Should edit a category", async () => {
      const update = await categoryService.editCategory(
        dbCategory._id.toString(),
        { name: "Electronics" },
      );
      expect(update.name).toBe("Electronics");
    });

    it("Should throw an error if category does not exist", async () => {
      await expect(
        categoryService.editCategory(new Types.ObjectId().toString(), {
          name: "Electronics",
        }),
      ).rejects.toThrow("Category not found");
    });

    it("Should throw an error if category id is invalid", async () => {
      await expect(
        categoryService.editCategory("abc", {
          name: "Electronics",
        }),
      ).rejects.toThrow("Invalid category");
    });
  });
  describe("removeCategory", () => {
    let dbCategory: any;
    beforeEach(async () => {
      dbCategory = await categoryService.addCategory({
        name: "Books",
        description: "Reading material",
      });
    });

    it("Should deactivate the selected category", async () => {
      const deactivate: any = await categoryService.removeCategory(
        dbCategory._id.toString(),
        false,
      );
      expect(deactivate.isActive).toBe(false);
    });

    it("Should throw an error if category is not found", async () => {
      await expect(
        categoryService.removeCategory(new Types.ObjectId().toString(), true),
      ).rejects.toThrow("Category not found");
    });

    it("Should throw an error if category id is invalid", async () => {
      await expect(
        categoryService.removeCategory("abc", false),
      ).rejects.toThrow("Invalid category");
    });
  });
});
