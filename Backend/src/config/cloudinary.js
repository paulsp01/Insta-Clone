import { v2 as cloudinary } from "cloudinary"
import path from "node:path"
import { fileURLToPath } from "node:url"
import dotenv from "dotenv"

const envPath = fileURLToPath(new URL("../../.env", import.meta.url))
dotenv.config({ path: envPath })

const {
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
} = process.env

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME?.trim(),
    api_key: CLOUDINARY_API_KEY?.trim(),
    api_secret: CLOUDINARY_API_SECRET?.trim()
})

export const uploadImage = (filePath) => {
    if (!CLOUDINARY_CLOUD_NAME?.trim() || !CLOUDINARY_API_KEY?.trim() || !CLOUDINARY_API_SECRET?.trim()) {
        throw new Error("Cloudinary credentials are missing. Check CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env.")
    }

    const absolutePath = path.resolve(filePath)

    return cloudinary.uploader.upload(absolutePath, {
        folder: "swar/posts",
        resource_type: "image"
    })
}

export default cloudinary