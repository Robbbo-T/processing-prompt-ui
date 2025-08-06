import React, { useState } from 'react'
import { motion } from 'framer-motion'
  ArrowRi
} from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/c
import { Separator } from '@/c
interface AquaVSection {
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

interface AquaVSection {
  id: string
  {
  icon: any
    icon: Target,
  items: string[]
    items: [
}

const aquaVSections: AquaVSection[] = [
  }
    id: 'strategic',
    title: 'Strategic Framework',
    icon: Target,
    description: '
    description: 'Vision, mission, and six-layer architecture model for quantum aerospace transformation',
      'DRM-0
      'Vision: Quantum-enhanced aerospace intelligence convergence platform',
    id: 'quantum',
    icon: Brain,
    description: 'Quantum computing architecture with hybrid processing and security framework',
     
    
   
  {
    title: 'AI Framework (WIR)',
    progress: 8
    items: [
      'Training Infrastructure: 10,000 GPUs, 4,096 TPUs, 100 QPU qubits',
      'Edge 
  },
    id: 'business',
    icon: ChartLine,
    description: 'Financial model targeting €144B revenue by 2045 with global market s
     
    
   
]
const timelinePhases = [
  { phase: 'Val
  { phase: 'Leade

  { 
    category: 'AMPEL360', 
    quantum: 'Route optimization, Quantum FBW',
    icon: Rocket
  { 
    c
    
   
    id: 'quantum',
    title: 'Quantum Engineering',
    icon: Brain,
    progress: 85,
    description: 'Quantum computing architecture with hybrid processing and security framework',
    items: [
      'Hardware Stack: 50-1000 qubits, 99.9% fidelity, <10⁻⁹ error rate',
      'Hybrid Architecture: Quantum + Classical integration with seamless processing',
      'Security Framework: QKD, Quantum Signatures, Post-Quantum cryptography',
      'Applications: QAOA optimization, Quantum ML, Error correction'
    ]
  },
  {
    id: 'ai',
    title: 'AI Framework (WIR)',
    icon: CircleWavy,
    progress: 88,
    description: 'Well Invented Reality system with comprehensive machine learning pipeline',
    items: [
      'WIR Components: Perception (99.5%), Cognitive (<10ms), Ethical (100%), Execution (real-time)',
      'Training Infrastructure: 10,000 GPUs, 4,096 TPUs, 100 QPU qubits',
      'Performance: 50 PFLOPS classical, 100 PFLOPS TPU, exponential quantum advantage',
      'Edge Deployment: 1,000 NVIDIA Jetson units, <10ms latency'
    ]
  },
  {
    id: 'business',
    title: 'Business Architecture',
    icon: ChartLine,
    progress: 80,
    description: 'Financial model targeting €144B revenue by 2045 with global market strategy',
    items: [
      'Revenue 2030: €4B → 2035: €23B → 2040: €70B → 2045: €144B → 2050: €240B',
      'Market Targets: Commercial Aviation (15%), Defense (10%), UAM (25%), Robotics (5%)',
      'Global Network: Madrid HQ, 6 manufacturing sites, €40B total investment',
      'Strategic Alliances: IBM Quantum, Google AI, NVIDIA, MIT, Oxford, CERN'
    ]
  }
]

const timelinePhases = [
  { phase: 'Foundation', period: '2025-2027', progress: 25, color: 'bg-blue-500' },
  { phase: 'Validation', period: '2028-2032', progress: 15, color: 'bg-green-500' },
  { phase: 'Scaling', period: '2033-2040', progress: 5, color: 'bg-orange-500' },
  { phase: 'Leadership', period: '2041-2050', progress: 0, color: 'bg-purple-500' }
]

const productPortfolio = [
    

          <div className="
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                transition
                
    
    
                    <di
                        <secti
                      <div className="flex
                        <div className="fle
                          
                
    
    
                    </CardD
                      {section.
                  </CardContent>
              </motion.div>
          </div>
          {/*
    
    
                <Badge
              <CardDescri
            <CardContent>
                {selectedSection.items.
                    key={i
                  
   
 

                  </motion.div>
              </div>
          </Card>

          
              <CardTitle classN
                Six-
              <CardDescription>
              </CardDescription>
            <CardContent>
                {[
                
               
                  { layer: 1, name: 'Quantum Enhancement', desc: 'QPU • Algorithms • Entanglement', color: 'bg-pink-100 text-pink-800' 
                  <motion.div
                 
                    transition={{ delay: (6 - layer.layer
                  >
                
                
              
        
                    </div>
                      <div className="absolu
                  </motion.div>
              </div>
          </Card>

          <div
        
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
                <Card classNa
                  
                        <product.icon size={20} className="text-primary" />
                      <div>
                  
                    </div>
                  <CardContent>
                  
              
            

                      <div className="flex items-center jus
                        <Badge variant="secondary">{pr
                    </div>
                </Card>
            ))}
        </TabsContent>
        <TabsContent value="timeline" className="space-y-6">
            <CardHe

              </CardTitle>
                Four-phase roadmap 
            </Ca
              <div class
                  <motion.div
                    initial={{ opac
                    transition={{ 
                  >
                      {in
                    <div 
                      <p className="text-muted-f
                   
                      <div className="text-sm font-medium">{phase.progress}%</div>
                    </div>
                ))}
            </CardContent>
        </TabsConten
        <TabsContent value="metrics" className="space-y-6">
            {[
              { label: '2035 Revenue', value: '€23B', color: 'text-gree
              { label: '2050 Vision', value: '€240B', col
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                <Card
                    
                  </CardCo
              </m

          <Card>
              <CardTitle className="flex items-center gap-2">
                Market Positioning Targets
            </CardHeader>
              <div className="gr
                  { segment: 'Commercial Aviati
                  { segment: 'Urban Air Mobili
                ].map((market, index) => (
                    <h3 className="font-se
                      <div>
               
                      <div>
                        <div className="font-medium">{market.target}</div>
                    
                        <div className="font-me
                    </div>
                ))}
            </CardContent>
        </TabsContent>

      <div className="flex items-center justify-between pt-6 border-t">
          Author: Amedeo Pelliccia, Quantum Aerospace Engineer
        <div className="flex gap-2">
            <Download size={16} className="mr-2" />
          </Button>
            <Share size={16}
          </Button>
            <BookOpen size={16}
          </Button>
      </div>
  )

































































































































































































































































