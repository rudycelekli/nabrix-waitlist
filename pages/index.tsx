import { useState } from 'react'
import Head from 'next/head'

interface FormData {
  name: string
  email: string
  brokerage: string
  zipCode: string
}

interface FormErrors {
  name?: string
  email?: string
  brokerage?: string
  zipCode?: string
  submit?: string
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    brokerage: '',
    zipCode: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.brokerage.trim()) {
      newErrors.brokerage = 'Brokerage is required'
    }

    if (formData.zipCode && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Please enter a valid ZIP code'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validate()) return
    
    setLoading(true)
    
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json().catch(() => ({}))
        setErrors(prev => ({ ...prev, submit: data.message || 'Something went wrong. Please try again.' }))
      }
    } catch {
      setErrors(prev => ({ ...prev, submit: 'Network error. Please try again.' }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Nabrix — AI-Powered Neighborhood Reports for Real Estate Agents</title>
        <meta name="description" content="Join the waitlist for Nabrix. Generate branded, magazine-quality neighborhood reports in minutes using AI." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="nav">
        <div className="container nav-inner">
          <div className="logo">Nabrix</div>
          <a href="#waitlist" className="nav-cta">Join waitlist</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="badge">
            <span className="badge-dot" />
            Now accepting early-access agents
          </div>
          <h1>
            Neighborhood reports that
            <br />
            <span style={{ color: 'var(--brand-accent)' }}>win listings</span>
          </h1>
          <p>
            Generate branded, magazine-quality neighborhood intelligence in minutes.
            Impress sellers. Close faster. Never start from a blank page again.
          </p>
          <div className="hero-buttons">
            <a href="#waitlist" className="btn btn-primary">
              Join the waitlist
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#preview" className="btn btn-secondary">
              See a sample report
            </a>
          </div>
          
          <div className="social-bar">
            <div className="avatars">
              <span>JD</span>
              <span>MK</span>
              <span>SR</span>
              <span>+42</span>
            </div>
            <span>42 agents already on the waitlist</span>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="section features">
        <div className="container">
          <h2 className="section-title">Why top agents choose Nabrix</h2>
          <p className="section-subtitle">
            Stop spending hours researching neighborhoods. Our AI builds compelling, data-rich reports tailored to your listing and audience.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon" style={{ background: '#eff6ff' }}>⚡</div>
              <h3>Minutes, not hours</h3>
              <p>Generate a complete neighborhood report in under 5 minutes. Input the address, audience, and purpose — Nabrix handles the rest.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" style={{ background: '#f0fdf4' }}>🎨</div>
              <h3>Brand-ready design</h3>
              <p>Every report matches your brokerage colors, logo, and typography. Download as a polished PDF ready to share with sellers and buyers.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" style={{ background: '#fef3c7' }}>📊</div>
              <h3>Data you can trust</h3>
              <p>Built on verified market data, school ratings, walkability scores, and local amenity intelligence. Always accurate, always current.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" style={{ background: '#f3e8ff' }}>🎯</div>
              <h3>Tailored to every audience</h3>
              <p>First-time buyers see school districts and family amenities. Investors see ROI projections and rental comps. One tool, infinite contexts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Preview */}
      <section id="preview" className="section preview">
        <div className="container">
          <h2 className="section-title">See what agents are creating</h2>
          <p className="section-subtitle">
            A glimpse into the kind of report Nabrix generates for every listing.
          </p>
          <div className="preview-mockup">
            <div className="preview-mockup-header">
              <div className="preview-dot" style={{ background: '#ef4444' }} />
              <div className="preview-dot" style={{ background: '#f59e0b' }} />
              <div className="preview-dot" style={{ background: '#10b981' }} />
              <span style={{ marginLeft: 8, fontSize: '0.75rem', color: '#64748b' }}>Nabrix Report Preview</span>
            </div>
            <div className="preview-mockup-body">
              <div className="report-header">
                <div>
                  <div className="report-title">Pacific Heights Neighborhood Report</div>
                  <div className="report-meta">San Francisco, CA 94115 · Generated June 2026</div>
                </div>
                <div className="report-badge">For Sellers</div>
              </div>
              
              <div className="report-section">
                <h4>Market Snapshot</h4>
                <div className="report-grid">
                  <div className="report-stat">
                    <div className="report-stat-value">$2.4M</div>
                    <div className="report-stat-label">Median Price</div>
                  </div>
                  <div className="report-stat">
                    <div className="report-stat-value">12</div>
                    <div className="report-stat-label">Days on Market</div>
                  </div>
                  <div className="report-stat">
                    <div className="report-stat-value">98.2%</div>
                    <div className="report-stat-label">List-to-Sale</div>
                  </div>
                </div>
              </div>

              <div className="report-section">
                <h4>Neighborhood Score</h4>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 140 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 600, marginBottom: 4 }}>
                      <span>Walkability</span>
                      <span>92</span>
                    </div>
                    <div className="report-bar"><div className="report-bar-fill" style={{ width: '92%' }} /></div>
                  </div>
                  <div style={{ flex: 1, minWidth: 140 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 600, marginBottom: 4 }}>
                      <span>Schools</span>
                      <span>88</span>
                    </div>
                    <div className="report-bar"><div className="report-bar-fill" style={{ width: '88%' }} /></div>
                  </div>
                  <div style={{ flex: 1, minWidth: 140 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 600, marginBottom: 4 }}>
                      <span>Transit</span>
                      <span>85</span>
                    </div>
                    <div className="report-bar"><div className="report-bar-fill" style={{ width: '85%' }} /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="section testimonials">
        <div className="container">
          <h2 className="section-title">Trusted by forward-thinking agents</h2>
          <p className="section-subtitle">
            Early adopters are already using Nabrix to stand out in competitive markets.
          </p>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "I used to spend 3-4 hours on every neighborhood packet. With Nabrix, I have a stunning, branded report in under 10 minutes. My listing appointments have never been stronger."
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">JD</div>
                <div>
                  <div className="testimonial-name">Jessica Davis</div>
                  <div className="testimonial-role">Top Producer, Compass · San Francisco</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "The seller-specific reports are a game changer. I walk into every listing presentation with data my competitors don't have, beautifully designed around my brand."
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">MK</div>
                <div>
                  <div className="testimonial-name">Michael Kim</div>
                  <div className="testimonial-role">Broker-Owner, Kim Realty · Austin</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">
                "My buyers love the neighborhood deep-dives. It builds instant trust and shows I'm not just opening doors — I'm a true market expert."
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">SR</div>
                <div>
                  <div className="testimonial-name">Sarah Rodriguez</div>
                  <div className="testimonial-role">Luxury Specialist, Sotheby's · Miami</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Form */}
      <section id="waitlist" className="section waitlist">
        <div className="container">
          <div className="waitlist-box">
            {submitted ? (
              <div className="success-message">
                <h3>You are on the list!</h3>
                <p>Thank you for your interest in Nabrix. We will reach out as soon as early access spots open.</p>
                <button 
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', brokerage: '', zipCode: '' }) }}
                  className="btn btn-secondary"
                >
                  Register another agent
                </button>
              </div>
            ) : (
              <>
                <h3>Join the Nabrix waitlist</h3>
                <p>Be the first to access AI-powered neighborhood reports. No spam, ever.</p>
                
                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full name <span>*</span></label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className={`form-input ${errors.name ? 'error' : ''}`}
                        placeholder="Jane Smith"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && <div className="form-error">{errors.name}</div>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email <span>*</span></label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className={`form-input ${errors.email ? 'error' : ''}`}
                        placeholder="jane@brokerage.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && <div className="form-error">{errors.email}</div>}
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="brokerage">Brokerage <span>*</span></label>
                      <input
                        id="brokerage"
                        name="brokerage"
                        type="text"
                        className={`form-input ${errors.brokerage ? 'error' : ''}`}
                        placeholder="Keller Williams"
                        value={formData.brokerage}
                        onChange={handleChange}
                      />
                      {errors.brokerage && <div className="form-error">{errors.brokerage}</div>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="zipCode">ZIP code of interest</label>
                      <input
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        className={`form-input ${errors.zipCode ? 'error' : ''}`}
                        placeholder="90210"
                        value={formData.zipCode}
                        onChange={handleChange}
                      />
                      {errors.zipCode && <div className="form-error">{errors.zipCode}</div>}
                      <div className="form-hint">Optional — helps us prioritize your market</div>
                    </div>
                  </div>
                  
                  {/* Honeypot */}
                  <div className="honeypot">
                    <label htmlFor="website">Website</label>
                    <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>
                  
                  {errors.submit && <div className="form-error" style={{ marginBottom: 16 }}>{errors.submit}</div>}
                  
                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Submitting...' : 'Join the waitlist'}
                  </button>
                  
                  <p style={{ textAlign: 'center', fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: 16 }}>
                    By joining, you agree to our Privacy Policy. We never share your data.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-logo">Nabrix</div>
          <div className="footer-links">
            <a href="#waitlist">Waitlist</a>
            <a href="#preview">Preview</a>
            <a href="mailto:hello@nabrix.ai">Contact</a>
          </div>
          <div>© 2026 Nabrix. All rights reserved.</div>
        </div>
      </footer>
    </>
  )
}
