import {jsonrepair} from 'jsonrepair';
import {writeFileSync} from "fs";

void crawlDatabase(
    'https://useragents.io/explore/devices/types/desktop/maker/yandex-llc-0b6',
    'data/desktop.txt'
);
void crawlDatabase(
    'https://useragents.io/explore/devices/types/mobile-phone/maker/yandex-llc-0b6',
    'data/mobile.txt'
);

export async function crawlDatabase(url: string, outputPath: string): Promise<void> {
    const uaStrings = [];
    const {items, pages} = await crawl(url, 1);

    uaStrings.push(...items.map((x: any) => x.ua));

    for (let i = 2; i <= pages; i++) {
        const {items} = await crawl(url, i);

        uaStrings.push(...items.map(x => x.ua));
    }

    writeFileSync(outputPath, uaStrings.join('\n'), {encoding: 'utf-8'});
}

async function crawl(url: string, page: number): Promise<{pages: number; items: Array<{ua: string}>}> {
    return fetch(`${url}?p=${page}`)
        .then(x => x.text())
        .then(x => x.match(/(?<=data: )\[\{.*\}\]/g)![0])
        .then(stringifiedJSON => {
            const [_, data] = JSON.parse(jsonrepair(stringifiedJSON));

            return data.data;
        })
}
