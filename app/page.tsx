'use client'
import { useState, FormEvent } from 'react'

export default function Home() {
  const [form, setForm] = useState({ name: '', email: '', brokerage: '', zip: '', website: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Name is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required'
    if (!form.brokerage.trim() || form.brokerage.trim().length < 2) e.brokerage = 'Brokerage is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    setErrorMsg('')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setStatus('success')
        setForm({ name: '', email: '', brokerage: '', zip: '', website: '' })
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error. Please try again.')
    }
  }

  return (
    <main>
      {/* Hero */}
      <section style={{ background: '#0f172a', color: '#fff', padding: '96px 0 80px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: 20 }}>
            Neighborhood Reports That Close Listings
          </h1>
          <p style={{ fontSize: 'clamp(1.05rem, 2.2vw, 1.35rem)', color: '#cbd5e1', maxWidth: 640, margin: '0 auto 36px' }}>
            Nabrix uses AI to generate branded, magazine-quality neighborhood reports for real estate agents — in seconds, not hours.
          </p>
          <a href="#waitlist" style={{
            display: 'inline-block', background: '#2563eb', color: '#fff', padding: '14px 32px',
            borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: '1.05rem'
          }}>
            Join the Waitlist
          </a>
        </div>
      </section>

      {/* Value Prop */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: 48 }}>
            Why top agents use Nabrix
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
            {[
              { title: 'Instant Reports', desc: 'Generate a complete neighborhood report from any ZIP code in under 60 seconds.' },
              { title: 'Your Brand, Front and Center', desc: 'Every report is white-labeled with your brokerage colors, logo, and contact info.' },
              { title: 'Data You Can Trust', desc: 'Aggregated from verified sources: schools, crime, walkability, demographics, and market trends.' },
              { title: 'Built for Agents', desc: 'Designed by operators who understand what buyers and sellers actually ask about a neighborhood.' },
            ].map((b) => (
              <div key={b.title} style={{ padding: 24, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.15rem', marginBottom: 10 }}>{b.title}</h3>
                <p style={{ color: '#475569', fontSize: '0.95rem' }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Preview */}
      <section style={{ padding: '60px 0', background: '#f8fafc' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: 16 }}>
            A glimpse of what is coming
          </h2>
          <p style={{ color: '#475569', maxWidth: 560, margin: '0 auto 36px' }}>
            Clean layouts, charts, maps, and narrative summaries — formatted like a publication, not a spreadsheet.
          </p>
          <div style={{
            maxWidth: 800, margin: '0 auto', aspectRatio: '16/10', background: '#e2e8f0',
            borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid #cbd5e1'
          }}>
            <span style={{ color: '#64748b', fontSize: '1rem' }}>Sample Report Preview — Coming Soon</span>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: 24 }}>
            Built by operators, for operators
          </h2>
          <div style={{ maxWidth: 640, margin: '0 auto', color: '#475569' }}>
            <p style={{ marginBottom: 16 }}>
              Nabrix is being built by a team with experience at Deloitte, DataRobot, and Snorkel AI — combined with deep real estate market research and agent interviews.
            </p>
            <p>
              We are not another generic AI tool. We are building the neighborhood intelligence layer that agents actually want to share with clients.
            </p>
          </div>
        </div>
      </section>

      {/* Waitlist Form */}
      <section id="waitlist" style={{ padding: '80px 0', background: '#0f172a', color: '#fff' }}>
        <div className="container" style={{ maxWidth: 560 }}>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: 8 }}>
            Get Early Access
          </h2>
          <p style={{ textAlign: 'center', color: '#cbd5e1', marginBottom: 32 }}>
            Join the waitlist and be the first to try Nabrix when we open access.
          </p>

          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '32px 24px', background: '#064e3b', borderRadius: 12 }}>
              <h3 style={{ marginBottom: 8 }}>You are on the list!</h3>
              <p style={{ color: '#a7f3d0' }}>We will reach out as soon as early access is available.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Honeypot */}
              <div style={{ display: 'none' }}>
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div style={{ marginBottom: 16 }}>
                <label htmlFor="name" style={{ display: 'block', fontSize: '0.9rem', marginBottom: 6, fontWeight: 500 }}>Name *</label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onBlur={validate}
                  placeholder="Your full name"
                  style={{
                    width: '100%', padding: '12px 14px', borderRadius: 8, border: `1px solid ${errors.name ? '#ef4444' : '#334155'}`,
                    background: '#1e293b', color: '#fff', fontSize: '1rem', outline: 'none'
                  }}
                />
                {errors.name && <span style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: 4, display: 'block' }}>{errors.name}</span>}
              </div>

              <div style={{ marginBottom: 16 }}>
                <label htmlFor="email" style={{ display: 'block', fontSize: '0.9rem', marginBottom: 6, fontWeight: 500 }}>Email *</label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onBlur={validate}
                  placeholder="you@brokerage.com"
                  style={{
                    width: '100%', padding: '12px 14px', borderRadius: 8, border: `1px solid ${errors.email ? '#ef4444' : '#334155'}`,
                    background: '#1e293b', color: '#fff', fontSize: '1rem', outline: 'none'
                  }}
                />
                {errors.email && <span style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: 4, display: 'block' }}>{errors.email}</span>}
              </div>

              <div style={{ marginBottom: 16 }}>
                <label htmlFor="brokerage" style={{ display: 'block', fontSize: '0.9rem', marginBottom: 6, fontWeight: 500 }}>Brokerage *</label>
                <input
                  id="brokerage"
                  type="text"
                  value={form.brokerage}
                  onChange={(e) => setForm({ ...form, brokerage: e.target.value })}
                  onBlur={validate}
                  placeholder="e.g. Keller Williams"
                  style={{
                    width: '100%', padding: '12px 14px', borderRadius: 8, border: `1px solid ${errors.brokerage ? '#ef4444' : '#334155'}`,
                    background: '#1e293b', color: '#fff', fontSize: '1rem', outline: 'none'
                  }}
                />
                {errors.brokerage && <span style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: 4, display: 'block' }}>{errors.brokerage}</span>}
              </div>

              <div style={{ marginBottom: 24 }}>
                <label htmlFor="zip" style={{ display: 'block', fontSize: '0.9rem', marginBottom: 6, fontWeight: 500 }}>ZIP Code of Interest</label>
                <input
                  id="zip"
                  type="text"
                  value={form.zip}
                  onChange={(e) => setForm({ ...form, zip: e.target.value })}
                  placeholder="e.g. 28202"
                  style={{
                    width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #334155',
                    background: '#1e293b', color: '#fff', fontSize: '1rem', outline: 'none'
                  }}
                />
              </div>

              {status === 'error' && (
                <div style={{ color: '#ef4444', marginBottom: 16, fontSize: '0.95rem' }}>{errorMsg}</div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                style={{
                  width: '100%', padding: '14px', borderRadius: 8, border: 'none', background: '#2563eb',
                  color: '#fff', fontSize: '1.05rem', fontWeight: 600, cursor: 'pointer', opacity: status === 'submitting' ? 0.7 : 1
                }}
              >
                {status === 'submitting' ? 'Submitting...' : 'Join the Waitlist'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '32px 0', textAlign: 'center', color: '#64748b', fontSize: '0.9rem', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          &copy; {new Date().getFullYear()} Nabrix. All rights reserved.
        </div>
      </footer>
    </main>
  )
}
