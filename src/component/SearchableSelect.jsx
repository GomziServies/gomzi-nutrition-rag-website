import Select from "react-select";

export default function SearchableSelect({
  label,
  value,
  options,
  onChange,
  placeholder = "",
  isDisabled = false,
}) {
  return (
    <div className="relative">
      <label className="absolute left-3.5 top-1.5 z-10 text-[10px] font-medium text-gray-500 pointer-events-none">
        {label}
      </label>

      <Select
        value={value}
        options={options}
        onChange={onChange}
        isDisabled={isDisabled}
        isSearchable
        placeholder={placeholder}
        noOptionsMessage={() => "No results found"}
        styles={{
          control: (base, state) => ({
            ...base,
            minHeight: 54,
            borderRadius: 6,
            paddingTop: 10,
            paddingBottom: 2,
            borderColor: state.isFocused ? "#4B5563" : "#D1D5DB",
            boxShadow: state.isFocused ? "0 0 0 1px rgb(209 213 219)" : "none",
            "&:hover": {
              borderColor: "#4B5563",
            },
          }),

          valueContainer: (base) => ({
            ...base,
            padding: "0 14px",
          }),

          input: (base) => ({
            ...base,
            margin: 0,
            padding: 0,
            fontSize: 14,
          }),

          singleValue: (base) => ({
            ...base,
            fontSize: 14,
            color: "#1F2937",
          }),

          placeholder: (base) => ({
            ...base,
            fontSize: 14,
            color: "#9CA3AF",
          }),

          menu: (base) => ({
            ...base,
            zIndex: 9999,
          }),

          option: (base, state) => ({
            ...base,
            fontSize: 14,
            backgroundColor: state.isFocused
              ? "#F3F4F6"
              : state.isSelected
                ? "#111827"
                : "#fff",
            color: state.isSelected ? "#fff" : "#111827",
            cursor: "pointer",
          }),

          indicatorSeparator: () => ({
            display: "none",
          }),

          dropdownIndicator: (base) => ({
            ...base,
            paddingRight: 12,
          }),
        }}
      />
    </div>
  );
}
