import path from "path";

// Resolve once so uploads are consistent in dev (ts-node) and prod (dist).
export const UPLOADS_DIR = path.resolve(__dirname, "../../uploads");