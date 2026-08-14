import { useState, useEffect, useMemo } from "react";
import type { User } from "../types/types";
import AdminLayout from "../layouts/AdminLayout";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import UsersTable from "../components/users/UsersTable";
import SearchBar from "../components/SearchBar";
import Spinner from "../utils/Spinner";

export default function UsersPage() {
  const { auth, theme } = useAuth();
  const api = useAxiosPrivate();

  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [action, setAction] = useState<"verify" | "delete" | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const getUsers = async () => {
    setLoading(true);

    try {
      const response = await api.get(
        `${auth.role === "admin" ? "/users/workers/cashier" : "/users"}`,
      );
      const data = response?.data?.data;

      setUsers(data ?? []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const query = search.trim().toLowerCase();

      const firstName = user.firstName.toLowerCase();
      const lastName = user.lastName.toLowerCase();

      return firstName.includes(query) || lastName.includes(query);
    });
  }, [users, search]);

  const verifyUser = async () => {
    const update = {
      isVerified: true,
    };

    try {
      const response = await api.patch(`/users/${selectedUser?._id}`, update);
      console.log(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async () => {
    try {
      const response = await api.delete(`/users/${selectedUser?._id}`);
      console.log(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout theme={theme}>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex min-h-[calc(100vh-80px)] w-full flex-col items-center gap-4 bg-surface p-3 dark:bg-on-surface sm:gap-5 sm:p-5 lg:p-6">
          {/* Page Title */}
          <h1 className="text-xl font-semibold text-on-surface dark:text-surface sm:text-2xl">
            {auth.role === "admin" ? "Cashiers" : "All Workers"}
          </h1>

          {/* Search Bar */}
          <div className="flex w-full max-w-2xl flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <p className="text-sm text-on-surface dark:text-surface sm:text-base">
              Search:
            </p>

            <div className="w-full">
              <SearchBar
                search={search}
                setSearch={setSearch}
                placeHolder={`${auth.role === "admin" ? "Search Cashier Name..." : "Search Worker Name..."}`}
              />
            </div>
          </div>

          {/* Users Table */}
          <section className="w-full overflow-hidden rounded-md border border-outline-variant p-2 dark:border-surface sm:p-4">
            {filteredUsers.length < 1 ? (
              <p className="py-8 text-center text-sm text-on-surface-variant dark:text-surface sm:text-base">
                {auth.role === "admin"
                  ? "No Cashier available"
                  : "No Worker available"}
              </p>
            ) : (
              <div className="w-full overflow-x-auto">
                <UsersTable
                  users={filteredUsers}
                  setSelectedUser={setSelectedUser}
                />
              </div>
            )}
          </section>

          {/** User Modal */}
          {selectedUser && (
            <div
              className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4"
              onClick={() => setSelectedUser(null)}
            >
              <section
                className="w-full max-w-2xl rounded-lg bg-white p-4 shadow-xl sm:p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="mb-4 text-xl font-bold sm:text-2xl">
                  {selectedUser.firstName.toUpperCase()}{" "}
                  {selectedUser.lastName.toUpperCase()}
                </h2>

                <div className="space-y-2 text-sm sm:text-base">
                  <p>
                    <b>Email:</b> {selectedUser.email}
                  </p>

                  <p>
                    <b>Role:</b> {selectedUser.role.toUpperCase()}
                  </p>

                  <p>
                    <b>Date Joined:</b>{" "}
                    {new Date(selectedUser.createdAt).toDateString()}
                  </p>

                  <p>
                    <b>Verified:</b> {selectedUser.isVerified ? "Yes" : "No"}
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                  {!selectedUser.isVerified && (
                    <button
                      onClick={() => setAction("verify")}
                      className="rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600 cursor-pointer active:scale-95"
                    >
                      Verify
                    </button>
                  )}

                  <button
                    onClick={() => setAction("delete")}
                    className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 cursor-pointer active:scale-95"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => setSelectedUser(null)}
                    className="rounded-lg border px-4 py-2 text-sm font-semibold cursor-pointer active:scale-95"
                  >
                    Close
                  </button>
                </div>
              </section>
            </div>
          )}

          {/**Action Modal */}
          {action && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
              onClick={() => setAction(null)}
            >
              <section
                className="w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-bold">Confirm?</h2>

                <p className="mt-2 text-sm text-gray-600">
                  Are you sure you want to{" "}
                  {action === "verify" ? "verify" : "delete"} this user?
                </p>

                <div className="mt-6 flex justify-center gap-3">
                  <button
                    onClick={() => setAction(null)}
                    className="rounded-lg border px-5 py-2 text-sm font-semibold cursor-pointer active:scale-95"
                  >
                    No
                  </button>

                  <button
                    onClick={() => {
                      action === "verify" ? verifyUser() : deleteUser();
                      setAction(null);
                      setShowSuccess(true);
                    }}
                    className={`rounded-lg px-5 py-2 text-sm font-semibold cursor-pointer active:scale-95 text-white ${
                      action === "delete"
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    Yes
                  </button>
                </div>
              </section>
            </div>
          )}

          {/**Success Modal */}
          {showSuccess && (
            <div
              className="fixed inset-0 z-60 flex items-center justify-center bg-black/40 p-4"
              onClick={() => {
                setShowSuccess(false);
                getUsers();
              }}
            >
              <section
                className="w-full max-w-sm rounded-lg bg-white p-6 text-center shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">
                  ✓
                </div>

                <h2 className="text-xl font-bold">Success</h2>

                <p className="mt-2 text-sm text-gray-600">
                  User {action === "verify" ? "verified" : "deleted"}
                  successfully.
                </p>

                <button
                  onClick={() => {
                    setShowSuccess(false);
                    setSelectedUser(null);
                    getUsers();
                  }}
                  className="mt-5 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white cursor-pointer active:scale-95"
                >
                  OK
                </button>
              </section>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
