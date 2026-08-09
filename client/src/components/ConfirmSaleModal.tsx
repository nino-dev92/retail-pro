import useAuth from "../hooks/useAuth";

type ModalProps = {
  isOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  completeSale: () => void;
};

export default function ConfirmSaleModal({
  isOpen,
  completeSale,
  setIsModalOpen,
}: ModalProps) {
  const { theme } = useAuth();

  if (!isOpen) return null;

  return (
    <div
      className={` ${theme} fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-10`}
    >
      <div className="bg-surface dark:bg-slate-900 p-7 w-full max-w-75 aspect-square flex flex-col place-content-center items-center gap-5 rounded-lg">
        <div>
          <p className="dark:text-surface">Confirm Transaction</p>
        </div>

        <div className="flex w-full gap-3">
          <button
            className="dark:bg-primary flex-1 cursor-pointer border p-2 active:scale-95 transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              completeSale();
              setIsModalOpen(false);
            }}
          >
            ✅
          </button>

          <button
            className="dark:bg-primary flex-1 cursor-pointer border p-2 active:scale-95 transition-all duration-200"
            onClick={() => setIsModalOpen(false)}
          >
            ❌
          </button>
        </div>
      </div>
    </div>
  );
}
