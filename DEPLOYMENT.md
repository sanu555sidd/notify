# 🚀 Render Deployment Guide for Notify App

## Prerequisites
1. GitHub account
2. Render account (free)
3. MongoDB Atlas account (free)

## Step 1: Prepare Your Repository

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

## Step 2: Deploy Backend on Render

1. **Go to [Render Dashboard](https://dashboard.render.com/)**
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service:**
   - **Name**: `notify-backend`
   - **Environment**: `Node`
   - **Build Command**: `./render-build.sh` or `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `server`
   - **Node Version**: `18.20.4` (specify in Advanced settings)

5. **Set Environment Variables:**
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secret_jwt_key_here
   FRONTEND_URL=https://your-frontend-app.onrender.com
   ```

6. **Deploy the service**

## Common Deployment Fixes

### If you get "Missing parameter name" error:
1. **The Express.js version has been downgraded to 4.x for compatibility**
2. **Clear build cache and redeploy**
3. **Make sure Node.js version is set to 18.x**

### If build fails:
1. **Check that `render-build.sh` has execute permissions**
2. **Try using `npm install` as build command instead**
3. **Verify all dependencies are in package.json**

## Step 3: Deploy Frontend on Render

1. **Click "New +" → "Static Site"**
2. **Connect your GitHub repository**
3. **Configure the site:**
   - **Name**: `notify-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Root Directory**: `todo`

4. **Set Environment Variables:**
   ```
   NODE_ENV=production
   ```

5. **Deploy the site**

## Step 4: Update API URLs

1. **After backend deployment, update the API config:**
   - Edit `todo/src/config/api.js`
   - Replace `https://your-backend-app.onrender.com/api` with your actual backend URL

2. **After frontend deployment, update CORS:**
   - Update `FRONTEND_URL` environment variable in backend with your frontend URL

## Step 5: MongoDB Atlas Setup

1. **Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas)**
2. **Create a database user**
3. **Whitelist Render's IP addresses or use 0.0.0.0/0 for all IPs**
4. **Get your connection string and add it to backend environment variables**

## Step 6: Test Your Deployment

1. **Visit your frontend URL**
2. **Test the following features:**
   - User registration/login
   - Creating notes
   - Sentiment analysis
   - Search functionality
   - Like/unlike notes
   - Translation feature

## Important Notes

- **Free Render services spin down after 15 minutes of inactivity**
- **First request after spin-down may take 1-2 minutes**
- **Consider upgrading to paid plan for production use**

## Troubleshooting

### Backend Issues:
- Check logs in Render dashboard
- Verify environment variables
- Ensure MongoDB connection string is correct

### Frontend Issues:
- Check if API_BASE_URL is correctly configured
- Verify CORS settings in backend
- Check browser console for errors

### Common Fixes:
- Ensure all dependencies are in `package.json`
- Check that build commands are correct
- Verify root directories are set properly

## Environment Variables Checklist

### Backend (.env):
- ✅ `NODE_ENV=production`
- ✅ `MONGODB_URI=your_connection_string`
- ✅ `JWT_SECRET=your_secret_key`
- ✅ `FRONTEND_URL=your_frontend_url`

### Frontend:
- ✅ Update `API_BASE_URL` in `src/config/api.js`

## Success! 🎉

Your Notify app should now be live on Render with:
- ✅ User authentication
- ✅ Note management
- ✅ Real-time search
- ✅ Sentiment analysis
- ✅ Translation feature
- ✅ Like/dislike functionality
