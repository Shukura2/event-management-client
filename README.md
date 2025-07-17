# Agenda - Event Management Solution

A client side solution built with Next.js and Tailwind CSS that displays upcoming events and all necessary informations about the event. It also allows event organizers (admin) to manage events by uploading, editing and deleting events.

![Agenda Application Screenshot](./public/app-shot.png)

## Features 
For Attendees
- Attend desired upcoming event 
- Authentication (Google Sign-In)
- Add feedback and ratings

For Admin
- Authentication (Google Sign-In) 
- Create events 
- Get informations of attendees for specific event
- Send feedback request to attenders of event 

## Getting Started 

### Prerequisite 
- Node.js (v18+)
- npm or yarn 

### Installation 

```bash 
git clone https://github.com/Shukura2/event-management-client.git
cd event-management-client
npm install 
npm run dev 
```

### Environment Variable 
create a `.env.local` file in the root directory and add:
```env
NEXT_PUBLIC_API_BASE_URL=your-api-key
API_URL=api-url
GOOGLE_ID=google-id
GOOGLE_SECRET=google-secret
NEXTAUTH_SECRET=nextauth-secret 
``` 

## Usage 
For Attendees
- Signin with your Google account
- Pick event of your choice 
- Click Attening event

For Admin 
- Signin with your Google account 
- Click the 'Have Admin Access' button to change user role
- Login 

## Built with
- Next.js
- Tailwind CSS 
- NextAuth.js 
- Typescript.js 

## Contributing 
Pull requests are welcomed for major changes, please open an issue first to discuss what you would like to change. 