# Blog Backend API

This is an Express.js backend for a blog application that allows users to create, retrieve, and delete blog posts. Uploaded images are stored on **Cloudinary**.

## Features
- **GET** `/api/blog?slug=your-slug` → Fetch a single blog post.
- **POST** `/api/blog` →  Make a post request using formdata( title, description, category, author, image ) 
- **DELETE** `/api/blog?slug=your-slug` → Delete a blog post.

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/developerpalakbasak/dev_blog_backend.git
cd dev_blog_backend
