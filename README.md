# Lokman Yılmaz - Clinical Psychologist Website

This project is the professional website of clinical psychologist Lokman Yılmaz. The site offers appointment management, blog posts, and contact features.

## 🚀 Features

- 📅 **Appointment System**

  - Online appointment booking
  - View available time slots
  - Appointment status tracking
  - Appointment management from admin panel

- 📝 **Blog**

  - Psychology-related articles
  - Content management from admin panel
  - Category-based filtering

- 📞 **Contact**

  - Contact form
  - Location information
  - Social media links

- 👨‍💼 **Admin Panel**
  - Appointment management
  - Blog content management
  - Contact messages management
  - Available time slots management

## 🛠️ Technologies

- **Frontend**

  - React
  - Next.js 14 (App Router)
  - TypeScript
  - Tailwind CSS
  - Shadcn UI
  - Radix UI

- **Backend**

  - Supabase
    - Database
    - Authentication
    - Real-time API

- **Other Tools**
  - date-fns (Date operations)
  - react-hook-form (Form management)
  - Zod (Form validation)
  - Sonner (Toast notifications)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn
- Supabase account

### Installation

1. Clone the project

```bash
git clone https://github.com/username/lokmanyilmaz.git
cd lokmanyilmaz
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables

```bash
cp .env.example .env.local
```

Update the `.env.local` file with your Supabase credentials.

4. Start the development server

```bash
npm run dev
# or
yarn dev
```

## 📝 Database Schema

### Appointments

- id: UUID
- date: Date
- time: String
- name: String
- email: String
- phone: String
- birthDate: Date
- note: String (optional)
- status: Enum (pending, confirmed, canceled)
- createdAt: Timestamp

### Available Time Slots

- id: UUID
- date: Date
- startTime: String
- endTime: String
- isBooked: Boolean
- createdAt: Timestamp

## 🔒 Security

- User authentication with Supabase Auth
- Row Level Security (RLS) policies
- Admin panel access control
- Form validations
- API security

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

Project Link: [https://github.com/ibrahimsengun](https://github.com/ibrahimsengun)
