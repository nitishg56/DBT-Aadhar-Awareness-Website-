import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { RefreshCw } from 'lucide-react';

type Props = {
  onLoginSuccess: () => void;
  onBack: () => void;
};

// Helper function to generate a random string for CAPTCHA
const generateCaptcha = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export default function StudentLoginPage({ onLoginSuccess, onBack }: Props) {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [aadhaar, setAadhaar] = useState('');
  const [otp, setOtp] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [tabValue, setTabValue] = useState<'aadhaar' | 'otr'>('aadhaar');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock validation: In a real app, you'd verify Aadhaar, OTP, and CAPTCHA
    if (captchaInput.toUpperCase() === captcha) {
      onLoginSuccess();
    } else {
      alert('Invalid CAPTCHA. Please try again.');
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
    }
  };

  const loginTips = [
    "Student/ Parent/ Legal guardian must read the instructions carefully before registration.",
    "Student/ Parent/ Legal guardian is advised to fill all the required details carefully and check properly before submission as correction/editing will not be allowed after submission.",
    "Any wrong/ false information may lead to rejection.",
    "Enter correct OTR number as provided during registration. The unique identifier helps to verify identity and track application progress.",
    "Keep your password confidential and avoid sharing it with anyone to protect your account security.",
    "In case you forget your password, utilize the Forgot Password option to reset it.",
    "Student/ Parent/ Legal guardian is also advised to refer to National Scholarship Portal for regular updates."
  ];

  // Utility to mask Aadhaar except last 4 digits
  const maskedAadhaar = (a: string) => {
    const clean = a.replace(/\D/g, '');
    if (!clean) return '-';
    if (clean.length <= 4) return clean;
    const last4 = clean.slice(-4);
    return 'XXXX-XXXX-' + last4;
  };

  // Small helper for OTP display (show dots if present)
  const maskedOtp = (o: string) => {
    if (!o) return '-';
    return '*'.repeat(o.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 sm:p-12 flex items-center justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* LEFT: FORM */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Application Login</CardTitle>
            <CardDescription>
              New user?{' '}
              <a href="#" className="text-blue-600 hover:underline">
                Register yourself
              </a>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={tabValue} onValueChange={(v) => setTabValue(v as 'aadhaar' | 'otr')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="aadhaar">Login with Aadhaar</TabsTrigger>
                <TabsTrigger value="otr">Login with OTR</TabsTrigger>
              </TabsList>

              <TabsContent value="aadhaar">
                <form onSubmit={handleLogin} className="space-y-6 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="aadhaar">Aadhaar No. *</Label>
                    <div className="flex gap-2">
                      <Input
                        id="aadhaar"
                        type="text"
                        placeholder="Enter your Aadhaar No"
                        value={aadhaar}
                        onChange={(e) => setAadhaar(e.target.value)}
                        maxLength={12}
                        required
                      />
                      <Button type="button" variant="outline">Get OTP</Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="otp">Enter OTP *</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border rounded-md bg-gray-100 dark:bg-gray-800">
                      <span
                        className="text-2xl font-bold tracking-widest select-none dark:text-white"
                        style={{ fontFamily: 'monospace' }}
                      >
                        {captcha}
                      </span>
                      <Button type="button" variant="ghost" size="icon" onClick={() => setCaptcha(generateCaptcha())}>
                        <RefreshCw className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="captcha">Enter Captcha Code *</Label>
                    <Input
                      id="captcha"
                      type="text"
                      placeholder="Enter the code above"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex items-center gap-4 pt-4">
                    <Button type="button" variant="ghost" onClick={onBack}>Back</Button>
                    <Button type="button" variant="ghost">Cancel</Button>
                    <Button type="submit" className="flex-grow">Proceed</Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="otr">
                <div className="text-center p-8">
                  <p>OTR Login functionality is not implemented in this demo.</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* RIGHT: LIVE PREVIEW + TIPS */}
        <div className="flex flex-col gap-6">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>Realtime view of the login details (for demo only)</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-sky-100 flex items-center justify-center text-2xl font-bold text-sky-700">
                  {/* Aadhaar is numeric — show a generic user initial if empty */}
                  {aadhaar ? aadhaar.slice(0, 1) : 'U'}
                </div>

                <div className="flex-1">
                  <div className="text-sm text-slate-500">Login Method</div>
                  <div className="font-medium text-slate-800 capitalize">{tabValue === 'aadhaar' ? 'Aadhaar' : 'OTR'}</div>

                  <div className="mt-3 text-sm text-slate-500">Aadhaar (masked)</div>
                  <div className="font-mono font-medium text-slate-800">{maskedAadhaar(aadhaar)}</div>

                  <div className="mt-3 text-sm text-slate-500">OTP</div>
                  <div className="font-medium text-slate-800">{maskedOtp(otp)}</div>

                  <div className="mt-3 text-sm text-slate-500">CAPTCHA</div>
                  <div className="inline-flex items-center gap-3 mt-2">
                    <div className="px-3 py-2 rounded-md border bg-gray-100 dark:bg-gray-800 font-mono text-lg tracking-widest">{captcha}</div>
                    <div className="text-sm text-slate-500">Enter code exactly as shown</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t">
                <div className="text-xs text-slate-500">Tips</div>
                <ul className="mt-2 list-disc ml-5 text-sm text-slate-700">
                  <li>Use the <strong>Get OTP</strong> button to request an OTP.</li>
                  <li>CAPTCHA helps prevent automated submissions — refresh if unreadable.</li>
                  <li>All fields shown in preview are for demonstration only — do not expose real Aadhaar in screenshots.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Student Login Tips Card (kept from your original UI) */}
          <div className="hidden lg:block">
            <Card>
              <CardHeader>
                <CardTitle>Student Login Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  {loginTips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
