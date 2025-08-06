import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Rocket, Target, Gear, Cube, Brain, CircleWavy, ChartLine, 
  ArrowRight, Download, Share, BookOpen, Zap, Shield, Globe,
  Users, Database, Monitor, Cpu, ChartPieSlice, TreeStructure
} from '@phosphor-icons/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

interface AquaVSection {
  id: string
  title: string
  icon: any
  progress: number
  items: string[]
  description: string
}

const aquaVSections: AquaVSection[] = [
  {
    id: 'strategic',
    title: 'Strategic Framework',
    icon: Target,
    progress: 100,
    description: 'Vision, mission, and six-layer architecture model for quantum aerospace transformation',
    items: [
      'Vision: Quantum-enhanced aerospace intelligence convergence platform',
      'Mission: €144B revenue by 2050 through revolutionary products',
      'Six-Layer Architecture: Quantum → Aerospace → AI/ML → Cyber-Physical → Digital-Industrial → Business Intelligence',
      'Timeline: Foundation (2025-27) → Validation (2028-32) → Scaling (2033-40) → Leadership (2041-50)'
    ]
  },
  {
    id: 'operations',
    title: 'Concept of Operations',
    icon: Gear,
    progress: 95,
    description: 'Quantum-enhanced operational scenarios including fleet optimization and predictive maintenance',
    items: [
      'DRM-0100: Quantum Fleet Optimization (1000+ aircraft, 10,000x speedup)',
      'DRM-0200: Predictive Maintenance with Quantum ML (99.9% accuracy, 500h prediction)',
      'Operational Modes: Development → Testing → Operational → Maintenance',
      'Key Principles: Quantum-First Design, Hybrid Processing, Autonomous Operations'
    ]
  },
  {
    id: 'products',
    title: 'Product Portfolio',
    icon: Cube,
    progress: 90,
    description: 'Complete product ecosystem: AMPEL360, GAIA AIR & SPACE, ROBBBO-T, and Quantum systems',
    items: [
      'AMPEL360 BWB: Q100 (120-180 pax), Q250 (220-300 pax) with H₂ propulsion',
      'GAIA UAV: Military TACT (48h endurance), Cargo CARG (2t payload), HALE SURV (72h)',
      'ROBBBO-T: Manufacturing AS01 (1000 units/day), Welding WL01 (500 joints/hr)',
      'Quantum QPUs: DESK (50-100 qubits) → RACK (100-500) → DATA (500-1000) → EDGE (10-50)'
    ]
  },
  {
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
  { 
    name: 'BWB-Q100', 
    category: 'AMPEL360', 
    specs: '120-180 pax, 5,000 nm, H₂ Fuel Cell',
    quantum: 'Route optimization, Quantum FBW',
    certification: '2030',
    icon: Rocket
  },
  { 
    name: 'GAIA TACT', 
    category: 'UAV Military', 
    specs: '48h endurance, 500kg payload',
    quantum: 'Quantum radar, Secure comms',
    certification: '2029',
    icon: Shield
  },
  { 
    name: 'ROBBBO-T AS01', 
    category: 'Manufacturing', 
    specs: '1000 units/day, ±0.01mm accuracy',
    quantum: 'Optimization algorithms',
    certification: '2027',
    icon: Cpu
  },
  { 
    name: 'QPU RACK', 
    category: 'Quantum', 
    specs: '100-500 qubits, 1000 QOPS',
    quantum: 'Core quantum processing',
    certification: '2026',
    icon: Database
  }
]

export default function AquaVDocumentViewer() {
  const [selectedSection, setSelectedSection] = useState<AquaVSection>(aquaVSections[0])
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-400 rounded-2xl flex items-center justify-center">
            <Rocket size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              AQUA V. Model Master Document
            </h1>
            <p className="text-lg text-muted-foreground">
              Aerospace & Quantum United Advanced Venture
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <span>Version 2.0.0-UNIFIED</span>
          <Separator orientation="vertical" className="h-4" />
          <span>Classification: CONFIDENTIAL</span>
          <Separator orientation="vertical" className="h-4" />
          <span>August 6, 2025</span>
        </div>
        
        <div className="flex items-center justify-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Quantum Aerospace
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            €144B Target 2045
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Global Leadership 2050
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="architecture">Architecture</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Executive Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe size={20} />
                Executive Abstract
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p>
                  AQUA V. (Aerospace and Quantum United Aspirational Venture) represents a paradigm shift in aerospace 
                  technology through the revolutionary integration of quantum computing, artificial intelligence, and 
                  cyber-physical systems. This Model Master Document defines the complete framework for transforming 
                  global aerospace through quantum-enhanced capabilities.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                  <li>• Revolutionary quantum-enhanced aerospace systems</li>
                  <li>• €144 billion annual revenue target by 2045</li>
                  <li>• Six-layer architecture model</li>
                  <li>• Global market leadership by 2050</li>
                  <li>• Comprehensive product portfolio</li>
                  <li>• Strategic technology partnerships</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Strategic Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aquaVSections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="cursor-pointer"
                onClick={() => setSelectedSection(section)}
              >
                <Card className={`hover:shadow-lg transition-all duration-300 ${
                  selectedSection.id === section.id ? 'ring-2 ring-primary' : ''
                }`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <section.icon size={20} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={section.progress} className="flex-1 h-2" />
                          <span className="text-sm font-medium">{section.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm mb-3">
                      {section.description}
                    </CardDescription>
                    <div className="text-xs text-muted-foreground">
                      {section.items.length} key components
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Selected Section Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <selectedSection.icon size={24} />
                {selectedSection.title} - Detailed View
                <Badge variant="secondary">{selectedSection.progress}% Complete</Badge>
              </CardTitle>
              <CardDescription>{selectedSection.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedSection.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-semibold text-primary">{index + 1}</span>
                    </div>
                    <div className="text-sm">{item}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="architecture" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TreeStructure size={20} />
                Six-Layer Architecture Model
              </CardTitle>
              <CardDescription>
                Quantum-enhanced virtual infrastructure serving as convergence platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { layer: 6, name: 'Business Intelligence', desc: 'Analytics • ROI • Strategic Decisions', color: 'bg-green-100 text-green-800' },
                  { layer: 5, name: 'Digital-Industrial', desc: 'Manufacturing • Supply Chain • MRO', color: 'bg-blue-100 text-blue-800' },
                  { layer: 4, name: 'Cyber-Physical', desc: 'IoT • Edge Computing • Sensors', color: 'bg-purple-100 text-purple-800' },
                  { layer: 3, name: 'AI/ML Cognitive', desc: 'WIR Framework • Neural Networks', color: 'bg-orange-100 text-orange-800' },
                  { layer: 2, name: 'Aerospace Integration', desc: 'Flight Systems • Avionics • Control', color: 'bg-cyan-100 text-cyan-800' },
                  { layer: 1, name: 'Quantum Enhancement', desc: 'QPU • Algorithms • Entanglement', color: 'bg-pink-100 text-pink-800' }
                ].map((layer) => (
                  <motion.div
                    key={layer.layer}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (6 - layer.layer) * 0.1 }}
                    className="relative"
                  >
                    <div className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                        {layer.layer}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{layer.name}</h3>
                        <p className="text-sm text-muted-foreground">{layer.desc}</p>
                      </div>
                      <Badge className={layer.color}>Layer {layer.layer}</Badge>
                    </div>
                    {layer.layer > 1 && (
                      <div className="absolute left-6 top-full w-0.5 h-4 bg-gradient-to-b from-primary to-transparent"></div>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {productPortfolio.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <product.icon size={20} className="text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <Badge variant="outline">{product.category}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground">Specifications</h4>
                        <p className="text-sm">{product.specs}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground">Quantum Features</h4>
                        <p className="text-sm">{product.quantum}</p>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm text-muted-foreground">Target Certification</span>
                        <Badge variant="secondary">{product.certification}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartLine size={20} />
                Strategic Implementation Timeline
              </CardTitle>
              <CardDescription>
                Four-phase roadmap to global market leadership
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {timelinePhases.map((phase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-center gap-4"
                  >
                    <div className={`w-16 h-16 rounded-full ${phase.color} flex items-center justify-center text-white font-bold`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{phase.phase}</h3>
                      <p className="text-muted-foreground">{phase.period}</p>
                      <Progress value={phase.progress} className="mt-2" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{phase.progress}%</div>
                      <div className="text-xs text-muted-foreground">Progress</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: '2030 Revenue', value: '€4B', color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: '2035 Revenue', value: '€23B', color: 'text-green-600', bg: 'bg-green-50' },
              { label: '2045 Target', value: '€144B', color: 'text-purple-600', bg: 'bg-purple-50' },
              { label: '2050 Vision', value: '€240B', color: 'text-orange-600', bg: 'bg-orange-50' }
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
                    <div className="text-sm text-muted-foreground">{metric.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartPieSlice size={20} />
                Market Positioning Targets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { segment: 'Commercial Aviation', size: '€500B', target: '15% share', cagr: '4%' },
                  { segment: 'Defense & Space', size: '€400B', target: '10% share', cagr: '3%' },
                  { segment: 'Urban Air Mobility', size: '€5B', target: '25% share', cagr: '25%' },
                  { segment: 'Robotics & Automation', size: '€200B', target: '5% share', cagr: '8%' }
                ].map((market, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">{market.segment}</h3>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <div className="text-muted-foreground">Market Size</div>
                        <div className="font-medium">{market.size}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Target Share</div>
                        <div className="font-medium">{market.target}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">CAGR</div>
                        <div className="font-medium">{market.cagr}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t">
        <div className="text-sm text-muted-foreground">
          Author: Amedeo Pelliccia, Quantum Aerospace Engineer
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm">
            <Share size={16} className="mr-2" />
            Share Document
          </Button>
          <Button size="sm">
            <BookOpen size={16} className="mr-2" />
            Full Document
          </Button>
        </div>
      </div>
    </div>
  )
}