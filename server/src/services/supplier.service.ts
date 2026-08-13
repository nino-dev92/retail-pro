import Supplier from "../models/Supplier";
import ApiError from "../utils/apiError";

type SupplierDTO = {
  name: string;
  address: string;
  contactPerson: string;
  email: string;
  phone: string;
};

export const createSupplier = async (data: SupplierDTO) => {
  const { name, address, contactPerson, email, phone } = data;

  const existing = await Supplier.findOne({
    $or: [{ name }, { email }],
  });

  if (existing) throw new ApiError("Supplier already exists", 409);

  const newSupplier = await Supplier.create({
    name,
    address,
    contactPerson,
    email,
    phone,
  });

  return { name, address, contactPerson, email, phone };
};

export const findAll = async (search?: string, page = 1, limit = 10) => {
  const filter: Record<string, any> = {
    active: true,
  };

  const skip = (page - 1) * limit;

  if (search) {
    filter.name = {
      $regex: search,
      $options: "i",
    };
  }

  const suppliers = await Supplier.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ name: 1 });

  console.log(suppliers);

  return suppliers;
};

export const findSupplierById = async (id: string) => {
  const supplier = await Supplier.findById(id);

  if (!supplier) throw new ApiError("Supplier not found", 404);

  return supplier;
};

export const updateSupplier = async (id: string, data: any) => {
  const supplier = await Supplier.findByIdAndUpdate(id, data, { new: true });

  if (!supplier) throw new ApiError("Supplier not found", 404);

  return {
    name: supplier.name,
    address: supplier.address,
    contactPerson: supplier.contactPerson,
    phone: supplier.phone,
    email: supplier.email,
  };
};

export const updateSupplierStatus = async (id: string, status: boolean) => {
  const deleteSupplier = await Supplier.findByIdAndUpdate(
    id,
    { active: status },
    { new: true },
  );

  if (!deleteSupplier) throw new ApiError("Supplier not found", 404);

  await deleteSupplier.save();

  return deleteSupplier;
};
