import fs from "fs/promises";
import path from "path";

class StorageService {
    /**
     * Returns the relative path that will be stored in the database.
     * Multer has already saved the file to disk.
     */
    uploadImage(file: Express.Multer.File): string {
        return `/uploads/foods/${file.filename}`;
    }

    /**
     * Deletes an image from disk.
     * Safe to call even if the file doesn't exist.
     */
    async deleteImage(filePath: string | null): Promise<void> {
        if (!filePath) return;

        try {
            // Remove the leading "/" so path.join works correctly
            const relativePath = filePath.replace(/^\/+/, "");

            const fullPath = path.join(process.cwd(), relativePath);

            await fs.unlink(fullPath);
        } catch (error: any) {
            // Ignore if file doesn't exist
            if (error.code !== "ENOENT") {
                throw error;
            }
        }
    }

    /**
     * Replaces an existing image with a newly uploaded one.
     * Multer has already saved the new file before this is called.
     */
    async replaceImage(
        oldFilePath: string | null,
        newFile: Express.Multer.File
    ): Promise<string> {
        await this.deleteImage(oldFilePath);

        return this.uploadImage(newFile);
    }
}

export default new StorageService();