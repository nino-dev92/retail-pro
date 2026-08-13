import { useState, useEffect, useMemo } from "react";
import type { User } from "../../types/types";
import AdminLayout from "../../layouts/AdminLayout";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import UsersTable from "../../components/users/UsersTable";
import SearchBar from "../../components/SearchBar";
import Spinner from "../../utils/Spinner";

export default function AdminUsers() {
  const { theme } = useAuth();
  const api = useAxiosPrivate();

  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);

      try {
        const response = await api.get("/users/workers/cashier");
        const data = response?.data?.data;

        setUsers(data ?? []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

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

  return (
    <AdminLayout theme={theme}>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex min-h-[calc(100vh-80px)] w-full flex-col items-center gap-4 bg-surface p-3 dark:bg-on-surface sm:gap-5 sm:p-5 lg:p-6">
          {/* Page Title */}
          <h1 className="text-xl font-semibold text-on-surface dark:text-surface sm:text-2xl">
            Cashiers
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
                placeHolder="Search Cashier Name...."
              />
            </div>
          </div>

          {/* Users Table */}
          <section className="w-full overflow-hidden rounded-md border border-outline-variant p-2 dark:border-surface sm:p-4">
            {filteredUsers.length < 1 ? (
              <p className="py-8 text-center text-sm text-on-surface-variant dark:text-surface sm:text-base">
                No Cashiers available
              </p>
            ) : (
              <div className="w-full overflow-x-auto">
                <UsersTable users={filteredUsers} />
              </div>
            )}
          </section>
        </div>
      )}
    </AdminLayout>
  );
}
