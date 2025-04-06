"use client"

import { ArrowRight, Code, Users } from "lucide-react"
import { DotBackground } from "@/components/dot-background"
import { AnimatedSection } from "@/components/animated-section"
import { AnimatedCard } from "@/components/animated-card"
import { AnimatedText } from "@/components/animated-text"
import { Button as MovingBorderButton } from "@/components/ui/moving-border"
import { motion } from "framer-motion"
import Link from "next/link"
import Globe from "@/components/Globe"

export default function Home() {
  return (
    <DotBackground>
      <div className="flex flex-col min-h-screen text-white">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center px-2 pt-20 pb-0 md:pt-32 md:pb-4">
          <div className="container max-w-4xl text-center">
            <motion.h1
              className="text-7xl md:text-9xl font-bold tracking-wider mb-4 md:mb-8 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <span className="inline-block relative">
                <span className="bg-clip-text text-transparent bg-sky-400 animate-gradient">
                  ZOOK<span className="text-white">DEV</span>
                </span>
                <motion.span
                  className="absolute -inset-1 blur-xl bg-cyan-500/20 rounded-lg opacity-70"
                  animate={{
                    opacity: [0.4, 0.8, 0.4],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                ></motion.span>
              </span>
            </motion.h1>
            <AnimatedText
              text="B2B Lead Gen + AI Web Dev"
              className="text-3xl md:text-4xl font-bold text-zinc-200 mb-14 md:mb-12 drop-shadow-lg"
              delay={0.3}
            />
            <Link href="https://cal.com/zookdev/intro-call?duration=30" passHref>
              <MovingBorderButton
                borderRadius="1.75rem"
                className="bg-white text-black border-neutral-200 font-extrabold text-lg tracking-wider"
                containerClassName="h-20 w-48"
              >
                Book a Call
                <ArrowRight className="ml-2 h-6 w-6 font-bold stroke-[3]" />
              </MovingBorderButton>
            </Link>
          </div>
        </section>

        {/* Globe Section */}
        <div className="w-full mt-0 md:mt-0 mb-4 md:mb-1">
          <div className="mx-auto h-[450px] md:h-[500px] max-w-[700px]">
            <Globe />
          </div>
        </div>

        {/* Middle Section - New Feature Showcase */}
        <AnimatedSection delay={0.8} className="py-16 px-4">
          <div className="container max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">The Process</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                className="p-6 rounded-xl border border-zinc-800 bg-zinc-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                <div className="text-4xl font-bold text-cyan-400 mb-2">01</div>
                <h3 className="text-xl font-bold mb-2">Discovery</h3>
                <p className="text-zinc-400">Ideal Client Profile (ICP) + Total Addressable Market (TAM)</p>
              </motion.div>

              <motion.div
                className="p-6 rounded-xl border border-zinc-800 bg-zinc-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <div className="text-4xl font-bold text-sky-400 mb-2">02</div>
                <h3 className="text-xl font-bold mb-2">Implementation</h3>
                <p className="text-zinc-400">Build Outbound Sales Systems</p>
              </motion.div>

              <motion.div
                className="p-6 rounded-xl border border-zinc-800 bg-zinc-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <div className="text-4xl font-bold text-blue-400 mb-2">03</div>
                <h3 className="text-xl font-bold mb-2">Booked Meetings</h3>
                <p className="text-zinc-400">25+ Meetings Booked in 45 Days</p>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Services Section */}
        <section className="py-20 px-4">
          <div className="container max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatedCard delay={1.6}>
                <div className="h-12 w-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-sky-400" />
                </div>
                <h2 className="text-2xl font-bold mb-4">B2B Lead Generation</h2>
                <p className="text-zinc-400">
                  Strategic lead generation solutions to connect your business with high-quality prospects.
                </p>
              </AnimatedCard>

              <AnimatedCard delay={1.8}>
                <div className="h-12 w-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-6">
                  <Code className="h-6 w-6 text-sky-400" />
                </div>
                <h2 className="text-2xl font-bold mb-4">AI + Web Development</h2>
                <p className="text-zinc-400">
                  Custom AI web solutions built with modern technologies for optimal performance.
                </p>
              </AnimatedCard>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <AnimatedSection delay={2.0} className="py-20 px-4">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Scale Your Business?</h2>
            <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto">
              Book an Intro Call to Generate B2B leads and Modernize Your Business
            </p>
            <Link href="https://cal.com/zookdev/intro-call?duration=30" passHref>
              <MovingBorderButton
                borderRadius="1.75rem"
                className="bg-white text-black border-neutral-200 font-bold text-lg tracking-wider"
                containerClassName="h-20 w-48"
              >
                Book a Call
                <ArrowRight className="ml-2 h-6 w-6 font-bold stroke-[3]" />
              </MovingBorderButton>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </DotBackground>
  )
}

