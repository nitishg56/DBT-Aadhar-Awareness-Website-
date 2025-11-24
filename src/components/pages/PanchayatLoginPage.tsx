import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Home } from 'lucide-react';

export default function PanchayatLoginPage({ onLoginSuccess, onBack }: { onLoginSuccess: () => void; onBack: () => void }) {
  const [panchayatId, setPanchayatId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would authenticate the user here
    onLoginSuccess();
  };

  const loginTips = [
    "Use your official Gram Panchayat ID to access the portal.",
    "Ensure that you are authorized to access the Panchayat dashboard.",
    "Keep your login credentials confidential and do not share them with anyone.",
    "The Panchayat dashboard provides tools for organizing awareness camps and tracking progress.",
    "For any assistance, please refer to the help section or contact support.",
    "Log out after each session to ensure the security of the portal."
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8 flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto">
        {/* Left Column: Login Form */}
        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="mx-auto bg-green-100 text-green-600 p-4 rounded-full w-fit mb-4">
              <Home className="w-10 h-10" />
            </div>
            <CardTitle>Gram Panchayat Login</CardTitle>
            <CardDescription>
              Organize awareness camps and track village-level progress.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="panchayatId">Panchayat ID</Label>
                <Input
                  id="panchayatId"
                  type="text"
                  placeholder="Enter your Panchayat ID"
                  value={panchayatId}
                  onChange={(e) => setPanchayatId(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                <Button type="button" variant="ghost" onClick={onBack}>Back</Button>
                <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
                <Button type="submit">Login</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Right Column: Login Tips */}
        <div className="hidden lg:block p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Panchayat Login Tips</h3>
          <ul className="list-disc list-inside space-y-4 text-gray-600 dark:text-gray-400">
            {loginTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
