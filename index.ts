import {readFileSync, writeFileSync} from "fs";

import {generateTableRows, getChromeToYandexMap} from "./utils";

const desktopUserAgents = [
    "data/desktop.txt", // https://useragents.io/explore/devices/types/desktop/maker/yandex-llc-0b6
    "data/seolik-desktop.txt" // https://seolik.ru/user-agents-list
]
    .map(x => readFileSync(x, "utf-8").split("\n"))
    .flat();

const mobileUserAgents = [
    'data/mobile.txt', // https://useragents.io/explore/devices/types/mobile-phone/maker/yandex-llc-0b6
    "data/seolik-mobile.txt" // https://seolik.ru/user-agents-list
]
    .map(x => readFileSync(x, "utf-8").split("\n"))
    .flat();

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

const reportContent = `
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
`.trim();

writeFileSync("index.html", reportContent);
writeFileSync("index.md", reportContent);
