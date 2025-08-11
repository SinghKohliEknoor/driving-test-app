# Alberta Driving Test App

A modern, interactive driving test application built with **Next.js 15** and **React 19** for practicing Alberta Class 7 driving knowledge tests.

## 🚗 Features

- **Authentic Quiz Experience**: 30 random questions per test from a database of 324+ real Alberta driving test questions
- **Image Support**: Visual questions with traffic signs and road situations
- **Secure Authentication**: Auth0 integration with protected routes
- **Realistic Scoring**: Pass with 25+ correct answers, fail with 6+ incorrect
- **Responsive Design**: Works on desktop and mobile devices
- **Database-Driven**: Dynamic question generation from Supabase

## 🛠 Tech Stack

- **Framework**: Next.js 15.3.4 with App Router
- **Frontend**: React 19.0.0, TailwindCSS 4.0, Framer Motion 12.23.9
- **Backend**: Supabase (PostgreSQL database + Storage)
- **Authentication**: Auth0 v3.5.0
- **Data Fetching**: SWR 2.3.4 with caching
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Auth0 account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/SinghKohliEknoor/driving-test-app.git
   cd driving-test-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create `.env.local` with:

   ```bash
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_KEY=your_supabase_anon_key

   # Auth0
   AUTH0_SECRET=your_auth0_secret
   AUTH0_BASE_URL=http://localhost:3000
   AUTH0_ISSUER_BASE_URL=your_auth0_domain
   AUTH0_CLIENT_ID=your_auth0_client_id
   AUTH0_CLIENT_SECRET=your_auth0_client_secret
   ```

4. **Database Setup**

   - Create `alberta_class7` table in Supabase
   - Import your question data with fields: `question_text`, `options`, `answer`, `version_tag`, `image_url`

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open** [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

```sql
-- alberta_class7 table
CREATE TABLE alberta_class7 (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question_text TEXT NOT NULL,
  options JSONB NOT NULL,
  answer TEXT NOT NULL,
  version_tag TEXT NOT NULL,
  image_url TEXT
);
```

## 🖼 Image Management

Images are stored in Supabase Storage and referenced in the database as full URLs:

- Traffic signs, road situations, and driving scenarios
- Images automatically display in quiz questions when available
- Manual image URL management through database updates

## 📱 App Structure

```
app/
├── page.js              # Landing page with auth
├── layout.js            # Root layout
├── quiz/
│   ├── page.js          # Quiz setup form
│   └── test/page.js     # Interactive quiz test
├── home/page.js         # User dashboard
└── api/
    ├── auth/[...auth0]/ # Auth0 handlers
    ├── me/              # User session
    └── start-test/      # Quiz generation
```

## 🔐 Authentication Flow

1. **Login**: Users authenticate via Auth0
2. **Session**: JWT tokens with Auth0 fallback
3. **Protection**: Quiz routes require authentication
4. **Logout**: Secure session termination

## 🧪 Testing Process

1. **Start Quiz**: Select preferences and generate 30 random questions
2. **Take Test**: Answer questions with optional images
3. **Real-time Scoring**: Track correct/incorrect answers
4. **Results**: Pass (25+ correct) or Fail (6+ incorrect)
5. **Retry**: Restart with new question set

## 🚀 Deployment

Ready for deployment on Vercel:

```bash
npm run build
npm run start
```

## 📄 License

This project is for educational purposes. Driving test content may be subject to copyright by Alberta Transportation.

---

**Note**: This app uses real Alberta Class 7 driving test questions. Always refer to official Alberta Transportation resources for the most current information.
