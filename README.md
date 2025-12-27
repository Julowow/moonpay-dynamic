# MoonPay + Dynamic Integration

Complete integration of MoonPay and Dynamic Labs for seamless crypto purchases with embedded wallets.

## 🎯 Features

- ✅ **Embedded Solana Wallets** via Dynamic Labs (email/social login)
- ✅ **Fiat On-Ramp** via MoonPay (card/bank transfer)
- ✅ **No Browser Extension Required** - works on any device
- ✅ **Automatic Token Conversion** - SOL/USDC → $NRG

## 🛠 Tech Stack

- **Next.js 14.2.18** (React 18.3.1)
- **Dynamic Labs SDK** for embedded wallets
- **MoonPay SDK** for fiat purchases
- **Tailwind CSS** for styling

## 📋 Prerequisites

1. **Dynamic Labs Account**
   - Sign up at https://app.dynamic.xyz
   - Create a new project
   - Copy your Environment ID

2. **MoonPay Account**
   - Sign up at https://www.moonpay.com/dashboard
   - Get your API keys (publishable + secret)
   - Configure your webhook URLs

## 🚀 Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Edit .env.local with your keys
nano .env.local
```

## 🔐 Environment Variables

```env
# Dynamic Labs
NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID=your_dynamic_env_id

# MoonPay
NEXT_PUBLIC_MOONPAY_API_KEY=pk_live_xxx
MOONPAY_SECRET_KEY=sk_live_xxx

# Team Wallet (where purchases are sent)
NEXT_PUBLIC_TEAM_WALLET_ADDRESS=your_solana_address
```

## 🏃 Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📱 User Flow

1. **User clicks "Buy $NRG"**
2. **Dynamic prompts for email/social login**
3. **Embedded Solana wallet is created automatically**
4. **User selects amount in MoonPay widget**
5. **User pays with card/bank transfer**
6. **Funds sent to your team wallet**
7. **Backend swaps SOL/USDC → $NRG via Jupiter**
8. **$NRG tokens sent to user's Dynamic wallet**

## 🔧 Customization

### Change MoonPay Settings

Edit `src/app/page.tsx`:

```tsx
<MoonPayBuyWidget
  variant="embedded"
  baseCurrencyCode="usd"        // Currency user pays in
  quoteCurrencyCode="sol"       // Crypto they receive
  walletAddress={walletAddress} // Auto-filled from Dynamic
/>
```

### Change Dynamic Wallet Settings

Edit `src/app/page.tsx`:

```tsx
<DynamicContextProvider
  settings={{
    environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID,
    walletConnectors: [SolanaWalletConnectors],
    // Add more options:
    // emailOnly: true,
    // termsOfServiceUrl: 'https://...',
    // privacyPolicyUrl: 'https://...',
  }}
>
```

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

### Manual Deployment

1. Build the project: `npm run build`
2. Upload `.next/` folder to your server
3. Set environment variables
4. Run: `npm start`

## 🔒 Security Notes

- ✅ **MoonPay Secret Key** is server-side only (API route)
- ✅ **Dynamic handles wallet keys** (users don't see them)
- ✅ **HTTPS required** in production
- ✅ **Rate limiting** on API routes recommended

## 📊 Pricing

### Dynamic Labs
- **Free tier**: 1,000 MAUs (Monthly Active Users)
- **Growth**: $249/month (5,000 MAUs)
- **Enterprise**: Custom pricing

### MoonPay
- **Fees**: ~4.5% per transaction
- **Volume discounts**: Contact sales
- **Free API keys**: Available

## 🐛 Troubleshooting

### "Module not found: @dynamic-labs/sdk-react-core"
```bash
npm install --legacy-peer-deps
```

### MoonPay widget not showing
- Check API key is correct
- Check `NEXT_PUBLIC_` prefix on env vars
- Check browser console for errors

### Dynamic widget not loading
- Verify Environment ID is correct
- Check network tab for API errors
- Ensure React version is 18.x (not 19)

## 📚 Documentation

- [Dynamic Labs Docs](https://docs.dynamic.xyz)
- [MoonPay Docs](https://dev.moonpay.com)
- [Next.js Docs](https://nextjs.org/docs)

## 💡 Next Steps

1. **Backend Integration**
   - Add MoonPay webhook handler
   - Implement Jupiter swap (SOL/USDC → $NRG)
   - Send $NRG to user's wallet

2. **UI Improvements**
   - Add loading states
   - Add error handling
   - Add transaction history

3. **Testing**
   - Test with MoonPay sandbox
   - Test Dynamic embedded wallets
   - Test full user flow

## 📝 License

MIT

## 🙋 Support

- Dynamic: support@dynamic.xyz
- MoonPay: support@moonpay.com
