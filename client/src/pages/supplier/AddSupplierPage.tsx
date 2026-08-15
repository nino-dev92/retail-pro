import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Toaster, toast } from "sonner";

export default function AddSupplierPage() {
  const { theme } = useAuth();
  const api = useAxiosPrivate();
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [contactPerson, setContactPerson] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = { name, contactPerson, phone, email, address };

    try {
      await api.post("/supplier", data);
      toast.success("Supplier added successfully");
      clearForm();
      navigate(-1);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const clearForm = () => {
    setName("");
    setContactPerson("");
    setPhone("");
    setEmail("");
    setAddress("");
  };
  return (
    <AdminLayout theme={theme}>
      <Toaster position="top-right" richColors={true} />

      <main className="min-h-full w-full px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="mx-auto w-full max-w-4xl">
          {/* Page Header */}
          <header className="mb-5 flex items-center justify-between gap-4 sm:mb-6">
            <div className="min-w-0">
              <h1 className="text-2xl font-bold dark:text-surface sm:text-3xl">
                Add Supplier
              </h1>

              <p className="mt-1 text-sm dark:text-surface/60">
                Add a new supplier.
              </p>
            </div>

            <div className="flex shrink-0 justify-end">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-lg border border-surface/30 px-4 py-2.5 text-sm font-medium text-surface-tint transition hover:border-surface-tint hover:bg-surface/10 active:scale-98 cursor-pointer"
              >
                ← Back
              </button>
            </div>
          </header>

          {/* Form Card */}
          <form
            onSubmit={handleSubmit}
            className="w-full rounded-xl border border-surface/20 bg-surface-tint p-4 shadow-sm sm:p-6 lg:p-8"
          >
            <div className="space-y-7">
              {/* Supplier Information */}
              <section>
                <div className="mb-5">
                  <h2 className="text-lg font-semibold text-surface sm:text-xl">
                    Supplier Information
                  </h2>

                  <p className="mt-1 text-sm text-surface/60">
                    Enter the basic details of the supplier.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                  {/* Supplier Name */}
                  <div className="">
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium text-surface"
                    >
                      Supplier Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="e.g. Samsung Galaxy S25"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-surface/30 bg-surface px-3 py-2.5 text-sm outline-none transition placeholder:text-surface/40 focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-base"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-surface"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      placeholder="e.g. Samsung Galaxy S25"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-surface/30 bg-surface px-3 py-2.5 text-sm outline-none transition placeholder:text-surface/40 focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-base"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-sm font-medium text-surface"
                    >
                      Phone
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-lg border border-surface/30 bg-surface px-3 py-2.5 text-sm outline-none transition placeholder:text-surface/40 focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-base"
                    />
                  </div>

                  {/* Contact Person */}
                  <div>
                    <label
                      htmlFor="contactPerson"
                      className="mb-1.5 block text-sm font-medium text-surface"
                    >
                      Contact Person
                    </label>
                    <input
                      id="contactPerson"
                      name="contactPerson"
                      type="text"
                      placeholder="e.g. Samsung Galaxy S25"
                      required
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      className="w-full rounded-lg border border-surface/30 bg-surface px-3 py-2.5 text-sm outline-none transition placeholder:text-surface/40 focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-base"
                    />
                  </div>
                </div>
              </section>

              {/* Description */}
              <section>
                <label
                  htmlFor="address"
                  className="mb-1.5 block text-sm font-medium text-surface"
                >
                  Address
                </label>

                <textarea
                  id="address"
                  name="address"
                  rows={5}
                  placeholder="Enter a Address of the product..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full resize-y rounded-lg border border-surface/30 bg-surface px-3 py-2.5 text-sm outline-none transition placeholder:text-surface/40 focus:border-primary focus:ring-2 focus:ring-primary/20 sm:text-base"
                />
              </section>

              {/* Actions */}
              <div className="flex flex-col gap-3 border-t border-surface/20 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={clearForm}
                  className="order-2 w-full rounded-lg border border-surface/30 px-5 py-2.5 text-sm font-medium text-surface transition hover:bg-surface/10 active:scale-[0.98] sm:order-1 sm:w-auto cursor-pointer"
                >
                  Clear
                </button>

                <button
                  type="submit"
                  className="order-1 w-full rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/30 active:scale-[0.98] sm:order-2 sm:w-auto cursor-pointer"
                >
                  Add Supplier
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </AdminLayout>
  );
}
