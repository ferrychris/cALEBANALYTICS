import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  XCircle, 
  Plus, 
  Minus, 
  Calendar,
  Mail,
  Building2,
  DollarSign,
  FileText,
  Save
} from 'lucide-react';
import { toast } from 'sonner';

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (invoiceData: any) => Promise<void>;
}

const CreateInvoiceModal: React.FC<CreateInvoiceModalProps> = ({ 
  isOpen, 
  onClose,
  onSubmit
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    client: {
      name: '',
      email: '',
      address: ''
    },
    items: [
      { description: '', amount: 0 }
    ],
    dueDate: '',
    notes: '',
    terms: ''
  });

  if (!isOpen) return null;

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: '', amount: 0 }]
    });
  };

  const removeItem = (index: number) => {
    const newItems = [...invoiceData.items];
    newItems.splice(index, 1);
    setInvoiceData({
      ...invoiceData,
      items: newItems
    });
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    const newItems = [...invoiceData.items];
    newItems[index] = {
      ...newItems[index],
      [field]: field === 'amount' ? parseFloat(value as string) || 0 : value
    };
    setInvoiceData({
      ...invoiceData,
      items: newItems
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!invoiceData.client.name || !invoiceData.client.email) {
      toast.error('Please enter client name and email');
      return;
    }
    
    if (invoiceData.items.some(item => !item.description || !item.amount)) {
      toast.error('Please fill in all line items');
      return;
    }
    
    if (!invoiceData.dueDate) {
      toast.error('Please select a due date');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(invoiceData);
      toast.success('Invoice created successfully');
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create invoice');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalAmount = invoiceData.items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-dark-200/90 backdrop-blur-md rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-white/10 shadow-xl"
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Create New Invoice</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10"
          >
            <XCircle size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Client Information */}
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Building2 size={18} className="text-primary-400" />
              Client Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Client Name</label>
                <input 
                  type="text" 
                  className="w-full bg-dark-100/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500" 
                  value={invoiceData.client.name}
                  onChange={(e) => setInvoiceData({
                    ...invoiceData,
                    client: { ...invoiceData.client, name: e.target.value }
                  })}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Client Email</label>
                <input 
                  type="email" 
                  className="w-full bg-dark-100/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500" 
                  value={invoiceData.client.email}
                  onChange={(e) => setInvoiceData({
                    ...invoiceData,
                    client: { ...invoiceData.client, email: e.target.value }
                  })}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Client Address</label>
              <textarea 
                className="w-full bg-dark-100/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 h-24 resize-none" 
                value={invoiceData.client.address}
                onChange={(e) => setInvoiceData({
                  ...invoiceData,
                  client: { ...invoiceData.client, address: e.target.value }
                })}
              />
            </div>
          </div>

          {/* Line Items */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium flex items-center gap-2">
                <FileText size={18} className="text-primary-400" />
                Line Items
              </h3>
              <button 
                type="button"
                className="btn-outline text-sm py-1.5 flex items-center gap-1 bg-dark-100/50 backdrop-blur-sm border-white/10 hover:bg-white/10"
                onClick={addItem}
              >
                <Plus size={14} />
                <span>Add Item</span>
              </button>
            </div>
            
            <div className="space-y-3">
              {invoiceData.items.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-1">
                    <input 
                      type="text" 
                      className="w-full bg-dark-100/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500" 
                      placeholder="Item description"
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                      required
                    />
                  </div>
                  <div className="w-48">
                    <div className="relative">
                      <DollarSign size={16} className="absolute left-3 top-2.5 text-gray-400" />
                      <input 
                        type="number" 
                        className="w-full bg-dark-100/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500" 
                        placeholder="Amount"
                        value={item.amount || ''}
                        onChange={(e) => updateItem(index, 'amount', e.target.value)}
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  {index > 0 && (
                    <button 
                      type="button"
                      className="p-2 rounded-lg bg-dark-100/50 border border-white/10 hover:bg-white/10"
                      onClick={() => removeItem(index)}
                    >
                      <Minus size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-end">
              <div className="bg-dark-100/50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Total Amount:</span>
                  <span className="text-xl font-bold">${totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Due Date</label>
              <input 
                type="date" 
                className="w-full bg-dark-100/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500" 
                value={invoiceData.dueDate}
                onChange={(e) => setInvoiceData({
                  ...invoiceData,
                  dueDate: e.target.value
                })}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Notes</label>
              <input 
                type="text" 
                className="w-full bg-dark-100/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500" 
                value={invoiceData.notes}
                onChange={(e) => setInvoiceData({
                  ...invoiceData,
                  notes: e.target.value
                })}
                placeholder="Optional notes for the client"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Terms & Conditions</label>
            <textarea 
              className="w-full bg-dark-100/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 h-24 resize-none" 
              value={invoiceData.terms}
              onChange={(e) => setInvoiceData({
                ...invoiceData,
                terms: e.target.value
              })}
              placeholder="Optional terms and conditions"
            />
          </div>
          
          <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline bg-dark-100/50 backdrop-blur-sm border-white/10 hover:bg-white/10"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 border-0 flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Create Invoice</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateInvoiceModal;