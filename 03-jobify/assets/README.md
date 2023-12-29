# Jobify

## Create New Next.js Project

```sh
npx create-next-app@latest projectName
```

- choose typescript and eslint

## Assets

- project repo
  - 03-jobify/assets

## Libraries

```sh
   npm install @clerk/nextjs@^4.27.7 @prisma/client@^5.7.0 @tanstack/react-query@^5.14.0 @tanstack/react-query-devtools@^5.14.0 dayjs@^1.11.10 next-themes@^0.2.1 recharts@^2.10.3
   npm install prisma@^5.7.0 -D
```

## shadcn/ui

[Docs](https://ui.shadcn.com/)

- follow Next.js install steps (starting with 2)
- open another terminal window (optional)

```sh
npx shadcn-ui@latest init
```

- setup Button

```sh
npx shadcn-ui@latest add button
```

[Icons](https://lucide.dev/guide/packages/lucide-react)

page.tsx

```tsx
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

export default function Home() {
  return (
    <div className='h-screen flex items-center justify-center'>
      <Button>default button</Button>
      <Button variant='outline' size='icon'>
        <Camera />
      </Button>
    </div>
  );
}
```

## Layout and Home Page

- setup title and description
- add favicon
- setup home page

layout.tsx

```tsx
export const metadata: Metadata = {
  title: 'Jobify Dev',
  description: 'Job application tracking system for job hunters',
};
```

page.tsx

```tsx
import Image from 'next/image';
import Logo from '../assets/logo.svg';
import LandingImg from '../assets/main.svg';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
export default function Home() {
  return (
    <main>
      <header className='max-w-6xl mx-auto px-4 sm:px-8 py-6 '>
        <Image src={Logo} alt='logo' />
      </header>
      <section className='max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid lg:grid-cols-[1fr,400px] items-center'>
        <div>
          <h1 className='capitalize text-4xl md:text-7xl font-bold'>
            job <span className='text-primary'>tracking</span> app
          </h1>
          <p className='leading-loose max-w-md mt-4 '>
            I am baby wayfarers hoodie next level taiyaki brooklyn cliche blue
            bottle single-origin coffee chia. Aesthetic post-ironic venmo,
            quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
            narwhal.
          </p>
          <Button asChild className='mt-4'>
            <Link href='/add-job'>Get Started</Link>
          </Button>
        </div>
        <Image src={LandingImg} alt='landing' className='hidden lg:block ' />
      </section>
    </main>
  );
}
```

## Favicon and Logo (optional)

- [Favicon](https://favicon.io/)
- [Logo - Figma File](https://www.figma.com/community/file/1319010578601364983/jobify-logo-public)

## Setup Pages

- create add-job, jobs and stats pages
- group them in (dashboard)
- setup a layout file (just pass children)

(dashboard)/layout.tsx

```tsx
function layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
export default layout;
```

## Clerk Auth

- setup new app, configure fields - (or use existing)
- add ENV Vars
- wrap layout
- add middleware
- make '/' public
- restart dev server

layout.tsx

```tsx
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

middleware.tsx

```tsx
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

## Links Data

- create utils/links.tsx
- import three icons
- setup link type
- create an array of three links 'add-job', 'jobs', 'stats'
- each item needs to have an id, label, href

utils/links.tsx

```tsx
import { AreaChart, Layers, AppWindow } from 'lucide-react';

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const links: NavLink[] = [
  {
    href: '/add-job',
    label: 'add job',
    icon: <Layers />,
  },
  {
    href: '/jobs',
    label: 'all jobs',
    icon: <AppWindow />,
  },
  {
    href: '/stats',
    label: 'stats',
    icon: <AreaChart />,
  },
];

export default links;
```

## Dashboard Layout

- create following components :
  - Sidebar
  - Navbar
  - LinksDropdown
  - ThemeToggle
- render Sidebar and Navbar in dashboard/layout
- show sidebar only on big screen

dashboard/layout.tsx

```tsx
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

import { PropsWithChildren } from 'react';

function layout({ children }: PropsWithChildren) {
  return (
    <main className='grid lg:grid-cols-5'>
      {/* first-col hide on small screen */}
      <div className='hidden lg:block lg:col-span-1 lg:min-h-screen'>
        <Sidebar />
      </div>
      {/* second-col hide dropdown on big screen */}

      <div className='lg:col-span-4'>
        <Navbar />
        <div className='py-16 px-4 sm:px-8 lg:px-16'>{children}</div>
      </div>
    </main>
  );
}
export default layout;
```

## Sidebar

- render links and logo
- check the path, if active use different variant
  Sidebar.tsx

```tsx
'use client';
import Logo from '@/assets/images/logo.svg';
import links from '@/utils/links';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';
function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className='py-4 px-8 bg-muted h-full'>
      <Image src={Logo} alt='logo' className='mx-auto' />
      <div className='flex flex-col mt-20 gap-y-4'>
        {links.map((link) => {
          return (
            <Button
              asChild
              key={link.href}
              variant={pathname === link.href ? 'default' : 'link'}
            >
              <Link href={link.href} className='flex items-center gap-x-2 '>
                {link.icon} <span className='capitalize'>{link.label}</span>
              </Link>
            </Button>
          );
        })}
      </div>
    </aside>
  );
}
export default Sidebar;
```

## Navbar

Navbar.tsx

```tsx
import LinksDropdown from './LinksDropdown';
import { UserButton } from '@clerk/nextjs';
import ThemeToggle from './ThemeToggle';

function Navbar() {
  return (
    <nav className='bg-muted py-4 sm:px-16 lg:px-24 px-4 flex items-center justify-between'>
      <div>
        <LinksDropdown />
      </div>
      <div className='flex items-center gap-x-4'>
        <ThemeToggle />
        <UserButton afterSignOutUrl='/' />
      </div>
    </nav>
  );
}
export default Navbar;
```

## LinksDropdown

- render links in "Dropdown Menu" component
- [docs](https://ui.shadcn.com/docs/components/dropdown-menu)

LinksDropdown.tsx

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlignLeft } from 'lucide-react';
import { Button } from './ui/button';
import links from '@/utils/links';
import Link from 'next/link';
function DropdownLinks() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className='lg:hidden'>
        <Button variant='outline' size='icon'>
          <AlignLeft />

          <span className='sr-only'>Toggle links</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-52 lg:hidden '
        align='start'
        sideOffset={25}
      >
        {links.map((link) => {
          return (
            <DropdownMenuItem key={link.href}>
              <Link href={link.href} className='flex items-center gap-x-2 '>
                {link.icon} <span className='capitalize'>{link.label}</span>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default DropdownLinks;
```

## Theming

[Theming](https://ui.shadcn.com/docs/theming)
[Themes](https://ui.shadcn.com/themes)

- setup theme in globals.css

## Providers

- create providers.tsx
- wrap children in layout
- add suppressHydrationWarning prop

app/providers.tsx

```tsx
'use client';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
export default Providers;
```

app/layout

```tsx
<html lang='en' suppressHydrationWarning>
  <body className={inter.className}>
    <Providers>{children}</Providers>
  </body>
</html>
```

## Dark Mode

[Dark Mode](https://ui.shadcn.com/docs/dark-mode/next)

```sh
npm install next-themes

```

components/theme-provider.tsx

```tsx
'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

app/providers.tsx

```tsx
'use client';
import { ThemeProvider } from '@/components/theme-provider';
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  );
};
export default Providers;
```

ThemeToggle.tsx

```tsx
'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```
