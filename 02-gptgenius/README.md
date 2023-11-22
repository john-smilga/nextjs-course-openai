## Create Next App

```sh
npx create-next-app@latest appName

```

## Libraries

```sh
npm install @clerk/nextjs@4.26.1 @prisma/client@5.5.2 @tanstack/react-query@5.8.1 @tanstack/react-query-devtools@5.8.1 axios@1.6.1  openai@4.14.2   react-hot-toast@2.4.1 react-icons@4.11.0
```

```sh
npm install -D @tailwindcss/typography@0.5.10  daisyui@3.9.4 prisma@5.5.2
```

## DaisyUI

- remove default code from globals.css
  tailwind.config.js

```js
{
plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
```

## Challenge - Create Pages

- create following pages - chat, profile, tours
- group them together with route group (dashboard)
- setup one layout file for all three pages

## Challenge - Home Page

- setup title and description in the layout
- code home page (DaisyUI Hero Component)

## Solution - Home Page

app/layout.js

```js
export const metadata = {
  title: 'GPTGenius',
  description:
    'GPTGenius: Your AI language companion. Powered by OpenAI, it enhances your conversations, content creation, and more!',
};
```

app/page.js

```js
import Link from 'next/link';
const HomePage = () => {
  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h1 className='text-6xl font-bold text-primary'>GPTGenius</h1>
          <p className='py-6 text-lg leading-loose'>
            GPTGenius: Your AI language companion. Powered by OpenAI, it
            enhances your conversations, content creation, and more!
          </p>
          <Link href='/chat' className='btn btn-secondary '>
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
```

## Clerk

(Clerk Docs)[https://clerk.com/]

- create account
- create new application
- complete Next.js setup

```sh
npm install @clerk/nextjs
```

```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = your_publishable_key;
CLERK_SECRET_KEY = your_secret_key;
```

Environment variables with this `NEXT_PUBLIC_` prefix are exposed to client-side JavaScript code, while those without the prefix are only accessible on the server-side and are not exposed to the client-side code.

```sh
NEXT_PUBLIC_
```

```js
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
```

layout.js

```js
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

middleware.ts

```js
import { authMiddleware } from '@clerk/nextjs';

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ['/'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
```

## Challenge - Custom SignUp and SignIn Pages

- follow the docs and setup custom pages
- use clerk's component

app/sign-up/[[...sign-up]]/page.js

```js
import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <SignUp />
    </div>
  );
};
export default SignUpPage;
```

app/sign-in/[[...sign-in]]/page.js

```js
import { SignIn } from '@clerk/nextjs';

const SignInPage = () => {
  return (
    <div className='min-h-screen flex justify-center items-center'>
      <SignIn />
    </div>
  );
};
export default SignInPage;
```

.env.local

```js
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/chat
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/chat
```

## React Icons

(React Icons )[https://react-icons.github.io/react-icons/]

```sh
npm install react-icons --save
```

```js
import { FaBeer } from 'react-icons/fa';

<FaBeer>

```

## Challenge - Setup Dashboard Layout

- setup layout for for all pages
- DaisyUI Drawer Component
  [DaisyUI](https://daisyui.com/components/drawer/)

## Solution

- create components/sidebar

layout.js

```js
import { FaBarsStaggered } from 'react-icons/fa6';
import Sidebar from '@/components/Sidebar';
const layout = ({ children }) => {
  return (
    <div className='drawer lg:drawer-open'>
      <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content'>
        {/* Page content here */}
        <label
          htmlFor='my-drawer-2'
          className='drawer-button lg:hidden fixed top-6 right-6'
        >
          <FaBarsStaggered className='w-8 h-8 text-primary' />
        </label>
        <div className='bg-base-200 px-8 py-12 min-h-screen'>{children}</div>
      </div>
      <div className='drawer-side'>
        <label
          htmlFor='my-drawer-2'
          aria-label='close sidebar'
          className='drawer-overlay'
        ></label>
        <Sidebar />
      </div>
    </div>
  );
};
export default layout;
```

## Sidebar

- create SidebarHeader, NavLinks, MemberProfile

Sidebar.jsx

```js
import SidebarHeader from './SidebarHeader';
import NavLinks from './NavLinks';
import MemberProfile from './MemberProfile';

const Sidebar = () => {
  return (
    <div className='px-4 w-80 min-h-full bg-base-300 py-12 grid grid-rows-[auto,1fr,auto] '>
      {/* first row */}
      <SidebarHeader />
      {/* second row */}
      <NavLinks />
      {/* third row */}
      <MemberProfile />
    </div>
  );
};
export default Sidebar;
```

## SidebarHeader

- create ThemeToggle

```js
import ThemeToggle from './ThemeToggle';
import { SiOpenaigym } from 'react-icons/si';

const SidebarHeader = () => {
  return (
    <div className='flex items-center mb-4 gap-4 px-4'>
      <SiOpenaigym className='w-10 h-10 text-primary' />
      <h2 className='text-xl font-extrabold text-primary mr-auto'>GPTGenius</h2>
      <ThemeToggle />
    </div>
  );
};
export default SidebarHeader;
```

## Challenge - NavLinks

1. **Import Dependencies:**

   - Import the `Link` component from `next/link`.

2. **Define Navigation Links:**

   - Create an array named `links` that contains objects representing navigation links. Each object should have a `href` property specifying the link's destination and a `label` property for the link's text label.

3. **Create the NavLinks Component:**

   - Define a functional component named `NavLinks`.

4. **Render Navigation Links:**

   - Within the component, render an unordered list (`<ul>`) with a class of `'menu text-base-content'`.

   - Use the `map` function to iterate through the `links` array and generate list items (`<li>`) for each link.

   - For each link object in the `links` array, create a `Link` component with the `href` attribute set to the link's `href` property.

   - Display the link's label (`link.label`) as the text content of the `Link` component.

This component is responsible for rendering navigation links based on the `links` array. It uses the `next/link` package to create client-side navigation links in a Next.js application. The navigation links are generated dynamically based on the `links` array.

## Solution - NavLinks

```js
import Link from 'next/link';
const links = [
  { href: '/chat', label: 'chat' },
  { href: '/tours', label: 'tours' },
  { href: '/tours/new-tour', label: 'new tour' },
  { href: '/profile', label: 'profile' },
];

const NavLinks = () => {
  return (
    <ul className='menu  text-base-content'>
      {links.map((link) => {
        return (
          <li key={link.href}>
            <Link href={link.href} className='capitalize'>
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default NavLinks;
```

## Challenge - MemberProfile

1. **Import Dependencies:**

   - Import the necessary dependencies at the top of the file:
     - `UserButton`, `currentUser`, and `auth` from `@clerk/nextjs`.

2. **Create the MemberProfile Component:**

   - Define an asynchronous functional component named `MemberProfile`.

3. **Fetch Current User:**

   - Inside the component, use the `currentUser()` function to asynchronously fetch the currently authenticated user and store it in the `user` variable.

4. **Get User ID:**

   - Use the `auth()` function to extract the `userId` from the authentication context.

5. **Render User Profile:**

   - Render a `div` element containing the user's profile information.
   - Include a `UserButton` component, which provides a button for signing out and redirects to the specified URL (`'/'` in this case) after sign-out.
   - Display the user's email address using `user.emailAddresses[0].emailAddress`.

This component fetches the currently authenticated user and displays their email address along with a sign-out button. It uses the `@clerk/nextjs` library for authentication and user management in a Next.js application.

## Solution - MemberProfile

```js
import { UserButton, currentUser, auth } from '@clerk/nextjs';
const MemberProfile = async () => {
  const user = await currentUser();
  const { userId } = auth();
  return (
    <div className='px-4 flex items-center gap-2'>
      <UserButton afterSignOutUrl='/' />
      <p>{user.emailAddresses[0].emailAddress}</p>
    </div>
  );
};
export default MemberProfile;
```

## Challenge - ThemeToggle

- setup themes in tailwind.config.js

1. **Import Dependencies:**

   - Import the necessary dependencies at the top of the file:
     - `BsMoonFill` and `BsSunFill` from 'react-icons/bs'.
     - `useState` from 'react'.

2. **Define Theme Options:**

   - Create an object named `themes` to hold theme options. In this example, there are two themes: 'winter' and 'dracula'.

3. **Initialize Theme State:**

   - Use the `useState` hook to initialize the `theme` state variable with the default theme, such as `themes.winter`.

4. **Toggle Theme Function:**

   - Define a function named `toggleTheme` to handle theme toggling.
   - Inside the function, check the current theme (`theme`) and switch it to the opposite theme (`themes.dracula` if it's 'winter', or `themes.winter` if it's 'dracula').
   - Update the document's root element (`document.documentElement`) with the new theme by setting the 'data-theme' attribute.

5. **Button Rendering:**

   - Render a button element with an `onClick` event handler that triggers the `toggleTheme` function.

6. **Conditional Icon Rendering:**

   - Inside the button, conditionally render icons based on the current theme.
   - If the theme is 'winter', render a moon icon (e.g., `<BsMoonFill />`).
   - If the theme is 'dracula', render a sun icon (e.g., `<BsSunFill />`).

This component allows users to toggle between two themes (e.g., light and dark) by clicking the button, which updates the `data-theme` attribute on the document's root element and changes the displayed icon accordingly.

## Solution - ThemeToggle

tailwind.config.js

```js
{
  daisyui: {
    themes: ['winter', 'dracula'],
  },
}

```

```js
'use client';

import { BsMoonFill, BsSunFill } from 'react-icons/bs';
import { useState } from 'react';

const themes = {
  winter: 'winter',
  dracula: 'dracula',
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(themes.winter);

  const toggleTheme = () => {
    const newTheme = theme === themes.winter ? themes.dracula : themes.winter;
    document.documentElement.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <button onClick={toggleTheme} className='btn btn-sm btn-outline'>
      {theme === 'winter' ? (
        <BsMoonFill className='h-4 w-4 ' />
      ) : (
        <BsSunFill className='h-4 w-4' />
      )}
    </button>
  );
};
export default ThemeToggle;
```

## Challenge - Profile Page

1. **Import Dependencies:**

   - Import the `UserProfile` component from `'@clerk/nextjs'`.

2. **Render the UserProfile Component:**

   - Within the component's render function, return the `UserProfile` component.

This component serves as a page for displaying the user's profile information. It utilizes the `UserProfile` component from the `'@clerk/nextjs'` package to render the user's profile details. This is a common pattern in Next.js applications for handling user authentication and profile management.

## Solution - Profile Page

```js
import { UserProfile } from '@clerk/nextjs';
const UserProfilePage = () => {
  return <UserProfile />;
};
export default UserProfilePage;
```

## Challenge - Add React-Hot-Toast Library

- setup app/providers.js
- import/add Toaster component
- wrap {children} in layout.js

## Solution - Add React-Hot-Toast Library

app/providers.jsx

```js
'use client';
import { Toaster } from 'react-hot-toast';
export default function Providers({ children }) {
  return (
    <>
      <Toaster position='top-center' />
      {children}
    </>
  );
}
```

app/layout.js

```js
<Providers>{children}</Providers>
```

## Challenge - Chat Structure

1. **Import Dependencies:**

   - Import the necessary dependencies, including `useState` from 'react' and `toast` from 'react-hot-toast'.

2. **State Management:**

   - Initialize state variables using the `useState` hook:
     - `text`: to manage the text input for composing messages.
     - `messages`: to manage the list of messages.

3. **Handle Form Submission:**

   - Implement a `handleSubmit` function to handle form submissions when sending messages. It should prevent the default form behavior.

4. **Render UI Elements:**

   - Render the chat interface with the following components and elements:
     - A 'messages' header using an `<h2>` element.
     - A `<form>` element for composing and sending messages.
     - Inside the form:
       - An `<input>` element for entering messages, with event handling to update the `text` state.
       - A 'Send' button to submit messages.

This component represents a chat interface where users can send messages. It uses React state to manage the input text and a list of messages. When a message is submitted, it prevents the default form behavior (form submission) and handles message composition.

## Solution - Chat Structure

- setup components/Chat.jsx
- import in app/(dashboard)/chat/page.js

```js
'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Chat = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]'>
      <div>
        <h2 className='text-5xl'>messages</h2>
      </div>
      <form onSubmit={handleSubmit} className='max-w-4xl pt-12'>
        <div className='join w-full'>
          <input
            type='text'
            placeholder='Message GeniusGPT'
            className='input input-bordered join-item w-full'
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
          />
          <button className='btn btn-primary join-item' type='submit'>
            ask question
          </button>
        </div>
      </form>
    </div>
  );
};
export default Chat;
```

## React Query

### Install

```sh
npm i @tanstack/react-query @tanstack/react-query-devtools

```

### Setup

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // the data will be considered fresh for 1 minute
      staleTime: 60 * 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
```

### UseQuery

```js
const Items = () => {
  const { isPending, isError, data } = useQuery({
    queryKey: ['tasks'],
    // A query function can be literally any function that returns a promise.
    queryFn: () => axios.get('/someUrl'),
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error...</p>;
  }
  return (
    <div className='items'>
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
```

### UseMutation

```js
const { mutate, isPending, data } = useMutation({
  mutationFn: (taskTitle) => axios.post('/', { title: taskTitle }),
  onSuccess: () => {
    // do something
  },
  onError: () => {
    // do something
  },
});

const handleSubmit = (e) => {
  e.preventDefault();
  mutate(newItemName);
};
```

## React Query and Next.js

- WE CAN USE SERVER ACTIONS 🚀🚀🚀🚀🚀🚀

  app/providers.jsx

```js
// In Next.js, this file would be called: app/providers.jsx
'use client';

// We can not useState or useRef in a server component, which is why we are
// extracting this part out into it's own file with 'use client' on top
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
export default function Providers({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position='top-center' />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

- WRAP EACH PAGE

chat/page.js

```js
import Chat from '@/components/Chat';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
export default async function ChatPage() {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Chat />
    </HydrationBoundary>
  );
}
```

utils/actions.js

```js
'use server';

export const generateChatResponse = async (chatMessage) => {
  console.log(chatMessage);
  return 'awesome';
};
```

components/Chat.jsx

```js
'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { generateChatResponse } from '@/utils/actions';
const Chat = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  const { mutate } = useMutation({
    mutationFn: (message) => generateChatResponse(message),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(text);
  };
};
```

## OPENAI API

[Pricing](https://openai.com/pricing)

```sh
npm i openai
```

- create API KEY
- save in .env.local

```js
OPENAI_API_KEY=....
```

utils/actions.js

```js
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateChatResponse = async (message) => {
  const response = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'you are a helpful assistant' },
      { role: 'user', content: message };
    ],
    model: 'gpt-3.5-turbo',
    temperature: 0,
  });
  console.log(response.choices[0].message)
  console.log(response);
  return 'awesome';
};
```

## Context !!!

utils/actions

```js
export const generateChatResponse = async (chatMessages) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'you are a helpful assistant' },
        ...chatMessages,
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0,
    });
    return response.choices[0].message;
  } catch (error) {
    return null;
  }
};
```

Chat.jsx

```js
const Chat = () => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const { mutate, isPending, data } = useMutation({
    mutationFn: (query) => generateChatResponse([...messages, query]),

    onSuccess: (data) => {
      if (!data) {
        toast.error('Something went wrong...');
        return;
      }
      setMessages((prev) => [...prev, data]);
    },
    onError: (error) => {
      toast.error('Something went wrong...');
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = { role: 'user', content: text };
    mutate(query);
    setMessages((prev) => [...prev, query]);
    setText('');
  };
};
```

## Messages

Chat.jsx

```js
return (
  <div>
    {messages.map(({ role, content }, index) => {
      const avatar = role == 'user' ? '👤' : '🤖';
      const bcg = role == 'user' ? 'bg-base-200' : 'bg-base-100';
      return (
        <div
          key={index}
          className={` ${bcg} flex py-6 -mx-8 px-8
               text-xl leading-loose border-b border-base-300`}
        >
          <span className='mr-4 '>{avatar}</span>
          <p className='max-w-3xl'>{content}</p>
        </div>
      );
    })}
    {isPending && <span className='loading'></span>}
  </div>
);

return (
  <button
    className='btn btn-primary join-item'
    type='submit'
    disabled={isPending}
  >
    {isPending ? 'please wait' : 'ask question'}
  </button>
);
```

## Challenge - New Tour Page

- create NewTour and TourInfo components
- create New Tour page : app/(dashboard)/tours/new-tour/page.js
- add react query boilerplate
- render NewTour component
- setup form with two inputs city and country

## Solution - New Tour Page

tours/new-tour/page.js

```js
import NewTour from '@/components/NewTour';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
export default async function ChatPage() {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewTour />
    </HydrationBoundary>
  );
}
```

```js
'use client';

import toast from 'react-hot-toast';
import TourInfo from '@/components/TourInfo';

const NewTour = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData.entries());
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='max-w-2xl'>
        <h2 className=' mb-4'>Select your dream destination</h2>
        <div className='join w-full'>
          <input
            type='text'
            className='input input-bordered join-item w-full'
            placeholder='city'
            name='city'
            required
          />
          <input
            type='text'
            className='input input-bordered join-item w-full'
            placeholder='country'
            name='country'
            required
          />
          <button className='btn btn-primary join-item' type='submit'>
            generate tour
          </button>
        </div>
      </form>
      <div className='mt-16'>
        <TourInfo />
      </div>
    </>
  );
};
export default NewTour;
```

## GenerateTourResponse Setup

actions.js

```js
export const getExistingTour = async ({ city, country }) => {
  return null;
};

export const generateTourResponse = async ({ city, country }) => {
  return null;
};

export const createNewTour = async (tour) => {
  return null;
};
```

NewTour.jsx

```js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createNewTour,
  generateTourResponse,
  getExistingTour,
} from '@/utils/actions';
import toast from 'react-hot-toast';
import TourInfo from '@/components/TourInfo';

const NewTour = () => {
  const {
    mutate,
    isPending,
    data: tour,
  } = useMutation({
    mutationFn: async (destination) => {
      const newTour = await generateTourResponse(destination);
      if (newTour) {
        return newTour;
      }
      toast.error('No matching city found...');
      return null;
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData.entries());
    mutate(destination);
  };

  if (isPending) {
    return <span className='loading loading-lg'></span>;
  }
  return (
    <>
      <form onSubmit={handleSubmit} className='max-w-2xl'>
        <h2 className=' mb-4'>Select your dream destination</h2>
        <div className='join w-full'>
          <input
            type='text'
            className='input input-bordered join-item w-full'
            placeholder='city'
            name='city'
            required
          />
          <input
            type='text'
            className='input input-bordered join-item w-full'
            placeholder='country'
            name='country'
            required
          />
          <button
            className='btn btn-primary join-item'
            type='submit'
            disabled={isPending}
          >
            {isPending ? 'please wait...' : 'generate tour'}
          </button>
        </div>
      </form>
      <div className='mt-16'>
        <div className='mt-16'>{tour ? <TourInfo tour={tour} /> : null}</div>
      </div>
    </>
  );
};
export default NewTour;
```

## Prompt

Later we will use shorter prompt

```js
{
  "tour": {
    ...
   "stops": ["stop name ", "stop name","stop name"]
  }
}
```

```js
const query = `Find a exact ${city} in this exact ${country}.
If ${city} and ${country} exist, create a list of things families can do in this ${city},${country}. 
Once you have a list, create a one-day tour. Response should be  in the following JSON format: 
{
  "tour": {
    "city": "${city}",
    "country": "${country}",
    "title": "title of the tour",
    "description": "short description of the city and tour",
    "stops": ["short paragraph on the stop 1 ", "short paragraph on the stop 2","short paragraph on the stop 3"]
  }
}
"stops" property should include only three stops.
If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country},   return { "tour": null }, with no additional characters.`;
```

## GenerateTourResponse

```js
export const generateTourResponse = async ({ city, country }) => {
  const query = `Find a exact ${city} in this exact ${country}.
If ${city} and ${country} exist, create a list of things families can do in this ${city},${country}. 
Once you have a list, create a one-day tour. Response should be  in the following JSON format: 
{
  "tour": {
    "city": "${city}",
    "country": "${country}",
    "title": "title of the tour",
    "description": "short description of the city and tour",
    "stops": ["short paragraph on the stop 1 ", "short paragraph on the stop 2","short paragraph on the stop 3"]
  }
}
"stops" property should include only three stops.
If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country},   return { "tour": null }, with no additional characters.`;

  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'you are a tour guide' },
        { role: 'user', content: query },
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0,
    });
    // potentially returns a text with error message
    const tourData = JSON.parse(response.choices[0].message.content);

    if (!tourData.tour) {
      return null;
    }

    return tourData.tour;
  } catch (error) {
    console.log(error);
    return null;
  }
};
```

## Shorter Prompt

```js
{
  "tour": {
    ...
   "stops": ["stop name ", "stop name","stop name"]
  }
}
```

## TourInfo

TourInfo.jsx

```js
const TourInfo = ({ tour }) => {
  const { title, description, stops } = tour;
  return (
    <div className='max-w-2xl'>
      <h1 className='text-4xl font-semibold mb-4'>{title}</h1>
      <p className='leading-loose mb-6'>{description}</p>
      <ul>
        {stops.map((stop) => {
          return (
            <li key={stop} className='mb-4 bg-base-100 p-4 rounded-xl'>
              <p className='text'>{stop}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default TourInfo;
```

## Add Prisma

```sh
npm install prisma --save-dev
npm install @prisma/client
```

```sh
npx prisma init
```

- ADD .ENV TO .GITIGNORE !!!!

## PlanetScale

## Model

```prisma
datasource db {
  provider     = "mysql"
  url          = env("DATABASE_URL")
  relationMode = "prisma"
}

generator client {
  provider = "prisma-client-js"
}

model Tour {
  id String @id @default(uuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  city String
  country String
  title String
  description String @db.Text
  image String? @db.Text
  stops Json
  @@unique([city, country])
}
```

```sh
npx prisma db push
```

```sh
npx prisma studio
```

@db.Text: This attribute is used to specify the type of the column in the underlying database. When you use @db.Text, you're telling Prisma that the particular field should be stored as a text column in the database. Text columns can store large amounts of string data, typically used for long-form text that exceeds the length limits of standard string columns. This is often used for descriptions, comments, JSON-formatted strings, etc.

@@unique: This attribute is used at the model level to enforce the uniqueness of a specific combination of fields within the database. In this case, @@unique([city, country]) ensures that no two rows in the table have the same combination of city and country. This means you can have multiple tours in the same city or country, but not multiple tours with the same city and country combination. It essentially acts as a composite unique constraint on the two fields.

## GetExistingTour and CreateNewTour

utils/db.ts

```js
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

actions.js

```js
export const getExistingTour = async ({ city, country }) => {
  return prisma.tour.findUnique({
    where: {
      city_country: {
        city,
        country,
      },
    },
  });
};

export const createNewTour = async (tour) => {
  return prisma.tour.create({
    data: tour,
  });
};
```

NewTour.jsx

```js
  const queryClient = useQueryClient();


 {
  mutationFn: async (destination) => {
      const existingTour = await getExistingTour(destination);
      if (existingTour) return existingTour;
      const newTour = await generateTourResponse(destination);
      if (newTour) {
        await createNewTour(newTour);
        queryClient.invalidateQueries({ queryKey: ['tours'] });
        return newTour;
      }
      toast.error('No matching city found...');
      return null;
    },
}
```

## GetAllTours

actions.js

```js
export const getAllTours = async (searchTerm) => {
  if (!searchTerm) {
    const tours = await prisma.tour.findMany({
      orderBy: {
        city: 'asc',
      },
    });

    return tours;
  }

  const tours = await prisma.tour.findMany({
    where: {
      OR: [
        {
          city: {
            contains: searchTerm,
          },
        },
        {
          country: {
            contains: searchTerm,
          },
        },
      ],
    },
    orderBy: {
      city: 'asc',
    },
  });
  return tours;
};
```

## All Tours Page

- create ToursPage ToursList and TourCard components
- create loading.js in app/tours

```js
import ToursPage from '@/components/ToursPage';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getAllTours } from '@/utils/actions';
export default async function AllToursPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['tours'],
    queryFn: () => getAllTours(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ToursPage />
    </HydrationBoundary>
  );
}
```

## ToursPage

```js
'use client';
import { getAllTours } from '@/utils/actions';
import { useQuery } from '@tanstack/react-query';
import ToursList from './ToursList';

const ToursPage = () => {
  const { data, isPending } = useQuery({
    queryKey: ['tours'],
    queryFn: () => getAllTours(),
  });

  return (
    <>
      {isPending ? (
        <span className=' loading'></span>
      ) : (
        <ToursList data={data} />
      )}
    </>
  );
};
export default ToursPage;
```

## ToursList

```js
import TourCard from './TourCard';
const ToursList = ({ data }) => {
  if (data.length === 0) return <h4 className='text-lg '>No tours found...</h4>;

  return (
    <div className='grid sm:grid-cols-2  lg:grid-cols-4 gap-8'>
      {data.map((tour) => {
        return <TourCard key={tour.id} tour={tour} />;
      })}
    </div>
  );
};
export default ToursList;
```

## TourCard

```js
import Link from 'next/link';
const TourCard = ({ tour }) => {
  const { city, title, id, country } = tour;

  return (
    <Link
      href={`/tours/${id}`}
      className='card card-compact rounded-xl bg-base-100'
    >
      <div className='card-body items-center text-center'>
        <h2 className='card-title text-center'>
          {city}, {country}
        </h2>
      </div>
    </Link>
  );
};
export default TourCard;
```

## Search Functionality

```js
'use client';
import { getAllTours } from '@/utils/actions';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ToursList from './ToursList';

const ToursPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const { data, isPending } = useQuery({
    queryKey: ['tours', searchValue],
    queryFn: () => getAllTours(searchValue),
  });

  return (
    <>
      <form className='max-w-lg mb-12'>
        <div className='join w-full'>
          <input
            type='text'
            placeholder='enter city or country here..'
            className='input input-bordered join-item w-full'
            name='search'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            required
          />
          <button
            className='btn btn-primary join-item'
            type='button'
            disabled={isPending}
            onClick={() => setSearchValue('')}
          >
            {isPending ? 'please wait' : 'reset'}
          </button>
        </div>
      </form>
      {isPending ? (
        <span className=' loading'></span>
      ) : (
        <ToursList data={data} />
      )}
    </>
  );
};
export default ToursPage;
```

## Challenge - Single Tour Page

- setup page and get info on specific tour

## Solution - Single Tour Page

- create app/tours/[id]/page.js

actions.js

```js
export const getSingleTour = async (id) => {
  return prisma.tour.findUnique({
    where: {
      id,
    },
  });
};
```

```js
import TourInfo from '@/components/TourInfo';
import { getSingleTour } from '@/utils/actions';
import Link from 'next/link';
import { redirect } from 'next/navigation';
const SingleTourPage = async ({ params }) => {
  const tour = await getSingleTour(params.id);
  if (!tour) {
    redirect('/tours');
  }
  return (
    <div>
      <Link href='/tours' className='btn btn-secondary mb-12'>
        back to tours
      </Link>
      <TourInfo tour={tour} />
    </div>
  );
};
export default SingleTourPage;
```

## Images

- url are valid for 2 hours
- way more expensive than chat

actions.js

```js
export const generateTourImage = async ({ city, country }) => {
  try {
    const tourImage = await openai.images.generate({
      prompt: `a panoramic view of the ${city} ${country}`,
      n: 1,
      size: '512x512',
    });
    return tourImage?.data[0]?.url;
  } catch (error) {
    return null;
  }
};
```

app/tours/[id]/page.js

```js
import TourInfo from '@/components/TourInfo';
import { generateTourImage } from '@/utils/actions';
import prisma from '@/utils/prisma';
import Link from 'next/link';
import Image from 'next/image';

const SingleTourPage = async ({ params }) => {
  const tour = await prisma.tour.findUnique({
    where: {
      id: params.id,
    },
  });

  const tourImage = await generateTourImage({
    city: tour.city,
    country: tour.country,
  });
  return (
    <div>
      <Link href='/tours' className='btn btn-secondary mb-12'>
        back to tours
      </Link>

      {tourImage ? (
        <div>
          <Image
            src={tourImage}
            width={300}
            height={300}
            className='rounded-xl shadow-xl mb-16 h-96 w-96 object-cover'
            alt={tour.title}
            priority
          />
        </div>
      ) : null}

      <TourInfo tour={tour} />
    </div>
  );
};
export default SingleTourPage;
```

next.config.js

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oaidalleapiprodscus.blob.core.windows.net',
        port: '',
        pathname: '/private/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
```

## Alternative

```sh
npm i axios
```

.env.local

```
UNSPLASH_API_KEY=7pmB29Xi9rOWHhYpvtuc4edchzh1w0eawUjJwNAqngA
```

```js
import TourInfo from '@/components/TourInfo';
import { generateTourImage } from '@/utils/actions';
import prisma from '@/utils/prisma';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;

const SingleTourPage = async ({ params }) => {
  const tour = await prisma.tour.findUnique({
    where: {
      id: params.id,
    },
  });

  const { data } = await axios(`${url}${tour.city}`);
  const tourImage = data?.results[0]?.urls?.raw;

  // const tourImage = await generateTourImage({
  //   city: tour.city,
  //   country: tour.country,
  // });
  return (
    <div>
      <Link href='/tours' className='btn btn-secondary mb-12'>
        back to tours
      </Link>

      {tourImage ? (
        <div>
          <Image
            src={tourImage}
            width={300}
            height={300}
            className='rounded-xl shadow-xl mb-16 h-96 w-96 object-cover'
            alt={tour.title}
            priority
          />
        </div>
      ) : null}

      <TourInfo tour={tour} />
    </div>
  );
};
export default SingleTourPage;
```

## Remove SingIn and SignUp Pages

- delete folders
- remove env variables

## Challenge - Token Logic

OPTIONAL !!!

INVOLVES REFACTORING !!!!

- set max_tokens in chat
- create Token model
- assign some token amount to user
- check token amount before request
- subtract after successful request

## Solution - Token Logic

### Max_Tokens

actions.js

```js
export const generateChatResponse = async (chatMessages) => {
  try {
    const response = await openai.chat.completions.create({
      max_tokens: 100,
    });

    return response.choices[0].message;
  } catch (error) {
    console.log(error);
    return null;
  }
};
```

### Clerk Logic

- remove ability to delete account

  - Email, Phone, Username
    - Allow users to delete their accounts (false)

- block disposable emails

  - Restrictions
    - Block sign-ups that use disposable email addresses

- remove all users

### Token Model

```prisma
model Token {
  clerkId String @id
  tokens Int @default (1000)
}
```

- migrate

### Actions

actions.js

```js
export const fetchUserTokensById = async (clerkId) => {
  const result = await prisma.token.findUnique({
    where: {
      clerkId,
    },
  });

  return result?.tokens;
};

export const generateUserTokensForId = async (clerkId) => {
  const result = await prisma.token.create({
    data: {
      clerkId,
    },
  });
  return result?.tokens;
};

export const fetchOrGenerateTokens = async (clerkId) => {
  const result = await fetchUserTokensById(clerkId);
  if (result) {
    return result.tokens;
  }
  return (await generateUserTokensForId(clerkId)).tokens;
};

export const subtractTokens = async (clerkId, tokens) => {
  const result = await prisma.token.update({
    where: {
      clerkId,
    },
    data: {
      tokens: {
        decrement: tokens,
      },
    },
  });
  revalidatePath('/profile');
  // Return the new token value
  return result.tokens;
};
```

### Generate and Show Tokens

components/MemberProfile.jsx

```js
import { fetchOrGenerateTokens } from '@/utils/actions';
import { UserButton, auth, currentUser } from '@clerk/nextjs';

const MemberProfile = async () => {
  const user = await currentUser();
  const { userId } = auth();
  await fetchOrGenerateTokens(userId);
  return (
    <div className='px-4 flex items-center gap-2'>
      <UserButton afterSignOutUrl='/' />
      <p>{user.emailAddresses[0].emailAddress}</p>
    </div>
  );
};
export default MemberProfile;
```

profile/page.js

```js
import { fetchUserTokensById } from '@/utils/actions';
import { UserProfile, auth } from '@clerk/nextjs';

const ProfilePage = async () => {
  const { userId } = auth();
  const currentTokens = await fetchUserTokensById(userId);
  return (
    <div>
      <h2 className='mb-8 ml-8 text-xl font-extrabold'>
        Token Amount : {currentTokens}
      </h2>
      <UserProfile />
    </div>
  );
};
export default ProfilePage;
```

### Tours

actions.js

```js
export const generateTourResponse = () => {
  return { tour: tourData.tour, tokens: response.usage.total_tokens };
};
```

components/NewTour.jsx

```js
'use client';

import {
  fetchUserTokensById,
  subtractTokens,
} from '@/utils/actions';
import { useAuth } from '@clerk/nextjs';
const NewTour = () => {


  const { userId } = useAuth();

  const {
    mutate,
    isPending,
    data: tour,
  } = useMutation({
    mutationFn: async (destination) => {
      const existingTour = await getExistingTour(destination);
      if (existingTour) return existingTour;

      const currentTokens = await fetchUserTokensById(userId);

      if (currentTokens < 300) {
        toast.error('Token balance too low....');
        return;
      }

      const newTour = await generateTourResponse(destination);
      if (!newTour) {
        toast.error('No matching city found...');
        return null;
      }

      const response = await createNewTour(newTour.tour);
      queryClient.invalidateQueries({ queryKey: ['tours'] });
      const newTokens = await subtractTokens(userId, newTour.tokens);
      toast.success(`${newTokens} tokens remaining...`);
      return newTour.tour;
    },
  });
  ....
}
```

### Chat

actions.js

```js
const generateChatResponse = () => {
  return {
    message: response.choices[0].message,
    tokens: response.usage.total_tokens,
  };
};
```

components/Chat.jsx

```js
'use client';

import { fetchUserTokensById, subtractTokens } from '@/utils/actions';

import { useAuth } from '@clerk/nextjs';
const Chat = () => {
  const { userId } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: async (query) => {
      const currentTokens = await fetchUserTokensById(userId);

      if (currentTokens < 100) {
        toast.error('Token balance too low....');
        return;
      }

      const response = await generateChatResponse([...messages, query]);

      if (!response) {
        toast.error('Something went wrong...');
        return;
      }
      setMessages((prev) => [...prev, response.message]);
      const newTokens = await subtractTokens(userId, response.tokens);
      toast.success(`${newTokens} tokens remaining...`);
    },
  });
...
};
export default Chat;
```

## Deploy

package.json

```js

"scripts": {
    "build": "npx prisma generate && next build",
  },
```

- shorter prompt
  "stops":["stop 1","stop 2", "stop 3"]

- planetscale
- github repo
- vercel
