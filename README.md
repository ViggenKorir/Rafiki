# Rafiki Partners - Architectural & Construction Services

A modern Next.js application built for architectural and construction services, featuring authentication, project management, and client inquiries.

## 🚀 Technologies Used

- **Next.js 15.5.4** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Utility-first CSS framework
- **Clerk** - Authentication and user management
- **Supabase** - Backend as a Service (Database)
- **Framer Motion** - Animation library
- **React Hook Form + Zod** - Form handling and validation
- **Lucide React** - Icon library

## ✅ Recent Fixes Applied

This codebase has been thoroughly debugged and the following critical issues have been resolved:

### 🔧 Critical Fixes
- ✅ **Tailwind CSS v4 Configuration** - Fixed PostCSS plugin configuration
- ✅ **TypeScript Module Resolution** - Updated to `bundler` mode for better compatibility
- ✅ **Supabase Type Issues** - Simplified database queries to avoid complex type conflicts
- ✅ **Zod Compatibility** - Downgraded from v4 to stable v3 for React Hook Form compatibility
- ✅ **Missing API Routes** - Created contact form submission endpoint
- ✅ **Build Configuration** - Fixed Next.js workspace warnings

### ⚠️ Warnings Addressed
- ✅ **Package Manager Conflicts** - Cleaned up mixed lockfiles
- ✅ **Component Structure** - Organized UI components properly
- ✅ **Environment Variables** - Added example configuration

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+
- npm or pnpm
- Supabase account
- Clerk account

### 1. Clone and Install

```bash
git clone <repository-url>
cd rafiki-partners
npm install
```

### 2. Environment Variables

Copy the example environment file and configure your values:

```bash
cp .env.example .env.local
```

Fill in your actual values in `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your-key
CLERK_SECRET_KEY=sk_test_your-secret-key
```

### 3. Database Setup

Create the following tables in your Supabase database:

```sql
-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR NOT NULL,
  description TEXT,
  category VARCHAR CHECK (category IN ('residential', 'commercial')),
  images TEXT[] DEFAULT '{}',
  completion_date DATE,
  client_name VARCHAR,
  location VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services table
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  icon VARCHAR NOT NULL,
  price_range VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- News table
CREATE TABLE news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR NOT NULL,
  content TEXT,
  excerpt TEXT,
  image VARCHAR,
  published_date DATE NOT NULL,
  author VARCHAR NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inquiries table
CREATE TABLE inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  phone VARCHAR,
  message TEXT NOT NULL,
  project_type VARCHAR NOT NULL,
  status VARCHAR CHECK (status IN ('new', 'contacted', 'closed')) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Allow read access to projects, services, and news
CREATE POLICY "Allow read access to projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow read access to services" ON services FOR SELECT USING (true);
CREATE POLICY "Allow read access to news" ON news FOR SELECT USING (true);

-- Allow anyone to submit inquiries
CREATE POLICY "Allow insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### 5. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── sign-in/           # Authentication pages
│   ├── sign-up/
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── navigation/        # Header, mobile menu
│   ├── sections/          # Page sections (Hero, About, etc.)
│   └── ui/                # Reusable UI components
├── lib/
│   ├── supabase.ts       # Database client & queries
│   └── utils.ts          # Utility functions
└── types/                 # TypeScript definitions
```

## 🎯 Features

### Public Features
- **Landing Page** with hero section, services, portfolio, and contact
- **Responsive Design** optimized for all devices
- **Contact Form** with validation and database submission
- **Project Portfolio** showcase
- **Company Information** and services listing

### Admin Features (Protected)
- **Dashboard** with analytics and metrics
- **Project Management** (view, edit, create)
- **Inquiry Management** (view, update status)
- **User Authentication** via Clerk

### Technical Features
- **SEO Optimized** with proper meta tags and structure
- **Performance Optimized** with Next.js built-in optimizations
- **Type Safety** with TypeScript throughout
- **Form Validation** with Zod schemas
- **Animations** with Framer Motion
- **Database Integration** with Supabase

## 🚦 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript compiler check

## 📝 API Routes

- `POST /api/contact` - Submit contact form inquiries

## 🔐 Authentication

The app uses Clerk for authentication with the following setup:
- Sign-in and sign-up pages
- Protected admin routes
- User management
- Session handling

## 🗃️ Database Schema

The application uses Supabase with the following main entities:
- **Projects** - Portfolio items with images and details
- **Services** - Company service offerings
- **News** - Blog posts and company updates
- **Inquiries** - Contact form submissions

## 🎨 Styling

- **Tailwind CSS v4** for utility-first styling
- **Custom CSS variables** for theming
- **Responsive design** with mobile-first approach
- **Dark/light mode ready** (can be implemented)

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on git push

### Other Platforms
The app can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🐛 Troubleshooting

### Common Issues

**Build fails with Tailwind CSS error:**
```bash
rm -rf .next node_modules
npm install
```

**TypeScript errors:**
```bash
npm run type-check
```

**Environment variables not loading:**
- Ensure `.env.local` exists and has correct values
- Restart development server after changes

### Getting Help

If you encounter issues:
1. Check the console for specific error messages
2. Verify environment variables are set correctly
3. Ensure database tables exist and have correct permissions
4. Check that Clerk and Supabase configurations match

## 📞 Support

For support with this application:
- Create an issue in the repository
- Check the documentation for Next.js, Tailwind, Clerk, and Supabase
- Review the troubleshooting section above

## 🔄 Recent Updates

- ✅ Fixed Tailwind CSS v4 compatibility
- ✅ Resolved TypeScript module resolution issues
- ✅ Updated Supabase integration
- ✅ Added comprehensive error handling
- ✅ Improved build performance
- ✅ Enhanced type safety

---

Built with ❤️ for Rafiki Partners
