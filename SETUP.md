# Snapcode Setup Guide

## Environment Configuration

Create a `.env.local` file in your root directory with the following content:

```env
# OpenAI API Configuration
OPENAI_API_KEY=sk-your_openai_api_key_here

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
```

## Required Steps:

1. **Create .env.local file**: Copy the content above into a new file named `.env.local` in your project root
2. **Add your OpenAI API key**: Replace `sk-your_openai_api_key_here` with your actual OpenAI API key
3. **Generate NextAuth secret** (optional for now): You can generate a random string for `NEXTAUTH_SECRET`

## OpenAI API Key Setup:

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Click "Create new secret key"
3. Copy the key and paste it in your `.env.local` file
4. Make sure you have credits in your OpenAI account

## Testing:

1. Start your development server: `npm run dev`
2. Upload an image through the drag-and-drop interface
3. Click "Generate Code" to test the OpenAI integration

## Features Now Available:

✅ **Drag & Drop Upload**: Upload images via drag-and-drop or file picker
✅ **File Validation**: Automatic validation of file type and size
✅ **OpenAI Integration**: Real AI-powered code generation from screenshots  
✅ **Code Preview**: View generated HTML with live preview
✅ **Copy & Download**: Copy code to clipboard or download as HTML file
✅ **Error Handling**: User-friendly error messages for failed uploads/processing

## File Structure Created:

- `src/components/ImageUpload.tsx` - Drag & drop upload component
- `src/components/CodeResults.tsx` - Results display modal
- `src/pages/api/process-image.ts` - API endpoint for image processing
- Updated `src/components/Hero.tsx` - Main integration

The implementation is now complete and ready to use with your OpenAI API key!
