export function getChromeToYandexMap(
  userAgents: string[],
): Record<string, Set<string>> {
  const yandexBrowsers = userAgents.filter((ua) => ua.includes("YaBrowser"));

  const chromeToYandexMap: Record<string, Set<string>> = {};

  for (const ua of yandexBrowsers) {
    const yandexVersion = ua.match(/YaBrowser\/(\d+\.\d+)/)?.[1]!;
    const chromeMajor = ua.match(/Chrome\/(\d+)\./)?.[1]!;

    if (!chromeMajor) {
      continue;
    }

    if (chromeToYandexMap[chromeMajor]) {
      chromeToYandexMap[chromeMajor].add(yandexVersion);
    } else {
      chromeToYandexMap[chromeMajor] = new Set([yandexVersion]);
    }
  }

  return chromeToYandexMap;
}
