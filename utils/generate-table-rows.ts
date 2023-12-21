export function generateTableRows(
  browsersMap: Record<string, Set<string>>,
): string {
  return Object.entries(browsersMap).reduce(
    (acc, [fromVersion, toVersions]) => {
      return (
        acc +
        "\n<tr>" +
        `<td>${fromVersion}</td>` +
        `<td>${Array.from(toVersions).join("<br/><br/>")}</td>` +
        `</tr>`
      );
    },
    "",
  );
}
