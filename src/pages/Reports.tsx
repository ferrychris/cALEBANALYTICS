import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Download, 
  FileText, 
  Filter, 
  BarChart3, 
  PieChart, 
  TrendingUp,
  Mail,
  Share2,
  Clock,
  RefreshCw,
  CheckCircle,
  FileBarChart,
  FileSpreadsheet,
  FilePieChart,
  Sparkles,
  Loader,
  Plus,
  X,
  XCircle,
  Copy,
  Check,
  Link
} from 'lucide-react';
import { toast } from 'sonner';

interface GeneratedReport {
  id: number;
  name: string;
  description: string;
  date: string;
  type: 'performance' | 'roi' | 'keywords' | 'audience';
  format: 'pdf' | 'spreadsheet' | 'dashboard';
}

interface ScheduledReport {
  id: number;
  name: string;
  description: string;
  recipients: string[];
  nextRun: string;
  format: 'pdf' | 'spreadsheet' | 'dashboard';
}

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'generated' | 'scheduled' | 'templates'>('generated');
  const [dateRange, setDateRange] = useState<'last7' | 'last30' | 'last90'>('last30');
  const [showNewReportModal, setShowNewReportModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [generatedReportId, setGeneratedReportId] = useState<number | null>(null);
  
  // Form state for new report
  const [newReport, setNewReport] = useState({
    name: '',
    description: '',
    type: 'performance',
    format: 'pdf',
    dateRange: 'last30',
    campaigns: [] as string[]
  });
  
  // Form state for scheduled report
  const [scheduleForm, setScheduleForm] = useState({
    name: '',
    description: '',
    recipients: [''],
    format: 'pdf',
    frequency: 'weekly',
    dayOfWeek: 'monday',
    time: '09:00'
  });

  const generatedReports: GeneratedReport[] = [
    {
      id: 1,
      name: 'Monthly Performance Summary',
      description: 'Overview of all campaign performance metrics for the last month',
      date: 'May 15, 2025',
      type: 'performance',
      format: 'pdf'
    },
    {
      id: 2,
      name: 'Campaign ROI Analysis',
      description: 'Detailed ROI breakdown by campaign with recommendations',
      date: 'May 10, 2025',
      type: 'roi',
      format: 'spreadsheet'
    },
    {
      id: 3,
      name: 'Keyword Performance Report',
      description: 'Analysis of top and underperforming keywords across campaigns',
      date: 'May 5, 2025',
      type: 'keywords',
      format: 'pdf'
    },
    {
      id: 4,
      name: 'Audience Insights',
      description: 'Demographic and behavioral analysis of converting audiences',
      date: 'April 28, 2025',
      type: 'audience',
      format: 'dashboard'
    }
  ];

  const scheduledReports: ScheduledReport[] = [
    {
      id: 1,
      name: 'Weekly Performance Summary',
      description: 'Sent every Monday at 9:00 AM',
      recipients: ['marketing@example.com', 'alex.johnson@example.com'],
      nextRun: 'May 22, 2025',
      format: 'pdf'
    },
    {
      id: 2,
      name: 'Monthly Client Report',
      description: 'Sent on the 1st of each month',
      recipients: ['client@clientcompany.com', 'alex.johnson@example.com'],
      nextRun: 'June 1, 2025',
      format: 'pdf'
    },
    {
      id: 3,
      name: 'Campaign Budget Tracker',
      description: 'Sent every Sunday at 8:00 PM',
      recipients: ['finance@example.com', 'alex.johnson@example.com'],
      nextRun: 'May 21, 2025',
      format: 'spreadsheet'
    }
  ];
  
  // Sample campaign data for report generation
  const campaigns = [
    { id: 1, name: 'Summer Sale Campaign' },
    { id: 2, name: 'Retargeting - Website Visitors' },
    { id: 3, name: 'New Collection Launch' },
    { id: 4, name: 'Brand Awareness' },
    { id: 5, name: 'Competitor Keywords' }
  ];

  const getReportIcon = (type: GeneratedReport['type']) => {
    switch (type) {
      case 'performance':
        return <BarChart3 size={18} />;
      case 'roi':
        return <TrendingUp size={18} />;
      case 'keywords':
        return <FileText size={18} />;
      case 'audience':
        return <PieChart size={18} />;
      default:
        return <FileText size={18} />;
    }
  };

  const getFormatIcon = (format: GeneratedReport['format'] | ScheduledReport['format']) => {
    switch (format) {
      case 'pdf':
        return <FileBarChart size={18} />;
      case 'spreadsheet':
        return <FileSpreadsheet size={18} />;
      case 'dashboard':
        return <FilePieChart size={18} />;
      default:
        return <FileText size={18} />;
    }
  };
  
  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newReport.name) {
      toast.error('Please enter a report name');
      return;
    }
    
    if (newReport.campaigns.length === 0) {
      toast.error('Please select at least one campaign');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate a new report ID
      const newId = Math.max(...generatedReports.map(r => r.id)) + 1;
      setGeneratedReportId(newId);
      
      toast.success('Report generated successfully!');
      setShowNewReportModal(false);
      
      // Reset form
      setNewReport({
        name: '',
        description: '',
        type: 'performance',
        format: 'pdf',
        dateRange: 'last30',
        campaigns: []
      });
    } catch (error) {
      toast.error('Failed to generate report. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleScheduleReport = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!scheduleForm.name) {
      toast.error('Please enter a report name');
      return;
    }
    
    if (scheduleForm.recipients.some(r => !r)) {
      toast.error('Please enter all recipient email addresses');
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Report scheduled successfully!');
      setShowScheduleModal(false);
      
      // Reset form
      setScheduleForm({
        name: '',
        description: '',
        recipients: [''],
        format: 'pdf',
        frequency: 'weekly',
        dayOfWeek: 'monday',
        time: '09:00'
      });
    } catch (error) {
      toast.error('Failed to schedule report. Please try again.');
    }
  };
  
  const toggleCampaign = (campaignId: number) => {
    const campaignIdStr = campaignId.toString();
    if (newReport.campaigns.includes(campaignIdStr)) {
      setNewReport({
        ...newReport,
        campaigns: newReport.campaigns.filter(id => id !== campaignIdStr)
      });
    } else {
      setNewReport({
        ...newReport,
        campaigns: [...newReport.campaigns, campaignIdStr]
      });
    }
  };
  
  const handleAddRecipient = () => {
    setScheduleForm({
      ...scheduleForm,
      recipients: [...scheduleForm.recipients, '']
    });
  };
  
  const handleRemoveRecipient = (index: number) => {
    const newRecipients = [...scheduleForm.recipients];
    newRecipients.splice(index, 1);
    setScheduleForm({
      ...scheduleForm,
      recipients: newRecipients
    });
  };
  
  const handleRecipientChange = (index: number, value: string) => {
    const newRecipients = [...scheduleForm.recipients];
    newRecipients[index] = value;
    setScheduleForm({
      ...scheduleForm,
      recipients: newRecipients
    });
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://nova-analytics.com/shared/report/12345');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Reports</h1>
          <p className="text-gray-400 mt-1">Generate, schedule, and manage your campaign reports</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            className="btn-outline flex items-center gap-2 bg-dark-100/50 backdrop-blur-sm border-white/10 hover:bg-white/10"
            onClick={() => setShowScheduleModal(true)}
          >
            <Clock size={16} />
            <span>Schedule Report</span>
          </button>
          <button 
            className="btn-primary bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 border-0 flex items-center gap-2"
            onClick={() => setShowNewReportModal(true)}
          >
            <FileText size={16} />
            <span>New Report</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        <button
          onClick={() => setActiveTab('generated')}
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === 'generated'
              ? 'border-primary-500 text-primary-400'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          Generated Reports
        </button>
        <button
          onClick={() => setActiveTab('scheduled')}
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === 'scheduled'
              ? 'border-primary-500 text-primary-400'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          Scheduled Reports
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`px-4 py-2 font-medium text-sm border-b-2 ${
            activeTab === 'templates'
              ? 'border-primary-500 text-primary-400'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          Report Templates
        </button>
      </div>

      {/* Generated Reports */}
      {activeTab === 'generated' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="input-field w-full bg-dark-100/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
              <button className="btn-outline text-sm py-1.5 flex items-center gap-2 bg-dark-100/50 backdrop-blur-sm border-white/10 hover:bg-white/10">
                <Filter size={16} />
                <span>Filter</span>
              </button>
            </div>
            <div className="flex items-center bg-dark-100 rounded-lg p-1">
              <button 
                className={`px-3 py-1.5 rounded-md text-sm ${dateRange === 'last7' ? 'bg-primary-600 text-white' : 'text-gray-400'}`}
                onClick={() => setDateRange('last7')}
              >
                7 Days
              </button>
              <button 
                className={`px-3 py-1.5 rounded-md text-sm ${dateRange === 'last30' ? 'bg-primary-600 text-white' : 'text-gray-400'}`}
                onClick={() => setDateRange('last30')}
              >
                30 Days
              </button>
              <button 
                className={`px-3 py-1.5 rounded-md text-sm ${dateRange === 'last90' ? 'bg-primary-600 text-white' : 'text-gray-400'}`}
                onClick={() => setDateRange('last90')}
              >
                90 Days
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {generatedReports.map((report) => (
              <motion.div 
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="backdrop-blur-md bg-dark-200/40 p-6 border border-white/10 rounded-xl shadow-lg relative overflow-hidden"
              >
                {/* Cosmic accent */}
                <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-purple-500/5 blur-xl"></div>
                
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-400">
                      {getReportIcon(report.type)}
                    </div>
                    <div>
                      <h3 className="font-medium">{report.name}</h3>
                      <p className="text-gray-400 text-sm mt-1">{report.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>Generated on {report.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {getFormatIcon(report.format)}
                          <span className="capitalize">{report.format}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      className="btn-outline text-sm py-1.5 flex items-center gap-1 bg-dark-100/50 backdrop-blur-sm border-white/10 hover:bg-white/10"
                      onClick={handleCopyLink}
                    >
                      {copiedLink ? <Check size={14} className="text-green-500" /> : <Link size={14} />}
                      <span>Share</span>
                    </button>
                    <button className="btn-primary text-sm py-1.5 flex items-center gap-1 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 border-0">
                      <Download size={14} />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Scheduled Reports */}
      {activeTab === 'scheduled' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="Search scheduled reports..."
                  className="input-field w-full bg-dark-100/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>
            <button 
              className="btn-primary bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 border-0 flex items-center gap-2"
              onClick={() => setShowScheduleModal(true)}
            >
              <Clock size={16} />
              <span>Schedule New Report</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {scheduledReports.map((report) => (
              <motion.div 
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="backdrop-blur-md bg-dark-200/40 p-6 border border-white/10 rounded-xl shadow-lg relative overflow-hidden"
              >
                {/* Cosmic accent */}
                <div className="absolute -bottom-10 -left-10 w-20 h-20 rounded-full bg-blue-500/5 blur-xl"></div>
                
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400">
                      <Clock size={18} />
                    </div>
                    <div>
                      <h3 className="font-medium">{report.name}</h3>
                      <p className="text-gray-400 text-sm mt-1">{report.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Mail size={14} />
                          <span>{report.recipients.length} recipients</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>Next run: {report.nextRun}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {getFormatIcon(report.format)}
                          <span className="capitalize">{report.format}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="btn-outline text-sm py-1.5 flex items-center gap-1 bg-dark-100/50 backdrop-blur-sm border-white/10 hover:bg-white/10">
                      <RefreshCw size={14} />
                      <span>Run Now</span>
                    </button>
                    <button className="btn-outline text-sm py-1.5 bg-dark-100/50 backdrop-blur-sm border-white/10 hover:bg-white/10">Edit</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Report Templates */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="backdrop-blur-md bg-dark-200/40 p-6 border border-white/10 rounded-xl shadow-lg hover:border-primary-500/50 border-transparent transition-all cursor-pointer relative overflow-hidden"
            >
              {/* Cosmic accent */}
              <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-purple-500/5 blur-xl"></div>
              
              <div className="p-4 rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-400 mb-4 inline-block relative z-10">
                <BarChart3 size={24} />
              </div>
              <h3 className="font-medium text-lg mb-2 relative z-10">Performance Summary</h3>
              <p className="text-gray-400 text-sm relative z-10">Comprehensive overview of campaign performance with key metrics and trends.</p>
              <div className="mt-4 flex items-center gap-2 relative z-10">
                <span className="px-2 py-1 rounded-full text-xs bg-dark-100 text-gray-400">PDF</span>
                <span className="px-2 py-1 rounded-full text-xs bg-dark-100 text-gray-400">Spreadsheet</span>
              </div>
              <button 
                className="btn-primary w-full mt-4 text-sm bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 border-0 relative z-10"
                onClick={() => setShowNewReportModal(true)}
              >
                Use Template
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="backdrop-blur-md bg-dark-200/40 p-6 border border-white/10 rounded-xl shadow-lg hover:border-primary-500/50 border-transparent transition-all cursor-pointer relative overflow-hidden"
            >
              {/* Cosmic accent */}
              <div className="absolute -bottom-10 -left-10 w-20 h-20 rounded-full bg-blue-500/5 blur-xl"></div>
              
              <div className="p-4 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 mb-4 inline-block relative z-10">
                <TrendingUp size={24} />
              </div>
              <h3 className="font-medium text-lg mb-2 relative z-10">ROI Analysis</h3>
              <p className="text-gray-400 text-sm relative z-10">Detailed return on investment analysis with cost per acquisition metrics.</p>
              <div className="mt-4 flex items-center gap-2 relative z-10">
                <span className="px-2 py-1 rounded-full text-xs bg-dark-100 text-gray-400">PDF</span>
                <span className="px-2 py-1 rounded-full text-xs bg-dark-100 text-gray-400">Dashboard</span>
              </div>
              <button 
                className="btn-primary w-full mt-4 text-sm bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 border-0 relative z-10"
                onClick={() => setShowNewReportModal(true)}
              >
                Use Template
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="backdrop-blur-md bg-dark-200/40 p-6 border border-white/10 rounded-xl shadow-lg hover:border-primary-500/50 border-transparent transition-all cursor-pointer relative overflow-hidden"
            >
              {/* Cosmic accent */}
              <div className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-purple-500/5 blur-xl"></div>
              
              <div className="p-4 rounded-lg bg-gradient-to-r from-green-600/20 to-blue-600/20 text-green-400 mb-4 inline-block relative z-10">
                <PieChart size={24} />
              </div>
              <h3 className="font-medium text-lg mb-2 relative z-10">Audience Insights</h3>
              <p className="text-gray-400 text-sm relative z-10">Demographic and behavioral analysis of your converting audiences.</p>
              <div className="mt-4 flex items-center gap-2 relative z-10">
                <span className="px-2 py-1 rounded-full text-xs bg-dark-100 text-gray-400">PDF</span>
                <span className="px-2 py-1 rounded-full text-xs bg-dark-100 text-gray-400">Interactive</span>
              </div>
              <button 
                className="btn-primary w-full mt-4 text-sm bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 border-0 relative z-10"
                onClick={() => setShowNewReportModal(true)}
              >
                Use Template
              </button>
            </motion.div>
          </div>

          <div className="backdrop-blur-md bg-dark-200/40 p-6 border border-white/10 rounded-xl shadow-lg mt-6 relative overflow-hidden">
            {/* Cosmic accent */}
            <div className="absolute -bottom-10 -right-10 w-20 h-20 rounded-full bg-blue-500/5 blur-xl"></div>
            
            <div className="flex items-start gap-4 relative z-10">
              <div className="p-3 rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-400">
                <CheckCircle size={20} />
              </div>
              <div>
                <h3 className="font-medium">Need a custom report template?</h3>
                <p className="text-gray-400 text-sm mt-1">
                  Our AI can generate custom report templates based on your specific needs and metrics.
                </p>
                <button className="btn-primary text-sm mt-3 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 border-0">Create Custom Template</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Report Modal */}
      {showNewReportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-dark-200/90 backdrop-blur-md rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/10 shadow-xl relative"
          >
            {/* Cosmic accents */}
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-purple-500/10 blur-xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-blue-500/10 blur-xl"></div>
            
            <div className="p-6 border-b border-white/10 flex justify-between items-center relative z-10">
              <h2 className="text-xl font-semibold">Generate New Report</h2>
              <button 
                onClick={() => setShowNewReportModal(false)}
                className="p-1 rounded-full hover:bg-white/10"
              >
                <XCircle size={20} />
              </button>
            </div>
            
            <form onSubmit={handleGenerateReport} className="p-6 space-y-6 relative z-10">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Report Name</label>
                <input 
                  type="text" 
                  className="w-full bg-dark-100/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500" 
                  placeholder="Enter report name"
                  value={newReport.name}
                  onChange={(e) => setNewReport({...newReport, name: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Description (Optional)</label>
                <input 
                  type="text" 
                  className="w-full bg-dark-100/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500" 
                  placeholder="Enter description"
                  value={newReport.description}
                  onChange={(e) => setNewReport({...newReport, description: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Report Type</label>
                  <select 
                    className="w-full bg-dark-100/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                    value={newReport.type}
                    onChange={(e) => setNewReport({...newReport, type: e.target.value as any})}
                  >
                    <option value="performance">Performance Summary</option>
                    <option value="roi">ROI Analysis</option>
                    <option value="keywords">Keyword Performance</option>
                    <option value="audience">Audience Insights</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Format</label>
                  <select 
                    className="w-full bg-dark-100/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                    value={newReport.format}
                    onChange={(e) => setNewReport({...newReport, format: e.target.value as any})}
                  >
                    <option value="pdf">PDF</option>
                    <option value="spreadsheet">Spreadsheet</option>
                    <option value="dashboard">Interactive Dashboard</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Date Range</label>
                <select 
                  className="w-full bg-dark-100/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                  value={newReport.dateRange}
                  onChange={(e) => setNewReport({...newReport, dateRange: e.target.value})}
                >
                  <option value="last7">Last 7 days</option>
                  <option value="last30">Last 30 days</option>
                  <option value="last90">Last 90 days</option>
                  <option value="custom">Custom range</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Select Campaigns</label>
                <div className="space-y-2 mt-2">
                  {campaigns.map(campaign => (
                    <button
                      key={campaign.id}
                      type="button"
                      className={`p-3 rounded-lg border ${
                        newReport.campaigns.includes(campaign.id.toString()) 
                          ? 'border-purple-500 bg-purple-500/10' 
                          : 'border-white/10 hover:bg-white/5'
                      } flex items-center gap-2`}
                      onClick={() => toggleCampaign(campaign.id)}
                    >
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        newReport.campaigns.includes(campaign.id.toString()) 
                          ? 'bg-purple-500' 
                          : 'bg-dark-100'
                      }`}>
                        {newReport.campaigns.includes(campaign.id.toString()) && (
                          <Check size={10} className="text-white" />
                        )}
                      </div>
                      <span className={newReport.campaigns.includes(campaign.id.toString()) ? 'text-purple-400' : 'text-gray-400'}>
                        {campaign.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewReportModal(false)}
                  className="btn-outline bg-dark-100/50 backdrop-blur-sm border-white/10 hover:bg-white/10"
                  disabled={isGenerating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 border-0 flex items-center gap-2"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader size={16} className="animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      <span>Generate Report</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Schedule Report Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-dark-200/90 backdrop-blur-md rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/10 shadow-xl relative"
          >
            {/* Cosmic accents */}
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-purple-500/10 blur-xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-blue-500/10 blur-xl"></div>
            
            <div className="p-6 border-b border-white/10 flex justify-between items-center relative z-10">
              <h2 className="text-xl font-semibold">Schedule Report</h2>
              <button 
                onClick={() => setShowScheduleModal(false)}
                className="p-1 rounded-full hover:bg-white/10"
              >
                <XCircle size={20} />
              </button>
            </div>
            
            <form onSubmit={handleScheduleReport} className="p-6 space-y-6 relative z-10">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Report Name</label>
                <input 
                  type="text" 
                  className="w-full bg-dark-100/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500" 
                  placeholder="Enter report name"
                  value={scheduleForm.name}
                  onChange={(e) => setScheduleForm({...scheduleForm, name: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Description (Optional)</label>
                <input 
                  type="text" 
                  className="w-full bg-dark-100/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500" 
                  placeholder="Enter description"
                  value={scheduleForm.description}
                  onChange={(e) => setScheduleForm({...scheduleForm, description: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Recipients</label>
                <div className="space-y-2">
                  {scheduleForm.recipients.map((recipient, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input 
                        type="email" 
                        className="flex-1 bg-dark-100/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500" 
                        placeholder="Enter email address"
                        value={recipient}
                        onChange={(e) => handleRecipientChange(index, e.target.value)}
                        required
                      />
                      {scheduleForm.recipients.length > 1 && (
                        <button 
                          type="button"
                          className="p-2 rounded-lg bg-dark-100/50 border border-white/10 hover:bg-white/10"
                          onClick={() => handleRemoveRecipient(index)}
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button 
                    type="button"
                    className="text-purple-400 text-sm flex items-center gap-1 hover:underline"
                    onClick={handleAddRecipient}
                  >
                    <Plus size={14} />
                    <span>Add Recipient</span>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Format</label>
                  <select 
                    className="w-full bg-dark-100/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                    value={scheduleForm.format}
                    onChange={(e) => setScheduleForm({...scheduleForm, format: e.target.value as any})}
                  >
                    <option value="pdf">PDF</option>
                    <option value="spreadsheet">Spreadsheet</option>
                    <option value="dashboard">Interactive Dashboard</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Frequency</label>
                  <select 
                    className="w-full bg-dark-100/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                    value={scheduleForm.frequency}
                    onChange={(e) => setScheduleForm({...scheduleForm, frequency: e.target.value})}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
              
              {scheduleForm.frequency === 'weekly' && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Day of Week</label>
                  <select 
                    className="w-full bg-dark-100/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                    value={scheduleForm.dayOfWeek}
                    onChange={(e) => setScheduleForm({...scheduleForm, dayOfWeek: e.target.value})}
                  >
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                  </select>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Time</label>
                <input 
                  type="time" 
                  className="w-full bg-dark-100/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500" 
                  value={scheduleForm.time}
                  onChange={(e) => setScheduleForm({...scheduleForm, time: e.target.value})}
                  required
                />
              </div>
              
              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="btn-outline bg-dark-100/50 backdrop-blur-sm border-white/10 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 border-0 flex items-center gap-2"
                >
                  <Clock size={16} />
                  <span>Schedule Report</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      
      {/* Add a shooting star animation */}
      <motion.div
        initial={{ x: '-100%', y: '0%', opacity: 0 }}
        animate={{ 
          x: '200%', 
          y: '100%',
          opacity: [0, 1, 1, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatDelay: 12,
          ease: "easeOut"
        }}
        className="fixed h-0.5 w-20 bg-white blur-sm z-0 pointer-events-none"
        style={{ 
          top: '15%',
          left: '10%',
          transform: 'rotate(-15deg)',
          boxShadow: '0 0 20px 2px rgba(255, 255, 255, 0.7)'
        }}
      />
    </div>
  );
};

export default Reports;