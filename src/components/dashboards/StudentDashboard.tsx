import { useState } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Home,
  BookOpen,
  CheckCircle,
  Award,
  Download,
  HelpCircle,
  AlertCircle,
  PlayCircle,
  FileText,
  ExternalLink,
  X,
} from 'lucide-react';

interface StudentDashboardProps {
  onNavigate: (page: 'landing') => void;
}

export default function StudentDashboard({ onNavigate }: StudentDashboardProps) {
  const [currentTab, setCurrentTab] = useState('home');
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});

  const dbtStatus = {
    enabled: true,
    bankLinked: true,
    aadhaarLinked: true,
    lastVerified: 'October 15, 2025',
  };

  const quizQuestions = [
    {
      question: 'What does DBT stand for?',
      options: ['Direct Bank Transfer', 'Direct Benefit Transfer', 'Digital Banking Technology', 'Data Backup Transfer'],
      correct: 'Direct Benefit Transfer',
    },
    {
      question: 'Why is Aadhaar linking important for DBT?',
      options: [
        'To verify identity',
        'To ensure timely scholarship transfer',
        'To prevent duplication',
        'All of the above',
      ],
      correct: 'All of the above',
    },
    {
      question: 'Where can you check your DBT status?',
      options: ['Bank Branch', 'DBT Portal', 'Gram Panchayat', 'All of the above'],
      correct: 'All of the above',
    },
  ];

  const handleQuizSubmit = () => {
    let score = 0;
    quizQuestions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct) {
        score++;
      }
    });
    setQuizScore(score);
  };

  const sidebar = (
    <nav className="py-4">
      {[
        { id: 'home', label: 'Dashboard', icon: Home },
        { id: 'awareness', label: 'Awareness', icon: BookOpen },
        { id: 'verification', label: 'Verification', icon: CheckCircle },
        { id: 'quiz', label: 'Quiz', icon: Award },
        { id: 'downloads', label: 'Downloads', icon: Download },
        { id: 'support', label: 'Support', icon: HelpCircle },
      ].map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentTab(item.id)}
            className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${
              currentTab === item.id
                ? 'bg-[#E6F0FF] text-[#002147] border-r-4 border-[#002147]'
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
      title="Student Dashboard"
      userRole="Student"
      userName="Rahul Kumar"
      onNavigate={onNavigate}
      sidebar={sidebar}
    >
      {currentTab === 'home' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl text-[#002147] mb-1">Welcome, Rahul!</h2>
            <p className="text-gray-600">Here's your DBT status and latest updates</p>
          </div>

          {/* Status Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  DBT Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Enabled</Badge>
                <p className="text-sm text-gray-600 mt-2">Your account is DBT-ready</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                  Bank Linked
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Verified</Badge>
                <p className="text-sm text-gray-600 mt-2">SBI •••• 4567</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-500" />
                  Aadhaar Linked
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Active</Badge>
                <p className="text-sm text-gray-600 mt-2">•••• •••• 8923</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: 'Nov 10, 2025', action: 'DBT Status verified successfully', status: 'success' },
                  { date: 'Nov 5, 2025', action: 'Completed DBT Awareness Quiz', status: 'success' },
                  { date: 'Oct 28, 2025', action: 'Downloaded DBT Guidelines PDF', status: 'info' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <div className="text-sm">{activity.action}</div>
                      <div className="text-xs text-gray-500">{activity.date}</div>
                    </div>
                    <CheckCircle className="w-4 h-4 text-green-500" />
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
              <div className="grid md:grid-cols-2 gap-4">
                <Button className="bg-[#002147] hover:bg-[#003366]" onClick={() => setCurrentTab('verification')}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Verify Status
                </Button>
                <Button variant="outline" onClick={() => setCurrentTab('quiz')}>
                  <Award className="w-4 h-4 mr-2" />
                  Take Quiz
                </Button>
                <Button variant="outline" onClick={() => setCurrentTab('awareness')}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Learn About DBT
                </Button>
                <Button variant="outline" onClick={() => setCurrentTab('downloads')}>
                  <Download className="w-4 h-4 mr-2" />
                  Download Materials
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {currentTab === 'awareness' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl text-[#002147] mb-1">DBT Awareness & Education</h2>
            <p className="text-gray-600">Learn everything about Direct Benefit Transfer</p>
          </div>

          <Tabs defaultValue="videos" className="w-full">
            <TabsList>
              <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
              <TabsTrigger value="guides">Text Guides</TabsTrigger>
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
            </TabsList>

            <TabsContent value="videos" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: 'What is DBT?', duration: '5:30', views: '2.5K' },
                  { title: 'How to Link Aadhaar', duration: '4:15', views: '3.2K' },
                  { title: 'DBT Bank Linking Process', duration: '6:45', views: '1.8K' },
                  { title: 'Common Issues & Solutions', duration: '8:20', views: '2.1K' },
                ].map((video, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="bg-gray-200 rounded-lg h-40 flex items-center justify-center mb-3">
                        <PlayCircle className="w-12 h-12 text-[#002147]" />
                      </div>
                      <h3 className="mb-2">{video.title}</h3>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{video.duration}</span>
                        <span>{video.views} views</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="guides" className="space-y-4">
              {[
                {
                  title: 'Complete DBT Guide for Students',
                  description: 'Step-by-step guide covering all aspects of DBT',
                },
                {
                  title: 'Aadhaar-Bank Linking Manual',
                  description: 'Detailed instructions for linking your documents',
                },
                {
                  title: 'Scholarship Application Process',
                  description: 'How to apply for scholarships with DBT',
                },
              ].map((guide, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#002147]" />
                      {guide.title}
                    </CardTitle>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Read Guide <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="faqs" className="space-y-4">
              {[
                {
                  q: 'What is DBT and why is it important?',
                  a: 'DBT (Direct Benefit Transfer) ensures that scholarships and benefits reach students directly in their bank accounts without intermediaries, ensuring transparency and timely delivery.',
                },
                {
                  q: 'How do I check if my account is DBT-enabled?',
                  a: 'You can check your DBT status through this portal in the Verification section, or by visiting your bank branch or calling the customer care number.',
                },
                {
                  q: 'What should I do if my DBT is not enabled?',
                  a: 'Visit your bank branch with your Aadhaar card and request DBT enablement. The bank will link your Aadhaar with your account and enable DBT services.',
                },
              ].map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.q}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      )}

      {currentTab === 'verification' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl text-[#002147] mb-1">Self-Verification & Status Check</h2>
            <p className="text-gray-600">Verify your DBT status and eligibility</p>
          </div>

          <Card className="border-2 border-[#002147]">
            <CardHeader className="bg-[#E6F0FF]">
              <CardTitle>Your DBT Status</CardTitle>
              <CardDescription>Last verified: {dbtStatus.lastVerified}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <div>
                      <div className="font-medium">DBT Enabled</div>
                      <div className="text-sm text-gray-600">Your account is ready to receive benefits</div>
                    </div>
                  </div>
                  <Badge className="bg-green-600 hover:bg-green-600">Active</Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Bank Account Linked</span>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="font-medium">State Bank of India</div>
                    <div className="text-sm text-gray-600">Account: •••• •••• 4567</div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Aadhaar Linked</span>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="font-medium">Verified</div>
                    <div className="text-sm text-gray-600">Aadhaar: •••• •••• 8923</div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-blue-900 mb-1">Next Steps</div>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>✓ Your DBT setup is complete</li>
                        <li>✓ You can now apply for scholarships</li>
                        <li>• Keep your contact details updated</li>
                        <li>• Verify status every 3 months</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-[#002147] hover:bg-[#003366]">
                  Re-verify Status
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {currentTab === 'quiz' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl text-[#002147] mb-1">DBT Knowledge Quiz</h2>
            <p className="text-gray-600">Test your understanding and earn a "DBT Smart" badge</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quiz: Understanding DBT</CardTitle>
              <CardDescription>Answer all questions correctly to earn your badge</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {quizQuestions.map((q, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="mb-3">
                      <span className="text-sm text-gray-500">Question {index + 1}</span>
                      <h3 className="text-lg">{q.question}</h3>
                    </div>
                    <div className="space-y-2">
                      {q.options.map((option, optIndex) => (
                        <label
                          key={optIndex}
                          className={`flex items-center p-3 border rounded cursor-pointer hover:bg-gray-50 ${
                            selectedAnswers[index] === option ? 'border-[#002147] bg-[#E6F0FF]' : ''
                          } ${
                            quizScore !== null
                              ? option === q.correct
                                ? 'border-green-500 bg-green-50'
                                : selectedAnswers[index] === option
                                ? 'border-red-500 bg-red-50'
                                : ''
                              : ''
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={option}
                            checked={selectedAnswers[index] === option}
                            onChange={() =>
                              setSelectedAnswers((prev) => ({ ...prev, [index]: option }))
                            }
                            disabled={quizScore !== null}
                            className="mr-3"
                          />
                          <span>{option}</span>
                          {quizScore !== null && option === q.correct && (
                            <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                          )}
                          {quizScore !== null && selectedAnswers[index] === option && option !== q.correct && (
                            <X className="w-5 h-5 text-red-600 ml-auto" />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                {quizScore === null ? (
                  <Button
                    className="w-full bg-[#002147] hover:bg-[#003366]"
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(selectedAnswers).length !== quizQuestions.length}
                  >
                    Submit Quiz
                  </Button>
                ) : (
                  <Card className={quizScore === quizQuestions.length ? 'bg-green-50 border-green-500' : 'bg-orange-50 border-orange-500'}>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-3xl mb-2">
                          {quizScore === quizQuestions.length ? '🎉' : '📚'}
                        </div>
                        <div className="text-2xl mb-2">
                          Score: {quizScore}/{quizQuestions.length}
                        </div>
                        {quizScore === quizQuestions.length ? (
                          <>
                            <p className="text-green-800 mb-4">
                              Congratulations! You've earned the "DBT Smart" badge!
                            </p>
                            <Badge className="bg-green-600 hover:bg-green-600 text-lg px-4 py-2">
                              <Award className="w-5 h-5 mr-2" />
                              DBT Smart
                            </Badge>
                          </>
                        ) : (
                          <p className="text-orange-800 mb-4">
                            Good effort! Review the materials and try again.
                          </p>
                        )}
                        <Button
                          className="mt-4"
                          onClick={() => {
                            setQuizScore(null);
                            setSelectedAnswers({});
                          }}
                        >
                          Retry Quiz
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {currentTab === 'downloads' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl text-[#002147] mb-1">Downloads & Resources</h2>
            <p className="text-gray-600">Download guides, posters, and informational materials</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'DBT Complete Guide', type: 'PDF', size: '2.4 MB', icon: FileText },
              { title: 'Aadhaar Linking Steps', type: 'PDF', size: '1.8 MB', icon: FileText },
              { title: 'DBT Awareness Poster', type: 'JPG', size: '850 KB', icon: Download },
              { title: 'Bank Account Verification Form', type: 'PDF', size: '450 KB', icon: FileText },
              { title: 'Scholarship Application Guide', type: 'PDF', size: '3.2 MB', icon: FileText },
              { title: 'DBT Infographic', type: 'PNG', size: '1.2 MB', icon: Download },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-[#E6F0FF] p-3 rounded">
                        <Icon className="w-6 h-6 text-[#002147]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-1">{item.title}</h3>
                        <div className="text-sm text-gray-600 mb-3">
                          {item.type} • {item.size}
                        </div>
                        <Button variant="outline" className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {currentTab === 'support' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl text-[#002147] mb-1">Support & Help</h2>
            <p className="text-gray-600">Get assistance with DBT-related queries</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Helpdesk
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Call our toll-free helpline for immediate assistance</p>
                <div className="font-medium text-lg text-[#002147]">1800-11-8004</div>
                <div className="text-sm text-gray-600">Available 9 AM - 6 PM</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Email Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Send us your queries via email</p>
                <div className="font-medium text-[#002147]">support@dbtportal.gov.in</div>
                <div className="text-sm text-gray-600">Response within 24 hours</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Visit Center
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Visit your nearest Common Service Center</p>
                <Button variant="outline" className="w-full">
                  Find Centers
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Raise a Ticket</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Issue Category</label>
                  <select className="w-full mt-1 p-2 border rounded">
                    <option>Select category</option>
                    <option>DBT Status Issue</option>
                    <option>Bank Linking Problem</option>
                    <option>Aadhaar Linking Issue</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Describe your issue</label>
                  <textarea className="w-full mt-1 p-2 border rounded h-32" placeholder="Explain your problem in detail..."></textarea>
                </div>
                <Button className="bg-[#002147] hover:bg-[#003366]">Submit Ticket</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}