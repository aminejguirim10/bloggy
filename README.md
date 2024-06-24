# Blog Website

A complete blog website with user authentication, article management, and a comment system, built using Next.js, Tailwind CSS, TypeScript, Prisma, MongoDB, and NextAuth.

## Features

- User authentication (Sign Up, Login, Logout)
- CRUD operations for blog posts
- Rich text editor for creating posts
- Categories and tags for organizing posts
- Comment system for reader interaction
- Admin dashboard with charts for data management and analysis
- Responsive design for an optimal user experience across all devices

## Technologies Used

- **Frontend:** Next.js, Tailwind CSS, TypeScript
- **Backend:** Next.js API Routes
- **Database:** MongoDB with Prisma
- **Authentication:** NextAuth

## Installation

1. Clone the repository:

```bash
 git clone https://github.com/aminejguirim10/bloggy.git
```

2. Navigate to the project directory:

```bash
 cd bloggy
```

3. Install the dependencies:

```bash
npm install
```

4. Configure environment variables:

```bash
DATABASE_URL="your_mongodb_url"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="your_nextauth_url"

GOOGLE_CLIENT_SECRET="your_google_client_secret"
GOOGLE_CLIENT_ID="your_google_client_id"
GITHUB_SECRET="your_github_secret"
GITHUB_ID="your_github_id"

UPLOADTHING_SECRET="your_uploadthing_secret"
UPLOADTHING_APP_ID="your_uploadthing_app_id"

NODE_MAILER_SECRET="your_node_mailer_secret"
NODE_MAILER_AUTHOR_MAIL="your_node_mailer_author_mail"

JWT_SECRET="your_jwt_secret"
```

5. Start the development server:

```bash
npm run dev
```

6. Open your browser and visit:

```bash
http://localhost:3000
```

## Image Storage with UploadThing

This project uses UploadThing for image storage. Make sure you have configured the appropriate environment variables for UploadThing.

## Admin Dashboard

The admin dashboard provides an intuitive interface with several charts for data management and analysis. Here are some screenshots:

- **Dashboard**
  ![](https://bloggy-amine.vercel.app/adminDashboard.png)

- **Blogs Per Day**
  ![](https://bloggy-amine.vercel.app/chartsPerDay.png)

- **Blogs Per Week**
  ![](https://bloggy-amine.vercel.app/chartsPerWeek.png)

- **Blogs Per Month**
  ![](https://bloggy-amine.vercel.app/chartsPerMonth.png)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
