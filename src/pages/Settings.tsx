import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Building, 
  Bell, 
  Lock, 
  CreditCard, 
  Users, 
  LogOut, 
  Save,
  Check,
  X,
  ChevronRight,
  Shield,
  BellRing,
  Wallet,
  UserCog
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-400 mt-1">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-card p-4 lg:col-span-1"
        >
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-200 ${
                activeTab === 'profile'
                  ? 'bg-primary-600/20 text-primary-400'
                  : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <User size={18} />
              <span>Profile</span>
            </button>
            <button
              onClick={() => setActiveTab('organization')}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-200 ${
                activeTab === 'organization'
                  ? 'bg-primary-600/20 text-primary-400'
                  : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <Building size={18} />
              <span>Organization</span>
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-200 ${
                activeTab === 'team'
                  ? 'bg-primary-600/20 text-primary-400'
                  : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <Users size={18} />
              <span>Team Members</span>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-200 ${
                activeTab === 'notifications'
                  ? 'bg-primary-600/20 text-primary-400'
                  : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <Bell size={18} />
              <span>Notifications</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-200 ${
                activeTab === 'security'
                  ? 'bg-primary-600/20 text-primary-400'
                  : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <Lock size={18} />
              <span>Security</span>
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-200 ${
                activeTab === 'billing'
                  ? 'bg-primary-600/20 text-primary-400'
                  : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <CreditCard size={18} />
              <span>Billing</span>
            </button>
            <button
              onClick={() => setActiveTab('integrations')}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-200 ${
                activeTab === 'integrations'
                  ? 'bg-primary-600/20 text-primary-400'
                  : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <ChevronRight size={18} />
              <span>Integrations</span>
            </button>
          </nav>
          
          <div className="mt-6 pt-6 border-t border-white/10">
            <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-all duration-200">
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </motion.div>

        {/* Content Area */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="glass-card p-6 lg:col-span-3"
        >
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Profile Settings</h2>
                <button className="btn-primary flex items-center gap-2">
                  <Save size={16} />
                  <span>Save Changes</span>
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:w-1/3">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-2xl font-bold">
                      AJ
                    </div>
                    <button className="mt-4 text-primary-400 text-sm">Change Photo</button>
                  </div>
                </div>
                
                <div className="w-full md:w-2/3 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">First Name</label>
                      <input 
                        type="text" 
                        className="input-field w-full" 
                        defaultValue="Alex"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Last Name</label>
                      <input 
                        type="text" 
                        className="input-field w-full" 
                        defaultValue="Johnson"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      className="input-field w-full" 
                      defaultValue="alex.johnson@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Job Title</label>
                    <input 
                      type="text" 
                      className="input-field w-full" 
                      defaultValue="Marketing Director"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      className="input-field w-full" 
                      defaultValue="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Time Zone</label>
                    <select className="input-field w-full">
                      <option>Pacific Time (PT) - US & Canada</option>
                      <option>Eastern Time (ET) - US & Canada</option>
                      <option>Central European Time (CET)</option>
                      <option>Greenwich Mean Time (GMT)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Organization Settings */}
          {activeTab === 'organization' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Organization Settings</h2>
                <button className="btn-primary flex items-center gap-2">
                  <Save size={16} />
                  <span>Save Changes</span>
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-full md:w-1/3">
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 rounded-lg bg-dark-100 flex items-center justify-center">
                        <Building size={40} className="text-gray-400" />
                      </div>
                      <button className="mt-4 text-primary-400 text-sm">Upload Logo</button>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-2/3 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Organization Name</label>
                      <input 
                        type="text" 
                        className="input-field w-full" 
                        defaultValue="Digital Marketing Solutions"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Website</label>
                      <input 
                        type="url" 
                        className="input-field w-full" 
                        defaultValue="https://www.digitalmarketingsolutions.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Industry</label>
                      <select className="input-field w-full">
                        <option>Marketing Agency</option>
                        <option>E-commerce</option>
                        <option>SaaS</option>
                        <option>Retail</option>
                        <option>Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Company Size</label>
                      <select className="input-field w-full">
                        <option>1-10 employees</option>
                        <option>11-50 employees</option>
                        <option>51-200 employees</option>
                        <option>201-500 employees</option>
                        <option>500+ employees</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Business Address</label>
                      <textarea 
                        className="input-field w-full h-24 resize-none" 
                        defaultValue="123 Marketing Street, Suite 456, San Francisco, CA 94107"
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-white/10 pt-6">
                  <h3 className="font-medium mb-4">Billing Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Contact Name</label>
                      <input 
                        type="text" 
                        className="input-field w-full" 
                        defaultValue="Sarah Williams"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Contact Email</label>
                      <input 
                        type="email" 
                        className="input-field w-full" 
                        defaultValue="billing@digitalmarketingsolutions.com"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Team Members */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Team Members</h2>
                <button className="btn-primary flex items-center gap-2">
                  <UserCog size={16} />
                  <span>Invite Member</span>
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 font-medium text-gray-400">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-400">Email</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-400">Role</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-400">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-xs font-bold">
                            AJ
                          </div>
                          <span className="font-medium">Alex Johnson</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">alex.johnson@example.com</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-primary-500/20 text-primary-400">
                          Admin
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                          Active
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-gray-400 hover:text-white">Edit</button>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-xs font-bold">
                            SW
                          </div>
                          <span className="font-medium">Sarah Williams</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">sarah.williams@example.com</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">
                          Manager
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                          Active
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-gray-400 hover:text-white">Edit</button>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-red-500 flex items-center justify-center text-xs font-bold">
                            JD
                          </div>
                          <span className="font-medium">John Davis</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">john.davis@example.com</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-gray-500/20 text-gray-400">
                          Analyst
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                          Active
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-gray-400 hover:text-white">Edit</button>
                      </td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
                            EL
                          </div>
                          <span className="font-medium">Emma Lewis</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">emma.lewis@example.com</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-gray-500/20 text-gray-400">
                          Analyst
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-500">
                          Invited
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-gray-400 hover:text-white">Resend</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="bg-dark-100 p-4 rounded-lg border border-white/10">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-blue-500/20 text-blue-500">
                    <Users size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium">Team Permissions</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Manage what team members can access and modify in your account.
                    </p>
                    <button className="mt-2 text-primary-400 text-sm">Manage Permissions</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Notification Settings</h2>
                <button className="btn-primary flex items-center gap-2">
                  <Save size={16} />
                  <span>Save Changes</span>
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <BellRing size={18} className="text-primary-400" />
                    Email Notifications
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-dark-100 rounded-lg">
                      <div>
                        <p className="font-medium">Campaign Performance Alerts</p>
                        <p className="text-sm text-gray-400">Get notified when campaigns exceed or fall below performance thresholds</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-dark-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-dark-100 rounded-lg">
                      <div>
                        <p className="font-medium">Budget Alerts</p>
                        <p className="text-sm text-gray-400">Receive notifications when campaign budgets reach certain thresholds</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-dark-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-dark-100 rounded-lg">
                      <div>
                        <p className="font-medium">AI Recommendations</p>
                        <p className="text-sm text-gray-400">Get notified when new AI recommendations are available</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-dark-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-dark-100 rounded-lg">
                      <div>
                        <p className="font-medium">Weekly Reports</p>
                        <p className="text-sm text-gray-400">Receive weekly performance summary reports</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-dark-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-dark-100 rounded-lg">
                      <div>
                        <p className="font-medium">System Updates</p>
                        <p className="text-sm text-gray-400">Get notified about new features and platform updates</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-dark-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 pt-6 border-t border-white/10">
                  <h3 className="font-medium flex items-center gap-2">
                    <Bell size={18} className="text-primary-400" />
                    In-App Notifications
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-dark-100 rounded-lg">
                      <div>
                        <p className="font-medium">Real-time Alerts</p>
                        <p className="text-sm text-gray-400">Show real-time notifications for important campaign events</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-dark-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-dark-100 rounded-lg">
                      <div>
                        <p className="font-medium">Team Activity</p>
                        <p className="text-sm text-gray-400">Get notified when team members make changes to campaigns</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-dark-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Security Settings</h2>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Change Password</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Current Password</label>
                      <input 
                        type="password" 
                        className="input-field w-full" 
                        placeholder="Enter your current password"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">New Password</label>
                      <input 
                        type="password" 
                        className="input-field w-full" 
                        placeholder="Enter new password"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Confirm New Password</label>
                      <input 
                        type="password" 
                        className="input-field w-full" 
                        placeholder="Confirm new password"
                      />
                    </div>
                    
                    <button className="btn-primary">Update Password</button>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-white/10 space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Shield size={18} className="text-primary-400" />
                    Two-Factor Authentication
                  </h3>
                  
                  <div className="bg-dark-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-400 mt-1">Add an extra layer of security to your account</p>
                      </div>
                      <button className="btn-outline text-sm py-1.5">Enable</button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-white/10 space-y-4">
                  <h3 className="font-medium">Active Sessions</h3>
                  
                  <div className="space-y-3">
                    <div className="bg-dark-100 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">Chrome on MacBook Pro</p>
                            <span className="px-2 py-0.5 rounded-full text-xs bg-green-500/20 text-green-500">Current</span>
                          </div>
                          <p className="text-sm text-gray-400 mt-1">San Francisco, CA • Last active: Just now</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-dark-100 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Safari on iPhone 13</p>
                          <p className="text-sm text-gray-400 mt-1">San Francisco, CA • Last active: 2 hours ago</p>
                        </div>
                        <button className="text-red-500 text-sm">Logout</button>
                      </div>
                    </div>
                    
                    <button className="text-red-500 text-sm mt-2">Logout of all other sessions</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Billing */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Billing & Subscription</h2>
                <button className="btn-primary flex items-center gap-2">
                  <CreditCard size={16} />
                  <span>Manage Subscription</span>
                </button>
              </div>
              
              <div className="glass-panel p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-primary-600/20 text-primary-400">
                      <Wallet size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium">Current Plan: Professional</h3>
                      <p className="text-sm text-gray-400">$99/month • Renews on June 15, 2025</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">Active</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Plan Features</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-dark-100 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-green-500" />
                      <p>Unlimited campaigns</p>
                    </div>
                  </div>
                  
                  <div className="bg-dark-100 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-green-500" />
                      <p>Advanced AI recommendations</p>
                    </div>
                  </div>
                  
                  <div className="bg-dark-100 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-green-500" />
                      <p>Custom reporting</p>
                    </div>
                  </div>
                  
                  <div className="bg-dark-100 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-green-500" />
                      <p>Team collaboration (up to 5 users)</p>
                    </div>
                  </div>
                  
                  <div className="bg-dark-100 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-green-500" />
                      <p>Priority support</p>
                    </div>
                  </div>
                  
                  <div className="bg-dark-100 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <X size={16} className="text-red-500" />
                      <p className="text-gray-400">White-label reporting</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center mt-4">
                  <button className="btn-secondary">Upgrade to Enterprise</button>
                </div>
              </div>
              
              <div className="pt-6 border-t border-white/10 space-y-4">
                <h3 className="font-medium">Payment Method</h3>
                
                <div className="bg-dark-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white/10">
                        <CreditCard size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-gray-400">Expires 12/2025</p>
                      </div>
                    </div>
                    <button className="text-primary-400 text-sm">Edit</button>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-white/10 space-y-4">
                <h3 className="font-medium">Billing History</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 font-medium text-gray-400">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-400">Description</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-400">Amount</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-400">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-400">Invoice</th>
                      </tr>
                    </thead>
                     <tbody>
                      <tr className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-3 px-4">May 15, 2025</td>
                        <td className="py-3 px-4">Professional Plan - Monthly</td>
                        <td className="py-3 px-4">$99.00</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                            Paid
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-primary-400 text-sm">Download</button>
                        </td>
                      </tr>
                      <tr className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-3 px-4">Apr 15, 2025</td>
                        <td className="py-3 px-4">Professional Plan - Monthly</td>
                        <td className="py-3 px-4">$99.00</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                            Paid
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-primary-400 text-sm">Download</button>
                        </td>
                      </tr>
                      <tr className="border-b border-white/5 hover:bg-white/5">
                        <td className="py-3 px-4">Mar 15, 2025</td>
                        <td className="py-3 px-4">Professional Plan - Monthly</td>
                        <td className="py-3 px-4">$99.00</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">
                            Paid
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-primary-400 text-sm">Download</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Integrations */}
          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Integrations</h2>
              </div>
              
              <div className="space-y-6">
                <div className="glass-panel p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Google Ads</h3>
                          <p className="text-sm text-gray-400 mt-1">Connect your Google Ads accounts to enable AI analysis and optimization.</p>
                        </div>
                        <div>
                          <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">Connected</span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm">Connected account: ads-manager@digitalmarketingsolutions.com</p>
                          <p className="text-sm text-gray-400">Last synced: 2 hours ago</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="btn-outline text-sm py-1.5">Sync Now</button>
                          <button className="btn-outline text-sm py-1.5">Manage</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="glass-panel p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0066FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Facebook Ads</h3>
                          <p className="text-sm text-gray-400 mt-1">Connect your Facebook Ads accounts to enable AI analysis and optimization.</p>
                        </div>
                        <div>
                          <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-500">Not Connected</span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <button className="btn-primary text-sm py-1.5">Connect Account</button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="glass-panel p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Google Analytics</h3>
                          <p className="text-sm text-gray-400 mt-1">Connect Google Analytics to track website performance alongside ad metrics.</p>
                        </div>
                        <div>
                          <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">Connected</span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm">Connected property: Digital Marketing Solutions (UA-12345678-1)</p>
                          <p className="text-sm text-gray-400">Last synced: 1 hour ago</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="btn-outline text-sm py-1.5">Sync Now</button>
                          <button className="btn-outline text-sm py-1.5">Manage</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="glass-panel p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F9D58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Google Sheets</h3>
                          <p className="text-sm text-gray-400 mt-1">Connect Google Sheets to export campaign data and create custom reports.</p>
                        </div>
                        <div>
                          <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">Connected</span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm">Connected account: sheets@digitalmarketingsolutions.com</p>
                          <p className="text-sm text-gray-400">3 active sheet exports</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="btn-outline text-sm py-1.5">View Sheets</button>
                          <button className="btn-outline text-sm py-1.5">Manage</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;