import { useState, useEffect, useMemo } from "react";
import type { User } from "../../../types/types";
import AdminLayout from "../../../layouts/AdminLayout";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import UsersTable from "../../../components/users/UsersTable";
import SearchBar from "../../../components/SearchBar";
import Spinner from "../../../utils/Spinner";

export default function AdminUsers() {
  const { theme, isLoading, setIsLoading } = useAuth();
  const api = useAxiosPrivate();
  const [users, setUsers] = useState<User[] | []>([]);
  const [search, setSearch] = useState<string>("");
  // const [filteredUsers, setFilteredUsers] = useState<User[] | null>([])

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/users/workers/cashier");
        const data = response?.data?.data;
        setUsers(data);
      } catch (error) {
        console.log(error);
      } finally {
        if (filteredUsers) setIsLoading(false);
      }
    };

    getUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const query = search.trim().toLowerCase();

      const firstName = user.firstName.toLowerCase();
      const lastName = user.lastName.toLowerCase();

      const matchesName = firstName.includes(query) || lastName.includes(query);

      return matchesName;
    });
  }, [users, search]);

  return (
    <AdminLayout theme={theme}>
      {isLoading && <Spinner />}

      {!isLoading && (
        <div className="flex flex-col min-w-fit min-h-158 gap-5 items-center p-5 dark:bg-on-surface">
          <h1 className="text-2xl dark:text-surface ">Cashiers</h1>

          {/**Search bar */}
          <div className="min-w-2xl flex gap-3 items-center">
            <p className="dark:text-surface">Search: </p>
            <SearchBar
              search={search}
              setSearch={setSearch}
              placeHolder="Search Cashier Name...."
            />
          </div>

          {/**Users Table */}
          <section className="border border-primary dark:border-surface min-w-full min-h-full p-5">
            {users.length < 1 ? (
              <p>No Cashiers available</p>
            ) : (
              <UsersTable users={filteredUsers} />
            )}
          </section>
        </div>
      )}
    </AdminLayout>
  );
}
