'use client'

import type React from 'react'

import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import { CreditCard, Globe, Key, Laptop, Shield, Smartphone } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '../../components/ui/badge'
import { Card, CardContent } from '../../components/ui/card'

interface CardItem {
  id: string
  fingerprint: string
  badge: {
    text: string
    variant: 'default' | 'secondary' | 'destructive' | 'outline'
    icon: React.ReactNode
  }
  title: string
  color: string
}

const mockData: CardItem[] = [
  {
    id: '1',
    fingerprint: 'A1:B2:C3:D4:E5:F6:G7:H8',
    badge: { text: 'Payment', variant: 'default', icon: <CreditCard className="w-3 h-3" /> },
    title: 'Primary Credit Card',
    color: 'from-blue-500 to-purple-600',
  },
  {
    id: '2',
    fingerprint: 'X9:Y8:Z7:A6:B5:C4:D3:E2',
    badge: { text: 'Security', variant: 'destructive', icon: <Shield className="w-3 h-3" /> },
    title: 'Security Access Key',
    color: 'from-red-500 to-pink-600',
  },
  {
    id: '3',
    fingerprint: 'M1:N2:O3:P4:Q5:R6:S7:T8',
    badge: { text: 'Identity', variant: 'secondary', icon: <Key className="w-3 h-3" /> },
    title: 'Digital Identity Card',
    color: 'from-green-500 to-teal-600',
  },
  {
    id: '4',
    fingerprint: 'U9:V8:W7:X6:Y5:Z4:A3:B2',
    badge: { text: 'Device', variant: 'outline', icon: <Smartphone className="w-3 h-3" /> },
    title: 'Mobile Device Token',
    color: 'from-orange-500 to-yellow-600',
  },
  {
    id: '5',
    fingerprint: 'C1:D2:E3:F4:G5:H6:I7:J8',
    badge: { text: 'Workspace', variant: 'default', icon: <Laptop className="w-3 h-3" /> },
    title: 'Work Laptop Certificate',
    color: 'from-indigo-500 to-blue-600',
  },
  {
    id: '6',
    fingerprint: 'K9:L8:M7:N6:O5:P4:Q3:R2',
    badge: { text: 'Network', variant: 'secondary', icon: <Globe className="w-3 h-3" /> },
    title: 'VPN Access Token',
    color: 'from-purple-500 to-pink-600',
  },
]

export default function Component() {
  const [cards, setCards] = useState(mockData)
  const [draggedCard, setDraggedCard] = useState<string | null>(null)

  const handleDragEnd = (event: any, info: PanInfo, cardId: string) => {
    const threshold = 150
    const { offset, velocity } = info

    if (Math.abs(offset.x) > threshold || Math.abs(velocity.x) > 500) {
      // Remove card with animation
      setCards(prev => prev.filter(card => card.id !== cardId))
    }
    setDraggedCard(null)
  }

  const handleCardClick = (cardId: string) => {
    // Animate card selection
    setCards(prev => prev.map(card => (card.id === cardId ? { ...card, title: `${card.title} ✓` } : card)))
  }

  const resetCards = () => {
    setCards(mockData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Card Manager</h1>
          <p className="text-slate-600">Swipe left/right to remove • Tap to select</p>
          {cards.length === 0 && (
            <button
              type="button"
              onClick={resetCards}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Reset Cards
            </button>
          )}
        </div>

        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotateZ: draggedCard === card.id ? Math.random() * 4 - 2 : 0,
                }}
                exit={{
                  opacity: 0,
                  x: Math.random() > 0.5 ? 300 : -300,
                  rotateZ: Math.random() * 20 - 10,
                  scale: 0.8,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                  delay: index * 0.1,
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragStart={() => setDraggedCard(card.id)}
                onDragEnd={(event, info) => handleDragEnd(event, info, card.id)}
                whileHover={{
                  scale: 1.02,
                  rotateZ: Math.random() * 2 - 1,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
                className="cursor-grab active:cursor-grabbing"
              >
                <Card
                  className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                  onClick={() => handleCardClick(card.id)}
                >
                  <div className={`h-2 bg-gradient-to-r ${card.color}`} />
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant={card.badge.variant} className="flex items-center gap-1 text-xs font-medium">
                        {card.badge.icon}
                        {card.badge.text}
                      </Badge>
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="text-slate-400"
                      >
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                          <div className="w-4 h-4 rounded-full bg-slate-300" />
                        </div>
                      </motion.div>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-800 mb-3">{card.title}</h3>

                    <div className="space-y-2">
                      <div className="text-xs text-slate-500 uppercase tracking-wide font-medium">Fingerprint</div>
                      <div className="font-mono text-sm text-slate-700 bg-slate-50 px-3 py-2 rounded-md border">
                        {card.fingerprint}
                      </div>
                    </div>

                    <motion.div
                      className="mt-4 flex justify-between items-center text-xs text-slate-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span>← Swipe to remove</span>
                      <span>Tap to select →</span>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {cards.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">All cards removed!</h3>
              <p className="text-slate-500">Great job managing your cards.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
