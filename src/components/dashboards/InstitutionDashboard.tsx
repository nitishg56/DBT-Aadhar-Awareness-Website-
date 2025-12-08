import { useState, useEffect } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Input } from '../ui/input';
import {
  Home, Users, Upload, FileText, Download, TrendingUp, CheckCircle, XCircle, Clock,
  Search, Filter, Bell, Calendar
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import { supabase } from '../../supabaseClient';

// Try to import PDF generator, but don't crash if missing
// import { generateReportPDF } from '../../pdfGenerator'; // Uncomment if file exists

interface InstitutionDashboardProps {
  onNavigate: (page: string) => void;
}

export default function InstitutionDashboard({ onNavigate }: InstitutionDashboardProps) {
  const [currentTab, setCurrentTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  
  // --- REAL DATA STATES ---
  const [realStudents, setRealStudents] = useState<any[]>([]);
  const [pendingVerifications, setPendingVerifications] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  // --- NOTICE FORM STATE ---
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeDate, setNoticeDate] = useState('');
  const [noticeDesc, setNoticeDesc] = useState('');

  // --- FETCH REAL DATA (Students & Tickets) ---
  useEffect(() => {
    const fetchData = async () => {
        // 1. Fetch Students
        const { data: students } = await supabase.from('profiles').select('*').eq('role', 'student');
        if (students) setRealStudents(students);

        // 2. Fetch Pending Verifications (Tickets with status 'pending_institute')
        const { data: tickets } = await supabase
            .from('tickets')
            .select('*')
            .eq('status', 'pending_institute')
            .order('created_at', { ascending: false });
        
        if (tickets) setPendingVerifications(tickets);
    };
    fetchData();
  }, []);

  // --- HANDLER: VERIFY TICKET (Forward to Admin) ---
  const handleVerifyTicket = async (ticketId: string) => {
    const { error } = await supabase
        .from('tickets')
        .update({ status: 'pending_admin' }) // Next step: Admin
        .eq('id', ticketId);

    if (error) {
        alert("Error: " + error.message);
    } else {
        alert("Verified! Forwarded to Government Admin for final approval.");
        // Refresh list locally
        setPendingVerifications(prev => prev.filter(t => t.id !== ticketId));
    }
  };

  // --- HANDLER: REJECT TICKET ---
  const handleRejectTicket = async (ticketId: string) => {
    const { error } = await supabase
        .from('tickets')
        .update({ status: 'rejected' })
        .eq('id', ticketId);

    if (error) {
        alert("Error: " + error.message);
    } else {
        alert("Application Rejected.");
        setPendingVerifications(prev => prev.filter(t => t.id !== ticketId));
    }
  };

  // --- HANDLER: UPLOAD CSV (SIMULATION) ---
  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
        setUploading(false);
        alert("✅ Data Processed Successfully!\n\n120 Records Imported.");
    }, 1500);
  };

  // --- HANDLER: POST NOTICE (REAL DB SAVE) ---
  const handlePostNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle || !noticeDate) {
        alert("Please fill in the title and date.");
        return;
    }
    
    const { error } = await supabase.from('events').insert([{
        title: `NOTICE: ${noticeTitle}`,
        date: new Date(noticeDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        venue: 'Institute Campus',
        status: 'scheduled',
        description: noticeDesc,
        panchayat_name: 'ABC College (Institute)'
    }]);
    
    if (error) alert("Error posting notice: " + error.message);
    else {
        alert("Notice Posted Successfully!");
        setNoticeTitle('');
        setNoticeDate('');
        setNoticeDesc('');
    }
  };

  // --- DEMO DATA FOR DASHBOARD VISUALS ---
  const statsData = { total: 1250, verified: 1065, pending: 125, notEnabled: 60, sessions: 18 };
  const chartData = [
    { month: 'Jul', verified: 820 }, { month: 'Aug', verified: 920 },
    { month: 'Sep', verified: 980 }, { month: 'Oct', verified: 1040 },
    { month: 'Nov', verified: 1065 },
  ];
  const pieData = [
    { name: 'Enabled', value: 1065, color: '#22c55e' },
    { name: 'Pending', value: 125, color: '#f59e0b' },
    { name: 'Not Enabled', value: 60, color: '#ef4444' },
  ];

  // Demo Students Fallback
  const demoStudents = [
    { id: 'ST001', full_name: 'Amit Sharma', aadhaar: '•••• 2345', created_at: '2025-11-01' },
    { id: 'ST002', full_name: 'Priya Patel', aadhaar: '•••• 6789', created_at: '2025-11-05' },
  ];

  // Filter Real Students
  const displayStudents = realStudents.length > 0 ? realStudents : demoStudents;
  const filteredStudents = displayStudents.filter((s: any) => 
    (s.full_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.aadhaar || '').includes(searchQuery)
  );

  const sidebar = (
    <nav className="py-4">
      {[
        { id: 'home', label: 'Dashboard', icon: Home },
        { id: 'verifications', label: 'Verifications', icon: CheckCircle }, // NEW TAB
        { id: 'students', label: 'Student Database', icon: Users },
        { id: 'upload', label: 'Bulk Upload', icon: Upload },
        { id: 'reports', label: 'Reports', icon: FileText },
        { id: 'notices', label: 'Notices', icon: Bell },
        { id: 'resources', label: 'Resources', icon: Download },
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => setCurrentTab(item.id)}
          className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${
            currentTab === item.id ? 'bg-[#E6F0FF] text-[#002147] border-r-4 border-[#002147]' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <item.icon className="w-5 h-5" /><span>{item.label}</span>
        </button>
      ))}
    </nav>
  );

  return (
    <DashboardLayout title="Institution Dashboard" userRole="Institution Admin" userName="ABC College" onNavigate={onNavigate} sidebar={sidebar}>
      
      {/* HOME TAB (RICH DEMO DATA) */}
      {currentTab === 'home' && (
        <div className="space-y-6">
          <div><h2 className="text-2xl text-[#002147] mb-1">Institution Overview</h2><p className="text-gray-600">Monitor student DBT status</p></div>
          <div className="grid md:grid-cols-5 gap-4">
            <Card className="border-l-4 border-l-blue-500"><CardContent className="pt-6"><div className="flex justify-between"><div><p className="text-sm text-gray-600">Total Students</p><p className="text-3xl text-[#002147]">{statsData.total}</p></div><Users className="w-8 h-8 text-blue-500"/></div></CardContent></Card>
            <Card className="border-l-4 border-l-green-500"><CardContent className="pt-6"><div className="flex justify-between"><div><p className="text-sm text-gray-600">Verified</p><p className="text-3xl text-green-600">{statsData.verified}</p></div><CheckCircle className="w-8 h-8 text-green-500"/></div></CardContent></Card>
            <Card className="border-l-4 border-l-yellow-500"><CardContent className="pt-6"><div className="flex justify-between"><div><p className="text-sm text-gray-600">Pending</p><p className="text-3xl text-yellow-600">{statsData.pending}</p></div><Clock className="w-8 h-8 text-yellow-500"/></div></CardContent></Card>
            <Card className="border-l-4 border-l-red-500"><CardContent className="pt-6"><div className="flex justify-between"><div><p className="text-sm text-gray-600">Failed</p><p className="text-3xl text-red-600">{statsData.notEnabled}</p></div><XCircle className="w-8 h-8 text-red-500"/></div></CardContent></Card>
            <Card className="border-l-4 border-l-purple-500"><CardContent className="pt-6"><div className="flex justify-between"><div><p className="text-sm text-gray-600">Camps Held</p><p className="text-3xl text-purple-600">{statsData.sessions}</p></div><TrendingUp className="w-8 h-8 text-purple-500"/></div></CardContent></Card>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card><CardHeader><CardTitle>Verification Trend</CardTitle><CardDescription>Monthly Progress</CardDescription></CardHeader><CardContent><ResponsiveContainer width="100%" height={250}><BarChart data={chartData}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="month"/><YAxis/><Tooltip/><Bar dataKey="verified" fill="#002147"/></BarChart></ResponsiveContainer></CardContent></Card>
            <Card><CardHeader><CardTitle>Status Breakdown</CardTitle><CardDescription>Current Distribution</CardDescription></CardHeader><CardContent><ResponsiveContainer width="100%" height={250}><PieChart><Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>{pieData.map((e, i) => <Cell key={i} fill={e.color}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer></CardContent></Card>
          </div>
        </div>
      )}

      {/* VERIFICATIONS TAB (REAL WORKFLOW) */}
      {currentTab === 'verifications' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div><h2 className="text-2xl text-[#002147]">Pending Verifications</h2><p className="text-gray-600">Requests from students awaiting Institute approval</p></div>
            <Badge className="bg-yellow-500 text-black text-lg px-3">{pendingVerifications.length} Pending</Badge>
          </div>
          <Card>
            <CardContent className="pt-6">
                <Table>
                    <TableHeader><TableRow><TableHead>Student Name</TableHead><TableHead>Details (Bank/IFSC)</TableHead><TableHead>Date Applied</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                    <TableBody>
                        {pendingVerifications.length === 0 ? (
                            <TableRow><TableCell colSpan={4} className="text-center p-8 text-gray-500">No pending verification requests.</TableCell></TableRow>
                        ) : (
                            pendingVerifications.map((ticket) => (
                                <TableRow key={ticket.id}>
                                    <TableCell className="font-medium">{ticket.user_name || 'Student'}</TableCell>
                                    <TableCell>{ticket.description}</TableCell>
                                    <TableCell>{new Date(ticket.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell className="flex gap-2">
                                        <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleVerifyTicket(ticket.id)}>
                                            <CheckCircle className="w-4 h-4 mr-1"/> Verify & Forward
                                        </Button>
                                        <Button size="sm" variant="destructive" onClick={() => handleRejectTicket(ticket.id)}>
                                            <XCircle className="w-4 h-4 mr-1"/> Reject
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* STUDENTS TAB (REAL DATA + FALLBACK) */}
      {currentTab === 'students' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div><h2 className="text-2xl text-[#002147]">Student Database</h2><p className="text-gray-600">Manage registered students</p></div>
            <Button className="bg-[#002147]"><Users className="mr-2 h-4 w-4"/> Add Student</Button>
          </div>
          <Card>
            <CardContent className="pt-6">
                <div className="flex gap-4 mb-4">
                    <div className="relative flex-1"><Search className="absolute left-3 top-3 h-4 w-4 text-gray-400"/><Input className="pl-10" placeholder="Search students..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}/></div>
                    <Button variant="outline"><Filter className="mr-2 h-4 w-4"/> Filter</Button>
                </div>
                <Table>
                    <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Mobile</TableHead><TableHead>Aadhaar (Last 4)</TableHead><TableHead>Date Added</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                    <TableBody>
                        {filteredStudents.map((s: any) => (
                            <TableRow key={s.id}>
                                <TableCell className="font-medium">{s.full_name || 'Unknown'}</TableCell>
                                <TableCell>{s.username || '-'}</TableCell>
                                <TableCell>•••• {s.aadhaar ? s.aadhaar.slice(-4) : 'XXXX'}</TableCell>
                                <TableCell>{new Date(s.created_at).toLocaleDateString()}</TableCell>
                                <TableCell><Badge className="bg-green-100 text-green-800">Verified</Badge></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* UPLOAD TAB (SIMULATION) */}
      {currentTab === 'upload' && (
        <div className="space-y-6">
            <h2 className="text-2xl text-[#002147]">Bulk Data Upload</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><CardTitle>Upload CSV</CardTitle><CardDescription>Import student records</CardDescription></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center hover:border-[#002147] transition-colors cursor-pointer">
                            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-2"/>
                            <p className="text-sm text-gray-600">Drag & Drop CSV file here</p>
                            <Button variant="outline" className="mt-4">Browse Files</Button>
                        </div>
                        <Button className="w-full bg-[#002147]" onClick={handleUpload} disabled={uploading}>
                            {uploading ? "Processing Data..." : "Upload & Process"}
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Instructions</CardTitle></CardHeader>
                    <CardContent className="space-y-4 text-sm text-gray-600">
                        <div className="bg-blue-50 p-4 rounded">
                            <h4 className="font-bold text-blue-900 mb-2">Required Columns:</h4>
                            <ul className="list-disc pl-4 space-y-1"><li>Student Name</li><li>Aadhaar Number</li><li>Mobile Number</li></ul>
                        </div>
                        <Button variant="outline" className="w-full"><Download className="mr-2 h-4 w-4"/> Download Template</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
      )}

      {/* REPORTS TAB (DEMO + REAL PDF) */}
      {currentTab === 'reports' && (
        <div className="space-y-6">
            <h2 className="text-2xl text-[#002147]">Institutional Reports</h2>
            <div className="grid md:grid-cols-2 gap-6">
                {[
                    { title: 'Monthly Verification Report', data: { Verified: 1065, Pending: 125, Failed: 60 } },
                    { title: 'Student Status Summary', data: chartData.reduce((acc, curr) => ({ ...acc, [curr.month]: curr.verified }), {}) }
                ].map((rpt, idx) => (
                    <Card key={idx} className="hover:shadow-md transition-shadow">
                        <CardHeader><CardTitle>{rpt.title}</CardTitle><CardDescription>Generated on Demand</CardDescription></CardHeader>
                        <CardContent>
                            <Button className="w-full bg-[#002147]" onClick={() => alert(`Generating ${rpt.title}... (PDF Feature)`) }>
                                <Download className="mr-2 h-4 w-4"/> Generate PDF
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      )}

      {/* NOTICES TAB (REAL DB SAVE) */}
      {currentTab === 'notices' && (
        <div className="space-y-6">
            <h2 className="text-2xl text-[#002147]">Notice Board</h2>
            <Card>
                <CardHeader><CardTitle>Post New Notice</CardTitle></CardHeader>
                <CardContent>
                    <form onSubmit={handlePostNotice} className="space-y-4">
                        <div><label className="text-sm font-medium">Title</label><Input value={noticeTitle} onChange={(e) => setNoticeTitle(e.target.value)} required placeholder="e.g. Mandatory KYC Camp"/></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="text-sm font-medium">Date</label><Input type="date" value={noticeDate} onChange={(e) => setNoticeDate(e.target.value)} required/></div>
                            <div><label className="text-sm font-medium">Category</label><select className="w-full p-2 border rounded"><option>General</option><option>Urgent</option><option>Camp</option></select></div>
                        </div>
                        <div><label className="text-sm font-medium">Details</label><textarea className="w-full p-2 border rounded h-24" placeholder="Enter notice details..." value={noticeDesc} onChange={(e) => setNoticeDesc(e.target.value)}></textarea></div>
                        <Button type="submit" className="w-full bg-[#002147]">Publish Notice</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
      )}

      {/* RESOURCES TAB (DEMO) */}
      {currentTab === 'resources' && (
        <div className="space-y-6">
            <h2 className="text-2xl text-[#002147]">Downloads</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {['Admin Manual.pdf', 'Poster_Hindi.jpg', 'Poster_Eng.jpg'].map((f, i) => (
                    <Card key={i}><CardContent className="pt-6 text-center"><FileText className="h-8 w-8 mx-auto text-blue-900 mb-2"/><p className="font-medium">{f}</p><Button variant="outline" size="sm" className="mt-2">Download</Button></CardContent></Card>
                ))}
            </div>
        </div>
      )}

    </DashboardLayout>
  );
}