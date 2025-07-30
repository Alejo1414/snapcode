import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm, Fields, Files } from "formidable";
import fs from "fs";
import sharp from "sharp";

// Disable body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
    responseLimit: "10mb",
  },
};

interface ProcessImageResponse {
  success: boolean;
  data?: {
    html: string;
    css: string;
    preview?: string;
  };
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProcessImageResponse>
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  try {
    // Parse the uploaded file with optimized settings
    const form = new IncomingForm({
      maxFileSize: 10 * 1024 * 1024, // 10MB
      keepExtensions: true,
    });

    const { files } = await new Promise<{ files: Files }>((resolve, reject) => {
      form.parse(req, (err: any, fields: Fields, files: Files) => {
        if (err) reject(err);
        else resolve({ files });
      });
    });

    const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;

    if (!imageFile) {
      return res
        .status(400)
        .json({ success: false, error: "No image file provided" });
    }

    // Validate file type and size
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!imageFile.mimetype || !allowedTypes.includes(imageFile.mimetype)) {
      return res.status(400).json({
        success: false,
        error: "Invalid file type. Please upload PNG, JPG, or WebP files only.",
      });
    }

    if (imageFile.size > maxSize) {
      return res.status(400).json({
        success: false,
        error: "File too large. Maximum size is 10MB.",
      });
    }

    // Read and optimize the image file
    if (!imageFile.filepath) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid file upload" });
    }

    // Optimize image for faster processing
    const optimizedImageBuffer = await optimizeImageForProcessing(
      imageFile.filepath
    );
    const base64Image = optimizedImageBuffer.toString("base64");

    // Process image with OpenAI Vision API
    const generatedCode = await processImageWithOpenAI(base64Image);

    // Clean up uploaded file
    if (imageFile.filepath) {
      fs.unlinkSync(imageFile.filepath);
    }

    return res.status(200).json({
      success: true,
      data: generatedCode,
    });
  } catch (error) {
    console.error("Error processing image:", error);

    // Provide more specific error messages
    let errorMessage = "Internal server error. Please try again.";
    if (error instanceof Error) {
      if (error.message.includes("OpenAI API key not configured")) {
        errorMessage =
          "OpenAI API key not configured. Please check your environment variables.";
      } else if (error.message.includes("OpenAI API error")) {
        errorMessage =
          "OpenAI API error. Please check your API key and try again.";
      } else if (error.message.includes("timeout")) {
        errorMessage =
          "Request timeout. Please try again with a smaller image.";
      }
    }

    return res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
}

// Optimize image for faster processing
async function optimizeImageForProcessing(filepath: string): Promise<Buffer> {
  try {
    // Read and optimize the image
    const optimized = await sharp(filepath)
      .resize({
        width: 1024,
        height: 1024,
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({
        quality: 85,
        progressive: true,
      })
      .toBuffer();

    return optimized;
  } catch (error) {
    // Fallback to original file if sharp fails
    return fs.readFileSync(filepath);
  }
}

// OpenAI Vision API integration - optimized for speed
async function processImageWithOpenAI(
  base64Image: string
): Promise<{ html: string; css: string }> {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  if (!OPENAI_API_KEY) {
    throw new Error("OpenAI API key not configured");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout for better quality

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: "gpt-4o", // Higher quality results
        messages: [
          {
            role: "system",
            content:
              "You are an expert frontend developer specializing in HTML and Tailwind CSS. Your job is to convert UI screenshots into clean, semantic, production-ready HTML using Tailwind utility classes only.\n\nFocus on these rules:\n1. Match layout exactly — use Flexbox, Grid, spacing utilities. Reflect visual grouping (side-by-side, stacked, card layout).\n2. Detect and match UI components — navbars, hero sections, cards, pricing tables, etc. Use appropriate semantic tags.\n3. Match colors using Tailwind's standard palette (e.g., bg-blue-500).\n4. Match typography with Tailwind classes — size, weight, line-height, alignment.\n5. Render buttons/inputs realistically — match radius, shadows, padding, states.\n6. Use image placeholders like https://via.placeholder.com/WIDTHxHEIGHT. Add alt text (e.g., \"GitHub icon\").\n7. Use Tailwind's responsive classes (sm:, md:, lg:) if layout adapts visually.\n8. Use semantic tags (header, nav, main, section, footer, h1, button, ul). Avoid unnecessary divs.\n9. Maintain hierarchy — heading sizes, section gaps, button emphasis.\n10. Do NOT wrap in <html>, <head>, or <body> unless shown.\n11. Output ONLY HTML. No markdown, comments, or explanations.\n\nGenerate clean, real-world, visually faithful HTML output.",
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Convert this UI screenshot to HTML with Tailwind CSS. Requirements:
- Use semantic HTML elements
- Tailwind CSS classes only
- Responsive design
- Use https://via.placeholder.com/WIDTHxHEIGHT for images
- Preserve **visual grouping and emphasis**, like layout sections (hero, nav, CTA), and prioritize **font sizes** and **text weight** as shown.
- Return ONLY HTML code - no explanations, markdowns or comments`,
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/png;base64,${base64Image}`,
                  detail: "high", // Use high detail for better quality
                },
              },
            ],
          },
        ],
        max_tokens: 3000, // Allow more detailed code generation
        temperature: 0, // Deterministic output
        stream: false, // No streaming for simpler handling
      }),
    });

    clearTimeout(timeoutId);

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI API Error:", data);
      throw new Error(
        `OpenAI API error: ${data.error?.message || "Unknown error"}`
      );
    }

    const generatedCode = data.choices[0]?.message?.content || "";

    // Clean up the generated code (remove markdown formatting if present)
    const cleanedHTML = generatedCode
      .replace(/```html\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    return {
      html: cleanedHTML,
      css: "/* All styling is handled by Tailwind CSS classes in the HTML above */",
    };
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error?.name === "AbortError") {
      throw new Error("Request timeout - please try again");
    }
    throw error;
  }
}
