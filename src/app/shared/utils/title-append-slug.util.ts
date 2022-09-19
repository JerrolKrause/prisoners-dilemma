import { environment } from '$env';

/**
 * Append the site's slug to the title
 * @param str
 * @returns
 */
export const titleAppendSlug = (str: string) => str + ` | ${environment.properties.appName}`;
