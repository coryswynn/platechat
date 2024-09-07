'use client';

import { useState } from 'react';
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Label } from "../components/label";
import Link from 'next/link'; // Ensure Link is imported
import { Checkbox } from "../components/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/card";
import { CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/router'; // Import useRouter from Next.js


export default function SignUpFlow() {
  const [step, setStep] = useState(1);
  const router = useRouter(); // Initialize useRouter
  const [formData, setFormData] = useState({
    username: '',
    agreeToTerms: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleStart = () => {
    router.push('/'); // Route to home page
  };


  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-white">Welcome to PlateChat</CardTitle>
              <CardDescription className="text-gray-400">Anonymously chat about license plates you see on the road.</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="text-sm text-gray-500 mb-4">
              <p>With PlateChat, you can:</p>
                <ul className="list-disc list-inside mt-2 text-gray-400">
                  <li>Leave anonymous comments about license plates</li>
                  <li>View and respond to comments left by others</li>
                  <li>Stay completely anonymous</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleNext} className="w-full bg-blue-500 text-white">Get Started</Button>
            </CardFooter>
          </>
        );
      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">Choose Your Username</CardTitle>
              <CardDescription className="text-gray-400">This will be your anonymous identity in PlateChat.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter a unique username"
                  className="bg-black text-white border border-gray-500"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack} className="text-white border border-gray-500">Back</Button>
              <Button onClick={handleNext} disabled={!formData.username} className="bg-blue-500 text-white">Next</Button>
            </CardFooter>
          </>
        );
      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">Terms of Service</CardTitle>
              <CardDescription className="text-gray-400">Please read and agree to our terms.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-40 overflow-auto border border-gray-600 p-4 rounded-md text-sm text-gray-300">
                  <p>
                    By using PlateChat, you agree to use the app responsibly and not engage in any illegal activities. You understand that all comments are anonymous and you will not attempt to identify other users. PlateChat is not responsible for the content posted by its users. We reserve the right to remove any content that violates our community guidelines or is reported as inappropriate.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))}
                  />
                  <Label htmlFor="terms" className="text-white">I agree to the terms of service</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack} className="text-white border border-gray-500">Back</Button>
              <Button onClick={handleNext} disabled={!formData.agreeToTerms} className="bg-blue-500 text-white">Complete Sign Up</Button>
            </CardFooter>
          </>
        );
      case 4:
        return (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">Sign Up Complete!</CardTitle>
              <CardDescription className="text-gray-400">You're all set to start using PlateChat.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
              <p className="text-center text-gray-400">Welcome aboard, {formData.username}! You can now start chatting about license plates anonymously.</p>
            </CardContent>
            <CardFooter>
              <Button onClick={handleStart} className="flex items-center justify-center w-full bg-blue-500 text-white">
                Start Using PlateChat
              </Button>
            </CardFooter>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Card className="w-full max-w-md bg-gray-800 text-white border border-gray-700 rounded-lg">
        {renderStep()}
      </Card>
    </div>
  );
}