import { supabase } from '../lib/supabase';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const invoiceService = {
  // Create a new invoice
  async createInvoice(invoiceData: any) {
    try {
      // 1. Create invoice in database
      const { data: invoice, error: dbError } = await supabase
        .from('invoices')
        .insert({
          client_name: invoiceData.client.name,
          client_email: invoiceData.client.email,
          client_address: invoiceData.client.address,
          items: invoiceData.items,
          amount: invoiceData.items.reduce((sum: number, item: any) => sum + item.amount, 0),
          due_date: invoiceData.dueDate,
          notes: invoiceData.notes,
          terms: invoiceData.terms,
          status: 'pending'
        })
        .select()
        .single();

      if (dbError) throw dbError;

      // 2. Create Stripe payment link
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Failed to initialize Stripe');

      const response = await fetch('/api/create-payment-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invoice_id: invoice.id,
          amount: invoice.amount,
          client_email: invoice.client_email
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment link');
      }

      const { paymentLink } = await response.json();

      // 3. Update invoice with payment link
      const { error: updateError } = await supabase
        .from('invoices')
        .update({ payment_link: paymentLink })
        .eq('id', invoice.id);

      if (updateError) throw updateError;

      return invoice;
    } catch (error) {
      console.error('Error creating invoice:', error);
      throw error;
    }
  },

  // Send invoice email
  async sendInvoiceEmail(invoiceId: string, templateId: number) {
    try {
      const response = await fetch('/api/send-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invoice_id: invoiceId,
          template_id: templateId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send invoice email');
      }

      return true;
    } catch (error) {
      console.error('Error sending invoice email:', error);
      throw error;
    }
  },

  // Get all invoices
  async getInvoices(filters?: any) {
    try {
      let query = supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters?.status) {
        query = query.eq('status', filters.status);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching invoices:', error);
      throw error;
    }
  }
};

export default invoiceService;