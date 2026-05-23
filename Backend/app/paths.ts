import path from "path";
import { fileURLToPath } from "url";

const appRootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

export const publicDir = path.join(appRootDir, "..", "public");
