import Jimp from "jimp";

/*
  API Pixelate
  POST /api/topixel
  Body: FormData (file, pixelSize)
*/

export const config = {
  api: {
    bodyParser: false, // agar bisa handle file upload
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method allowed" });
  }

  try {
    const busboy = await import("busboy");
    const bb = busboy.default({ headers: req.headers });

    let fileBuffer = Buffer.alloc(0);
    let pixelSize = 32;

    await new Promise((resolve, reject) => {
      bb.on("file", (name, file) => {
        file.on("data", (data) => {
          fileBuffer = Buffer.concat([fileBuffer, data]);
        });
      });

      bb.on("field", (name, val) => {
        if (name === "pixelSize") {
          let size = parseInt(val) || 32;
          if (size < 8) size = 8;
          if (size > 1024) size = 1024;
          pixelSize = size;
        }
      });

      bb.on("close", resolve);
      bb.on("error", reject);
      req.pipe(bb);
    });

    if (!fileBuffer.length) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    // batas ukuran file (misal max 5MB)
    if (fileBuffer.length > 5 * 1024 * 1024) {
      return res.status(413).json({ error: "File too large (max 5MB)" });
    }

    let image;
    try {
      image = await Jimp.read(fileBuffer);
    } catch (err) {
      return res.status(400).json({ error: "Unsupported image format" });
    }

    const small = image
      .clone()
      .resize(pixelSize, pixelSize, Jimp.RESIZE_NEAREST_NEIGHBOR);

    const pixelated = small.resize(
      image.bitmap.width,
      image.bitmap.height,
      Jimp.RESIZE_NEAREST_NEIGHBOR
    );

    const buffer = await pixelated.getBufferAsync(Jimp.MIME_JPEG);

    res.setHeader("Content-Type", "image/jpeg");
    return res.send(buffer);
  } catch (e) {
    console.error("API Error:", e);
    return res.status(500).json({ error: e.message });
  }
        }
