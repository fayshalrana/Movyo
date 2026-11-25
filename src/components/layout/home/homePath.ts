export const HOME_PATH = "/";

/** Set by middleware on `/` so server layouts can skip heavy client providers. */
export const HOME_ROUTE_HEADER = "x-movyo-home";

export function isHomeRoute(pathname: string): boolean {
  return pathname === HOME_PATH;
}

export function homeBasePath(_pathname: string): string {
  return HOME_PATH;
}
