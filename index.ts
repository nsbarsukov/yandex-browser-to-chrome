import { readFileSync, writeFileSync } from "fs";
import { generateTableRows, getChromeToYandexMap } from "./utils";

const desktopUserAgents = readFileSync(
  "./desktop-ua.txt", // Path to file with one UA string per line
  "utf-8",
).split("\n");
const mobileUserAgents = readFileSync(
  "./mobile-ua.txt", // Path to file with one UA string per line
  "utf-8",
).split("\n");

const desktopChromeToYandexMap = getChromeToYandexMap(desktopUserAgents);
const mobileChromeToYandexMap = getChromeToYandexMap(mobileUserAgents);

const TABLE_STYLES = `
<style>
  table {
    border-collapse: collapse;
  }
  td {
    border: 1px solid lightgray;
    padding: 10px;
  }
 </style>
`;

writeFileSync(
  "index.html",
  `
${TABLE_STYLES}

<h1>Desktop</h1>
<table>
    <thead>
        <tr><td>Chrome</td><td>Yandex</td></tr>
    </thead>
    ${generateTableRows(desktopChromeToYandexMap)}
</table>

<h1>Mobile</h1>
<table>
    <thead>
        <tr><td>Chrome</td><td>Yandex</td></tr>
    </thead>
    ${generateTableRows(mobileChromeToYandexMap)}
</table>
`,
);
