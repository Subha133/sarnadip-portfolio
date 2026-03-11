import { useState, useEffect, useRef, useCallback } from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import ScrollReveal from '@/components/ui/ScrollReveal'

interface Project { title: string; category: string; image: string }
interface PortfolioData { title: string; layout: string; projects: Project[] }

const categoryColours: Record<string, string> = {
  'Graphic Design':   'bg-accent/15 text-accent-light',
  'Motion Graphics':  'bg-accent-cyan/15 text-accent-cyan',
  'Video Editing':    'bg-emerald-500/15 text-emerald-400',
}

const placeholderGradients = [
  'from-accent/20 to-accent/5',
  'from-accent-cyan/20 to-accent-cyan/5',
  'from-emerald-500/20 to-emerald-500/5',
]

export default function PortfolioSection({ portfolio }: { portfolio: PortfolioData }) {
  const { projects } = portfolio
  const [active,      setActive]      = useState(0)
  const [animating,   setAnimating]   = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((idx: number) => {
    if (animating) return
    setAnimating(true)
    setActive(idx)
    setTimeout(() => setAnimating(false), 500)
  }, [animating])

  const startAutoplay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActive(a => (a + 1) % projects.length)
    }, 4000)
  }, [projects.length])

  useEffect(() => {
    startAutoplay()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [startAutoplay])

  const handlePrev = () => { goTo((active - 1 + projects.length) % projects.length); startAutoplay() }
  const handleNext = () => { goTo((active + 1) % projects.length); startAutoplay() }

  const current = projects[active]

  return (
    <section id="portfolio" className="section-padding bg-surface relative overflow-hidden">
      <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-surface-secondary/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header row */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
            <div>
              <span className="font-mono text-accent text-xs tracking-[0.3em] uppercase">— Selected Works</span>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light mt-3 leading-tight">
                {portfolio.title}
              </h2>
              <div className="w-12 h-[2px] bg-accent mt-4" />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border border-text-muted/30 flex items-center justify-center text-text-secondary hover:text-white hover:bg-accent hover:border-accent transition-all duration-300"
                aria-label="Previous project"
              >
                <FiArrowLeft size={18} />
              </button>
              <span className="font-mono text-sm text-text-muted">
                {String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>
              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full border border-text-muted/30 flex items-center justify-center text-text-secondary hover:text-white hover:bg-accent hover:border-accent transition-all duration-300"
                aria-label="Next project"
              >
                <FiArrowRight size={18} />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Main carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* Image panel */}
          <ScrollReveal direction="left">
            <div
              key={`img-${active}`}
              className={`relative rounded-3xl overflow-hidden aspect-[4/3] bg-surface-secondary shadow-[0_20px_60px_rgba(124,58,237,0.15)] transition-all duration-500 ${animating ? 'opacity-0 scale-[0.97]' : 'opacity-100 scale-100'}`}
            >
              {/* Fallback gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${placeholderGradients[active % placeholderGradients.length]} flex items-center justify-center`}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl text-accent">◈</span>
                  </div>
                  <p className="text-text-muted text-xs">Project Preview</p>
                </div>
              </div>

              <img
                src={current.image}
                alt={current.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${categoryColours[current.category] ?? 'bg-white/90 text-text-primary'}`}>
                  {current.category}
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Info + thumbnails */}
          <div className="space-y-8">
            <ScrollReveal direction="right" delay={100}>
              <div
                key={`info-${active}`}
                className={`transition-all duration-500 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
              >
                <span className="font-mono text-xs text-text-muted tracking-wider">
                  {String(active + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
                <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-light mt-2 leading-tight">
                  {current.title}
                </h3>
                <div className="flex items-center gap-3 mt-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColours[current.category] ?? 'bg-accent/10 text-accent'}`}>
                    {current.category}
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* Thumbnails */}
            <ScrollReveal direction="right" delay={200}>
              <div className="flex gap-4">
                {projects.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => { goTo(idx); startAutoplay() }}
                    className={`relative flex-1 aspect-video rounded-xl overflow-hidden transition-all duration-300 ${
                      idx === active ? 'ring-2 ring-accent shadow-accent scale-105' : 'opacity-50 hover:opacity-80'
                    }`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${placeholderGradients[idx % placeholderGradients.length]} flex items-center justify-center`}>
                      <span className="font-mono text-[10px] text-text-muted/60 text-center px-1 leading-tight">
                        {p.title.split(' ').slice(0, 2).join(' ')}
                      </span>
                    </div>
                    <img
                      src={p.image}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                    />
                  </button>
                ))}
              </div>
            </ScrollReveal>

            {/* Dot progress */}
            <div className="flex items-center gap-2 ml-1">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { goTo(idx); startAutoplay() }}
                  className={`transition-all duration-300 rounded-full ${
                    idx === active ? 'w-6 h-2 bg-accent' : 'w-2 h-2 bg-text-muted/30 hover:bg-text-muted/60'
                  }`}
                  aria-label={`Go to project ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
