import { Readable } from "stream";
import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

const uploadBufferToCloudinary = (buffer, options) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      },
    );

    Readable.from(buffer).pipe(uploadStream);
  });
};

const createProduct = async (req, res) => {
  let uploadedPublicIds = [];

  try {
    const {
      vendorId,
      catId,
      productName,
      urlSlug,
      descriptionShort,
      descriptionLong,
      price,
      stockQuantity,
      status,
    } = req.body;

    if (!vendorId || !catId || !productName || !urlSlug || !price) {
      return res.status(400).json({
        message:
          "vendorId, catId, productName, urlSlug, and price are required",
      });
    }

    const files = req.files || [];
    if (files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one product image is required" });
    }

    const uploadResults = await Promise.all(
      files.map((file) =>
        uploadBufferToCloudinary(file.buffer, {
          folder: "products",
          resource_type: "image",
        }),
      ),
    );

    uploadedPublicIds = uploadResults.map((result) => result.public_id);

    const imageUrls = uploadResults.map((result) => result.secure_url);

    const product = await Product.create({
      vendorId,
      catId,
      productName,
      urlSlug,
      descriptionShort,
      descriptionLong,
      price,
      stockQuantity,
      status,
      imageUrls,
    });

    return res.status(201).json({
      message: "Product created successfully",
      data: product,
    });
  } catch (err) {
    if (uploadedPublicIds.length > 0) {
      try {
        await cloudinary.api.delete_resources(uploadedPublicIds, {
          resource_type: "image",
        });
      } catch (cleanupError) {
        console.error("Cloudinary cleanup failed:", cleanupError.message);
      }
    }

    return res.status(500).json({ message: err.message });
  }
};

export default { createProduct };
