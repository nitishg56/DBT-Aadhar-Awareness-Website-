import { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import {
  Home,
  Users,
  Calendar,
  FileText,
  BookOpen,
  MapPin,
  Image as ImageIcon,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  Upload,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PanchayatDashboardProps {
  onNavigate: (page: 'landing') => void;
}

export default function PanchayatDashboard({ onNavigate }: PanchayatDashboardProps) {
  const [currentTab, setCurrentTab] = useState('home');

  const villageData = {
    name: 'Rampur Gram Panchayat',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    totalStudents: 156,
    enabled: 118,
    pending: 28,
    notEnabled: 10,
  };

  const studentsData = [
    { id: 'VP001', name: 'Arvind Kumar', village: 'Rampur', education: 'B.Sc 2nd Year', dbtStatus: 'enabled' },
    { id: 'VP002', name: 'Sunita Devi', village: 'Rampur', education: 'B.A 3rd Year', dbtStatus: 'enabled' },
    { id: 'VP003', name: 'Raju Yadav', village: 'Khajuriya', education: 'B.Com 1st Year', dbtStatus: 'pending' },
    { id: 'VP004', name: 'Meena Kumari', village: 'Rampur', education: 'B.Tech 4th Year', dbtStatus: 'enabled' },
  ];

  const eventsData = [
    { date: 'Dec 20, 2025', title: 'DBT Verification Camp', venue: 'Panchayat Bhawan', attendees: 85, status: 'scheduled' },
    { date: 'Nov 15, 2025', title: 'Awareness Session', venue: 'Community Hall', attendees: 120, status: 'completed' },
    { date: 'Oct 28, 2025', title: 'Document Collection Drive', venue: 'Village Square', attendees: 95, status: 'completed' },
  ];

  const chartData = [
    { village: 'Rampur', enabled: 68, pending: 12 },
    { village: 'Khajuriya', enabled: 32, pending: 8 },
    { village: 'Sultanpur', enabled: 18, pending: 8 },
  ];

  const sidebar = (
    <nav className="py-4">
      {[
        { id: 'home', label: 'Dashboard', icon: Home },
        { id: 'students', label: 'Students', icon: Users },
        { id: 'events', label: 'Events', icon: Calendar },
        { id: 'reports', label: 'Reports', icon: FileText },
        { id: 'resources', label: 'Resources', icon: BookOpen },
        { id: 'map', label: 'Coverage Map', icon: MapPin },
      ].map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentTab(item.id)}
            className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${
              currentTab === item.id
                ? 'bg-orange-50 text-[#FF9933] border-r-4 border-[#FF9933]'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );

  return (
    <DashboardLayout
      title="Gram Panchayat Dashboard"
      userRole="Panchayat Officer"
      userName={villageData.name}
      onNavigate={onNavigate}
      sidebar={sidebar}
    >
      {currentTab === 'home' && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-[#FF9933] via-white to-[#138808] p-1 rounded">
              <div className="bg-white p-2 rounded">
                <MapPin className="w-8 h-8 text-[#002147]" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl text-[#002147]">{villageData.name}</h2>
              <p className="text-gray-600">{villageData.district}, {villageData.state}</p>
            </div>
          </div>

          {/* Stats Cards with Tricolor Theme */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="border-l-4 border-l-[#FF9933]">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Students</p>
                    <p className="text-3xl text-[#002147]">{villageData.totalStudents}</p>
                  </div>
                  <Users className="w-8 h-8 text-[#FF9933]" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#138808]">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">DBT Enabled</p>
                    <p className="text-3xl text-[#138808]">{villageData.enabled}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-[#138808]" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-3xl text-yellow-600">{villageData.pending}</p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-red-500">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Not Enabled</p>
                    <p className="text-3xl text-red-600">{villageData.notEnabled}</p>
                  </div>
                  <XCircle className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Overview */}
          <Card className="border-2 border-[#FF9933]">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-green-50">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#FF9933]" />
                DBT Enablement Progress
              </CardTitle>
              <CardDescription>
                {((villageData.enabled / villageData.totalStudents) * 100).toFixed(1)}% of students are DBT-enabled
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Target: 90%</span>
                    <span>{villageData.enabled}/{villageData.totalStudents}</span>
                  </div>
                  <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FF9933] to-[#138808]"
                      style={{ width: `${(villageData.enabled / villageData.totalStudents) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-green-50 rounded">
                    <div className="text-xl text-[#138808]">76%</div>
                    <div className="text-xs text-gray-600">Enabled</div>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded">
                    <div className="text-xl text-yellow-600">18%</div>
                    <div className="text-xs text-gray-600">Pending</div>
                  </div>
                  <div className="p-3 bg-red-50 rounded">
                    <div className="text-xl text-red-600">6%</div>
                    <div className="text-xs text-gray-600">Not Enabled</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Village-wise Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Village-wise DBT Status</CardTitle>
              <CardDescription>Distribution across villages in the panchayat</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="village" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="enabled" fill="#138808" name="Enabled" />
                  <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Upcoming Events</span>
                <Button size="sm" className="bg-[#FF9933] hover:bg-[#e68a2e]" onClick={() => setCurrentTab('events')}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Event
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {eventsData.filter(e => e.status === 'scheduled').map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-orange-50 border-[#FF9933]">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-8 h-8 text-[#FF9933]" />
                      <div>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-gray-600">{event.date} • {event.venue}</div>
                      </div>
                    </div>
                    <Badge className="bg-[#FF9933] hover:bg-[#FF9933]">Scheduled</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button className="bg-[#138808] hover:bg-[#0f6906]" onClick={() => setCurrentTab('events')}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Camp
                </Button>
                <Button variant="outline" className="border-[#FF9933] text-[#FF9933] hover:bg-orange-50" onClick={() => setCurrentTab('students')}>
                  <Users className="w-4 h-4 mr-2" />
                  View Students
                </Button>
                <Button variant="outline" onClick={() => setCurrentTab('reports')}>
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {currentTab === 'students' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl text-[#002147] mb-1">Students in Jurisdiction</h2>
            <p className="text-gray-600">View and track students from villages under your panchayat</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Student List</CardTitle>
              <CardDescription>Students from {villageData.name} area</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Village</TableHead>
                    <TableHead>Education</TableHead>
                    <TableHead>DBT Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentsData.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.village}</TableCell>
                      <TableCell>{student.education}</TableCell>
                      <TableCell>
                        {student.dbtStatus === 'enabled' && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Enabled
                          </Badge>
                        )}
                        {student.dbtStatus === 'pending' && (
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                            <Clock className="w-3 h-3 mr-1" />
                            Pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            {chartData.map((village, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#FF9933]" />
                    {village.village}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Enabled:</span>
                      <span className="font-medium text-[#138808]">{village.enabled}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Pending:</span>
                      <span className="font-medium text-yellow-600">{village.pending}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total:</span>
                      <span className="font-medium">{village.enabled + village.pending}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {currentTab === 'events' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl text-[#002147] mb-1">Event Management</h2>
              <p className="text-gray-600">Schedule and manage awareness camps and verification drives</p>
            </div>
            <Button className="bg-[#FF9933] hover:bg-[#e68a2e]">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule New Event
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Create New Event</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Event Type</label>
                  <select className="w-full mt-1 p-2 border rounded">
                    <option>Verification Camp</option>
                    <option>Awareness Session</option>
                    <option>Document Collection Drive</option>
                    <option>Training Program</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <Input type="date" className="mt-1" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Venue</label>
                <Input placeholder="e.g., Panchayat Bhawan, Rampur" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Expected Participants</label>
                <Input type="number" placeholder="Estimated number of attendees" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Event Description</label>
                <textarea 
                  className="w-full mt-1 p-2 border rounded h-24" 
                  placeholder="Describe the event objectives and agenda..."
                ></textarea>
              </div>
              <Button className="w-full bg-[#138808] hover:bg-[#0f6906]">
                Schedule Event
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Event History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eventsData.map((event, index) => (
                  <div key={index} className={`p-4 border rounded-lg ${event.status === 'scheduled' ? 'bg-orange-50 border-[#FF9933]' : 'bg-gray-50'}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium">{event.title}</h3>
                        <div className="text-sm text-gray-600 mt-1">
                          <div>📅 {event.date}</div>
                          <div>📍 {event.venue}</div>
                          <div>👥 {event.attendees} attendees</div>
                        </div>
                      </div>
                      <Badge className={event.status === 'scheduled' ? 'bg-[#FF9933] hover:bg-[#FF9933]' : 'bg-green-600 hover:bg-green-600'}>
                        {event.status === 'scheduled' ? 'Upcoming' : 'Completed'}
                      </Badge>
                    </div>
                    {event.status === 'completed' && (
                      <Button variant="outline" size="sm" className="mt-2">
                        <ImageIcon className="w-4 h-4 mr-2" />
                        View Photos & Report
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {currentTab === 'reports' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl text-[#002147] mb-1">Reports & Documentation</h2>
            <p className="text-gray-600">Upload event reports and generate panchayat-level reports</p>
          </div>

          <Card className="border-2 border-[#138808]">
            <CardHeader className="bg-green-50">
              <CardTitle>Upload Event Report</CardTitle>
              <CardDescription>Submit photos, attendance, and activity summary</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <label className="text-sm font-medium">Event Name</label>
                <select className="w-full mt-1 p-2 border rounded">
                  <option>DBT Verification Camp - Dec 20, 2025</option>
                  <option>Awareness Session - Nov 15, 2025</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Upload Event Photos</label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#138808] transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Drop photos here or click to browse</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Total Attendees</label>
                  <Input type="number" placeholder="Number of participants" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Students Verified</label>
                  <Input type="number" placeholder="Number verified" className="mt-1" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Activity Summary</label>
                <textarea 
                  className="w-full mt-1 p-2 border rounded h-24" 
                  placeholder="Brief summary of the event activities and outcomes..."
                ></textarea>
              </div>
              <Button className="w-full bg-[#138808] hover:bg-[#0f6906]">
                <Upload className="w-4 h-4 mr-2" />
                Submit Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Auto-Generated Reports</CardTitle>
              <CardDescription>Download panchayat-level reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: 'Monthly Progress Report', period: 'November 2025', format: 'PDF' },
                  { title: 'Village-wise Status Report', period: 'Current', format: 'Excel' },
                  { title: 'Event Summary Report', period: 'Last 3 months', format: 'PDF' },
                  { title: 'Student Database Export', period: 'As of today', format: 'CSV' },
                ].map((report, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium">{report.title}</h3>
                        <div className="text-sm text-gray-600 mt-1">{report.period}</div>
                      </div>
                      <Badge variant="outline">{report.format}</Badge>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      <FileText className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {currentTab === 'resources' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl text-[#002147] mb-1">Resources & Training Materials</h2>
            <p className="text-gray-600">Access guides, posters, and training materials in local languages</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'DBT पोस्टर (हिंदी)', language: 'Hindi', type: 'Poster', size: '2.1 MB' },
              { title: 'DBT Poster (English)', language: 'English', type: 'Poster', size: '1.9 MB' },
              { title: 'पंचायत अधिकारी गाइड', language: 'Hindi', type: 'Guide', size: '3.2 MB' },
              { title: 'Panchayat Officer Guide', language: 'English', type: 'Guide', size: '3.0 MB' },
              { title: 'जागरूकता सत्र प्रस्तुति', language: 'Hindi', type: 'PPT', size: '4.5 MB' },
              { title: 'Camp Organization Manual', language: 'English', type: 'PDF', size: '2.8 MB' },
            ].map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-gradient-to-r from-orange-100 to-green-100 p-4 rounded-full mb-3">
                      <BookOpen className="w-8 h-8 text-[#002147]" />
                    </div>
                    <Badge variant="outline" className="mb-2">{resource.language}</Badge>
                    <h3 className="mb-1">{resource.title}</h3>
                    <div className="text-sm text-gray-600 mb-4">
                      {resource.type} • {resource.size}
                    </div>
                    <Button variant="outline" className="w-full border-[#FF9933] text-[#FF9933] hover:bg-orange-50">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {currentTab === 'map' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl text-[#002147] mb-1">Coverage Heat Map</h2>
            <p className="text-gray-600">Village-level DBT enablement visualization</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Panchayat Area Map</CardTitle>
              <CardDescription>DBT enablement status across villages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 mx-auto text-[#FF9933] mb-4" />
                  <p className="text-gray-600">Interactive map showing village-level DBT coverage</p>
                  <p className="text-sm text-gray-500 mt-2">Heat map visualization with color-coded status indicators</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            {chartData.map((village, index) => {
              const total = village.enabled + village.pending;
              const percentage = ((village.enabled / total) * 100).toFixed(0);
              return (
                <Card key={index} className="border-2" style={{ 
                  borderColor: percentage > 75 ? '#138808' : percentage > 50 ? '#f59e0b' : '#ef4444' 
                }}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-[#FF9933]" />
                        {village.village}
                      </span>
                      <Badge 
                        className={percentage > 75 ? 'bg-green-100 text-green-800' : percentage > 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}
                      >
                        {percentage}%
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{village.enabled}/{total}</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${percentage > 75 ? 'bg-[#138808]' : percentage > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="p-2 bg-green-50 rounded text-center">
                          <div className="text-[#138808]">{village.enabled}</div>
                          <div className="text-xs text-gray-600">Enabled</div>
                        </div>
                        <div className="p-2 bg-yellow-50 rounded text-center">
                          <div className="text-yellow-600">{village.pending}</div>
                          <div className="text-xs text-gray-600">Pending</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
