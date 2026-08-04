import { Types } from "mongoose";
import Supplier from "../../src/models/Supplier";
import * as supplierService from "../../src/services/supplier.service";

describe("Supplier Service", () => {
  describe("createSupplier", () => {
    it("should create a supplier", async () => {
      const supplier = await supplierService.createSupplier({
        name: "Nestle",
        address: "Lagos",
        contactPerson: "Richard",
        email: "nestle@test.com",
        phone: "08012345678",
      });

      expect(supplier.name).toBe("Nestle");

      const dbSupplier = await Supplier.findOne({
        email: "nestle@test.com",
      });

      expect(dbSupplier).not.toBeNull();
      expect(dbSupplier?.name).toBe("Nestle");
    });

    it("should throw if supplier name already exists", async () => {
      await supplierService.createSupplier({
        name: "Nestle",
        address: "Lagos",
        contactPerson: "Richard",
        email: "nestle@test.com",
        phone: "08012345678",
      });

      await expect(
        supplierService.createSupplier({
          name: "Nestle",
          address: "Abuja",
          contactPerson: "John",
          email: "john@test.com",
          phone: "09000000000",
        }),
      ).rejects.toThrow("Supplier already exists");
    });

    it("should throw if supplier email already exists", async () => {
      await supplierService.createSupplier({
        name: "Nestle",
        address: "Lagos",
        contactPerson: "Richard",
        email: "nestle@test.com",
        phone: "08012345678",
      });

      await expect(
        supplierService.createSupplier({
          name: "Cadbury",
          address: "Abuja",
          contactPerson: "John",
          email: "nestle@test.com",
          phone: "09000000000",
        }),
      ).rejects.toThrow("Supplier already exists");
    });
  });

  describe("findAll", () => {
    beforeEach(async () => {
      for (let i = 1; i <= 15; i++) {
        await Supplier.create({
          name: `Supplier ${i}`,
          address: "Lagos",
          contactPerson: "Richard",
          email: `supplier${i}@test.com`,
          phone: `080000000${i}`,
          active: true,
        });
      }
    });

    it("should return first page", async () => {
      const suppliers = await supplierService.findAll("", 1, 10);

      expect(suppliers.length).toBe(10);
    });

    it("should return second page", async () => {
      const suppliers = await supplierService.findAll("", 2, 10);

      expect(suppliers.length).toBe(5);
    });

    it("should search suppliers", async () => {
      const suppliers = await supplierService.findAll("Supplier 1", 1, 10);

      expect(suppliers.length).toBeGreaterThan(0);
      expect(suppliers[0].name).toContain("Supplier 1");
    });
  });

  describe("findSupplierById", () => {
    let supplier: any;

    beforeEach(async () => {
      supplier = await Supplier.create({
        name: "Nestle",
        address: "Lagos",
        contactPerson: "Richard",
        email: "nestle@test.com",
        phone: "08012345678",
      });
    });

    it("should return supplier", async () => {
      const found = await supplierService.findSupplierById(
        supplier._id.toString(),
      );

      expect(found.name).toBe("Nestle");
    });

    it("should throw if supplier does not exist", async () => {
      await expect(
        supplierService.findSupplierById(new Types.ObjectId().toString()),
      ).rejects.toThrow("Supplier not found");
    });
  });

  describe("updateSupplier", () => {
    let supplier: any;

    beforeEach(async () => {
      supplier = await Supplier.create({
        name: "Nestle",
        address: "Lagos",
        contactPerson: "Richard",
        email: "nestle@test.com",
        phone: "08012345678",
      });
    });

    it("should update supplier", async () => {
      const updated = await supplierService.updateSupplier(
        supplier._id.toString(),
        {
          address: "Abuja",
        },
      );

      expect(updated.address).toBe("Abuja");

      const dbSupplier = await Supplier.findById(supplier._id);

      expect(dbSupplier?.address).toBe("Abuja");
    });

    it("should throw if supplier does not exist", async () => {
      await expect(
        supplierService.updateSupplier(new Types.ObjectId().toString(), {
          address: "Abuja",
        }),
      ).rejects.toThrow("Supplier not found");
    });
  });

  describe("updateSupplierStatus", () => {
    let supplier: any;

    beforeEach(async () => {
      supplier = await Supplier.create({
        name: "Nestle",
        address: "Lagos",
        contactPerson: "Richard",
        email: "nestle@test.com",
        phone: "08012345678",
        active: true,
      });
    });

    it("should deactivate supplier", async () => {
      const updated = await supplierService.updateSupplierStatus(
        supplier._id.toString(),
        false,
      );

      expect(updated.active).toBe(false);

      const dbSupplier = await Supplier.findById(supplier._id);

      expect(dbSupplier?.active).toBe(false);
    });

    it("should activate supplier", async () => {
      await supplierService.updateSupplierStatus(
        supplier._id.toString(),
        false,
      );

      const updated = await supplierService.updateSupplierStatus(
        supplier._id.toString(),
        true,
      );

      expect(updated.active).toBe(true);
    });

    it("should throw if supplier does not exist", async () => {
      await expect(
        supplierService.updateSupplierStatus(
          new Types.ObjectId().toString(),
          false,
        ),
      ).rejects.toThrow("Supplier not found");
    });
  });
});
