import { useState } from 'react'
import {
  ArrowRight, ArrowUpRight, Menu, X, Code2, ShoppingBag, LayoutDashboard,
  Sparkles, Monitor, Cloud, CheckCircle2, Zap, ShieldCheck, MessageCircle,
  Mail, MapPin, Send, Layers3, ChevronDown
} from 'lucide-react'
import { brand } from './config/brand'
import { services, projects } from './data/content'

const iconMap = { shopping: ShoppingBag, app: LayoutDashboard, code: Code2, ai: Sparkles, web: Monitor, cloud: Cloud }

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('All')
  const [contact, setContact] = useState({ name: '', email: '', phone: '', message: '' })
  const [quote, setQuote] = useState({ name: '', email: '', phone: '', businessName: '', serviceType: '', budget: '', description: '' })
  const [contactState, setContactState] = useState({ loading: false, message: '', error: false })
  const [quoteState, setQuoteState] = useState({ loading: false, message: '', error: false })

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  async function submitForm(event, type) {
    event.preventDefault()
    const isQuote = type === 'quote'
    const data = isQuote ? quote : contact
    const setState = isQuote ? setQuoteState : setContactState
    setState({ loading: true, message: '', error: false })
    try {
      const response = await fetch(`/api/${isQuote ? 'quotes' : 'contact'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.message || 'Please check your details and try again.')
      setState({ loading: false, message: result.message || 'Submitted successfully.', error: false })
      if (isQuote) setQuote({ name: '', email: '', phone: '', businessName: '', serviceType: '', budget: '', description: '' })
      else setContact({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      setState({ loading: false, message: error.message || 'Something went wrong. Please try again.', error: true })
    }
  }

  const filteredProjects = activeTab === 'All' ? projects : projects.filter(p => p.type.includes(activeTab))

  return (
    <div className="min-h-screen overflow-hidden bg-[#080d18] text-slate-100">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="site-header">
        <div className="container nav-wrap">
          <button className="brand-lockup" onClick={() => scrollTo('home')} aria-label="Go to home">
            <span className="brand-mark"><Layers3 size={20} /></span>
            <span><strong>{brand.name}</strong><small>{brand.descriptor}</small></span>
          </button>
          <nav className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
            {['Home', 'Services', 'About', 'Work', 'Contact'].map(item =>
              <button key={item} onClick={() => scrollTo(item.toLowerCase())}>{item}</button>
            )}
            <button className="nav-cta" onClick={() => scrollTo('quote')}>Start a project <ArrowUpRight size={16}/></button>
          </nav>
          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero-section section-pad">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span className="status-dot" /> {brand.availability}</div>
              <h1>{brand.headline.split('ambitious ideas')[0]}<span>ambitious ideas</span>{brand.headline.includes('ambitious ideas') ? brand.headline.split('ambitious ideas')[1] : ''}</h1>
              <p className="hero-lead">{brand.subheadline}</p>
              <div className="hero-actions">
                <button className="button button-primary" onClick={() => scrollTo('quote')}>Discuss your project <ArrowRight size={18}/></button>
                <button className="button button-ghost" onClick={() => scrollTo('work')}>Explore our work <ArrowUpRight size={17}/></button>
              </div>
              <div className="hero-proof">
                <div className="proof-icon"><CheckCircle2 size={17}/></div>
                <span>Thoughtful engineering. Clear communication. Practical outcomes.</span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="visual-glow" />
              <div className="orbit orbit-a" /><div className="orbit orbit-b" />
              <div className="code-window">
                <div className="window-top"><div className="window-dots"><i/><i/><i/></div><span>digital_solution.java</span><span className="window-lock">● LIVE</span></div>
                <div className="code-content">
                  <div><span className="line-no">01</span><span className="code-purple">public class</span> <span className="code-blue">YourNextIdea</span> {'{'}</div>
                  <div><span className="line-no">02</span>  <span className="code-purple">private final</span> Innovation idea;</div>
                  <div><span className="line-no">03</span>  <span className="code-purple">private final</span> Technology stack;</div>
                  <div className="code-space"><span className="line-no">04</span></div>
                  <div><span className="line-no">05</span>  <span className="code-green">build</span>(idea) {'{'}</div>
                  <div><span className="line-no">06</span>    return <span className="code-orange">BusinessGrowth</span>;</div>
                  <div><span className="line-no">07</span>  {'}'}</div>
                  <div><span className="line-no">08</span>{'}'}</div>
                </div>
                <div className="window-footer"><span><i className="status-dot"/> Build successful</span><span>Ready to scale ↗</span></div>
              </div>
              <div className="floating-card card-top"><span className="float-icon purple"><Sparkles size={17}/></span><span><b>AI-ready</b><small>Built for what's next</small></span></div>
              <div className="floating-card card-bottom"><span className="float-icon green"><Zap size={17}/></span><span><b>End-to-end</b><small>Idea to deployment</small></span></div>
            </div>
          </div>
          <div className="container hero-bottom"><span>WHAT WE BUILD</span><div><b>Websites</b><i/> <b>Applications</b><i/> <b>APIs</b><i/> <b>AI solutions</b><i/> <b>Cloud systems</b></div></div>
        </section>

        <section id="services" className="section-pad section-light">
          <div className="container">
            <div className="section-heading">
              <div><div className="eyebrow dark-eyebrow">OUR CAPABILITIES</div><h2>Technology that solves<br/><span>real business problems.</span></h2></div>
              <p>From your first website to a custom platform, we bring the right mix of design, engineering and practical thinking.</p>
            </div>
            <div className="services-grid">
              {services.map((service) => {
                const Icon = iconMap[service.icon] || Code2
                return <article className="service-card" key={service.number}>
                  <div className="service-card-top"><span className="service-icon"><Icon size={22}/></span><span className="service-number">{service.number}</span></div>
                  <h3>{service.title}</h3><p>{service.description}</p>
                  <div className="tag-list">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                  <button className="text-link" onClick={() => { setQuote(q => ({ ...q, serviceType: service.title })); scrollTo('quote') }}>Discuss this service <ArrowUpRight size={15}/></button>
                </article>
              })}
            </div>
          </div>
        </section>

        <section id="about" className="section-pad">
          <div className="container about-grid">
            <div className="about-visual">
              <div className="about-big-number">01<span>/ 04</span></div>
              <div className="about-visual-caption"><span className="mini-line"/> A thoughtful process, from day one.</div>
              <div className="about-stamp"><ShieldCheck size={27}/><span>Built with<br/>care</span></div>
            </div>
            <div className="about-copy">
              <div className="eyebrow"><span className="eyebrow-line"/> HOW WE WORK</div>
              <h2>Good software starts with <span>understanding.</span></h2>
              <p>Every business is different. We start by listening, understanding the problem and agreeing on what success looks like. Then we design, build and launch a solution that fits.</p>
              <div className="process-list">
                {[
                  ['01', 'Discover', 'Understand your goals, users and requirements.'],
                  ['02', 'Plan & design', 'Define scope, user journeys and a clear roadmap.'],
                  ['03', 'Build & test', 'Develop in focused steps and validate along the way.'],
                  ['04', 'Launch & support', 'Deploy, hand over and help you move forward.']
                ].map(step => <div className="process-item" key={step[0]}><b>{step[0]}</b><div><strong>{step[1]}</strong><small>{step[2]}</small></div></div>)}
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="section-pad work-section">
          <div className="container">
            <div className="section-heading">
              <div><div className="eyebrow">SELECTED WORK</div><h2>Ideas made <span>tangible.</span></h2></div>
              <p>A few example directions across commerce, business software and intelligent experiences. Replace these concepts with approved client work as it becomes available.</p>
            </div>
            <div className="project-filters">
              {['All', 'E-commerce', 'Custom web', 'AI integration'].map(tab => <button className={activeTab === tab ? 'active' : ''} key={tab} onClick={() => setActiveTab(tab)}>{tab}</button>)}
            </div>
            <div className="projects-grid">
              {filteredProjects.map((project, index) => <article className={`project-card project-${index + 1}`} key={project.number}>
                <div className="project-art">
                  <div className="project-art-top"><span>{project.type}</span><span>{project.number}</span></div>
                  {index === 0 ? <div className="mock-store"><div className="mock-store-nav"><b>STORE /</b><span>New arrivals&nbsp;&nbsp; Collections&nbsp;&nbsp; About</span></div><div className="mock-store-body"><div><small>CURATED FOR EVERY DAY</small><strong>Find your<br/>everyday essential.</strong><i>Explore collection ↗</i></div><div className="mock-product"><div className="product-shape"/></div></div></div>
                    : index === 1 ? <div className="mock-dashboard"><div className="dash-side"><b>◈</b><i/><i/><i/><i/></div><div className="dash-main"><div className="dash-title">Overview <small>Last 30 days⌄</small></div><div className="dash-stats"><i/><i/><i/></div><div className="dash-chart"><span/><span/><span/><span/><span/><span/><span/><span/><span/></div></div></div>
                    : <div className="mock-ai"><div className="ai-orb"><Sparkles size={38}/></div><b>How can I help today?</b><span>Ask. Explore. Get things done.</span><div className="ai-input">Type your question... ↗</div></div>}
                </div>
                <div className="project-info"><div><span>{project.type}</span><h3>{project.title}</h3><p>{project.description}</p><small>{project.stack}</small></div><ArrowUpRight size={21}/></div>
              </article>)}
            </div>
          </div>
        </section>

        <section className="section-pad why-section">
          <div className="container why-grid">
            <div><div className="eyebrow">THE RIGHT PARTNER</div><h2>Small enough to care.<br/><span>Skilled enough to deliver.</span></h2><p>Work directly with the person building your solution. No unnecessary layers — just honest conversations, clear scope and focused execution.</p><button className="button button-primary" onClick={() => scrollTo('contact')}>Let's talk <ArrowRight size={17}/></button></div>
            <div className="why-points">
              <div><span><MessageCircle size={20}/></span><b>Direct communication</b><p>Talk directly with your developer and stay close to decisions.</p></div>
              <div><span><Layers3 size={20}/></span><b>Built around your needs</b><p>Choose the right solution for your business, not a one-size-fits-all package.</p></div>
              <div><span><ShieldCheck size={20}/></span><b>Maintainable foundations</b><p>Clear structure, sensible technology choices and a handover mindset.</p></div>
              <div><span><Zap size={20}/></span><b>Practical delivery</b><p>Break work into milestones so progress and priorities stay visible.</p></div>
            </div>
          </div>
        </section>

        <section id="quote" className="section-pad quote-section">
          <div className="container quote-grid">
            <div className="quote-copy"><div className="eyebrow">HAVE AN IDEA?</div><h2>Let's make something <span>useful.</span></h2><p>Tell us a little about what you want to build. We'll review your requirements and get back to you to discuss the next step.</p><div className="quote-note"><CheckCircle2 size={18}/> No pressure. Just a practical first conversation.</div></div>
            <form className="form-card" onSubmit={(e) => submitForm(e, 'quote')}>
              <div className="form-heading"><div><span>PROJECT ENQUIRY</span><h3>Request a project quote</h3></div><span className="form-step">01 — 01</span></div>
              <div className="form-row"><label>Your name<input required maxLength="100" value={quote.name} onChange={e => setQuote({...quote, name:e.target.value})} placeholder="Full name"/></label><label>Email address<input required type="email" maxLength="160" value={quote.email} onChange={e => setQuote({...quote, email:e.target.value})} placeholder="you@company.com"/></label></div>
              <div className="form-row"><label>Phone / WhatsApp<input maxLength="30" value={quote.phone} onChange={e => setQuote({...quote, phone:e.target.value})} placeholder="+91"/></label><label>Business name <small>(optional)</small><input maxLength="150" value={quote.businessName} onChange={e => setQuote({...quote, businessName:e.target.value})} placeholder="Your business"/></label></div>
              <div className="form-row"><label>Service required<select required value={quote.serviceType} onChange={e => setQuote({...quote, serviceType:e.target.value})}><option value="">Choose a service</option>{services.map(s => <option key={s.number}>{s.title}</option>)}</select></label><label>Estimated budget<select value={quote.budget} onChange={e => setQuote({...quote, budget:e.target.value})}><option value="">Select a range</option><option>Under ₹25,000</option><option>₹25,000–₹50,000</option><option>₹50,000–₹1,00,000</option><option>₹1,00,000+</option><option>Not sure yet</option></select></label></div>
              <label>Tell us about your project<textarea required maxLength="4000" rows="4" value={quote.description} onChange={e => setQuote({...quote, description:e.target.value})} placeholder="What would you like to build? What problem should it solve?"/></label>
              <button className="button button-primary form-submit" disabled={quoteState.loading}>{quoteState.loading ? 'Sending...' : 'Send project enquiry'} <ArrowRight size={17}/></button>
              {quoteState.message && <p className={quoteState.error ? 'form-message error' : 'form-message success'}>{quoteState.message}</p>}
              <small className="form-privacy">Your details are used only to respond to this enquiry.</small>
            </form>
          </div>
        </section>

        <section id="contact" className="section-pad contact-section">
          <div className="container contact-grid">
            <div><div className="eyebrow">CONTACT</div><h2>Have a question?<br/><span>We're listening.</span></h2><p>Share what you're working on, ask a question or simply say hello.</p>
              <div className="contact-details">
                <a href={`mailto:${brand.email}`}><span><Mail size={18}/></span><div><small>EMAIL</small><b>{brand.email}</b></div><ArrowUpRight size={16}/></a>
                <a href={`https://wa.me/${brand.whatsappNumber}`} target="_blank" rel="noreferrer"><span><MessageCircle size={18}/></span><div><small>WHATSAPP</small><b>{brand.phone}</b></div><ArrowUpRight size={16}/></a>
                <div><span><MapPin size={18}/></span><div><small>LOCATION</small><b>{brand.location}</b></div></div>
              </div>
            </div>
            <form className="contact-form" onSubmit={(e) => submitForm(e, 'contact')}>
              <h3>Send a message</h3>
              <label>Name<input required maxLength="100" value={contact.name} onChange={e => setContact({...contact, name:e.target.value})} placeholder="Your name"/></label>
              <label>Email<input required type="email" maxLength="160" value={contact.email} onChange={e => setContact({...contact, email:e.target.value})} placeholder="you@example.com"/></label>
              <label>Phone <small>(optional)</small><input maxLength="30" value={contact.phone} onChange={e => setContact({...contact, phone:e.target.value})} placeholder="+91"/></label>
              <label>Message<textarea required rows="4" maxLength="3000" value={contact.message} onChange={e => setContact({...contact, message:e.target.value})} placeholder="How can we help?"/></label>
              <button className="button button-primary form-submit" disabled={contactState.loading}>{contactState.loading ? 'Sending...' : 'Send message'} <Send size={16}/></button>
              {contactState.message && <p className={contactState.error ? 'form-message error' : 'form-message success'}>{contactState.message}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-main"><div className="brand-lockup"><span className="brand-mark"><Layers3 size={20}/></span><span><strong>{brand.name}</strong><small>{brand.descriptor}</small></span></div><p>{brand.tagline}</p><button onClick={() => scrollTo('home')}>Back to top ↑</button></div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} {brand.name}. All rights reserved.</span><span>Designed & built with purpose.</span></div>
      </footer>
      <a className="whatsapp-float" href={`https://wa.me/${brand.whatsappNumber}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle size={22}/></a>
    </div>
  )
}

export default App
