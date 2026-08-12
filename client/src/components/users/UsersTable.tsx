import type { User } from "../../types/types";
import useAuth from "../../hooks/useAuth";

type UserProps = {
  users: User[];
};

export default function UsersTable({ users }: UserProps) {
  const { auth } = useAuth();

  return (
    <table className="w-full">
      <thead className="gap-10">
        <th className="border dark:border-surface dark:text-surface">No.</th>
        <th className="border dark:border-surface dark:text-surface">Name</th>
        <th className="border dark:border-surface dark:text-surface">Email</th>
        <th className="border dark:border-surface dark:text-surface">
          Verified
        </th>
        {auth.role === "manager" && <th></th>}
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user._id} className="text-center">
            <td className="border dark:border-surface dark:text-surface">
              {index + 1}
            </td>
            <td className="text-start border dark:border-surface dark:text-surface pl-2">
              {`${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}`}
            </td>
            <td className="border dark:border-surface dark:text-surface">
              {user.email}
            </td>

            <td className="border dark:border-surface dark:text-surface">
              {user.isVerified === true ? "True" : "False"}
            </td>
            {auth.role === "manager" && (
              <td>
                <button className=" p-1 rounded-sm cursor-pointer hover:bg-green-500 dark:text-surface active:scale-95 transition-all duration-200">
                  update
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
