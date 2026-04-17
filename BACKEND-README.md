# ABC School Website - Backend Developer Guide

## Project Overview

**Frontend:** Next.js 16 + React 19 + Tailwind CSS v4
**Current State:** Static website with hardcoded data
**Goal:** Convert to dynamic CMS-driven website

This guide provides three backend architecture options to power the school website's dynamic content.

---

## Option 1: Node.js + SQL (Recommended for Relational Data)

**Best for:** Structured data with relationships (Notices, Admissions, Faculty, etc.)

### Tech Stack
- **Runtime:** Node.js 18+
- **Framework:** Express.js or NestJS
- **Database:** PostgreSQL / MySQL
- **ORM:** Prisma / Sequelize
- **Authentication:** JWT + bcrypt

### Database Schema

```sql
-- Users Table (Admin, Teachers, Staff)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'admin', 'editor', 'teacher') DEFAULT 'editor',
    name VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notices Table
CREATE TABLE notices (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    tag VARCHAR(100), -- Admissions, Events, Community
    is_pinned BOOLEAN DEFAULT false,
    publish_date DATE NOT NULL,
    expiry_date DATE,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    author_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Faculty & Staff
CREATE TABLE faculty (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    designation VARCHAR(255),
    department VARCHAR(100),
    qualification TEXT,
    experience VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(20),
    photo_url VARCHAR(500),
    bio TEXT,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Gallery Images
CREATE TABLE gallery (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    caption TEXT,
    image_url VARCHAR(500) NOT NULL,
    category VARCHAR(100),
    is_featured BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admission Enquiries
CREATE TABLE admission_enquiries (
    id SERIAL PRIMARY KEY,
    student_name VARCHAR(255) NOT NULL,
    parent_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    grade_applying VARCHAR(50),
    message TEXT,
    status ENUM('new', 'contacted', 'visited', 'admitted', 'rejected') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Form Submissions
CREATE TABLE contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Site Settings
CREATE TABLE site_settings (
    id SERIAL PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_group VARCHAR(50),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SEO Metadata
CREATE TABLE seo_metadata (
    id SERIAL PRIMARY KEY,
    page_path VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255),
    description TEXT,
    keywords TEXT,
    og_image VARCHAR(500),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Project Structure

```
backend-node-sql/
├── src/
│   ├── config/
│   │   ├── database.js          # DB connection
│   │   └── env.js              # Environment variables
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── noticesController.js
│   │   ├── facultyController.js
│   │   ├── galleryController.js
│   │   ├── admissionController.js
│   │   ├── contactController.js
│   │   └── settingsController.js
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   ├── errorHandler.js
│   │   └── upload.js            # File upload
│   ├── models/
│   │   └── prisma/              # Prisma schema & client
│   ├── routes/
│   │   ├── auth.js
│   │   ├── notices.js
│   │   ├── faculty.js
│   │   ├── gallery.js
│   │   ├── admissions.js
│   │   ├── contact.js
│   │   └── settings.js
│   ├── services/
│   │   └── emailService.js      # Nodemailer
│   ├── utils/
│   │   └── helpers.js
│   └── app.js
├── uploads/                     # Static files
├── prisma/
│   └── schema.prisma
├── .env
├── package.json
└── README.md
```

### Key API Endpoints

```javascript
// Authentication
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
GET    /api/auth/me

// Notices (Public + Admin)
GET    /api/notices              // Public: Get published notices
GET    /api/notices/:id          // Public: Get single notice
POST   /api/admin/notices         // Admin: Create notice
PUT    /api/admin/notices/:id     // Admin: Update notice
DELETE /api/admin/notices/:id     // Admin: Delete notice

// Faculty (Public + Admin)
GET    /api/faculty               // Public: Get all faculty
POST   /api/admin/faculty          // Admin: Add faculty
PUT    /api/admin/faculty/:id     // Admin: Update faculty
DELETE /api/admin/faculty/:id     // Admin: Remove faculty

// Gallery (Public + Admin)
GET    /api/gallery               // Public: Get gallery images
POST   /api/admin/gallery          // Admin: Upload image
DELETE /api/admin/gallery/:id     // Admin: Delete image

// Admissions
POST   /api/admissions/enquire     // Public: Submit enquiry
GET    /api/admin/admissions      // Admin: Get all enquiries
PUT    /api/admin/admissions/:id  // Admin: Update status

// Contact
POST   /api/contact/submit         // Public: Submit form
GET    /api/admin/contacts         // Admin: Get submissions

// Settings
GET    /api/settings              // Public: Site settings
PUT    /api/admin/settings         // Admin: Update settings
```

### Installation & Setup

```bash
# 1. Initialize project
mkdir backend && cd backend
npm init -y

# 2. Install dependencies
npm install express cors helmet morgan bcryptjs jsonwebtoken dotenv
npm install prisma @prisma/client
npm install multer nodemailer express-validator
npm install --save-dev nodemon

# 3. Initialize Prisma
npx prisma init

# 4. Configure database URL in .env
DATABASE_URL="postgresql://user:pass@localhost:5432/abc_school_db?schema=public"
JWT_SECRET="your-super-secret-jwt-key"

# 5. Generate Prisma client
npx prisma generate
npx prisma migrate dev --name init

# 6. Start server
npm run dev
```

---

## Option 2: PHP + SQL (Traditional, Shared Hosting Friendly)

**Best for:** Budget hosting, familiar stack, easy deployment

### Tech Stack
- **Language:** PHP 8.2+
- **Framework:** Laravel 11 / Slim 4 (or vanilla PHP)
- **Database:** MySQL / MariaDB
- **ORM:** Eloquent / Doctrine
- **Authentication:** Laravel Sanctum / JWT

### Database Schema (Same as Node.js option)

Use identical SQL schema as Option 1. Laravel migrations:

```php
<?php
// database/migrations/XXXX_create_notices_table.php

Schema::create('notices', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->text('content');
    $table->string('tag')->nullable();
    $table->boolean('is_pinned')->default(false);
    $table->date('publish_date');
    $table->date('expiry_date')->nullable();
    $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
    $table->foreignId('author_id')->constrained('users');
    $table->timestamps();
});
```

### Project Structure (Laravel)

```
backend-php/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Api/
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── NoticeController.php
│   │   │   │   ├── FacultyController.php
│   │   │   │   └── ...
│   │   └── Middleware/
│   │       └── Authenticate.php
│   ├── Models/
│   │   ├── User.php
│   │   ├── Notice.php
│   │   ├── Faculty.php
│   │   └── ...
│   └── Services/
│       └── EmailService.php
├── config/
├── database/
│   └── migrations/
├── routes/
│   └── api.php
├── storage/
│   └── app/
│       └── uploads/
└── .env
```

### Key Routes (Laravel)

```php
<?php
// routes/api.php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api;

// Public Routes
Route::get('/notices', [NoticeController::class, 'index']);
Route::get('/notices/{id}', [NoticeController::class, 'show']);
Route::get('/faculty', [FacultyController::class, 'index']);
Route::get('/gallery', [GalleryController::class, 'index']);
Route::post('/contact', [ContactController::class, 'submit']);
Route::post('/admissions/enquire', [AdmissionController::class, 'enquire']);

// Protected Routes (Require Authentication)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/admin/notices', [NoticeController::class, 'store']);
    Route::put('/admin/notices/{id}', [NoticeController::class, 'update']);
    Route::delete('/admin/notices/{id}', [NoticeController::class, 'destroy']);
    
    Route::apiResource('/admin/faculty', FacultyController::class);
    Route::apiResource('/admin/gallery', GalleryController::class);
    Route::get('/admin/admissions', [AdmissionController::class, 'index']);
    Route::get('/admin/contacts', [ContactController::class, 'index']);
    Route::put('/admin/settings', [SettingController::class, 'update']);
});

// Auth Routes
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
```

### Installation & Setup

```bash
# 1. Create Laravel project
composer create-project laravel/laravel backend

# 2. Configure database in .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=abc_school_db
DB_USERNAME=root
DB_PASSWORD=

# 3. Run migrations
php artisan migrate

# 4. Install Sanctum for API auth
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

# 5. Serve
php artisan serve
```

---

## Option 3: Node.js + MongoDB (Flexible Document Storage)

**Best for:** Rapid development, unstructured content, horizontal scaling

### Tech Stack
- **Runtime:** Node.js 18+
- **Framework:** Express.js / Fastify
- **Database:** MongoDB 6+
- **ODM:** Mongoose
- **Authentication:** JWT + Passport.js

### Database Schema (Mongoose Models)

```javascript
// models/User.js
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['super_admin', 'admin', 'editor', 'teacher'],
        default: 'editor'
    },
    name: { type: String, required: true },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

// models/Notice.js
const noticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    tag: { type: String, enum: ['Admissions', 'Events', 'Community', 'General'] },
    isPinned: { type: Boolean, default: false },
    publishDate: { type: Date, required: true },
    expiryDate: { type: Date },
    status: { 
        type: String, 
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// models/Faculty.js
const facultySchema = new mongoose.Schema({
    name: { type: String, required: true },
    designation: String,
    department: String,
    qualification: String,
    experience: String,
    email: String,
    phone: String,
    photoUrl: String,
    bio: String,
    isActive: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 }
}, { timestamps: true });

// models/Gallery.js
const gallerySchema = new mongoose.Schema({
    title: { type: String, required: true },
    caption: String,
    imageUrl: { type: String, required: true },
    category: String,
    isFeatured: { type: Boolean, default: false },
    displayOrder: { type: Number, default: 0 }
}, { timestamps: true });

// models/AdmissionEnquiry.js
const enquirySchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    parentName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    gradeApplying: String,
    message: String,
    status: {
        type: String,
        enum: ['new', 'contacted', 'visited', 'admitted', 'rejected'],
        default: 'new'
    }
}, { timestamps: true });

// models/SiteSetting.js
const settingSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    value: mongoose.Schema.Types.Mixed,
    group: { type: String, default: 'general' }
}, { timestamps: true });
```

### Project Structure

```
backend-node-mongo/
├── src/
│   ├── config/
│   │   ├── database.js          # MongoDB connection
│   │   └── env.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── noticeController.js
│   │   ├── facultyController.js
│   │   └── ...
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── upload.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Notice.js
│   │   ├── Faculty.js
│   │   └── ...
│   ├── routes/
│   │   ├── index.js
│   │   ├── auth.js
│   │   ├── notices.js
│   │   └── ...
│   ├── services/
│   │   └── emailService.js
│   ├── utils/
│   │   └── helpers.js
│   └── app.js
├── uploads/
├── .env
├── package.json
└── README.md
```

### Installation & Setup

```bash
# 1. Initialize project
mkdir backend && cd backend
npm init -y

# 2. Install dependencies
npm install express mongoose cors helmet morgan dotenv
npm install bcryptjs jsonwebtoken passport passport-jwt
npm install multer nodemailer express-validator

# 3. Create .env
PORT=5000
MONGODB_URI="mongodb://localhost:27017/abc_school_db"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRE="7d"

# 4. Start MongoDB (locally)
# Or use MongoDB Atlas cloud service

# 5. Run server
npm run dev
```

---

## Frontend Integration Guide

### API Base URL Configuration

```javascript
// frontend/src/lib/api.js

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Fetch wrapper with error handling
export async function fetchApi(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    });
    
    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }
    
    return response.json();
}

// Public API calls (no auth)
export const getNotices = () => fetchApi('/notices');
export const getFaculty = () => fetchApi('/faculty');
export const submitContact = (data) => fetchApi('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
});

// Authenticated API calls
export const createNotice = (data, token) => fetchApi('/admin/notices', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(data),
});
```

### Next.js API Routes (Proxy)

```javascript
// frontend/src/app/api/notices/route.js

import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

export async function GET() {
    const res = await fetch(`${BACKEND_URL}/api/notices`);
    const data = await res.json();
    return NextResponse.json(data);
}
```

### Admin Dashboard Routes

```javascript
// frontend/src/app/admin/layout.js
// Protect admin routes

import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth';

export default async function AdminLayout({ children }) {
    const session = await getServerSession();
    
    if (!session?.user?.role?.includes('admin')) {
        redirect('/login');
    }
    
    return (
        <div className="admin-layout">
            <AdminSidebar />
            <main>{children}</main>
        </div>
    );
}
```

---

## Common API Response Format

```json
{
    "success": true,
    "message": "Notices fetched successfully",
    "data": [
        {
            "id": 1,
            "title": "Admissions Open 2026-27",
            "content": "Applications are now available...",
            "tag": "Admissions",
            "isPinned": true,
            "publishDate": "2026-04-01",
            "createdAt": "2026-04-01T10:00:00Z"
        }
    ],
    "meta": {
        "total": 25,
        "page": 1,
        "limit": 10
    }
}
```

---

## Environment Variables Template

```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

# Backend (.env)
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/abc_school" # SQL
# OR
MONGODB_URI="mongodb://localhost:27017/abc_school"              # MongoDB

# Security
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
JWT_EXPIRE="7d"
BCRYPT_SALT_ROUNDS=12

# Email (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# File Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880  # 5MB

# CORS
ALLOWED_ORIGINS=http://localhost:3000,https://abcschool.com
```

---

## Deployment Checklist

- [ ] Set production database credentials
- [ ] Configure CORS for production domain
- [ ] Set up environment variables
- [ ] Configure SSL certificates
- [ ] Set up file upload permissions
- [ ] Configure email SMTP
- [ ] Set up backup schedule
- [ ] Configure rate limiting
- [ ] Set up monitoring/logging
- [ ] Test all API endpoints

---

## Recommended: Option 1 (Node.js + PostgreSQL)

**Why PostgreSQL over MongoDB for this project:**

1. **Structured Data:** Notices, Faculty, Admissions have clear relationships
2. **ACID Compliance:** Important for payment/admission transactions
3. **Mature ORM:** Prisma provides excellent type safety
4. **JSON Support:** PostgreSQL can still store unstructured data when needed
5. **Better Query Performance:** For relational queries and aggregations

**Recommended Hosting:**
- **Database:** Railway.app / Supabase / AWS RDS
- **Backend:** Vercel (serverless) / Railway / Render
- **Storage:** AWS S3 / Cloudinary (for images)
- **CDN:** Cloudflare / Vercel Edge

---

## Quick Start Commands

```bash
# Option 1: Node.js + PostgreSQL
cd backend-node-sql && npm install && npx prisma migrate dev && npm run dev

# Option 2: PHP + MySQL
cd backend-php && composer install && cp .env.example .env && php artisan migrate && php artisan serve

# Option 3: Node.js + MongoDB
cd backend-node-mongo && npm install && npm run dev
```

---

**Need help?** Refer to the specific framework documentation:
- [Express.js](https://expressjs.com/)
- [Laravel](https://laravel.com/docs)
- [Prisma](https://www.prisma.io/docs)
- [Mongoose](https://mongoosejs.com/)
