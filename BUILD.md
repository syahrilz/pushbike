# 🏗️ Build Instructions for Pushbike Application

## Prerequisites

Before building, ensure you have:
- Node.js v16 or higher installed
- npm (comes with Node.js)
- Windows OS (for building Windows executables)
- At least 2GB free disk space
- Internet connection (for first-time build)

## Build Process

### 1. Prepare Environment

```bash
# Clone repository
git clone https://github.com/syahrilz/pushbike.git
cd pushbike

# Install dependencies
npm install
```

### 2. Test Application

Before building, test the application:

```bash
# Run in development mode
npm start
```

Verify that:
- Application opens successfully
- Can login with default credentials
- All menus are accessible
- Database is created

### 3. Build for Production

#### Build Windows Installer (NSIS)

```bash
npm run build
```

This will create:
- `dist/Pushbike-Race-System-Setup-1.0.0.exe` - Installer
- Installation wizard with desktop shortcut option

#### Build Portable Version

```bash
npm run build:portable
```

This will create:
- `dist/Pushbike Race System-1.0.0-win.zip` - Portable version
- No installation required, just extract and run

### 4. Build Output

After successful build, check the `dist/` folder:

```
dist/
├── Pushbike-Race-System-Setup-1.0.0.exe    # Installer (NSIS)
├── win-unpacked/                            # Unpacked version
└── builder-debug.yml                        # Build debug info
```

## Build Configuration

Build settings are in `package.json` under the `build` key:

```json
{
  "build": {
    "appId": "com.pushbike.app",
    "productName": "Pushbike Race System",
    "win": {
      "target": ["nsis"],
      "icon": "public/icon.png"
    }
  }
}
```

## Customization

### Change App Name

Edit `package.json`:
```json
{
  "build": {
    "productName": "Your Custom Name"
  }
}
```

### Change App Icon

Replace `public/icon.png` with your custom icon (256x256 PNG recommended).

For better quality, also provide `.ico` file:
```json
{
  "build": {
    "win": {
      "icon": "public/icon.ico"
    }
  }
}
```

### Change Version

Edit `package.json`:
```json
{
  "version": "1.0.0"
}
```

Version will be reflected in the installer filename.

## Build Targets

### Available Targets

- `nsis` - NSIS installer (default)
- `portable` - Portable executable
- `nsis-web` - Web installer (downloads on install)
- `msi` - MSI installer
- `appx` - Microsoft Store package

### Custom Target Example

```json
{
  "build": {
    "win": {
      "target": [
        {
          "target": "nsis",
          "arch": ["x64", "ia32"]
        }
      ]
    }
  }
}
```

## Troubleshooting

### Build Fails - "Cannot find module"

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Build Fails - "Python not found"

Some dependencies require Python. Install Python 3.x from python.org.

### Build Fails - "node-gyp error"

Install build tools:
```bash
npm install --global windows-build-tools
```

### Large Build Size

The build includes Node.js runtime and all dependencies. Typical size: 150-200MB.

To reduce size:
- Remove unused dependencies from `package.json`
- Use `asar` packing (enabled by default)
- Remove development dependencies from production build

### Build is Slow

First build downloads Electron binaries (~100MB). Subsequent builds are faster.

Use electron-builder cache:
```bash
# Windows cache location
%LOCALAPPDATA%\electron-builder\Cache
```

## Code Signing (Optional)

For production release, sign your executable:

### Windows Code Signing

1. Obtain code signing certificate
2. Configure in `package.json`:

```json
{
  "build": {
    "win": {
      "certificateFile": "path/to/cert.pfx",
      "certificatePassword": "password"
    }
  }
}
```

Or use environment variables:
```bash
set CSC_LINK=path/to/cert.pfx
set CSC_KEY_PASSWORD=password
npm run build
```

## Publishing

### Manual Distribution

1. Upload installer to GitHub Releases
2. Users download and install

### Auto-Update Setup

Configure electron-updater:

```json
{
  "build": {
    "publish": {
      "provider": "github",
      "owner": "syahrilz",
      "repo": "pushbike"
    }
  }
}
```

## Build Checklist

Before releasing:

- [ ] Test application in development mode
- [ ] Update version number
- [ ] Update CHANGELOG
- [ ] Clean build: `rm -rf dist node_modules && npm install`
- [ ] Build installer: `npm run build`
- [ ] Test installer on clean Windows machine
- [ ] Verify all features work
- [ ] Check database creation
- [ ] Test file uploads
- [ ] Verify API endpoints
- [ ] Test auto-update (if configured)
- [ ] Create GitHub Release
- [ ] Upload installer to Releases
- [ ] Update documentation

## CI/CD (Optional)

### GitHub Actions Example

Create `.github/workflows/build.yml`:

```yaml
name: Build

on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm run build
      - uses: actions/upload-artifact@v2
        with:
          name: installer
          path: dist/*.exe
```

## Support

For build issues:
- Check electron-builder documentation: https://www.electron.build
- Check Electron documentation: https://www.electronjs.org
- Open issue on GitHub

---

**Build date:** Generated automatically
**Platform:** Windows
**Architecture:** x64
**Electron Version:** See package.json
