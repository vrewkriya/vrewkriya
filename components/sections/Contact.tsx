'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  firstName: z.string().min(2, 'First name required'),
  brand: z.string().min(2, 'Brand name required'),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Tell us more (at least 10 characters)'),
})

type FormData = z.infer<typeof schema>

const services = ['Campaign Shoots', 'Brand Identity', 'Digital Presence']

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>(
    'idle'
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        setSubmitStatus('error')
        setTimeout(() => setSubmitStatus('idle'), 5000)
      }
    } catch {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Left panel */}
      <div
        className="flex flex-col justify-center p-8 md:p-16"
        style={{ background: 'var(--bg-2)' }}
      >
        <div
          className="font-sans font-extralight text-gold-dim uppercase tracking-widest3"
          style={{ fontSize: '0.6rem' }}
        >
          Get in Touch
        </div>

        <h2 className="font-display font-light text-cream text-5xl md:text-6xl mt-5 mb-8 leading-tight">
          Let's Create{' '}
          <span className="italic text-gold">Something Beautiful</span>
        </h2>

        <p
          className="font-sans font-extralight text-cream-dim leading-relaxed mb-12"
          style={{ fontSize: '0.8rem' }}
        >
          Have a project in mind? Let's talk about how we can elevate your brand
          through light, shadow, and meticulous craft.
        </p>

        {/* Contact details */}
        <div className="space-y-6">
          <div>
            <p
              className="font-sans font-extralight text-cream-dim uppercase tracking-widest2 mb-2"
              style={{ fontSize: '0.6rem' }}
            >
              Email
            </p>
            <a
              href="mailto:hello@vrewkriya.com"
              className="font-sans font-light text-cream hover:text-gold transition-colors"
              style={{ fontSize: '0.9rem' }}
            >
              hello@vrewkriya.com
            </a>
          </div>

          <div>
            <p
              className="font-sans font-extralight text-cream-dim uppercase tracking-widest2 mb-2"
              style={{ fontSize: '0.6rem' }}
            >
              Studio
            </p>
            <p
              className="font-sans font-light text-cream"
              style={{ fontSize: '0.9rem' }}
            >
              Mumbai, India
            </p>
          </div>

          <div>
            <p
              className="font-sans font-extralight text-cream-dim uppercase tracking-widest2 mb-2"
              style={{ fontSize: '0.6rem' }}
            >
              Hours
            </p>
            <p
              className="font-sans font-light text-cream"
              style={{ fontSize: '0.9rem' }}
            >
              Mon—Fri, 10am—6pm IST
            </p>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div
        className="flex flex-col justify-center p-8 md:p-16"
        style={{ background: 'var(--bg)' }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md">
          {/* First Name */}
          <div>
            <input
              type="text"
              placeholder="First Name*"
              {...register('firstName')}
              className="w-full border-b border-gold-dim/40 bg-transparent text-cream placeholder:text-cream-dim/50 font-sans font-extralight focus:outline-none focus:border-gold transition-colors py-3"
              style={{ fontSize: '0.9rem' }}
            />
            {errors.firstName && (
              <p className="text-gold-dim text-xs mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Brand */}
          <div>
            <input
              type="text"
              placeholder="Brand Name*"
              {...register('brand')}
              className="w-full border-b border-gold-dim/40 bg-transparent text-cream placeholder:text-cream-dim/50 font-sans font-extralight focus:outline-none focus:border-gold transition-colors py-3"
              style={{ fontSize: '0.9rem' }}
            />
            {errors.brand && (
              <p className="text-gold-dim text-xs mt-1">{errors.brand.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email*"
              {...register('email')}
              className="w-full border-b border-gold-dim/40 bg-transparent text-cream placeholder:text-cream-dim/50 font-sans font-extralight focus:outline-none focus:border-gold transition-colors py-3"
              style={{ fontSize: '0.9rem' }}
            />
            {errors.email && (
              <p className="text-gold-dim text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Service dropdown */}
          <div>
            <select
              {...register('service')}
              className="w-full border-b border-gold-dim/40 bg-transparent text-cream font-sans font-extralight focus:outline-none focus:border-gold transition-colors py-3"
              style={{ fontSize: '0.9rem' }}
            >
              <option value="">Select a Service*</option>
              {services.map((svc) => (
                <option key={svc} value={svc} className="bg-bg text-cream">
                  {svc}
                </option>
              ))}
            </select>
            {errors.service && (
              <p className="text-gold-dim text-xs mt-1">
                {errors.service.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div>
            <textarea
              placeholder="Message*"
              rows={5}
              {...register('message')}
              className="w-full border-b border-gold-dim/40 bg-transparent text-cream placeholder:text-cream-dim/50 font-sans font-extralight focus:outline-none focus:border-gold transition-colors py-3 resize-none"
              style={{ fontSize: '0.9rem' }}
            />
            {errors.message && (
              <p className="text-gold-dim text-xs mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit + Status */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gold text-bg font-sans font-normal uppercase tracking-widest2 py-3 transition-all hover:bg-gold-dim disabled:opacity-50"
              style={{ fontSize: '0.6rem' }}
            >
              {isSubmitting ? 'Sending...' : 'Book a Consultation'}
            </button>
            {submitStatus === 'success' && (
              <p className="text-gold text-xs mt-3 text-center">
                Thank you! We'll be in touch soon.
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="text-gold-dim text-xs mt-3 text-center">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
