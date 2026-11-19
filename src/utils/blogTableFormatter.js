/**
 * Formats rich blog HTML tables (such as Google Docs HTML exports) into
 * beautifully styled responsive comparison tables matching the Gomzi brand UI.
 */

export const preserveTableAttrs = (rawAttrs = "") => {
  const kept = [];
  const colspanMatch = /colspan=["']?(\d+)["']?/i.exec(rawAttrs);
  if (colspanMatch) kept.push(`colspan="${colspanMatch[1]}"`);
  const rowspanMatch = /rowspan=["']?(\d+)["']?/i.exec(rawAttrs);
  if (rowspanMatch) kept.push(`rowspan="${rowspanMatch[1]}"`);
  return kept.length > 0 ? ` ${kept.join(" ")}` : "";
};

export const formatBlogTables = (rawHtml) => {
  if (!rawHtml || typeof rawHtml !== "string") return "";

  return rawHtml.replace(
    /(?:<div class="[^"]*table-responsive-wrapper[^"]*">)?\s*(<table[\s\S]*?<\/table>)\s*(?:<\/div>)?/gi,
    (fullMatch, tableString) => {
      // Strip colgroup to prevent rigid small-width constraints
      let cleanTable = tableString.replace(/<colgroup[\s\S]*?<\/colgroup>/gi, "");

      // Check if table has rows
      const rows = cleanTable.match(/<tr[\s\S]*?<\/tr>/gi);
      if (!rows || rows.length === 0) return fullMatch;

      // Extract existing thead if present, or promote first row as header
      const hasThead = /<thead[\s\S]*?<\/thead>/i.test(cleanTable);
      let theadHtml = "";
      let bodyRows = [];

      if (hasThead) {
        const theadMatch = /<thead[^>]*>([\s\S]*?)<\/thead>/i.exec(cleanTable);
        const theadContent = theadMatch ? theadMatch[1] : "";
        const theadRows = theadContent.match(/<tr[\s\S]*?<\/tr>/gi) || [rows[0]];
        const cleanHeaderRows = theadRows
          .map((hRow) => {
            const cells = hRow.replace(/<t[dh]([^>]*)>([\s\S]*?)<\/t[dh]>/gi, (_, attrs, content) => {
              const cleanContent = content
                .replace(/style="[^"]*"/gi, "")
                .replace(/<span\s*>([\s\S]*?)<\/span>/gi, "$1")
                .replace(/<p[^>]*>/gi, '<p class="m-0 leading-snug">')
                .trim();
              return `<th class="text-left px-6 py-4.5 text-[15px] sm:text-base font-semibold text-white tracking-wide border-none select-none" style="background-color: #8A3822; color: #ffffff;"${preserveTableAttrs(attrs)}>${cleanContent}</th>`;
            });
            return `<tr class="bg-[#8A3822] text-white" style="background-color: #8A3822;">${cells.replace(/<\/?tr[^>]*>/gi, "")}</tr>`;
          })
          .join("");
        theadHtml = `<thead>${cleanHeaderRows}</thead>`;

        const tbodyMatch = /<tbody[^>]*>([\s\S]*?)<\/tbody>/i.exec(cleanTable);
        bodyRows = tbodyMatch ? tbodyMatch[1].match(/<tr[\s\S]*?<\/tr>/gi) || [] : rows.slice(theadRows.length);
      } else {
        const headerRow = rows[0];
        bodyRows = rows.slice(1);

        const headerCells = headerRow.replace(/<t[dh]([^>]*)>([\s\S]*?)<\/t[dh]>/gi, (_, attrs, content) => {
          const cleanContent = content
            .replace(/style="[^"]*"/gi, "")
            .replace(/<span\s*>([\s\S]*?)<\/span>/gi, "$1")
            .replace(/<p[^>]*>/gi, '<p class="m-0 leading-snug">')
            .trim();
          return `<th class="text-left px-6 py-4.5 text-[15px] sm:text-base font-semibold text-white tracking-wide border-none select-none" style="background-color: #8A3822; color: #ffffff;"${preserveTableAttrs(attrs)}>${cleanContent}</th>`;
        });
        theadHtml = `<thead><tr class="bg-[#8A3822] text-white" style="background-color: #8A3822;">${headerCells.replace(/<\/?tr[^>]*>/gi, "")}</tr></thead>`;
      }

      const cleanBodyRows = bodyRows
        .map((bRow) => {
          let colIndex = 0;
          const cleanCells = bRow.replace(/<t[dh]([^>]*)>([\s\S]*?)<\/t[dh]>/gi, (_, attrs, content) => {
            const isFirstCol = colIndex === 0;
            colIndex++;
            const cleanContent = content
              .replace(/style="[^"]*"/gi, "")
              .replace(/<span\s*>([\s\S]*?)<\/span>/gi, "$1")
              .replace(/<p[^>]*>/gi, '<p class="m-0 leading-relaxed">')
              .trim();
            const cellClass = isFirstCol
              ? "px-6 py-4.5 text-[15px] sm:text-base leading-relaxed align-top border-none font-bold text-[#111827]"
              : "px-6 py-4.5 text-[15px] sm:text-base leading-relaxed align-top border-none text-[#4b5563]";
            return `<td class="${cellClass}"${preserveTableAttrs(attrs)}>${cleanContent}</td>`;
          });
          return `<tr class="border-b border-[#ebdcd2] last:border-b-0 hover:bg-[#faf7f3] transition-colors">${cleanCells.replace(/<\/?tr[^>]*>/gi, "")}</tr>`;
        })
        .join("");

      const tbodyHtml = `<tbody>${cleanBodyRows}</tbody>`;

      return `<div class="table-responsive-wrapper my-8 overflow-x-auto rounded-2xl border border-[#ebdcd2] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.025)]"><table class="w-full min-w-[650px] border-collapse font-modelica">${theadHtml}${tbodyHtml}</table></div>`;
    }
  );
};
