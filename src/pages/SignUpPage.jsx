import React, { useState } from 'react';
import { 
  Store, 
  Car, 
  HeartHandshake, 
  ShoppingBag, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Loader2, 
  Info,
  Sparkles
} from 'lucide-react';
import Button from '../components/common/Button.jsx';
import Badge from '../components/common/Badge.jsx';
import Card from '../components/common/Card.jsx';
import { ROLES } from '../constants/theme.js';

export default function SignUpPage({ onNavigate, initialRole = 'volunteer', onSelectRole }) {
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupNotice, setSignupNotice] = useState(null);

  const roleConfigs = [
    {
      id: 'donor',
      title: 'Donor (Food Business)',
      subtitle: 'Bakeries, restaurants, cafes & hostel messes',
      badge: 'Post Listings',
      badgeStyle: 'bg-peach/30 text-charcoal border border-peach',
      icon: Store,
      points: ['Auto dispatch in ~15m', 'Digital tax offset receipts'],
      tipTitle: 'Donor Integration Protocol',
      tipDesc: 'Food donors gain rapid 60-second listing forms, temperature logging stamps, and live carrier matches within their vicinity.',
    },
    {
      id: 'volunteer',
      title: 'Volunteer (Commuter)',
      subtitle: 'People who collect and deliver along daily commutes',
      badge: 'Rescue on Route',
      badgeStyle: 'bg-mint text-forest border border-mint',
      icon: Car,
      points: ['Sub-1.5 km detour threshold', 'Offset travel footprint'],
      tipTitle: 'Commuter Routing Engine',
      tipDesc: 'Volunteers register regular commute corridors. Pickups exceeding your detour allowance are strictly filtered out.',
    },
    {
      id: 'ngo',
      title: 'NGO / Shelter',
      subtitle: 'Community kitchens, shelters & relief charities',
      badge: 'Requires Verification',
      badgeStyle: 'bg-pink-50 text-[#653A47] border border-pink-pastel',
      icon: HeartHandshake,
      points: ['Cold chain hygiene audit', 'Scheduled batch arrivals'],
      tipTitle: 'Shelter Intake Verification',
      tipDesc: 'Registered charities verify food handling and storage readiness to receive recurring catering portions for meal service.',
    },
    {
      id: 'buyer',
      title: 'Surplus Buyer',
      subtitle: 'Students & neighbors purchasing discounted surplus',
      badge: 'Save up to 70%',
      badgeStyle: 'bg-[#D8F3DC] text-[#2D6A4F] border border-[#B7E4C7]',
      icon: ShoppingBag,
      points: ['Daily flash discounts', 'Walking corridor pickup'],
      tipTitle: 'Community Discount Access',
      tipDesc: 'Buyers reserve fresh surplus boxes before closing time with direct app checkout and convenient evening pickup.',
    },
  ];

  const currentRoleConfig = roleConfigs.find((r) => r.id === selectedRole) || roleConfigs[1];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    onSelectRole?.(roleId);
    setSignupNotice(null);
  };

  const calculatePasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: 'None', color: 'bg-gray-200' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-[#BA1A1A]' };
    if (score === 2) return { score: 2, label: 'Fair', color: 'bg-[#D97706]' };
    if (score === 3) return { score: 3, label: 'Good', color: 'bg-mint-500' };
    return { score: 4, label: 'Strong', color: 'bg-forest' };
  };

  const strength = calculatePasswordStrength(password);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required for dispatch & OTP.';
    } else if (phone.trim().length < 7) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirmation password is required.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!agreeTerms) {
      newErrors.terms = 'You must agree to the Terms of Service & Food Safety Charter.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSignupNotice(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setSignupNotice({
        role: currentRoleConfig.title,
        message:
          'Frontend Validation Passed: Registration fields verified! Backend user provisioning, MongoDB document creation, and credential hashing will be connected in Phase 3.',
      });
    }, 700);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Role Selector Cards */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-forest text-cream font-bold text-xs flex items-center justify-center">
                1
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-forest/70">
                Step 1 · Identity Matrix
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-forest tracking-tight">
              Select Your Role in ClusterFeed
            </h1>
            <p className="text-xs sm:text-sm text-charcoal/70 max-w-xl">
              Choose how you will anchor into the decentralized food logistics network. Match your capacity to local corridor rescue routes.
            </p>
          </div>

          {/* 4 Selectable Role Cards */}
          <div className="space-y-3">
            {roleConfigs.map((role) => {
              const isSelected = selectedRole === role.id;
              const Icon = role.icon;
              return (
                <div
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className={`cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all ${
                    isSelected
                      ? 'bg-white border-forest shadow-lifted ring-2 ring-forest/30'
                      : 'bg-white/80 border-[#E8DFD1] hover:bg-white hover:border-forest/40 shadow-soft'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform ${
                          isSelected ? 'bg-forest text-mint shadow-soft' : 'bg-[#FFF8ED] text-forest border border-[#E8DFD1]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-sm text-charcoal">{role.title}</span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${role.badgeStyle}`}>
                            {role.badge}
                          </span>
                        </div>
                        <p className="text-xs text-charcoal/70 leading-relaxed">
                          {role.subtitle}
                        </p>
                        <div className="flex items-center gap-4 pt-1 text-[11px] text-forest font-medium">
                          {role.points.map((pt, i) => (
                            <span key={i} className="flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-forest shrink-0" />
                              {pt}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Radio Indicator */}
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-1 transition-all ${
                        isSelected
                          ? 'bg-forest text-cream shadow-sm'
                          : 'border-2 border-[#E8DFD1] bg-transparent'
                      }`}
                    >
                      {isSelected && <span className="w-2 h-2 rounded-full bg-mint" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dynamic Role Guidance Box */}
          <div className="p-4 rounded-2xl bg-[#F7F0E3] border border-[#E8DFD1] flex items-start gap-3">
            <Info className="w-5 h-5 text-forest shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-forest block">{currentRoleConfig.tipTitle}</span>
              <p className="text-xs text-charcoal/70 leading-relaxed">{currentRoleConfig.tipDesc}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Registration Form */}
        <div className="lg:col-span-5 space-y-4">
          <Card elevated className="p-6 sm:p-8 bg-white">
            <div className="space-y-1.5 mb-6 text-left border-b border-[#E8DFD1] pb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-forest">Create Your Account</h2>
                <Badge variant="optimal">Instant Access</Badge>
              </div>
              <p className="text-xs text-charcoal/70">
                Selected Role: <span className="font-bold text-forest">{currentRoleConfig.title}</span>
              </p>
            </div>

            {/* Validation Success Banner */}
            {signupNotice && (
              <div className="mb-6 p-4 rounded-2xl bg-[#D8F3DC] border border-[#B7E4C7] text-[#2D6A4F] text-xs space-y-1.5">
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Validation Passed ({signupNotice.role})</span>
                </div>
                <p className="leading-relaxed">{signupNotice.message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Full Name */}
              <div className="space-y-1">
                <label htmlFor="fullname" className="block text-xs font-bold text-charcoal/90">
                  Full Name / Contact Lead
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3.5 text-charcoal/40 pointer-events-none" />
                  <input
                    id="fullname"
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: null });
                    }}
                    placeholder="Alex Morgan"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-[#FFF8ED] text-charcoal placeholder:text-charcoal/40 border focus:outline-none focus:ring-2 focus:ring-forest transition-all ${
                      errors.fullName ? 'border-[#BA1A1A] ring-1 ring-[#BA1A1A]' : 'border-[#E8DFD1]'
                    }`}
                  />
                </div>
                {errors.fullName && <p className="text-[11px] font-semibold text-[#BA1A1A]">{errors.fullName}</p>}
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label htmlFor="signup-email" className="block text-xs font-bold text-charcoal/90">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-charcoal/40 pointer-events-none" />
                  <input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: null });
                    }}
                    placeholder="alex@greenfieldbakery.com"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-[#FFF8ED] text-charcoal placeholder:text-charcoal/40 border focus:outline-none focus:ring-2 focus:ring-forest transition-all ${
                      errors.email ? 'border-[#BA1A1A] ring-1 ring-[#BA1A1A]' : 'border-[#E8DFD1]'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-[11px] font-semibold text-[#BA1A1A]">{errors.email}</p>}
              </div>

              {/* Phone Number */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="signup-phone" className="block text-xs font-bold text-charcoal/90">
                    Phone Number
                  </label>
                  <span className="text-[10px] text-charcoal/60">For OTP Handshakes</span>
                </div>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-charcoal/40 pointer-events-none" />
                  <input
                    id="signup-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: null });
                    }}
                    placeholder="+1 (555) 234-8901"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-[#FFF8ED] text-charcoal placeholder:text-charcoal/40 border focus:outline-none focus:ring-2 focus:ring-forest transition-all ${
                      errors.phone ? 'border-[#BA1A1A] ring-1 ring-[#BA1A1A]' : 'border-[#E8DFD1]'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-[11px] font-semibold text-[#BA1A1A]">{errors.phone}</p>}
              </div>

              {/* Create Password with Strength Meter */}
              <div className="space-y-1">
                <label htmlFor="signup-password" className="block text-xs font-bold text-charcoal/90">
                  Create Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-charcoal/40 pointer-events-none" />
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: null });
                    }}
                    placeholder="Min. 8 characters"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-xs bg-[#FFF8ED] text-charcoal placeholder:text-charcoal/40 border focus:outline-none focus:ring-2 focus:ring-forest transition-all ${
                      errors.password ? 'border-[#BA1A1A] ring-1 ring-[#BA1A1A]' : 'border-[#E8DFD1]'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-charcoal/40 hover:text-charcoal focus:outline-none"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {password && (
                  <div className="pt-1 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-charcoal/60">Strength</span>
                      <span className="font-bold text-forest">{strength.label}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`rounded-full transition-all ${
                            i <= strength.score ? strength.color : 'bg-[#E8DFD1]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {errors.password && <p className="text-[11px] font-semibold text-[#BA1A1A]">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label htmlFor="signup-confirm-password" className="block text-xs font-bold text-charcoal/90">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-charcoal/40 pointer-events-none" />
                  <input
                    id="signup-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null });
                    }}
                    placeholder="Re-enter password"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-xs bg-[#FFF8ED] text-charcoal placeholder:text-charcoal/40 border focus:outline-none focus:ring-2 focus:ring-forest transition-all ${
                      errors.confirmPassword ? 'border-[#BA1A1A] ring-1 ring-[#BA1A1A]' : 'border-[#E8DFD1]'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-3 text-charcoal/40 hover:text-charcoal focus:outline-none"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-[11px] font-semibold text-[#BA1A1A]">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => {
                      setAgreeTerms(e.target.checked);
                      if (errors.terms) setErrors({ ...errors, terms: null });
                    }}
                    className="w-4 h-4 rounded text-forest focus:ring-forest accent-forest mt-0.5 cursor-pointer"
                  />
                  <span className="text-[11px] text-charcoal/80 leading-snug">
                    I agree to the ClusterFeed Food Rescue Charter, hygiene protocols, and zero-deadhead corridor guidelines.
                  </span>
                </label>
                {errors.terms && <p className="text-[11px] font-semibold text-[#BA1A1A] mt-1">{errors.terms}</p>}
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Validating Profile...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Complete Registration
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </div>
            </form>

            {/* Switch to Sign In */}
            <div className="mt-6 pt-4 border-t border-[#E8DFD1] text-center text-xs text-charcoal/70">
              <span>Already registered? </span>
              <button
                type="button"
                onClick={() => onNavigate?.('signin', selectedRole)}
                className="font-bold text-forest underline decoration-2 underline-offset-4 hover:text-forest-700 ml-1 inline-flex items-center gap-0.5"
              >
                <span>Sign In to Platform</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
