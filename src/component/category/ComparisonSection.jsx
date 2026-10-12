import React from "react";
import { Bolt, CircleAlert, CheckCircle2, XCircle } from "lucide-react";

const ComparisonSection = ({ data }) => {
  if (!data?.enabled) return null;

  const getIcon = (color) => {
    switch (color) {
      case "green":
        return <CheckCircle2 className="w-5 h-5 text-green-700" />;

      case "orange":
        return <XCircle className="w-5 h-5 text-orange-700" />;

      default:
        return <Bolt className="w-5 h-5" />;
    }
  };

  return (
    <div className="mb-14">
      {/* ===========================
            Decision Cards
        =========================== */}

      <div className="overflow-hidden rounded-3xl border border-[#E8D9C8] bg-white">
        <div className="grid md:grid-cols-2">
          {/* Left */}

          <div className="bg-[#F3F9F2] p-5 sm:p-8 border-b md:border-b-0 md:border-r border-[#E8D9C8]">
            <div className="flex items-start gap-2 mb-3 md:mb-5 ">
              {getIcon(data.leftCard.color)}

              <h3 className="font-bold text-base sm:text-lg leading-6">
                {data.leftCard.title}
              </h3>
            </div>

            <ul className="">
              {data.leftCard.points.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm sm:text-base text-gray-700 leading-6"
                >
                  <span className="mt-2.5 w-2 h-[2px] bg-gray-400 rounded-full flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div className="bg-[#FFF6EE] p-5 sm:p-8">
            <div className="flex items-start gap-2 mb-3 md:mb-5">
              {getIcon(data.rightCard.color)}

              <h3 className="font-bold text-base sm:text-lg leading-6">
                {data.rightCard.title}
              </h3>
            </div>

            <ul className="">
              {data.rightCard.points.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm sm:text-base text-gray-700 leading-6"
                >
                  <span className="mt-2.5 w-2 h-[2px] bg-gray-400 rounded-full flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ===========================
            Alert
        =========================== */}

      <div className="mt-5 rounded-2xl border border-[#E8D9C8] bg-[#FFF9F2] px-6 py-5 flex gap-3">
        <CircleAlert className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />

        <p className="text-sm leading-7">
          <span className="font-bold">{data.alert.title}</span>{" "}
          {data.alert.description}
        </p>
      </div>

      {/* ===========================
            Comparison Table
        =========================== */}

      <div className="mt-8 overflow-hidden rounded-3xl border border-[#9d5a48] bg-white">
        <div className="px-5 sm:px-6 py-5 border-b border-[#E8D9C8]">
          <h3 className="font-bold text-lg">{data.table.title}</h3>
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-[#9d5a48] text-white uppercase tracking-widest text-xs">
                {data.table.headers.map((header, index) => (
                  <th
                    key={index}
                    className="px-6 py-4 text-left whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.table.rows.map((row, index) => (
                <tr key={index} className="border-t border-[#E8D9C8]">
                  {row.map((cell, i) => (
                    <td
                      key={i}
                      className={`px-6 py-5 align-top ${
                        i === 0 ? "font-medium text-gray-900" : "text-gray-700"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===========================
        Mobile Cards
      =========================== */}

        <div className="md:hidden p-4 space-y-4 bg-[#FAF8F5]">
          {data.table.rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="rounded-2xl border border-[#E8D9C8] bg-white overflow-hidden"
            >
              {/* Feature / first column */}
              <div className="bg-[#9d5a48] text-white px-4 py-3">
                <p className="text-xs uppercase tracking-widest opacity-80">
                  {data.table.headers[0]}
                </p>

                <p className="mt-1 font-bold text-base">{row[0]}</p>
              </div>

              {/* Remaining columns */}
              <div className="divide-y divide-[#E8D9C8]">
                {row.slice(1).map((cell, cellIndex) => (
                  <div key={cellIndex} className="px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#9d5a48]">
                      {data.table.headers[cellIndex + 1]}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-gray-700">
                      {cell}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComparisonSection;
