import React, { useState, useEffect } from 'react';
import CreateInvoiceModal from '../components/CreateInvoiceModal';
import { invoiceService } from '../services/invoiceService';
import { motion } from 'framer-motion';
import { 
  Receipt, 
  Plus, 
  Search, 
  Filter, 
  Download,
  CreditCard,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  DollarSign,
  FileText,
  Send,
  Link as LinkIcon,
  Edit,
  Trash2,
  ArrowUpDown,
  Copy,
  Check,
  TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';

const emailTemplates = [
  {
    id: 1,
    name: 'Invoice Ready',
    subject: 'Your Invoice from {{company_name}}',
    body: `Dear {{client_name}},

We hope this email finds you well. Your invoice {{invoice_number}} for {{amount}} is now ready.

You can view and pay your invoice using the secure payment link below:
{{payment_link}}

Due Date: {{due_date}}

If you have any questions, please don't hesitate to contact us.

Best regards,
{{company_name}} Team`
  },
  {
    id: 2,
    name: 'Payment Reminder',
    subject: 'Payment Reminder - Invoice {{invoice_number}}',
    body: `Dear {{client_name}},

This is a friendly reminder that invoice {{invoice_number}} for {{amount}} is due on {{due_date}}.

You can easily pay your invoice using this secure link:
{{payment_link}}

If you have already made the payment, please disregard this reminder.

Best regards,
{{company_name}} Team`
  }
];

const Invoicing = () => {
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
  const [showEmailTemplateModal, setShowEmailTemplateModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const data = await invoiceService.getInvoices();
      setInvoices(data);
    } catch (error) {
      console.error('Error loading invoices:', error);
      toast.error('Failed to load invoices');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateInvoice = async (invoiceData) => {
    try {
      await invoiceService.createInvoice(invoiceData);
      await loadInvoices(); // Refresh the list
      setShowNewInvoiceModal(false);
      toast.success('Invoice created successfully');
    } catch (error) {
      console.error('Error creating invoice:', error);
      toast.error('Failed to create invoice');
    }
  };

  const handleSendInvoice = async (invoice) => {
    try {
      await invoiceService.sendInvoiceEmail(invoice.id, selectedTemplate);
      toast.success('Invoice sent successfully');
      setShowEmailTemplateModal(false);
    } catch (error) {
      console.error('Error sending invoice:', error);
      toast.error('Failed to send invoice');
    }
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(link);
    toast.success('Payment link copied to clipboard');
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500/20 text-green-500';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'overdue':
        return 'bg-red-500/20 text-red-500';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">Invoicing</h1>
          <p className="text-gray-400 mt-1">Manage invoices and payment collection</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            className="btn-outline flex items-center gap-2 bg-dark-100/50 backdrop-blur-sm border-white/10 hover:bg-white/10"
            onClick={() => setShowEmailTemplateModal(true)}
          >
            <Mail size={16} />
            <span>Email Templates</span>
          </button>
          <button 
            className="btn-primary bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 border-0 flex items-center gap-2"
            onClick={() => setShowNewInvoiceModal(true)}
          >
            <Plus size={16} />
            <span>New Invoice</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-card p-6"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">Total Outstanding</p>
              <h3 className="text-2xl font-bold mt-1">$5,300</h3>
              <div className="flex items-center mt-2 text-yellow-500">
                <Clock size={16} />
                <span className="text-sm ml-1">Due within 15 days</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20">
              <DollarSign size={20} className="text-purple-400" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="glass-card p-6"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">Paid Last 30 Days</p>
              <h3 className="text-2xl font-bold mt-1">$12,500</h3>
              <div className="flex items-center mt-2 text-green-500">
                <TrendingUp size={16} />
                <span className="text-sm ml-1">+15% from last month</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-r from-green-600/20 to-blue-600/20">
              <CheckCircle size={20} className="text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">Overdue</p>
              <h3 className="text-2xl font-bold mt-1">$1,800</h3>
              <div className="flex items-center mt-2 text-red-500">
                <Clock size={16} />
                <span className="text-sm ml-1">1 invoice overdue</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-r from-red-600/20 to-purple-600/20">
              <XCircle size={20} className="text-red-400" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="glass-card p-6"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">Autopay Enabled</p>
              <h3 className="text-2xl font-bold mt-1">33%</h3>
              <div className="flex items-center mt-2 text-blue-500">
                <CreditCard size={16} />
                <span className="text-sm ml-1">1 of 3 clients</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20">
              <CreditCard size={20} className="text-blue-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search invoices..."
            className="pl-10 pr-4 py-2 bg-dark-100/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select 
            className="bg-dark-100/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
          
          <button 
            className="btn-outline text-sm py-1.5 flex items-center gap-2 bg-dark-100/50 backdrop-blur-sm border-white/10 hover:bg-white/10"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            <ArrowUpDown size={16} />
            <span>{sortOrder === 'asc' ? 'Ascending' : 'Descending'}</span>
          </button>
          
          <button className="btn-outline text-sm py-1.5 flex items-center gap-2 bg-dark-100/50 backdrop-blur-sm border-white/10 hover:bg-white/10">
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Invoices List */}
      <div className="space-y-4">
        {invoices.map((invoice) => (
          <motion.div 
            key={invoice.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20">
                  <Receipt size={20} className="text-purple-400" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium">{invoice.client.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                    {invoice.autopayEnabled && (
                      <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-500">
                        Autopay
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mt-1">Invoice {invoice.id}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>Due: {invoice.dueDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign size={14} />
                      <span>${invoice.amount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  className="btn-outline text-sm py-1.5 flex items-center gap-1 bg-dark-100/50 backdrop-blur-sm border-white/10 hover:bg-white/10"
                  onClick={() => handleCopyLink(invoice.paymentLink)}
                >
                  {copiedLink === invoice.paymentLink ? (
                    <>
                      <Check size={14} className="text-green-500" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <LinkIcon size={14} />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
                <button 
                  className="btn-outline text-sm py-1.5 flex items-center gap-1 bg-dark-100/50 backdrop-blur-sm border-white/10 hover:bg-white/10"
                  onClick={() => handleSendInvoice(invoice)}
                >
                  <Send size={14} />
                  <span>Send</span>
                </button>
                <button className="btn-outline text-sm py-1.5 bg-dark-100/50 backdrop-blur-sm border-white/10 hover:bg-white/10">
                  <Edit size={14} />
                </button>
                <button className="btn-outline text-sm py-1.5 bg-dark-100/50 backdrop-blur-sm border-red-500/10 hover:bg-red-500/10 text-red-500">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {showNewInvoiceModal && (
        <CreateInvoiceModal
          isOpen={showNewInvoiceModal}
          onClose={() => setShowNewInvoiceModal(false)}
          onSubmit={handleCreateInvoice}
        />
      )}
    </div>
  );
};

export default Invoicing;