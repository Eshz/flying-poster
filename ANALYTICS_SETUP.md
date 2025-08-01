
# Google Analytics 4 Setup Guide

## Step 1: Create Google Analytics Account
1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring"
4. Enter your account name (e.g., "PosterMaker")
5. Configure data sharing settings (recommended to keep defaults)

## Step 2: Create Property
1. Enter property name: "PosterMaker App"
2. Select your timezone and currency
3. Click "Next"

## Step 3: Set Up Data Stream
1. Choose "Web" as the platform
2. Enter your website URL (e.g., https://yourapp.lovable.app)
3. Enter stream name: "PosterMaker Web App"
4. Click "Create stream"

## Step 4: Get Your Measurement ID
1. After creating the stream, you'll see your **Measurement ID** (format: G-XXXXXXXXXX)
2. Copy this ID

## Step 5: Update Your App
1. Open `src/utils/analytics.ts`
2. Replace `'G-XXXXXXXXXX'` with your actual Measurement ID:
   ```typescript
   export const GA_MEASUREMENT_ID = 'G-YOUR-ACTUAL-ID';
   ```

## Step 6: Deploy and Test
1. Deploy your app with the updated analytics code
2. Visit your app and perform some actions (create poster, change design, export PDF)
3. Check Google Analytics Real-time reports to verify tracking is working

## What's Being Tracked

### Automatic Events:
- Page views and session duration
- User engagement metrics

### Custom Events:
- **Poster Actions**: Creation, content updates
- **Design Changes**: Style selections, layout changes
- **Interactions**: Zoom controls, undo/redo
- **Exports**: PDF downloads
- **Project Management**: Create, save, load, delete projects

### Privacy Features:
- IP anonymization enabled
- No ad personalization signals
- GDPR-friendly configuration

## Viewing Your Data

In Google Analytics, you can find:
- **Realtime**: Live user activity
- **Reports > Engagement > Events**: Custom event tracking
- **Reports > Engagement > Pages**: Page view statistics
- **Reports > Demographics**: User location and device info

## Custom Dashboard

Create custom reports to track:
- Most popular poster layouts
- Average session duration
- Export conversion rates
- Feature usage patterns
- User retention metrics
