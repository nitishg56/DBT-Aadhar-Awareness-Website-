import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Shield } from 'lucide-react';

export default function AdminLoginPage({ onLoginSuccess, onBack }: { onLoginSuccess: () => void; onBack: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would authenticate the user here
    onLoginSuccess();
  };

  const loginTips = [
    "This portal is for authorized administrators only. All activities are monitored.",
    "Use a strong, unique password for your administrator account.",
    "Enable two-factor authentication if available for enhanced security.",
    "Be cautious of phishing attempts. Only log in through the official portal URL.",
    "Regularly review audit logs and user activity to ensure the integrity of the portal.",
    "Report any suspicious activity to the security team immediately."
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8 flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto">
        {/* Left Column: Login Form */}
        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="mx-auto bg-red-100 text-red-600 p-4 rounded-full w-fit mb-4">
              <Shield className="w-10 h-10" />
            </div>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>
              Access the administrative dashboard to manage the portal.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                <a href="#" className="text-sm text-blue-600 hover:underline">Contact Support</a>
                <Button type="submit">Login</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Right Column: Login Tips */}
        <div className="hidden lg:block p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Admin Login Tips</h3>
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
