# SnazzyZone Party Recovery Department

A hilarious, premium-looking prank website dedicated to a friend who hasn't given a party for 50K subscribers, birthday, or upcoming 100K subscribers!

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion & GSAP
- Lucide Icons
- Canvas Confetti, React CountUp, React Typed

## Local Development
1. Run `npm install`
2. Run `npm run dev`
3. Open `http://localhost:3000`

## Firebase Setup

1. **Create a Firebase project** in the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication**.
   - Enable **Email/Password** provider.
   - Enable **Anonymous** provider.
3. Enable **Cloud Firestore**.
   - Use the `firestore.rules` provided in the repository to secure your data.
4. Enable **Realtime Database**.
   - Use the `database.rules.json` provided in the repository.
5. **Create the Owner Account**:
   - Go to the Authentication tab in Firebase Console.
   - Click "Add user" and enter the owner's email and password.
   - **Copy the generated UID** for this user.
6. **Configure Environment Variables**:
   - Rename `.env.example` to `.env.local` locally.
   - Set all `NEXT_PUBLIC_FIREBASE_*` variables from your Firebase Project Settings -> General -> Your apps (Web app).
   - Set `NEXT_PUBLIC_OWNER_UID` to the UID you copied in step 5.
7. **Deploy to Vercel**:
   - Add all the variables from `.env.local` to your Vercel Project Settings -> Environment Variables. Just connect the repository to your Vercel account and deploy.

Enjoy recovering those pending parties! 🍕🎉
