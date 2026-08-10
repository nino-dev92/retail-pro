type SearchPropsType = {
  search: string;
  setSearch: React.SetStateAction<any>;
};

export default function SearchBar({ search, setSearch }: SearchPropsType) {
  return (
    <input
      className="w-full p-3 bg-surface border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-body-md outline-none transition-all placeholder:text-on-surface-variant"
      placeholder="Search by SKU, Name, or Barcode..."
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
