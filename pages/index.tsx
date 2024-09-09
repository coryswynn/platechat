import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';

// Define the type for the icon prop
type IconProps = {
  className?: string;
};

// Define the type for the Feature component props
interface FeatureProps {
  icon: React.FC<IconProps>;
  title: string;
  description: string;
}

export default function Home() {
  const [plateNumber, setPlateNumber] = useState('');
  const router = useRouter();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (plateNumber.trim()) {
      router.push(`/plates/${plateNumber.trim().toUpperCase()}`);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <section className="flex-grow flex items-center justify-center w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="space-y-4 mb-8 w-full">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                Welcome to PlateChat
              </h1>
              <p className="max-w-3xl text-zinc-200 text-xl dark:text-zinc-100 mx-auto">
                Share and discuss experiences on the road with our unique features.
              </p>
            </div>
            <div className="w-full max-w-2xl space-y-4 mb-12">
              <form onSubmit={handleSearch} className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Enter license plate number"
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value)}
                  className="flex-grow px-4 py-3 bg-black border border-gray-300 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
                  Search
                </button>
              </form>
            </div>
            <div className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Feature
                  icon={SearchIcon}
                  title="Search Plates"
                  description="Easily find and view comments for any license plate."
                />
                <Feature
                  icon={InboxIcon}
                  title="Share Experiences"
                  description="Post your road experiences and interact with others."
                />
                <Feature
                  icon={MergeIcon}
                  title="Community Feedback"
                  description="Promote better driving through community discussions."
                />
                <Feature
                  icon={SettingsIcon}
                  title="Customizable Alerts"
                  description="Set up notifications for plates you're interested in."
                />
                <Feature
                  icon={LockIcon}
                  title="Privacy First"
                  description="Your personal information is always protected."
                />
                <Feature
                  icon={CombineIcon}
                  title="Connect Drivers"
                  description="Build a network of responsible road users."
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <div className="flex flex-col items-center space-y-2 border border-gray-800 p-6 rounded-lg">
      <div className="p-3 bg-black bg-opacity-50 rounded-full">
        <Icon className="text-white h-8 w-8 mb-2 opacity-75" />
      </div>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <p className="text-zinc-200 dark:text-zinc-100 text-center text-lg">
        {description}
      </p>
    </div>
  );
}

const SearchIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const InboxIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

const MergeIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m8 6 4-4 4 4" />
    <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
    <path d="m20 22-5-5" />
  </svg>
);

const SettingsIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const LockIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const CombineIcon: React.FC<IconProps> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="8" height="8" x="2" y="2" rx="2" />
    <path d="M14 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" />
    <path d="M20 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" />
    <path d="M10 18H5c-1.7 0-3-1.3-3-3v-1" />
    <polyline points="7 21 10 18 7 15" />
    <rect width="8" height="8" x="14" y="14" rx="2" />
  </svg>
);