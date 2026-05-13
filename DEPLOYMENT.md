# GitHub Pages Deployment Guide

Complete guide to deploy your SMS Fraud Hub to GitHub Pages.

## ✅ Prerequisites

1. **GitHub Account** - Create one at https://github.com if you don't have one
2. **Git Installed** - Check with `git --version`
3. **Node.js Installed** - Already have it (used for local dev)

## 📋 Setup Steps

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `SMS-Fraud-Hub` (or your preferred name)
3. Description: "SMS Fraud Prevention Configuration Interface"
4. Choose **Public** (required for free GitHub Pages) or **Private** (requires paid plan)
5. Do NOT initialize with README, .gitignore, or license (we already have these)
6. Click **Create repository**

### Step 2: Update Configuration

**IMPORTANT:** If you named your repository something other than `SMS-Fraud-Hub`, update `vite.config.js`:

```javascript
// Change this line to match your repository name:
base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
```

For example:
- Repository: `my-fraud-app` → base: `'/my-fraud-app/'`
- Repository: `fraud-dashboard` → base: `'/fraud-dashboard/'`

### Step 3: Install Dependencies

```bash
cd "/Users/saydas/Documents/CPM/Experiments/SMS Fraud Hub"

# Install gh-pages deployment tool
npm install
```

### Step 4: Initialize Git Repository (if not already done)

```bash
# Check if already initialized
git status

# If not a git repo, initialize:
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: SMS Fraud Hub"
```

### Step 5: Connect to GitHub

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual values:

```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Verify remote
git remote -v

# Push to main branch
git branch -M main
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/saydas/SMS-Fraud-Hub.git
git push -u origin main
```

### Step 6: Deploy to GitHub Pages

```bash
# Build and deploy
npm run deploy
```

This command will:
1. Build your app (`npm run build`)
2. Create a `gh-pages` branch
3. Push the built files to that branch
4. GitHub Pages will automatically serve from `gh-pages` branch

### Step 7: Enable GitHub Pages (if not auto-enabled)

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section (left sidebar)
4. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **Save**

### Step 8: Access Your Site

After 1-2 minutes, your site will be live at:

```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

**Example:**
```
https://saydas.github.io/SMS-Fraud-Hub/
```

GitHub will show you the exact URL in the Pages settings.

## 🔄 Updating the Site

Whenever you make changes:

```bash
# 1. Make your changes to the code
# 2. Test locally
npm run dev

# 3. Commit changes
git add .
git commit -m "Description of changes"
git push origin main

# 4. Deploy updated version
npm run deploy
```

The site will update in 1-2 minutes.

## 🐛 Troubleshooting

### Issue: Blank page or 404 errors

**Cause:** Incorrect base path in `vite.config.js`

**Fix:**
1. Check your repository name on GitHub
2. Update `vite.config.js`:
   ```javascript
   base: '/exact-repo-name/'
   ```
3. Redeploy:
   ```bash
   npm run deploy
   ```

### Issue: CSS not loading

**Cause:** Build path issues

**Fix:**
1. Clear the dist folder:
   ```bash
   rm -rf dist
   ```
2. Rebuild and deploy:
   ```bash
   npm run deploy
   ```

### Issue: "gh-pages not found"

**Cause:** gh-pages package not installed

**Fix:**
```bash
npm install gh-pages --save-dev
npm run deploy
```

### Issue: Changes not showing

**Cause:** Browser cache or GitHub Pages cache

**Fix:**
1. Hard refresh browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
2. Wait 2-5 minutes for GitHub Pages to update
3. Check build succeeded: look for `gh-pages` branch on GitHub

### Issue: Permission denied (publickey)

**Cause:** SSH key not set up

**Fix:** Use HTTPS instead of SSH for the remote:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push origin main
```

Or set up SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

## 🔒 Private Repository Deployment

GitHub Pages on private repos requires:
- GitHub Pro, Team, or Enterprise account
- Same steps as above, but repository can be private

Free accounts: Must use public repository for GitHub Pages.

## 🌐 Custom Domain (Optional)

To use your own domain (e.g., fraud-dashboard.yourcompany.com):

1. Add `CNAME` file to `public` folder:
   ```
   fraud-dashboard.yourcompany.com
   ```

2. Update `vite.config.js`:
   ```javascript
   base: '/'  // Remove the repo name part
   ```

3. Configure DNS:
   - Add CNAME record pointing to `YOUR_USERNAME.github.io`
   - Or A records pointing to GitHub Pages IPs

4. In GitHub Settings → Pages:
   - Enter your custom domain
   - Check "Enforce HTTPS"

See: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

## 📊 Monitoring

### Check Deployment Status

1. Go to your repo on GitHub
2. Click **Actions** tab
3. See deployment history and status

### View Build Logs

If deployment fails:
1. Check **Actions** tab for error messages
2. Common issues:
   - Build errors (fix locally first with `npm run build`)
   - Node version mismatch
   - Missing dependencies

## 🚀 Advanced: GitHub Actions (CI/CD)

For automatic deployment on every push:

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      env:
        NODE_ENV: production
      
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

Now every push to `main` automatically deploys!

## 📝 Quick Reference

### Commands

```bash
# Local development
npm run dev              # Start dev server (http://localhost:3000)

# Build for production
npm run build            # Creates dist/ folder

# Preview production build locally
npm run preview          # Test before deploying

# Deploy to GitHub Pages
npm run deploy           # Build + deploy in one command

# Git workflow
git add .
git commit -m "message"
git push origin main     # Push code
npm run deploy           # Deploy site
```

### File Structure

```
SMS Fraud Hub/
├── dist/                 # Built files (auto-generated, don't commit)
├── src/                  # Source code
│   ├── App.jsx          # Main app
│   ├── main.jsx         # Entry point
│   └── index.css        # Styles
├── public/              # Static assets (if any)
├── index.html           # HTML template
├── vite.config.js       # Vite + GitHub Pages config
├── package.json         # Dependencies + deploy script
└── .gitignore           # Excludes dist, node_modules
```

### URLs

- **Local Dev:** http://localhost:3000
- **GitHub Pages:** https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
- **Repository:** https://github.com/YOUR_USERNAME/YOUR_REPO_NAME

## ✅ Checklist

Before deploying:

- [ ] Created GitHub repository
- [ ] Updated `base` in `vite.config.js` with your repo name
- [ ] Ran `npm install` to get gh-pages
- [ ] Tested locally with `npm run dev`
- [ ] Built successfully with `npm run build`
- [ ] Initialized git and committed code
- [ ] Connected to GitHub remote
- [ ] Pushed code to main branch
- [ ] Ran `npm run deploy`
- [ ] Waited 1-2 minutes
- [ ] Visited GitHub Pages URL

## 🆘 Need Help?

- **GitHub Pages Docs:** https://docs.github.com/en/pages
- **Vite Deployment:** https://vitejs.dev/guide/static-deploy.html#github-pages
- **gh-pages NPM:** https://www.npmjs.com/package/gh-pages

## 🎉 Success!

Once deployed, share your URL:
- **Live Demo:** https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
- **Source Code:** https://github.com/YOUR_USERNAME/YOUR_REPO_NAME

Your SMS Fraud Hub is now publicly accessible! 🚀

---

**Last Updated:** May 11, 2026  
**Vite Version:** 5.0.8  
**React Version:** 18.2.0
