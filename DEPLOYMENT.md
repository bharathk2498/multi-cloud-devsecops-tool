# 🚀 GitHub Pages Deployment Guide

## Quick Setup (2 Minutes)

### Step 1: Enable GitHub Pages
1. Go to your repository: `https://github.com/bharathk2498/multi-cloud-devsecops-tool`
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **"Deploy from a branch"**
5. Choose **"main"** branch and **"/ (root)"** folder
6. Click **Save**

### Step 2: Wait for Deployment
- GitHub will automatically deploy your site
- Wait 2-3 minutes for the initial deployment
- You'll see a green checkmark when ready

### Step 3: Access Your Live Tool
Your tool will be available at:
```
https://bharathk2498.github.io/multi-cloud-devsecops-tool
```

## Advanced Setup (GitHub Actions)

For automatic deployments, create `.github/workflows/static.yml`:

```yaml
name: Deploy static content to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Verification Steps

1. **Check Build Status**: Go to Actions tab in your repository
2. **Verify Content**: Visit your live URL and test all sections
3. **Test Search**: Try searching for "IAM", "GuardDuty", or "NIST"
4. **Mobile Test**: Open on phone/tablet to verify responsiveness

## Troubleshooting

### Site Not Loading
- Check repository settings → Pages
- Ensure branch is set to "main"
- Wait up to 10 minutes for DNS propagation

### Missing Content
- Verify `index.html` is in root directory
- Check browser console for JavaScript errors
- Ensure all static files are committed

### Search Not Working
- Verify `static/js/data.js` and `static/js/app.js` are present
- Check browser developer tools for errors
- Clear browser cache and reload

## Custom Domain (Optional)

1. Add `CNAME` file to repository root:
   ```
   your-domain.com
   ```
2. Configure DNS with your domain provider
3. Enable HTTPS in repository settings

## Success! 🎉

Your Multi-Cloud DevSecOps Tool is now live and accessible to your team!

**Features Available:**
✅ 37+ Security Services across AWS, Azure, GCP  
✅ 8 Compliance Frameworks with cloud mappings  
✅ 14 MITRE ATT&CK tactics  
✅ 25+ Security Tools database  
✅ Real-time search and filtering  
✅ Mobile-responsive design  
✅ Professional UI/UX  

**Next Steps:**
- Share the URL with your team
- Bookmark for daily reference
- Customize the data for your organization
- Add it to your security documentation