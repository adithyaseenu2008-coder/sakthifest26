import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Store, 
  Car, 
  HeartHandshake, 
  ShoppingBag, 
  AlertCircle, 
  CheckCircle2, 
  Loader2,
  Sparkles
} from 'lucide-react';
import Button from '../components/common/Button.jsx';
import Badge from '../components/common/Badge.jsx';
import Card from '../components/common/Card.jsx';
import { ROLES } from '../constants/theme.js';

export default function SignInPage({ onNavigate, activeRole = 'volunteer', onSelectRole }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [selectedRole, setSelectedRole] = useState(activeRole);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authNotice, setAuthNotice] = useState(null);
  const [oauthNotice, setOauthNotice] = useState(null);

  const roleOptions = [
    { id: 'donor', label: 'Donor', destination: 'Surplus Food Listing Console', icon: Store },
    { id: 'volunteer', label: 'Volunteer', destination: 'Corridor Planner & Active Trips', icon: Car },
    { id: 'ngo', label: 'NGO / Shelter', destination: 'Intake Queue & Safety Logs', icon: HeartHandshake },
    { id: 'buyer', label: 'Buyer', destination: 'Discount Marketplace Catalog', icon: ShoppingBag },
  ];

  const handleRoleChange = (roleId) => {
    setSelectedRole(roleId);
    onSelectRole?.(roleId);
    setAuthNotice(null);
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!identifier.trim()) {
      newErrors.identifier = 'Email or registered ID is required.';
    } else if (!emailRegex.test(identifier.trim()) && identifier.length < 6) {
      newErrors.identifier = 'Please enter a valid email address or identifier.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOauthNotice(null);
    if (!validate()) return;

    setIsSubmitting(true);
    setAuthNotice(null);

    // Simulate validation delay to showcase loading state
    setTimeout(() => {
      setIsSubmitting(false);
      setAuthNotice({
        type: 'info',
        role: selectedRole.toUpperCase(),
        destination: roleOptions.find((r) => r.id === selectedRole)?.destination,
        message:
          'Frontend Validation Passed: In this Phase 2 prototype, credentials validate purely in-browser. Backend authentication, MongoDB sessions, and live JWT tokens will connect in later phases.',
      });
    }, 700);
  };

  const handleGoogleOAuth = () => {
    setAuthNotice(null);
    setOauthNotice(
      'Google OAuth Contract: Single Sign-On token exchange will be handled by the backend authentication gateway in an upcoming phase.'
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Stitch Storytelling & Live Pulse */}
        <div className="lg:col-span-5 hidden lg:flex flex-col justify-between p-8 rounded-3xl bg-[#245747] text-cream shadow-elevated relative overflow-hidden min-h-[580px]">
          <div className="space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-mint text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
              Unified Gateway • Phase 2 Prototype
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold tracking-tight text-cream leading-tight">
                Every route rescued brings meals home.
              </h2>
              <p className="text-xs text-mint/90 leading-relaxed">
                Synchronizing commercial food surplus, vetted transit corridors, and frontline distribution hubs within minutes.
              </p>
            </div>

            {/* Visual Callout Card */}
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-mint flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-mint" />
                  Green Corridors Active
                </span>
                <span className="opacity-80">Today: 1,420 kg</span>
              </div>
              <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-mint rounded-full w-4/5" />
              </div>
              <p className="text-[11px] text-cream/75">
                Volunteers accept micro-stops that add less than 4 minutes to their commute.
              </p>
            </div>
          </div>

          {/* Bottom Security Note */}
          <div className="relative z-10 pt-6 border-t border-white/15 text-xs text-cream/70 space-y-1">
            <span className="font-semibold text-mint block">Multi-Role Architecture</span>
            <p className="text-[11px]">
              Access governs dynamically based on your registered role: Donor, Volunteer, NGO Shelter, or Discount Buyer.
            </p>
          </div>

          {/* Ambient Glows */}
          <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-mint/15 blur-2xl pointer-events-none" />
        </div>

        {/* Right Column: Authentication Card Form */}
        <div className="lg:col-span-7 space-y-6">
          <Card elevated className="p-6 sm:p-10 bg-white">
            <div className="text-center space-y-2 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-mint/40 text-forest mx-auto flex items-center justify-center shadow-soft">
                <Lock className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-forest/70 block">
                Decentralized Logistics Entry
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-forest tracking-tight">
                Welcome Back to ClusterFeed
              </h1>
              <p className="text-xs text-charcoal/70 max-w-sm mx-auto">
                Sign in to access your dispatch center, donor portal, or commuter route monitor.
              </p>
            </div>

            {/* Role Context Selector */}
            <div className="mb-6 p-2 rounded-2xl bg-[#FFF8ED] border border-[#E8DFD1] space-y-2">
              <span className="text-[11px] font-bold text-forest uppercase tracking-wider block px-2">
                Select Your Role Persona:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {roleOptions.map((role) => {
                  const isSelected = selectedRole === role.id;
                  const Icon = role.icon;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => handleRoleChange(role.id)}
                      className={`flex items-center gap-1.5 p-2 rounded-xl text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-forest text-cream shadow-soft'
                          : 'bg-white text-charcoal/75 hover:bg-forest-50 border border-[#E8DFD1]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{role.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Simulated Auth Notice Banner */}
            {authNotice && (
              <div className="mb-6 p-4 rounded-2xl bg-[#D8F3DC] border border-[#B7E4C7] text-[#2D6A4F] text-xs space-y-1">
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Validation Success ({authNotice.role} Persona)</span>
                </div>
                <p className="leading-relaxed">{authNotice.message}</p>
                <div className="pt-1 text-[11px] font-semibold">
                  Destination Target: <span className="underline">{authNotice.destination}</span>
                </div>
              </div>
            )}

            {/* OAuth Notice Banner */}
            {oauthNotice && (
              <div className="mb-6 p-4 rounded-2xl bg-[#FDE8CD] border border-[#FCD49D] text-[#9A5800] text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{oauthNotice}</p>
              </div>
            )}

            {/* Credentials Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Identifier Field */}
              <div className="space-y-1.5 text-left">
                <label
                  htmlFor="identifier"
                  className="block text-xs font-bold text-charcoal/90"
                >
                  Email or Registered Organization ID
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-charcoal/40 pointer-events-none" />
                  <input
                    id="identifier"
                    type="text"
                    value={identifier}
                    onChange={(e) => {
                      setIdentifier(e.target.value);
                      if (errors.identifier) setErrors({ ...errors, identifier: null });
                    }}
                    placeholder="coordinator@rescue-network.org or bakery-lead"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-[#FFF8ED] text-charcoal placeholder:text-charcoal/40 border focus:outline-none focus:ring-2 focus:ring-forest transition-all ${
                      errors.identifier ? 'border-[#BA1A1A] ring-1 ring-[#BA1A1A]' : 'border-[#E8DFD1]'
                    }`}
                  />
                </div>
                {errors.identifier && (
                  <p className="text-[11px] font-semibold text-[#BA1A1A]">{errors.identifier}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-1.5 text-left">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-xs font-bold text-charcoal/90"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Password reset workflow will be enabled when authentication microservices are deployed.')}
                    className="text-[11px] font-semibold text-forest hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-charcoal/40 pointer-events-none" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: null });
                    }}
                    placeholder="Enter security passphrase"
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
                {errors.password && (
                  <p className="text-[11px] font-semibold text-[#BA1A1A]">{errors.password}</p>
                )}
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-forest focus:ring-forest accent-forest cursor-pointer"
                />
                <label htmlFor="remember-me" className="text-xs text-charcoal/80 cursor-pointer">
                  Remember this device for 30 days
                </label>
              </div>

              {/* Submit Button */}
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
                      Validating Credentials...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Sign In to Platform
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center my-4">
                <div className="w-full h-px bg-[#E8DFD1]" />
                <span className="absolute px-3 bg-white text-[10px] font-bold uppercase tracking-wider text-charcoal/50">
                  Or Secure Sign In Via
                </span>
              </div>

              {/* Google OAuth Button */}
              <button
                type="button"
                onClick={handleGoogleOAuth}
                className="w-full py-2.5 px-4 rounded-xl border border-[#E8DFD1] bg-[#FFF8ED]/60 hover:bg-[#FFF8ED] text-xs font-semibold text-charcoal flex items-center justify-between transition-colors group focus:outline-none focus:ring-2 focus:ring-forest/30"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                  </svg>
                  <span>Continue with Google</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-[#E8DFD1] text-charcoal/60">
                  OAuth Integration
                </span>
              </button>
            </form>

            {/* Switch to Sign Up */}
            <div className="mt-6 pt-4 border-t border-[#E8DFD1] text-center text-xs text-charcoal/70">
              <span>Don't have an account yet? </span>
              <button
                type="button"
                onClick={() => onNavigate?.('signup', selectedRole)}
                className="font-bold text-forest underline decoration-2 underline-offset-4 hover:text-forest-700 ml-1 inline-flex items-center gap-0.5"
              >
                <span>Create Account / Select Role</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </Card>

          {/* Role Routing Destination Preview Banner */}
          <Card className="p-5 bg-[#F7F0E3] border border-[#E8DFD1] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-forest uppercase tracking-wider">
                Multi-Tenant Routing Destinations
              </span>
              <Badge variant="default">Role-Aware Console</Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {roleOptions.map((r) => {
                const Icon = r.icon;
                const isCurrent = selectedRole === r.id;
                return (
                  <div
                    key={r.id}
                    className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                      isCurrent
                        ? 'bg-white border-forest shadow-soft'
                        : 'bg-white/60 border-[#E8DFD1]'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-forest shrink-0" />
                    <div className="min-w-0">
                      <span className="font-bold text-forest block truncate">{r.label}</span>
                      <span className="text-[11px] text-charcoal/70 block truncate">{r.destination}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
