import type { User } from "../../types/types";
import useAuth from "../../hooks/useAuth";

type UserProps = {
  users: User[];
  setSelectedUser?: React.SetStateAction<any>;
};

export default function UsersTable({ users, setSelectedUser }: UserProps) {
  const { auth } = useAuth();

  return (
    <table className="w-full">
      <thead className="gap-10">
        <tr className="text-center">
          <td className="border dark:border-surface dark:text-surface">No.</td>
          <td className="border dark:border-surface dark:text-surface">Name</td>
          <td className="border dark:border-surface dark:text-surface">
            Email
          </td>
          {auth.role === "manager" && (
            <td className="border dark:border-surface dark:text-surface">
              Role
            </td>
          )}
          <td className="border dark:border-surface dark:text-surface">
            Verified
          </td>
          {auth.role === "manager" && <td></td>}
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr
            key={user._id}
            className="group text-center cursor-pointer hover:bg-slate-400"
          >
            <td className="border dark:border-surface dark:text-surface">
              {index + 1}
            </td>
            <td className="text-start border dark:border-surface dark:text-surface pl-2">
              {`${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}`}
            </td>
            <td className="border dark:border-surface dark:text-surface">
              {user.email}
            </td>
            {auth.role === "manager" && (
              <td className="border dark:border-surface dark:text-surface">
                {user.role}
              </td>
            )}

            <td className="border dark:border-surface dark:text-surface">
              {user.isVerified === true ? "True" : "False"}
            </td>
            {auth.role === "manager" && (
              <td className="bg-surface dark:bg-on-surface">
                <button
                  className="invisible group-hover:visible p-1 w-[70%] rounded-sm cursor-pointer hover:bg-green-500 dark:text-surface active:scale-95"
                  onClick={() => setSelectedUser?.(user)}
                >
                  Edit
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
