import { useState, useEffect, FormEvent } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Home, BookOpen, CheckCircle, Award, Download, HelpCircle,
  AlertCircle, PlayCircle, FileText, CreditCard, Building, ShieldCheck, Clock, Activity, RotateCcw, Check, X
} from 'lucide-react';

import { supabase } from '../../supabaseClient';

interface StudentDashboardProps {
  onNavigate: (page: string) => void;
}

// Verification Status Types matches DB
type VerificationStatus = 'not_submitted' | 'open' | 'pending_institute' | 'pending_admin' | 'verified' | 'rejected';

export default function StudentDashboard({ onNavigate }: StudentDashboardProps) {
  const [currentTab, setCurrentTab] = useState('home');

  // --- REAL DATA STATE ---
  const [bankAccount, setBankAccount] = useState('');
  const [confirmBankAccount, setConfirmBankAccount] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [userProfile, setUserProfile] = useState<any>(null);
  const [myTicket, setMyTicket] = useState<any>(null);
  const [status, setStatus] = useState<VerificationStatus>('not_submitted');

  // --- QUIZ STATE ---
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);

  // 1. Fetch User & Ticket Status
  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Get Profile
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        setUserProfile(profile);

        // Get Latest Ticket
        const { data: ticket } = await supabase
            .from('tickets')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();
        
        if (ticket) {
            setMyTicket(ticket);
            setStatus(ticket.status as VerificationStatus);
        }
      }
    };
    fetchData();
  }, []);

  // 2. Submit Verification Request
  const handleApplyVerification = async (e: FormEvent) => {
    e.preventDefault();
    
    if (bankAccount !== confirmBankAccount) {
        alert("Bank Account numbers do not match.");
        return;
    }

    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) { 
        alert("You must be logged in."); 
        setLoading(false); 
        return; 
    }

    const description = `Bank: ${bankAccount} | IFSC: ${ifscCode}`;

    const { error } = await supabase.from('tickets').insert([{
      user_id: user.id,
      user_name: userProfile?.full_name || 'Student',
      type: 'verification',
      description: description,
      status: 'pending_institute' 
    }]);

    setLoading(false);

    if (error) {
      alert("Error submitting application: " + error.message);
    } else {
      alert("Application Submitted! Sent to Institute for verification.");
      window.location.reload();
    }
  };

  // 3. Handle Re-Apply
  const handleReapply = () => {
    const confirmReset = window.confirm("Do you want to edit and re-submit your application?");
    if (!confirmReset) return;
    
    setStatus('not_submitted');
    setMyTicket(null);
    setBankAccount('');
    setConfirmBankAccount('');
    setIfscCode('');
  };

  // --- QUIZ LOGIC ---
  const quizQuestions = [
    { question: 'What does DBT stand for?', options: ['Direct Bank Transfer', 'Direct Benefit Transfer', 'Data Backup'], correct: 'Direct Benefit Transfer' },
    { question: 'Why link Aadhaar?', options: ['Identity Verification', 'Avoid Duplication', 'All of the above'], correct: 'All of the above' },
    { question: 'Where to check status?', options: ['Bank', 'DBT Portal', 'All of the above'], correct: 'All of the above' }
  ];

  const handleQuizSubmit = () => {
    let score = 0;
    quizQuestions.forEach((q, index) => { if (selectedAnswers[index] === q.correct) score++; });
    setQuizScore(score);
    setIsQuizSubmitted(true);
  };

  const handleRetakeQuiz = () => {
    setQuizScore(null);
    setSelectedAnswers({});
    setIsQuizSubmitted(false);
  };

  const studentDownloadFiles = [
    { label: 'DBT Scholarship Guidelines', fileName: 'DBTcompleteguidelines.pdf', url: '/resources/student-downloads/DBTcompleteguidelines.pdf' },
    { label: 'Student FAQs', fileName: 'FAQ.pdf', url: '/resources/student-downloads/FAQ.pdf' },
    { label: 'Aadhaar Linking Manual', fileName: 'AADHAARbanklinkingmanual.pdf', url: '/resources/student-downloads/AADHAARbanklinkingmanual.pdf' },
    { label: 'Scholarship App Guide', fileName: 'SCHOLARSHIPAPPGUIDE.pdf', url: '/resources/student-downloads/SCHOLARSHIPAPPGUIDE.pdf' },
    { label: 'Bank Verification List', fileName: 'Banksallverification.pdf', url: '/resources/student-downloads/Banksallverification.pdf' },
  ];

  // Helper for Stepper UI Logic
  const getStepStatus = (stepIndex: number) => {
      if (status === 'rejected') return 'error';
      if (status === 'verified') return 'complete';
      
      if (stepIndex === 0) return 'complete'; 

      if (stepIndex === 1) {
          if (status === 'pending_institute' || status === 'open') return 'current'; 
          if (status === 'pending_admin') return 'complete';    
          return 'waiting';
      }

      if (stepIndex === 2) {
          if (status === 'pending_admin') return 'current';
          return 'waiting';
      }
      
      return 'waiting';
  };

  const dbtStatus = { enabled: status === 'verified', bankLinked: !!myTicket, aadhaarLinked: true };

  const sidebar = (
    <nav className="py-4">
      {[
        { id: 'home', label: 'Dashboard', icon: Home },
        { id: 'verification', label: 'Verification', icon: ShieldCheck },
        { id: 'awareness', label: 'Awareness', icon: BookOpen },
        { id: 'quiz', label: 'Quiz', icon: Award },
        { id: 'downloads', label: 'Downloads', icon: Download },
        { id: 'support', label: 'Support', icon: HelpCircle },
      ].map((item) => (
        <button key={item.id} onClick={() => setCurrentTab(item.id)} className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${currentTab === item.id ? 'bg-[#E6F0FF] text-[#002147] border-r-4 border-[#002147]' : 'text-gray-600 hover:bg-gray-50'}`}>
          <item.icon className="w-5 h-5" /><span>{item.label}</span>
        </button>
      ))}
    </nav>
  );

  return (
    <DashboardLayout title="Student Dashboard" userRole="Student" userName={userProfile?.full_name || 'Student'} onNavigate={onNavigate} sidebar={sidebar}>
      
      {/* HOME TAB */}
      {currentTab === 'home' && (
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#002147] to-[#004e92] p-8 text-white shadow-lg">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-2">Welcome, {userProfile?.full_name?.split(' ')[0] || "Student"}!</h2>
              <p className="text-blue-100 max-w-xl">Your central hub for Direct Benefit Transfer. Track your scholarship status and verification in real-time.</p>
            </div>
            <Activity className="absolute right-8 top-1/2 -translate-y-1/2 w-32 h-32 text-white/10" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className={`border-l-4 ${dbtStatus.enabled ? 'border-l-green-500' : 'border-l-yellow-500'}`}><CardHeader><CardTitle className="flex items-center gap-2"><CheckCircle className={dbtStatus.enabled ? "text-green-500" : "text-yellow-500"}/> DBT Status</CardTitle></CardHeader><CardContent><Badge className={dbtStatus.enabled ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>{dbtStatus.enabled ? 'Enabled' : 'Pending'}</Badge></CardContent></Card>
            <Card className="border-l-4 border-l-blue-500"><CardHeader><CardTitle className="flex items-center gap-2"><CreditCard className="text-blue-500"/> Bank Linked</CardTitle></CardHeader><CardContent><Badge className={dbtStatus.bankLinked ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}>{dbtStatus.bankLinked ? 'Submitted' : 'Not Linked'}</Badge></CardContent></Card>
            <Card className="border-l-4 border-l-purple-500"><CardHeader><CardTitle className="flex items-center gap-2"><ShieldCheck className="text-purple-500"/> Aadhaar Seeded</CardTitle></CardHeader><CardContent><Badge className="bg-purple-100 text-purple-800">Verified</Badge></CardContent></Card>
          </div>
        </div>
      )}

      {/* VERIFICATION TAB */}
      {currentTab === 'verification' && (
        <div className="space-y-6">
          <div><h2 className="text-2xl text-[#002147] mb-1">Verification Status</h2><p className="text-gray-600">Track your application progress</p></div>

          {status !== 'not_submitted' ? (
             <Card className="border-2 border-blue-100">
               <CardHeader className="bg-blue-50"><CardTitle>Application Tracking</CardTitle><CardDescription>Tracking ID: {myTicket?.id?.slice(0,8)}</CardDescription></CardHeader>
               <CardContent className="pt-8">
                 {/* Stepper */}
                 <div className="relative flex justify-between mb-8">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10"></div>
                    <div className={`absolute top-1/2 left-0 h-1 bg-green-500 -z-10 transition-all duration-500`} style={{width: status === 'verified' ? '100%' : status === 'pending_admin' ? '66%' : '33%'}}></div>

                    {['Submitted', 'Institute Check', 'Govt. Approval'].map((label, i) => {
                        const s = getStepStatus(i);
                        return (
                            <div key={i} className="text-center bg-white px-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 ${s === 'complete' ? 'bg-green-500 text-white' : s === 'current' ? 'bg-blue-600 text-white' : s === 'error' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                    {s === 'complete' ? <CheckCircle className="w-5 h-5"/> : (s === 'current' ? <Clock className="w-5 h-5"/> : s === 'error' ? <AlertCircle className="w-5 h-5"/> : i+1)}
                                </div>
                                <div className="text-sm font-medium">{label}</div>
                                {s === 'current' && <Badge variant="outline" className="mt-1 bg-yellow-50 text-yellow-700">Pending</Badge>}
                            </div>
                        )
                    })}
                 </div>
                 
                 <div className="p-4 rounded border bg-gray-50 border-gray-200 text-gray-800 mb-4">
                    <div className="font-bold mb-1">Current Status:</div> 
                    {status === 'pending_institute' || status === 'open' ? "Waiting for Institute Verification." : status === 'pending_admin' ? "Institute Verified. Waiting for Govt Approval." : status === 'verified' ? "Application Approved!" : "Application Rejected."}
                 </div>

                 {/* RE-APPLY BUTTON */}
                 <div className="flex justify-end border-t pt-4 mt-4">
                    <Button variant="outline" className="text-blue-700 border-blue-200 hover:bg-blue-50" onClick={handleReapply}>
                        <RotateCcw className="w-4 h-4 mr-2"/> Edit & Re-Apply
                    </Button>
                 </div>
               </CardContent>
             </Card>
          ) : (
            <Card className="border-2 border-[#002147]">
                <CardHeader className="bg-[#E6F0FF]"><CardTitle>Submit Bank Details</CardTitle><CardDescription>For 2-Step Verification (Institute → Admin)</CardDescription></CardHeader>
                <CardContent className="pt-6">
                <form onSubmit={handleApplyVerification} className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2"><Label>Bank Account Number *</Label><div className="relative"><CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><Input className="pl-10" value={bankAccount} onChange={(e) => setBankAccount(e.target.value)} required /></div></div>
                        <div className="space-y-2"><Label>Confirm Account Number *</Label><div className="relative"><CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><Input className="pl-10" value={confirmBankAccount} onChange={(e) => setConfirmBankAccount(e.target.value)} required /></div></div>
                        <div className="space-y-2"><Label>IFSC Code *</Label><div className="relative"><Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" /><Input className="pl-10 uppercase" value={ifscCode} onChange={(e) => setIfscCode(e.target.value.toUpperCase())} maxLength={11} required /></div></div>
                    </div>
                    <Button type="submit" className="w-full bg-[#002147] hover:bg-[#003366]" disabled={loading}>{loading ? "Submitting..." : "Submit for Verification"}</Button>
                </form>
                </CardContent>
            </Card>
          )}
        </div>
      )}

      {currentTab === 'awareness' && <div className="space-y-6"><Tabs defaultValue="videos"><TabsList><TabsTrigger value="videos">Videos</TabsTrigger></TabsList><TabsContent value="videos"><div className="grid md:grid-cols-2 gap-4">{[1,2].map(i=><Card key={i}><CardContent className="p-8 bg-gray-100 flex justify-center"><PlayCircle className="w-12 h-12 text-gray-400"/></CardContent></Card>)}</div></TabsContent></Tabs></div>}
      
      {/* QUIZ TAB (FULLY FUNCTIONAL) */}
      {currentTab === 'quiz' && (
        <div className="space-y-6">
          <Card className="border-t-4 border-t-[#002147]">
            <CardHeader><CardTitle>DBT Knowledge Quiz</CardTitle><CardDescription>Test your knowledge about DBT</CardDescription></CardHeader>
            <CardContent className="pt-6">
                {!isQuizSubmitted ? (
                    <>
                        {quizQuestions.map((q, index) => (
                            <div key={index} className="mb-6 p-4 border rounded bg-gray-50">
                                <h3 className="font-medium mb-3 text-lg">{index + 1}. {q.question}</h3>
                                <div className="space-y-2">
                                    {q.options.map((opt) => (
                                        <div key={opt} 
                                            className={`p-3 border rounded cursor-pointer transition-colors ${selectedAnswers[index] === opt ? 'bg-[#002147] text-white border-[#002147]' : 'bg-white hover:bg-gray-100'}`}
                                            onClick={() => setSelectedAnswers(prev => ({...prev, [index]: opt}))}
                                        >
                                            {opt}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <Button onClick={handleQuizSubmit} className="w-full bg-green-600 hover:bg-green-700 text-lg">Submit Answers</Button>
                    </>
                ) : (
                    <div className="text-center py-8">
                        <div className="mb-4">
                            {quizScore! >= 2 ? <CheckCircle className="w-16 h-16 text-green-500 mx-auto"/> : <AlertCircle className="w-16 h-16 text-orange-500 mx-auto"/>}
                        </div>
                        <h3 className="text-2xl font-bold mb-2">You scored {quizScore} / {quizQuestions.length}</h3>
                        <p className="text-gray-500 mb-6">{quizScore! >= 2 ? "Great job! You are DBT aware." : "Keep learning! Check the awareness tab."}</p>
                        
                        <div className="text-left max-w-2xl mx-auto mb-8 space-y-4">
                            {quizQuestions.map((q, i) => (
                                <div key={i} className={`p-3 rounded border ${selectedAnswers[i] === q.correct ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                                    <p className="font-semibold">{i+1}. {q.question}</p>
                                    <p className="text-sm mt-1">
                                        Your Answer: <span className="font-medium">{selectedAnswers[i]}</span> 
                                        {selectedAnswers[i] === q.correct ? <span className="text-green-600 ml-2">✔ Correct</span> : <span className="text-red-600 ml-2">✘ Wrong</span>}
                                    </p>
                                    {selectedAnswers[i] !== q.correct && <p className="text-sm text-gray-600">Correct Answer: {q.correct}</p>}
                                </div>
                            ))}
                        </div>

                        <Button onClick={handleRetakeQuiz} variant="outline"><RotateCcw className="w-4 h-4 mr-2"/> Retake Quiz</Button>
                    </div>
                )}
            </CardContent>
          </Card>
        </div>
      )}

      {currentTab === 'downloads' && <div className="space-y-6"><div className="grid md:grid-cols-2 gap-4">{studentDownloadFiles.map(f=><Card key={f.fileName} className="p-4 flex items-center gap-4 hover:shadow-md"><FileText className="text-red-500"/><div className="flex-1 font-medium">{f.label}</div><Button variant="outline" size="sm" asChild><a href={f.url} download>Download</a></Button></Card>)}</div></div>}
      {currentTab === 'support' && <div className="grid md:grid-cols-2 gap-6"><Card className="p-6 text-center"><h3 className="text-lg font-bold">Helpdesk</h3><p className="text-2xl text-[#002147]">1800-11-8004</p></Card></div>}

    </DashboardLayout>
  );
}