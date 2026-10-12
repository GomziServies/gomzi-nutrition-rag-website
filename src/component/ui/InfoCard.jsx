function InfoCard({
  title,
  value,
  editable = false,
  onChange,
  type = "text",
  placeholder = "",
}) {
  return (
    <div>
      <p className="text-gray-400 text-sm mb-2">{title}</p>

      <div className="border rounded-xl p-3 text-lg">
        {editable ? (
          <input
            type={type}
            value={value || ""}
            placeholder={placeholder}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full outline-none bg-transparent text-lg"
          />
        ) : (
          value || "-"
        )}
      </div>
    </div>
  );
}

export default InfoCard;
