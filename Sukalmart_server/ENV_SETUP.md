# Environment Variables Setup Guide

## Backend Environment Variables (.env)

Create a `.env` file in the `Sukalmart_server` directory with the following variables:

### Required Variables

```env
# Database Configuration
MONGO_URL=mongodb://localhost:27017/sukalmart

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
JWT_EXPIRES_IN=90d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### Optional Variables (for full functionality)

```env
# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Payment Gateway - Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Payment Gateway - Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Email Configuration (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Facebook OAuth Configuration
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
```

## How to Get These Values

### 1. MongoDB

- **Local**: Install MongoDB locally or use Docker
- **Atlas**: Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)

### 2. Cloudinary

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard → Account Details
3. Copy Cloud Name, API Key, and API Secret

### 3. Razorpay

1. Sign up at [Razorpay](https://razorpay.com/)
2. Go to Settings → API Keys
3. Generate API keys

### 4. Stripe

1. Sign up at [Stripe](https://stripe.com/)
2. Go to Developers → API Keys
3. Copy Publishable Key and Secret Key

### 5. Gmail App Password

1. Enable 2-factor authentication on your Gmail
2. Go to Google Account → Security → App Passwords
3. Generate an app password for "Mail"

### 6. Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project and enable Google+ API
3. Create OAuth 2.0 credentials

### 7. Facebook OAuth

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create an app and get App ID and App Secret

## Quick Start (Minimal Setup)

For basic functionality, you only need:

```env
MONGO_URL=mongodb://localhost:27017/sukalmart
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key_here
FRONTEND_URL=http://localhost:3000
```

## Security Notes

1. **Never commit .env files** to version control
2. Use strong, random JWT secrets
3. Keep API keys secure
4. Use environment-specific configurations
5. Regularly rotate sensitive keys
