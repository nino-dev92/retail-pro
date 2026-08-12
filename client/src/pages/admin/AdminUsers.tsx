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
  const [loading, setLoading] = useState(true); // local to this component

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
        <div className="flex flex-col w-full min-h-158 gap-5 items-center p-1 sm:p-5 dark:bg-on-surface">
          <h1 className="text-2xl dark:text-surface">Cashiers</h1>

          {/**Search bar */}
          <div className="w-full sm:min-w-2xl flex flex-row gap-3 items-center">
            <p className="dark:text-surface">Search: </p>
            <SearchBar
              search={search}
              setSearch={setSearch}
              placeHolder="Search Cashier Name...."
            />
          </div>

          {/**Users Table */}
          <section className="sm:border border-primary dark:border-surface w-full min-h-full p-1 sm:p-5 overflow-x-auto">
            {filteredUsers.length < 1 ? (
              <p className="text-center">No Cashiers available</p>
            ) : (
              <UsersTable users={filteredUsers} />
            )}
          </section>
        </div>
      )}
    </AdminLayout>
  );
}
