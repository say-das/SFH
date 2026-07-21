import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Code2,
  Share2,
  Mail,
  Settings,
  Search,
  HelpCircle,
  Bell,
  User,
  ChevronDown,
  X,
  Check,
  ExternalLink,
  Undo2,
  Menu,
  ChevronUp,
  AlertTriangle,
  GanttChartSquare,
  Plus,
  Trash2,
  Pencil,
  BellRing,
  Ban,
  MessageSquarePlus
} from 'lucide-react';

const App = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('settings'); // 'settings' or 'setup'
  const [showToast, setShowToast] = useState(false);
  const [activeTab, setActiveTab] = useState('SMS PUMPING PROTECTION');

  const handleSave = () => {
    setCurrentView('settings');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const handleCancel = () => {
    setCurrentView('settings');
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-slate-900 overflow-hidden">
      {/* Primary Sidebar */}
      <aside className="w-16 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col items-center py-4 z-20">
        <div className="mb-8">
          <div className="w-8 h-8 bg-[#0263E0] rounded-full flex items-center justify-center p-1.5">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-6 text-gray-400">
          <button className="hover:text-[#0263E0] transition-colors"><LayoutDashboard size={20} /></button>
          <button className="hover:text-[#0263E0] transition-colors"><Code2 size={20} /></button>
          <button className="hover:text-[#0263E0] transition-colors"><Share2 size={20} /></button>
          <button className="hover:text-[#0263E0] transition-colors"><Mail size={20} /></button>
          <button className="text-[#0263E0]"><Settings size={20} /></button>
        </nav>

        <div className="mt-auto">
           <button className="text-gray-400 hover:text-gray-600 transform rotate-180"><Menu size={20} /></button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Header */}
        <header className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-10">
          <button
            onClick={() => navigate('/editable')}
            className="flex items-center gap-2 text-gray-600 hover:text-[#0263E0] text-sm font-semibold transition-colors"
            title="Switch to editable mode with comments"
          >
            <MessageSquarePlus size={16} />
            Enable Comments
          </button>

          <div className="flex items-center gap-4 text-gray-500">
            <Search size={18} className="cursor-pointer hover:text-gray-800" />
            <HelpCircle size={18} className="cursor-pointer hover:text-gray-800" />
            <Bell size={18} className="cursor-pointer hover:text-gray-800" />
            <Settings size={18} className="cursor-pointer hover:text-gray-800" />
            <div className="w-7 h-7 bg-purple-100 border border-purple-200 rounded-full flex items-center justify-center text-purple-600 cursor-pointer">
              <User size={14} />
            </div>
            <ChevronDown size={14} className="cursor-pointer" />
          </div>
        </header>

        {showToast && (
          <div className="absolute top-4 right-4 z-50 bg-white border border-gray-200 shadow-xl rounded-md p-3 flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-300 w-96">
            <div className="bg-green-100 p-1 rounded-full">
              <Check size={16} className="text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-gray-900">SMS pumping protection has been updated</p>
              <p className="text-[11px] text-gray-500">You have selected Advanced protection</p>
            </div>
            <button onClick={() => setShowToast(false)} className="text-[#0263E0] text-xs font-bold hover:underline">Undo</button>
          </div>
        )}

        <main className="flex-1 overflow-y-auto bg-white">
          {currentView === 'settings' ? (
            <SettingsView 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              onEdit={() => setCurrentView('setup')} 
            />
          ) : (
            <SetupView onSave={handleSave} onCancel={handleCancel} />
          )}
        </main>
      </div>
    </div>
  );
};

// --- View 1: Main Dashboard ---
const SettingsView = ({ activeTab, setActiveTab, onEdit }) => {
  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      <div className="mb-2">
        <p className="text-xs text-gray-500 mb-1">Settings / SMS pumping protection / Advanced selected</p>
        <h1 className="text-2xl font-semibold text-slate-900">Messaging settings</h1>
      </div>

      <div className="flex border-b border-gray-200 mt-8 mb-8">
        {['GENERAL', 'GEO PERMISSIONS', 'SMS PUMPING PROTECTION'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-[11px] font-bold tracking-widest transition-all ${
              activeTab === tab
                ? 'border-b-2 border-[#0263E0] text-[#0263E0] bg-[#F0F6FF]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mb-10">
        <h2 className="text-lg font-medium text-slate-900 mb-1">SMS pumping protection</h2>
        <p className="text-sm text-gray-500 leading-relaxed max-w-3xl">
          Automatically detects and blocks SMS pumping with the Programmable Messaging API. 
          <a href="#" className="text-[#0263E0] ml-1 hover:underline inline-flex items-center gap-0.5">Report concerns to support team <ExternalLink size={12}/></a>
        </p>
      </div>

      <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 mb-4">Select protection</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-lg p-8 bg-white opacity-60">
          <h4 className="text-lg font-semibold mb-6">Basic protection</h4>
          <div className="mb-6"><span className="text-xl font-bold">Free</span><p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-tight">No additional cost</p></div>
          <hr className="mb-6 border-gray-100" />
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-900">Included features</p>
            <div className="flex gap-3 text-sm text-gray-600"><Check size={16} className="text-green-500 flex-shrink-0 mt-0.5" /><span>Automatically monitor and block high risk fraudulent SMS pumping attempts on your account.</span></div>
          </div>
        </div>

        <div className="border-2 border-[#0263E0] rounded-lg p-8 bg-white relative shadow-sm text-slate-900">
          <div className="absolute top-4 right-4 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded">Selected</div>
          <h4 className="text-lg font-semibold mb-6">Advanced protection</h4>
          <div className="mb-6">
            <span className="text-xl font-bold">Paid package</span>
            <p className="text-xs text-gray-500 mt-1 max-w-[240px] leading-relaxed">Additional $0.025 per message segment sent to numbers outside of the US and Canada</p>
          </div>
          <button onClick={onEdit} className="w-full bg-[#0263E0] text-white rounded py-2.5 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#014DB5] shadow-sm transition-all">Edit protection <ExternalLink size={14} /></button>
          <hr className="my-6 border-gray-100" />
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-900">Included features</p>
            {["Fine-tune SMS pumping protection.", "Default protection level blocking.", "Country-specific protection."].map((feature, i) => (
              <div key={i} className="flex gap-3 text-[13px] text-gray-600 leading-tight"><Check size={16} className="text-green-500 flex-shrink-0 mt-0.5" /><span>{feature}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- View 2: Advanced Setup ---
const SetupView = ({ onSave, onCancel }) => {
  const [activeSection, setActiveSection] = useState('default-protection');
  const [defaultProtection, setDefaultProtection] = useState('Medium');
  const [useCase, setUseCase] = useState('AI');
  const [customClassification, setCustomClassification] = useState('Verification/2FA');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showCreateRuleForm, setShowCreateRuleForm] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [showAlertsView, setShowAlertsView] = useState(false);
  
  const [selectedCountries, setSelectedCountries] = useState({
    'Low': ['Japan'],
    'Medium': [],
    'High': [],
    'No protection': ['Australia']
  });

  const countries = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Japan', 'Mexico', 'Australia', 'Brazil', 'India', 'Poland', 'Netherlands', 'Italy', 'Spain', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Russia', 'Nigeria' , 'South Africa', 'Egypt', 'Turkey', 'Argentina', 'Colombia', 'Chile', 'Peru', 'Venezuela', 'Saudi Arabia', 'United Arab Emirates'];

  const sections = [
    { id: 'default-protection', label: 'Default protection' },
    { id: 'country-specific', label: 'Country specific protection' },
    { id: 'messaging-use-case', label: 'Messaging use case' },
    { id: 'diy-fraud-prevention', label: 'DIY Fraud Prevention' },
    { id: 'block-list', label: 'Block list' },
    { id: 'safe-list', label: 'Safe list' },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleCountry = (level, country) => {
    setSelectedCountries(prev => {
      const current = prev[level];
      if (current.includes(country)) {
        return { ...prev, [level]: current.filter(c => c !== country) };
      }
      return { ...prev, [level]: [...current, country] };
    });
  };

  return (
    <div className="flex h-full">
      {/* Secondary Local Sidebar */}
      <nav className="w-64 border-r border-gray-100 p-8 flex-shrink-0 sticky top-0 h-full bg-white z-10">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Setup Navigation</h3>
        <ul className="space-y-1">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left px-3 py-2 text-sm font-medium rounded transition-colors ${
                  activeSection === section.id 
                    ? 'text-[#0263E0] bg-[#F0F6FF] border-r-4 border-[#0263E0]' 
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Form Content */}
      <div className="flex-1 overflow-y-auto px-12 py-10 pb-32">
        <div className="max-w-4xl">
          <p className="text-xs text-gray-500 mb-1">SMS Pumping Protection advanced </p>
          <h1 className="text-2xl font-semibold text-slate-900 mb-12">Configure Advanced Protection</h1>

          {/* Section: Default protection */}
          <section id="default-protection" className="mb-16 scroll-mt-20">
            <h2 className="text-lg font-medium text-slate-900 mb-1">Default protection</h2>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              Select the default protection level. This level will apply to any country that does not have an assigned country-specific protection level.
            </p>
            <div className="space-y-4">
              {['Low', 'Medium', 'High'].map((level) => (
                <div key={level} className="flex gap-4 items-start cursor-pointer group" onClick={() => setDefaultProtection(level)}>
                  <div className={`mt-1 w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${defaultProtection === level ? 'border-[#0263E0]' : 'border-gray-300 group-hover:border-[#0263E0]'}`}>
                    {defaultProtection === level && <div className="w-2 h-2 bg-[#0263E0] rounded-full"></div>}
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${defaultProtection === level ? 'text-[#0263E0]' : 'text-gray-700'}`}>{level}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {level === 'Low' && 'Optimized for fewest false positives. Suitable for business with moderate risks.'}
                      {level === 'Medium' && 'A balanced approach. Recommended for most businesses.'}
                      {level === 'High' && 'Optimized for highest level of protection. Suitable for high-risk regions.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-gray-100 mb-16" />

          {/* Section: Country specific protection */}
          <section id="country-specific" className="mb-16 scroll-mt-20">
            <h2 className="text-lg font-medium text-slate-900 mb-1">Country specific protection</h2>
            <p className="text-sm text-gray-500 mb-8">Protection levels set here will override the default protection level.</p>
            <div className="space-y-6">
              {['Low', 'Medium', 'High', 'No protection'].map((level) => (
                <div key={level} className="relative">
                  <label className="text-[13px] font-medium text-gray-700 mb-2 block">{level}</label>
                  <div 
                    className="min-h-[42px] border border-gray-300 rounded px-3 py-2 flex flex-wrap gap-2 items-center cursor-pointer hover:border-[#0263E0] transition-colors bg-white shadow-sm"
                    onClick={() => setOpenDropdown(openDropdown === level ? null : level)}
                  >
                    {selectedCountries[level].length === 0 && <span className="text-gray-400 text-sm">Select countries...</span>}
                    {selectedCountries[level].map(country => (
                      <span key={country} className="bg-gray-100 text-slate-700 text-[11px] font-semibold px-2 py-1 rounded flex items-center gap-1.5 border border-gray-200">
                        {country} 
                        <X size={12} className="text-gray-400 cursor-pointer hover:text-red-500" onClick={(e) => { e.stopPropagation(); toggleCountry(level, country); }} />
                      </span>
                    ))}
                    <div className="absolute right-3 text-gray-400">
                      {openDropdown === level ? <ChevronUp size={16} className="text-[#0263E0]" /> : <ChevronDown size={16} />}
                    </div>
                  </div>
                  {openDropdown === level && (
                    <div className="absolute z-30 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg max-h-48 overflow-y-auto">
                      {countries.map(c => (
                        <div key={c} className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 flex justify-between items-center" onClick={() => toggleCountry(level, c)}>
                          {c} {selectedCountries[level].includes(c) && <Check size={14} className="text-[#0263E0]" />}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <hr className="border-gray-100 mb-16" />

          {/* Section: Messaging use case */}
          <section id="messaging-use-case" className="mb-16 scroll-mt-20">
            <h2 className="text-lg font-medium text-slate-900 mb-1">Messaging use case</h2>
            <p className="text-sm text-gray-500 mb-8 leading-relaxed uppercase text-[10px] font-bold tracking-widest">Select how to manage your messaging use case</p>
            <div className="space-y-8">
              <div className="flex gap-4 items-start cursor-pointer" onClick={() => setUseCase('AI')}>
                <div className={`mt-1 w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${useCase === 'AI' ? 'border-[#0263E0]' : 'border-gray-300'}`}>
                  {useCase === 'AI' && <div className="w-2 h-2 bg-[#0263E0] rounded-full"></div>}
                </div>
                <div>
                  <p className={`text-sm font-bold ${useCase === 'AI' ? 'text-[#0263E0]' : 'text-gray-700'}`}>AI classification</p>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    By enabling intelligent classification, you consent to allowing our AI systems to read and analyze message content to fine-tune AIT (Artificially Inflated Traffic) detection algorithms.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start cursor-pointer" onClick={() => setUseCase('Custom')}>
                <div className={`mt-1 w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${useCase === 'Custom' ? 'border-[#0263E0]' : 'border-gray-300'}`}>
                  {useCase === 'Custom' && <div className="w-2 h-2 bg-[#0263E0] rounded-full"></div>}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-bold ${useCase === 'Custom' ? 'text-[#0263E0]' : 'text-gray-700'}`}>Custom classification</p>
                  <p className="text-sm text-gray-500 mt-1">Define the type of messages that make up your traffic.</p>
                  {useCase === 'Custom' && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-in slide-in-from-top-2 duration-200">
                      <label className="text-[10px] font-bold text-gray-400 uppercase mb-2 block">Traffic Category</label>
                      <select 
                        className="w-full max-w-sm border border-gray-300 rounded px-3 py-2 text-sm bg-white shadow-sm"
                        value={customClassification}
                        onChange={(e) => setCustomClassification(e.target.value)}
                      >
                        <option value="Verification/2FA">Verification/2FA</option>
                        <option value="Transactional/Notifications">Transactional/Notifications</option>
                        <option value="Promotional/Marketing">Promotional/Marketing</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
          <hr className="border-gray-100 mb-16" />

          {/* Section: DIY Fraud Prevention */}
          <section id="diy-fraud-prevention" className="mb-24 scroll-mt-20">
            {showAlertsView ? (
              <AlertsView onClose={() => setShowAlertsView(false)} />
            ) : (
              <>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">DIY Fraud Prevention</h2>
                <p className="text-[15px] text-gray-600 mb-10">Configure custom fraud detection rules and alerts based on your business requirements.</p>

                {/* Rules Table Header */}
                <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Fraud Detection Rules</h3>
                <p className="text-sm text-gray-500 mt-1">Manage your custom fraud detection rules.</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAlertsView(true)}
                  className="flex items-center gap-2 bg-white border border-gray-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 shadow-sm transition-all"
                >
                  <AlertTriangle size={16} className="text-amber-500" /> View alerts
                </button>
                <button
                  onClick={() => setShowCreateRuleForm(true)}
                  className="flex items-center gap-2 bg-[#0263E0] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#014DB5] shadow-md transition-all"
                >
                  <Plus size={16} /> Create rule
                </button>
              </div>
            </div>

            {/* Rules Table */}
            {!showCreateRuleForm ? (
              <div className="border border-gray-200 rounded-xl overflow-x-auto shadow-sm bg-white">
                <table className="w-full text-left text-sm min-w-[700px]">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr className="text-slate-500 font-bold uppercase text-[11px] tracking-widest">
                      <th className="px-4 py-3">Channel</th>
                      <th className="px-4 py-3">Alert Type</th>
                      <th className="px-4 py-3">Threshold</th>
                      <th className="px-4 py-3">Frequency</th>
                      <th className="px-4 py-3">Scope</th>
                      <th className="px-4 py-3">Notification</th>
                      <th className="px-4 py-3">Action</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {[
                      {
                        channel: 'SMS',
                        direction: 'Outbound',
                        alertType: 'Volume(#) Alert',
                        threshold: '1000',
                        frequency: 'Hourly',
                        scope: 'Global',
                        notification: 'saydas@twilio.com',
                        action: 'Block Traffic'
                      },
                      {
                        channel: 'WhatsApp',
                        direction: 'Both',
                        alertType: 'Fraud Alert',
                        threshold: 'Intelligent',
                        frequency: 'Daily',
                        scope: 'EMEA',
                        notification: 'https://webhook.example.com/alert',
                        action: 'Increase protection'
                      },
                      {
                        channel: 'RCS',
                        direction: 'Inbound',
                        alertType: 'Usage($) Alert',
                        threshold: '5000',
                        frequency: 'Weekly',
                        scope: 'NAMER',
                        notification: 'None',
                        action: 'None'
                      },
                      {
                        channel: 'MMS',
                        direction: 'Outbound',
                        alertType: 'Fraud Alert',
                        threshold: 'Intelligent',
                        frequency: 'Monthly',
                        scope: 'APAC',
                        notification: 'alerts@company.com',
                        action: 'Increase protection'
                      },
                      {
                        channel: 'SMS',
                        direction: 'Both',
                        alertType: 'Volume(#) Alert',
                        threshold: '2500',
                        frequency: 'Daily',
                        scope: 'LATAM',
                        notification: 'security-team@company.com',
                        action: 'Block Traffic'
                      }
                    ].map((row, i) => {
                      // Determine notification type
                      let notificationType = 'None';
                      if (row.notification && row.notification !== 'None') {
                        if (row.notification.includes('@')) {
                          notificationType = 'Email';
                        } else if (row.notification.includes('http')) {
                          notificationType = 'Webhook';
                        }
                      }

                      return (
                        <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex flex-col">
                              <span className="font-bold text-slate-900">{row.channel}</span>
                              <span className="text-xs text-gray-500 mt-0.5">{row.direction}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-600">{row.alertType}</td>
                          <td className="px-4 py-3 text-gray-600">{row.threshold}</td>
                          <td className="px-4 py-3 text-gray-600">{row.frequency}</td>
                          <td className="px-4 py-3 text-gray-600">{row.scope}</td>
                          <td className="px-4 py-3 text-gray-600">{notificationType}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                              row.action === 'Block Traffic' ? 'bg-red-50 text-red-700 border border-red-100' :
                              row.action === 'Increase protection' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                              'bg-gray-50 text-gray-500 border border-gray-100'
                            }`}>
                              {row.action === 'Block Traffic' && <Ban size={10} />}
                              {row.action === 'Increase protection' && <AlertTriangle size={10} />}
                              {row.action}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex gap-3 justify-end text-gray-400">
                              <button
                                onClick={() => {
                                  setEditingRule(row);
                                  setShowCreateRuleForm(true);
                                }}
                                className="hover:text-[#0263E0] transition-colors"
                              >
                                <Pencil size={16} />
                              </button>
                              <button className="hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <CreateRuleForm
                onClose={() => {
                  setShowCreateRuleForm(false);
                  setEditingRule(null);
                }}
                editingRule={editingRule}
                countries={countries}
              />
            )}
              </>
            )}
          </section>

          <hr className="border-gray-100 mb-16" />

          {/* Section: Block list */}
          <section id="block-list" className="mb-24 scroll-mt-20">
            <BlockListSection countries={countries} />
          </section>

          <hr className="border-gray-100 mb-16" />

          {/* Section: Safe list */}
          <section id="safe-list" className="mb-24 scroll-mt-20">
            <SafeListSection />
          </section>

          {/* Sticky Action Footer */}
          <div className="fixed bottom-0 right-0 left-16 bg-white border-t border-gray-100 p-4 flex gap-3 justify-end z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
            <button onClick={onSave} className="bg-[#0263E0] text-white px-10 py-2.5 rounded-lg font-bold text-sm hover:bg-[#014DB5] shadow-md transition-all active:scale-[0.98]">Save</button>
            <button onClick={onCancel} className="bg-white border border-gray-300 text-gray-700 px-10 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-50 transition-all">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Block List Section Component ---
const BlockListSection = ({ countries }) => {
  const [showAddBlockForm, setShowAddBlockForm] = useState(false);
  const [blockType, setBlockType] = useState('network'); // 'network' or 'phone'

  // MCC-MNC mapping for countries and networks
  const networkMapping = {
    'United States': [
      { network: 'Verizon', mccMnc: '310-004' },
      { network: 'AT&T', mccMnc: '310-410' },
      { network: 'T-Mobile', mccMnc: '310-260' }
    ],
    'Germany': [
      { network: 'Deutsche Telekom', mccMnc: '262-01' },
      { network: 'Vodafone', mccMnc: '262-02' },
      { network: 'O2', mccMnc: '262-03' }
    ],
    'India': [
      { network: 'Airtel', mccMnc: '404-10' },
      { network: 'Vodafone Idea', mccMnc: '404-11' },
      { network: 'Jio', mccMnc: '405-857' }
    ],
    'United Kingdom': [
      { network: 'EE', mccMnc: '234-30' },
      { network: 'O2', mccMnc: '234-10' },
      { network: 'Vodafone', mccMnc: '234-15' }
    ]
  };

  // Sample blocks data
  const [blocks, setBlocks] = useState([
    {
      id: 1,
      type: 'network',
      country: 'Germany',
      network: 'Vodafone',
      mccMnc: '262-02',
      channel: 'SMS',
      direction: 'Outbound',
      ttl: 'Permanent',
      reason: 'High fraud rate detected',
      createdAt: '2025.03.15 14:22:10',
      status: 'Active'
    },
    {
      id: 2,
      type: 'network',
      country: 'India',
      network: 'Jio',
      mccMnc: '405-857',
      channel: 'WhatsApp',
      direction: 'Both',
      ttl: '30 days',
      expiresAt: '2025.04.20',
      reason: 'Temporary block for investigation',
      createdAt: '2025.03.21 09:15:33',
      status: 'Active'
    },
    {
      id: 3,
      type: 'phone',
      phoneNumber: '+919611531xxx',
      channel: 'SMS',
      direction: 'Inbound',
      ttl: '7 days',
      expiresAt: '2025.04.05',
      reason: 'Spam number prefix',
      createdAt: '2025.03.29 16:45:21',
      status: 'Active'
    }
  ]);

  const handleArchiveBlock = (blockId) => {
    if (window.confirm('Are you sure you want to archive this block?')) {
      setBlocks(prev => prev.map(block =>
        block.id === blockId ? { ...block, status: 'Archived' } : block
      ));
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Block list</h2>
      <p className="text-[15px] text-gray-600 mb-10">
        Block networks or phone numbers to prevent fraudulent traffic. Blocks can be temporary or permanent.
      </p>

      {/* Block Type Toggle & Add Button */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setBlockType('network')}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
              blockType === 'network'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-gray-600 hover:text-slate-900'
            }`}
          >
            Network Blocks
          </button>
          <button
            onClick={() => setBlockType('phone')}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
              blockType === 'phone'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-gray-600 hover:text-slate-900'
            }`}
          >
            Phone Number Blocks
          </button>
        </div>
        <button
          onClick={() => setShowAddBlockForm(true)}
          className="flex items-center gap-2 bg-[#0263E0] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#014DB5] shadow-md transition-all"
        >
          <Plus size={16} /> Add block
        </button>
      </div>

      {/* Blocks Table */}
      {!showAddBlockForm ? (
        <div className="border border-gray-200 rounded-xl overflow-x-auto shadow-sm bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-slate-500 font-bold uppercase text-[11px] tracking-widest">
                {blockType === 'network' ? (
                  <>
                    <th className="px-4 py-3">Country</th>
                    <th className="px-4 py-3">Network</th>
                    <th className="px-4 py-3">MCC-MNC</th>
                  </>
                ) : (
                  <th className="px-4 py-3">Phone Number</th>
                )}
                <th className="px-4 py-3">Channel</th>
                <th className="px-4 py-3">TTL</th>
                <th className="px-4 py-3">Reason</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {blocks
                .filter(block => block.type === blockType && block.status === 'Active')
                .map((block) => (
                  <tr key={block.id} className="hover:bg-gray-50/50 transition-colors">
                    {blockType === 'network' ? (
                      <>
                        <td className="px-4 py-3 font-medium text-slate-900">{block.country}</td>
                        <td className="px-4 py-3 text-gray-600">{block.network}</td>
                        <td className="px-4 py-3 text-gray-600 font-mono text-xs">{block.mccMnc}</td>
                      </>
                    ) : (
                      <td className="px-4 py-3 font-medium text-slate-900 font-mono">{block.phoneNumber}</td>
                    )}
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{block.channel}</span>
                        <span className="text-xs text-gray-500 mt-0.5">{block.direction}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="text-gray-600">{block.ttl}</span>
                        {block.expiresAt && (
                          <span className="text-xs text-gray-400 mt-0.5">Expires: {block.expiresAt}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs max-w-[200px] truncate">{block.reason}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{block.createdAt}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-green-50 text-green-700 border border-green-100">
                        {block.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleArchiveBlock(block.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Archive block"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <AddBlockForm
          blockType={blockType}
          onClose={() => setShowAddBlockForm(false)}
          countries={countries}
          networkMapping={networkMapping}
        />
      )}
    </>
  );
};

// --- Add Block Form Component ---
const AddBlockForm = ({ blockType, onClose, countries, networkMapping }) => {
  const [formData, setFormData] = useState({
    country: '',
    network: '',
    mccMnc: '',
    phoneNumber: '',
    channel: 'SMS',
    direction: 'Outbound',
    ttlType: 'days',
    ttlValue: '30',
    reason: ''
  });

  const [availableNetworks, setAvailableNetworks] = useState([]);

  const handleCountryChange = (country) => {
    setFormData(prev => ({ ...prev, country, network: '', mccMnc: '' }));
    setAvailableNetworks(networkMapping[country] || []);
  };

  const handleNetworkChange = (network) => {
    const selectedNetwork = availableNetworks.find(n => n.network === network);
    setFormData(prev => ({
      ...prev,
      network,
      mccMnc: selectedNetwork ? selectedNetwork.mccMnc : ''
    }));
  };

  const handleMccMncChange = (mccMnc) => {
    setFormData(prev => ({ ...prev, mccMnc }));
    // Find matching network
    for (const [country, networks] of Object.entries(networkMapping)) {
      const found = networks.find(n => n.mccMnc === mccMnc);
      if (found) {
        setFormData(prev => ({ ...prev, country, network: found.network }));
        setAvailableNetworks(networks);
        break;
      }
    }
  };

  const handlePhoneNumberChange = (value) => {
    // Auto-format to prefix if full number
    let formatted = value;
    if (value.length > 10 && !value.includes('xxx')) {
      formatted = value.slice(0, -3) + 'xxx';
    }
    setFormData(prev => ({ ...prev, phoneNumber: formatted }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Block added:', formData);
    onClose();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            Add {blockType === 'network' ? 'Network' : 'Phone Number'} Block
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {blockType === 'network'
              ? 'Block a network using country/network or MCC-MNC code'
              : 'Block a phone number or phone number prefix'}
          </p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {blockType === 'network' ? (
          <>
            {/* Network Block Fields */}
            <div className="grid grid-cols-2 gap-6">
              {/* Country */}
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Country</label>
                <select
                  value={formData.country}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#0263E0] outline-none"
                >
                  <option value="">Select country</option>
                  {Object.keys(networkMapping).map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              {/* Network */}
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">Network</label>
                <select
                  value={formData.network}
                  onChange={(e) => handleNetworkChange(e.target.value)}
                  disabled={!formData.country}
                  className={`w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm shadow-sm focus:ring-2 focus:ring-[#0263E0] outline-none ${
                    !formData.country ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                  }`}
                >
                  <option value="">Select network</option>
                  {availableNetworks.map(net => (
                    <option key={net.mccMnc} value={net.network}>{net.network}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* MCC-MNC */}
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">
                MCC-MNC Code <span className="text-gray-400 font-normal">(or enter manually)</span>
              </label>
              <input
                type="text"
                value={formData.mccMnc}
                onChange={(e) => handleMccMncChange(e.target.value)}
                placeholder="e.g., 262-02"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#0263E0] outline-none font-mono"
              />
              <p className="text-xs text-gray-400 mt-1">Format: MCC-MNC (e.g., 262-02 for Vodafone Germany)</p>
            </div>
          </>
        ) : (
          <>
            {/* Phone Number Block Fields */}
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Phone Number or Prefix</label>
              <input
                type="text"
                value={formData.phoneNumber}
                onChange={(e) => handlePhoneNumberChange(e.target.value)}
                placeholder="+919611531xxx or +919611531234"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#0263E0] outline-none font-mono"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                Full number or prefix with 'xxx' for last 3 digits (auto-formatted)
              </p>
            </div>
          </>
        )}

        {/* Common Fields */}
        <div className="border-t border-gray-100 pt-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Channel */}
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Channel *</label>
              <select
                value={formData.channel}
                onChange={(e) => setFormData(prev => ({ ...prev, channel: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#0263E0] outline-none"
                required
              >
                <option value="SMS">SMS</option>
                <option value="RCS">RCS</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="MMS">MMS</option>
              </select>
            </div>

            {/* Direction */}
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Direction *</label>
              <select
                value={formData.direction}
                onChange={(e) => setFormData(prev => ({ ...prev, direction: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#0263E0] outline-none"
                required
              >
                <option value="Inbound">Inbound</option>
                <option value="Outbound">Outbound</option>
                <option value="Both">Both</option>
              </select>
            </div>

            {/* TTL */}
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">TTL (Time to Live) *</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="1"
                  value={formData.ttlValue}
                  onChange={(e) => setFormData(prev => ({ ...prev, ttlValue: e.target.value }))}
                  disabled={formData.ttlType === 'permanent'}
                  className={`flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm shadow-sm focus:ring-2 focus:ring-[#0263E0] outline-none ${
                    formData.ttlType === 'permanent' ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                  }`}
                  placeholder="30"
                />
                <select
                  value={formData.ttlType}
                  onChange={(e) => setFormData(prev => ({ ...prev, ttlType: e.target.value }))}
                  className="w-32 border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#0263E0] outline-none"
                >
                  <option value="days">Days</option>
                  <option value="permanent">Permanent</option>
                </select>
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Reason</label>
              <input
                type="text"
                value={formData.reason}
                onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                placeholder="Reason for blocking"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#0263E0] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#0263E0] text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#014DB5] shadow-md transition-all active:scale-[0.98]"
          >
            Add Block
          </button>
        </div>
      </form>
    </div>
  );
};

// --- Safe List Section Component ---
const SafeListSection = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);

  // Sample safelist data
  const [safelistEntries, setSafelistEntries] = useState([
    {
      id: 1,
      phoneNumber: '+12025551234',
      type: 'full',
      reason: 'Corporate headquarters main line',
      addedBy: 'admin@company.com',
      createdAt: '2026.05.08 10:30:15'
    },
    {
      id: 2,
      phoneNumber: '+919611531xxx',
      type: 'prefix',
      reason: 'Trusted partner number range',
      addedBy: 'security@company.com',
      createdAt: '2026.05.09 14:22:30'
    },
    {
      id: 3,
      phoneNumber: '+442071234567',
      type: 'full',
      reason: 'UK customer service line',
      addedBy: 'admin@company.com',
      createdAt: '2026.05.10 09:15:42'
    }
  ]);

  const handleDeleteEntry = (entryId) => {
    if (window.confirm('Are you sure you want to remove this number from the safelist?')) {
      setSafelistEntries(prev => prev.filter(entry => entry.id !== entryId));
    }
  };

  const handleAddEntry = (newEntry) => {
    setSafelistEntries(prev => [...prev, { ...newEntry, id: Date.now() }]);
    setShowAddForm(false);
  };

  const handleBulkUpload = (entries) => {
    setSafelistEntries(prev => [...prev, ...entries]);
    setShowBulkUpload(false);
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Safe list</h2>
      <p className="text-[15px] text-gray-600 mb-10">
        Safelist phone numbers to exclude them from fraud detection. Safelisted numbers will never be blocked or flagged.
      </p>

      {/* Action Buttons */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="font-semibold">{safelistEntries.length}</span> safelisted numbers
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowBulkUpload(true)}
            className="flex items-center gap-2 bg-white border border-gray-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 shadow-sm transition-all"
          >
            <Plus size={16} /> Bulk upload
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-[#0263E0] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#014DB5] shadow-md transition-all"
          >
            <Plus size={16} /> Add number
          </button>
        </div>
      </div>

      {/* Safelist Table */}
      {!showAddForm && !showBulkUpload ? (
        <div className="border border-gray-200 rounded-xl overflow-x-auto shadow-sm bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-slate-500 font-bold uppercase text-[11px] tracking-widest">
                <th className="px-4 py-3">Phone Number</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Reason</th>
                <th className="px-4 py-3">Added By</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {safelistEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 font-mono font-medium text-slate-900">{entry.phoneNumber}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      entry.type === 'full'
                        ? 'bg-[#F0F6FF] text-[#0263E0] border border-[#0263E0]'
                        : 'bg-purple-50 text-purple-700 border border-purple-100'
                    }`}>
                      {entry.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs max-w-[300px] truncate">{entry.reason}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{entry.addedBy}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{entry.createdAt}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove from safelist"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : showAddForm ? (
        <AddSafelistForm onClose={() => setShowAddForm(false)} onAdd={handleAddEntry} />
      ) : (
        <BulkUploadForm onClose={() => setShowBulkUpload(false)} onUpload={handleBulkUpload} />
      )}
    </>
  );
};

// --- Add Safelist Form Component ---
const AddSafelistForm = ({ onClose, onAdd }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [reason, setReason] = useState('');
  const [entryType, setEntryType] = useState('full');

  const handlePhoneNumberChange = (value) => {
    // Auto-detect if it's a prefix format
    if (value.includes('xxx')) {
      setEntryType('prefix');
    } else if (value.length > 10 && !value.includes('xxx')) {
      // Auto-convert to prefix format when typing
      setEntryType('full');
    }
    setPhoneNumber(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate E.164 format
    const e164Regex = /^\+[1-9]\d{1,14}$/;
    const prefixRegex = /^\+[1-9]\d{1,11}xxx$/;

    const cleanNumber = phoneNumber.trim();
    const isValidFull = e164Regex.test(cleanNumber);
    const isValidPrefix = prefixRegex.test(cleanNumber);

    if (!isValidFull && !isValidPrefix) {
      alert('Please enter a valid E.164 format number (e.g., +12025551234) or prefix (e.g., +1202555xxxx)');
      return;
    }

    const newEntry = {
      phoneNumber: cleanNumber,
      type: cleanNumber.includes('xxx') ? 'prefix' : 'full',
      reason: reason || 'No reason provided',
      addedBy: 'current.user@company.com', // Would come from auth
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19).replace(/-/g, '.')
    };

    onAdd(newEntry);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Add to Safelist</h3>
          <p className="text-sm text-gray-500 mt-1">
            Add a phone number or prefix to exclude from fraud detection
          </p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-2 block">
            Phone Number (E.164 Format) *
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => handlePhoneNumberChange(e.target.value)}
            placeholder="+12025551234 or +1202555xxxx"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#0263E0] outline-none font-mono"
            required
          />
          <div className="flex items-start gap-2 mt-2">
            <div className="text-xs text-gray-500">
              <p className="mb-1"><strong>Full number:</strong> +12025551234 (exact match)</p>
              <p><strong>Prefix:</strong> +1202555xxxx (matches last 3 digits as wildcard)</p>
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700 mb-2 block">
            Type
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={entryType === 'full'}
                onChange={() => setEntryType('full')}
                className="w-4 h-4 text-[#0263E0]"
              />
              <span className="text-sm text-gray-700">Full number (exact match)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={entryType === 'prefix'}
                onChange={() => setEntryType('prefix')}
                className="w-4 h-4 text-[#0263E0]"
              />
              <span className="text-sm text-gray-700">Prefix (range match)</span>
            </label>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700 mb-2 block">
            Reason
          </label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Why is this number safelisted?"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#0263E0] outline-none"
          />
          <p className="text-xs text-gray-400 mt-1">Optional: Document why this number should be trusted</p>
        </div>

        <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#0263E0] text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#014DB5] shadow-md transition-all active:scale-[0.98]"
          >
            Add to Safelist
          </button>
        </div>
      </form>
    </div>
  );
};

// --- Bulk Upload Form Component ---
const BulkUploadForm = ({ onClose, onUpload }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith('.csv')) {
      alert('Please upload a CSV file');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
      alert('File size must be less than 5MB');
      return;
    }

    setFile(selectedFile);
    parseCSV(selectedFile);
  };

  const parseCSV = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split('\n').filter(line => line.trim());

      // Skip header if present
      const startIndex = lines[0].toLowerCase().includes('phone') ? 1 : 0;

      const parsed = [];
      const errorList = [];

      lines.slice(startIndex).forEach((line, index) => {
        const [phoneNumber, reason] = line.split(',').map(s => s.trim().replace(/^"|"$/g, ''));

        if (!phoneNumber) return;

        // Validate E.164 format
        const e164Regex = /^\+[1-9]\d{1,14}$/;
        const prefixRegex = /^\+[1-9]\d{1,11}xxx$/;

        if (!e164Regex.test(phoneNumber) && !prefixRegex.test(phoneNumber)) {
          errorList.push({
            line: startIndex + index + 1,
            number: phoneNumber,
            error: 'Invalid E.164 format'
          });
          return;
        }

        if (parsed.length >= 5000) {
          errorList.push({
            line: startIndex + index + 1,
            number: phoneNumber,
            error: 'Exceeded 5,000 entry limit'
          });
          return;
        }

        parsed.push({
          phoneNumber,
          type: phoneNumber.includes('xxx') ? 'prefix' : 'full',
          reason: reason || 'Bulk uploaded',
          addedBy: 'current.user@company.com',
          createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19).replace(/-/g, '.')
        });
      });

      setPreview(parsed.slice(0, 10)); // Show first 10
      setErrors(errorList);
    };
    reader.readAsText(file);
  };

  const handleUpload = () => {
    if (!file || preview.length === 0) {
      alert('Please select a valid CSV file');
      return;
    }

    setUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const lines = text.split('\n').filter(line => line.trim());
        const startIndex = lines[0].toLowerCase().includes('phone') ? 1 : 0;

        const entries = [];
        lines.slice(startIndex).forEach((line) => {
          const [phoneNumber, reason] = line.split(',').map(s => s.trim().replace(/^"|"$/g, ''));
          if (!phoneNumber) return;
          if (entries.length >= 5000) return;

          const e164Regex = /^\+[1-9]\d{1,14}$/;
          const prefixRegex = /^\+[1-9]\d{1,11}xxx$/;

          if (e164Regex.test(phoneNumber) || prefixRegex.test(phoneNumber)) {
            entries.push({
              id: Date.now() + entries.length,
              phoneNumber,
              type: phoneNumber.includes('xxx') ? 'prefix' : 'full',
              reason: reason || 'Bulk uploaded',
              addedBy: 'current.user@company.com',
              createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19).replace(/-/g, '.')
            });
          }
        });

        onUpload(entries);
        setUploading(false);
      };
      reader.readAsText(file);
    }, 1500);
  };

  const downloadTemplate = () => {
    const csv = 'phone_number,reason\n+12025551234,Corporate main line\n+919611531xxx,Partner number range';
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'safelist_template.csv';
    a.click();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Bulk Upload Safelist</h3>
          <p className="text-sm text-gray-500 mt-1">
            Upload up to 5,000 phone numbers via CSV file
          </p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="space-y-6">
        {/* Instructions */}
        <div className="bg-[#F0F6FF] border border-[#0263E0] rounded-lg p-4">
          <h4 className="text-sm font-semibold text-slate-900 mb-2">CSV Format Requirements</h4>
          <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
            <li>Format: <code className="bg-white px-1 py-0.5 rounded font-mono">phone_number,reason</code></li>
            <li>Phone numbers must be in E.164 format (e.g., +12025551234)</li>
            <li>Prefix format supported (e.g., +1202555xxxx for last 3 digits wildcard)</li>
            <li>Maximum 5,000 entries per upload</li>
            <li>Reason is optional (will default to "Bulk uploaded")</li>
            <li>Header row is optional</li>
          </ul>
          <button
            onClick={downloadTemplate}
            className="mt-3 text-xs text-[#0263E0] font-semibold hover:underline"
          >
            Download CSV template
          </button>
        </div>

        {/* File Upload */}
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-2 block">
            Upload CSV File
          </label>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#F0F6FF] file:text-[#0263E0] hover:file:bg-[#0263E0] hover:file:text-white file:cursor-pointer"
          />
          {file && (
            <p className="text-xs text-gray-500 mt-2">
              Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </p>
          )}
        </div>

        {/* Preview */}
        {preview.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-2">
              Preview (showing first 10 of {preview.length} entries)
            </h4>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold">Phone Number</th>
                    <th className="px-3 py-2 text-left font-semibold">Type</th>
                    <th className="px-3 py-2 text-left font-semibold">Reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {preview.map((entry, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-3 py-2 font-mono">{entry.phoneNumber}</td>
                      <td className="px-3 py-2">
                        <span className="text-[10px] font-bold uppercase">{entry.type}</span>
                      </td>
                      <td className="px-3 py-2 text-gray-600">{entry.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Errors */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-red-900 mb-2">
              {errors.length} Error{errors.length !== 1 ? 's' : ''} Found
            </h4>
            <div className="max-h-32 overflow-y-auto">
              <ul className="text-xs text-red-700 space-y-1">
                {errors.slice(0, 10).map((error, i) => (
                  <li key={i}>
                    Line {error.line}: {error.number} - {error.error}
                  </li>
                ))}
                {errors.length > 10 && (
                  <li className="font-semibold">...and {errors.length - 10} more errors</li>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!file || preview.length === 0 || uploading}
            className="bg-[#0263E0] text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#014DB5] shadow-md transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Uploading...' : `Upload ${preview.length} Numbers`}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Alerts View Component ---
const AlertsView = ({ onClose }) => {
  const [filters, setFilters] = useState({
    channel: 'All',
    scope: 'All countries',
    dateFrom: '2025-01-05',
    dateTo: '2025-06-30',
    alertType: 'All alerts',
    action: 'All',
    notification: 'All'
  });

  // Sample alerts data
  const alertsData = [
    {
      id: 1,
      channel: 'SMS',
      direction: 'Outbound',
      scope: 'Thailand (+66)',
      flag: '🇹🇭',
      volume: 2515,
      dateTime: '2025.03.27 20:55:43',
      action: 'None',
      notification: 'Yes',
      alertType: 'Volume(#) Alert'
    },
    {
      id: 2,
      channel: 'SMS',
      direction: 'Outbound',
      scope: 'Germany (+49)',
      flag: '🇩🇪',
      volume: 32566,
      dateTime: '2025.03.11 17:56:10',
      action: 'Block Traffic',
      notification: 'Yes',
      alertType: 'Volume(#) Alert'
    },
    {
      id: 3,
      channel: 'WhatsApp',
      direction: 'Both',
      scope: 'New Zealand (+64)',
      flag: '🇳🇿',
      volume: 1937,
      dateTime: '2025.02.11 04:52:54',
      action: 'Block Traffic',
      notification: 'Yes',
      alertType: 'Fraud Alert'
    },
    {
      id: 4,
      channel: 'SMS',
      direction: 'Both',
      scope: 'Laos (+856)',
      flag: '🇱🇦',
      volume: 1074,
      dateTime: '2025.02.10 12:23:48',
      action: 'Block Traffic',
      notification: 'Yes',
      alertType: 'Volume(#) Alert'
    },
    {
      id: 5,
      channel: 'RCS',
      direction: 'Inbound',
      scope: 'Bulgaria (+359)',
      flag: '🇧🇬',
      volume: 5201,
      dateTime: '2025.02.08 10:22:56',
      action: 'Block Traffic',
      notification: 'Yes',
      alertType: 'Usage($) Alert'
    },
    {
      id: 6,
      channel: 'SMS',
      direction: 'Outbound',
      scope: 'Canada (+1204)',
      flag: '🇨🇦',
      volume: 2329,
      dateTime: '2025.02.03 04:23:05',
      action: 'Increase protection',
      notification: 'Yes',
      alertType: 'Fraud Alert'
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-top-2 duration-300">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-slate-900">Alerts</h2>
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-[#0263E0] hover:text-[#014DB5] font-semibold text-sm transition-colors"
          >
            <X size={16} />
            Close
          </button>
        </div>
        <p className="text-[15px] text-gray-600">Here you can see all alerts triggered on your account.</p>
      </div>

      {/* Filters Section */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
        <div className="grid grid-cols-4 gap-4 mb-4">
          {/* Channel Filter */}
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-2 block">Channel</label>
            <select
              value={filters.channel}
              onChange={(e) => setFilters(prev => ({ ...prev, channel: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#0263E0] outline-none"
            >
              <option value="All">All channels</option>
              <option value="SMS">SMS</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="RCS">RCS</option>
              <option value="MMS">MMS</option>
            </select>
          </div>

          {/* Date From */}
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-2 block">From</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#0263E0] outline-none"
            />
          </div>

          {/* Date To */}
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-2 block">To</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#0263E0] outline-none"
            />
          </div>

          {/* Volume Filter */}
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-2 block">Volume equal or greater than</label>
            <input
              type="number"
              placeholder="Enter volume"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#0263E0] outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {/* Notification Sent Filter */}
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-2 block">Notification sent</label>
            <select
              value={filters.notification}
              onChange={(e) => setFilters(prev => ({ ...prev, notification: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#0263E0] outline-none"
            >
              <option value="All">All</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Alert Type Filter */}
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-2 block">Alert Type</label>
            <select
              value={filters.alertType}
              onChange={(e) => setFilters(prev => ({ ...prev, alertType: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#0263E0] outline-none"
            >
              <option value="All alerts">All alerts</option>
              <option value="Fraud Alert">Fraud Alert</option>
              <option value="Volume(#) Alert">Volume(#) Alert</option>
              <option value="Usage($) Alert">Usage($) Alert</option>
            </select>
          </div>

          {/* Actions Filter */}
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-2 block">Action</label>
            <select
              value={filters.action}
              onChange={(e) => setFilters(prev => ({ ...prev, action: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#0263E0] outline-none"
            >
              <option value="All">All</option>
              <option value="None">None</option>
              <option value="Increase protection">Increase protection</option>
              <option value="Block Traffic">Block Traffic</option>
            </select>
          </div>

          {/* Scope Filter */}
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-2 block">Scope</label>
            <select
              value={filters.scope}
              onChange={(e) => setFilters(prev => ({ ...prev, scope: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#0263E0] outline-none"
            >
              <option value="All">All</option>
              <option value="Global">Global</option>
              <option value="NAMER">NAMER</option>
              <option value="EMEA">EMEA</option>
              <option value="LATAM">LATAM</option>
              <option value="APAC">APAC</option>
            </select>
          </div>
        </div>

        {/* Filter Actions */}
        <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-gray-200">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm font-semibold transition-colors">
            <X size={14} />
            Clear section
          </button>
          <button className="bg-[#0263E0] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-[#014DB5] shadow-sm transition-all">
            Search
          </button>
        </div>
      </div>

      {/* Alerts Table */}
      <div className="border border-gray-200 rounded-xl overflow-x-auto shadow-sm bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-slate-500 font-bold uppercase text-[11px] tracking-widest">
              <th className="px-4 py-3">Channel</th>
              <th className="px-4 py-3">Scope</th>
              <th className="px-4 py-3">Volume</th>
              <th className="px-4 py-3">Date and Time</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Notification</th>
              <th className="px-4 py-3">Alert Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {alertsData.map((alert) => (
              <tr key={alert.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900">{alert.channel}</span>
                    <span className="text-xs text-gray-500 mt-0.5">{alert.direction}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  <div className="flex items-center gap-2">
                    <span>{alert.flag}</span>
                    <span>{alert.scope}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600 font-medium">{alert.volume}</td>
                <td className="px-4 py-3 text-gray-600">{alert.dateTime}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    alert.action === 'Block Traffic' ? 'bg-red-50 text-red-700 border border-red-100' :
                    alert.action === 'Increase protection' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                    'bg-gray-50 text-gray-500 border border-gray-100'
                  }`}>
                    {alert.action === 'Block Traffic' && <Ban size={10} />}
                    {alert.action === 'Increase protection' && <AlertTriangle size={10} />}
                    {alert.action}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{alert.notification}</td>
                <td className="px-4 py-3 text-gray-600">{alert.alertType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Create Rule Form Component ---
const CreateRuleForm = ({ onClose, editingRule, countries }) => {
  const isEditing = !!editingRule;

  // Helper function to determine notification type from value
  const getNotificationType = (value) => {
    if (!value || value === 'None') return 'none';
    if (value.includes('@')) return 'email';
    if (value.includes('http')) return 'webhook';
    return 'none';
  };

  const [formData, setFormData] = useState({
    channel: editingRule?.channel || 'SMS',
    direction: editingRule?.direction || 'Outbound',
    alertType: editingRule?.alertType || 'Fraud Alert',
    threshold: editingRule?.threshold || '',
    frequency: editingRule?.frequency || 'Hourly',
    scope: editingRule?.scope || 'Global',
    notification: editingRule?.notification || '',
    action: editingRule?.action || 'None'
  });

  const [thresholdType, setThresholdType] = useState(
    editingRule?.threshold === 'Intelligent' ? 'intelligent' : 'numeric'
  );

  const [notificationType, setNotificationType] = useState(
    getNotificationType(editingRule?.notification)
  );

  const [emailNotification, setEmailNotification] = useState(
    editingRule && editingRule.notification.includes('@') ? editingRule.notification : ''
  );

  const [webhookNotification, setWebhookNotification] = useState(
    editingRule && editingRule.notification.includes('http') ? editingRule.notification : ''
  );

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Determine notification value based on type
    let notificationValue = 'None';
    if (notificationType === 'email' && emailNotification) {
      notificationValue = emailNotification;
    } else if (notificationType === 'webhook' && webhookNotification) {
      notificationValue = webhookNotification;
    }

    const finalData = {
      ...formData,
      notification: notificationValue
    };

    console.log('Form submitted:', finalData);
    // Add your save logic here
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this rule?')) {
      console.log('Delete rule:', editingRule);
      // Add your delete logic here
      onClose();
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            {isEditing ? 'Edit Rule' : 'Create New Rule'}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {isEditing ? 'Update or delete this fraud detection rule' : 'Configure a custom fraud detection rule'}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Channel */}
          <div>
            <label className="text-sm font-semibold text-slate-700 mb-2 block">Channel *</label>
            <select
              value={formData.channel}
              onChange={(e) => handleInputChange('channel', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#0263E0] outline-none transition-all"
              required
            >
              <option value="SMS">SMS</option>
              <option value="RCS">RCS</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="MMS">MMS</option>
            </select>
          </div>

          {/* Direction */}
          <div>
            <label className="text-sm font-semibold text-slate-700 mb-2 block">Direction *</label>
            <select
              value={formData.direction}
              onChange={(e) => handleInputChange('direction', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#0263E0] outline-none transition-all"
              required
            >
              <option value="Inbound">Inbound</option>
              <option value="Outbound">Outbound</option>
              <option value="Both">Both</option>
            </select>
          </div>

          {/* Alert Type */}
          <div>
            <label className="text-sm font-semibold text-slate-700 mb-2 block">Alert Type *</label>
            <select
              value={formData.alertType}
              onChange={(e) => handleInputChange('alertType', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#0263E0] outline-none transition-all"
              required
            >
              <option value="Fraud Alert">Fraud Alert</option>
              <option value="Volume(#) Alert">Volume(#) Alert</option>
              <option value="Usage($) Alert">Usage($) Alert</option>
            </select>
          </div>

          {/* Threshold */}
          <div>
            <label className="text-sm font-semibold text-slate-700 mb-2 block">Threshold *</label>
            <div className="space-y-3">
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="thresholdType"
                    checked={thresholdType === 'intelligent'}
                    onChange={() => {
                      setThresholdType('intelligent');
                      handleInputChange('threshold', 'Intelligent');
                    }}
                    className="w-4 h-4 text-[#0263E0]"
                  />
                  <span className="text-sm text-gray-700">Intelligent</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="thresholdType"
                    checked={thresholdType === 'numeric'}
                    onChange={() => {
                      setThresholdType('numeric');
                      handleInputChange('threshold', '');
                    }}
                    className="w-4 h-4 text-[#0263E0]"
                  />
                  <span className="text-sm text-gray-700">Numeric</span>
                </label>
              </div>
              {thresholdType === 'numeric' && (
                <input
                  type="number"
                  min="1"
                  value={formData.threshold === 'Intelligent' ? '' : formData.threshold}
                  onChange={(e) => handleInputChange('threshold', e.target.value)}
                  placeholder="Enter threshold value"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#0263E0] outline-none transition-all"
                  required
                />
              )}
            </div>
          </div>

          {/* Frequency */}
          <div>
            <label className="text-sm font-semibold text-slate-700 mb-2 block">Frequency *</label>
            <select
              value={formData.frequency}
              onChange={(e) => handleInputChange('frequency', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#0263E0] outline-none transition-all"
              required
            >
              <option value="Hourly">Hourly</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>

          {/* Scope */}
          <div>
            <label className="text-sm font-semibold text-slate-700 mb-2 block">Scope *</label>
            <select
              value={formData.scope}
              onChange={(e) => handleInputChange('scope', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#0263E0] outline-none transition-all"
              required
            >
              <option value="Global">Global</option>
              <option value="NAMER">NAMER</option>
              <option value="EMEA">EMEA</option>
              <option value="LATAM">LATAM</option>
              <option value="APAC">APAC</option>
              {countries && countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Notification Section - Full Width */}
        <div className="border-t border-gray-100 pt-6">
          <div className="mb-4">
            <label className="text-sm font-semibold text-slate-700 mb-3 block">Notification Preferences</label>
            <div className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                id="noneNotification"
                checked={notificationType === 'none'}
                onChange={(e) => {
                  if (e.target.checked) {
                    setNotificationType('none');
                    setEmailNotification('');
                    setWebhookNotification('');
                  } else {
                    setNotificationType('email');
                  }
                }}
                className="w-4 h-4 text-[#0263E0] border-gray-300 rounded focus:ring-[#0263E0]"
              />
              <label htmlFor="noneNotification" className="text-sm text-gray-700 cursor-pointer">
                None (Disable all notifications)
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Email Notification */}
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Email Notification</label>
              <input
                type="email"
                value={emailNotification}
                onChange={(e) => {
                  setEmailNotification(e.target.value);
                  if (e.target.value && notificationType === 'none') {
                    setNotificationType('email');
                  }
                }}
                placeholder="Enter email address"
                disabled={notificationType === 'none'}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm shadow-sm focus:ring-2 focus:ring-[#0263E0] outline-none transition-all ${
                  notificationType === 'none' ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                }`}
              />
              <p className="text-xs text-gray-400 mt-1">e.g., alerts@company.com</p>
            </div>

            {/* Webhook Notification */}
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-2 block">Webhook URL</label>
              <input
                type="url"
                value={webhookNotification}
                onChange={(e) => {
                  setWebhookNotification(e.target.value);
                  if (e.target.value && notificationType === 'none') {
                    setNotificationType('webhook');
                  }
                }}
                placeholder="Enter webhook URL"
                disabled={notificationType === 'none'}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm shadow-sm focus:ring-2 focus:ring-[#0263E0] outline-none transition-all ${
                  notificationType === 'none' ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
                }`}
              />
              <p className="text-xs text-gray-400 mt-1">e.g., https://webhook.site/alert</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">

          {/* Action */}
          <div>
            <label className="text-sm font-semibold text-slate-700 mb-2 block">Action *</label>
            <select
              value={formData.action}
              onChange={(e) => handleInputChange('action', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-white shadow-sm focus:ring-2 focus:ring-[#0263E0] outline-none transition-all"
              required
            >
              <option value="None">None</option>
              <option value="Increase protection">Increase protection</option>
              <option value="Block Traffic">Block Traffic</option>
            </select>
          </div>
        </div>

        {/* Form Actions */}
        <div className={`flex gap-3 pt-4 border-t border-gray-100 ${isEditing ? 'justify-between' : 'justify-end'}`}>
          {isEditing && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-white border border-red-300 text-red-600 px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-50 transition-all flex items-center gap-2"
            >
              <Trash2 size={16} />
              Delete Rule
            </button>
          )}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-white border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#0263E0] text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#014DB5] shadow-md transition-all active:scale-[0.98]"
            >
              {isEditing ? 'Update Rule' : 'Create Rule'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default App;

// Export components for reuse in AppWithComments
export { SettingsView, SetupView };