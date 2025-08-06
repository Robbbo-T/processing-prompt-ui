import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Rocket, Target, Gear, Cube, Brain, ChartLine, 
  Download, Share, GitBranch, FileText, Eye 
} from '@phosphor-icons/react'

export default function AquaVDocumentViewer() {
  return (
    <div className="space-y-6">
      {/* Document Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Rocket size={32} className="text-primary" />
                AQUA V. Model Master Document (MMD)
              </CardTitle>
              <CardDescription className="text-base mt-2">
                Aerospace & Quantum United Advanced Venture - Comprehensive strategic framework and technical architecture for quantum-enhanced aerospace systems
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                Published
              </Badge>
              <Badge variant="outline">v2.0.0</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Author:</span>
              <div className="font-medium">Amedeo Pelliccia, Quantum Aerospace Engineer</div>
            </div>
            <div>
              <span className="text-muted-foreground">Word Count:</span>
              <div className="font-medium">15,500 words</div>
            </div>
            <div>
              <span className="text-muted-foreground">Read Time:</span>
              <div className="font-medium">62 minutes</div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Button size="sm">
              <Eye size={16} className="mr-2" />
              Full Document View
            </Button>
            <Button variant="outline" size="sm">
              <Download size={16} className="mr-2" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm">
              <Share size={16} className="mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <GitBranch size={16} className="mr-2" />
              Version History
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Document Structure */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="strategic">Strategic</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="quantum">Quantum</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Executive Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p>
                  AQUA V. (Aerospace and Quantum United Aspirational Venture) represents a paradigm shift in aerospace technology through the revolutionary integration of quantum computing, artificial intelligence, and cyber-physical systems. This Model Master Document defines the complete framework for transforming global aerospace through quantum-enhanced capabilities, targeting €144 billion in annual revenue by 2045 and establishing market leadership by 2050.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">€144B</div>
                    <div className="text-sm text-blue-700">Revenue Target 2045</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">2050</div>
                    <div className="text-sm text-green-700">Market Leadership</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">6</div>
                    <div className="text-sm text-purple-700">Layer Architecture</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">4</div>
                    <div className="text-sm text-orange-700">Product Lines</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target size={20} />
                Strategic Framework
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Vision Statement</h4>
                  <blockquote className="border-l-4 border-primary pl-4 italic">
                    "Transforming aerospace through quantum-enhanced intelligence, creating a convergent platform where quantum computing, artificial intelligence, and cyber-physical systems unite to redefine the boundaries of flight and space exploration."
                  </blockquote>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Six-Layer Architecture Model</h4>
                  <div className="space-y-2">
                    {[
                      { layer: 'Layer 6', name: 'Business Intelligence', desc: 'Analytics • ROI • Strategic Decisions' },
                      { layer: 'Layer 5', name: 'Digital-Industrial', desc: 'Manufacturing • Supply Chain • MRO' },
                      { layer: 'Layer 4', name: 'Cyber-Physical', desc: 'IoT • Edge Computing • Sensors' },
                      { layer: 'Layer 3', name: 'AI/ML Cognitive', desc: 'WIR Framework • Neural Networks' },
                      { layer: 'Layer 2', name: 'Aerospace Integration', desc: 'Flight Systems • Avionics • Control' },
                      { layer: 'Layer 1', name: 'Quantum Enhancement', desc: 'QPU • Algorithms • Entanglement' }
                    ].map((item) => (
                      <div key={item.layer} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="w-16 text-sm font-medium text-primary">{item.layer}</div>
                        <div className="flex-1">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gear size={20} />
                Concept of Operations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p>
                  AQUA V. operates as an integrated ecosystem where quantum-enhanced capabilities augment every aspect of aerospace operations, from design and manufacturing to flight operations and maintenance.
                </p>
                <h4>Key Operational Principles</h4>
                <ul>
                  <li><strong>Quantum-First Design:</strong> Leverage quantum advantages wherever applicable</li>
                  <li><strong>Hybrid Processing:</strong> Seamless integration of quantum and classical computing</li>
                  <li><strong>Autonomous Operations:</strong> AI-driven decision-making with human oversight</li>
                  <li><strong>Continuous Optimization:</strong> Real-time system improvement through machine learning</li>
                  <li><strong>Secure by Design:</strong> Quantum-secured communications and data protection</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: Cube,
                title: 'AMPEL360',
                subtitle: 'Advanced Mobility Platform',
                description: 'Blended Wing Body aircraft with quantum-enhanced systems',
                items: ['BWB-Q100 (120-180 pax)', 'BWB-Q250 (220-300 pax)', 'eVTOL systems']
              },
              {
                icon: Rocket,
                title: 'GAIA AIR & SPACE',
                subtitle: 'Unmanned Systems',
                description: 'Autonomous aerial and space systems portfolio',
                items: ['Military UAVs', 'Cargo drones', 'Satellite systems']
              },
              {
                icon: Gear,
                title: 'ROBBBO-T',
                subtitle: 'Robotic Systems',
                description: 'Advanced robotics for manufacturing and operations',
                items: ['Assembly robots', 'Quality control', 'Space robotics']
              },
              {
                icon: Brain,
                title: 'QUANTUM',
                subtitle: 'Technology Foundation',
                description: 'Quantum computing and security infrastructure',
                items: ['Quantum processors', 'QKD systems', 'Quantum software']
              }
            ].map((product) => (
              <Card key={product.title}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <product.icon size={20} />
                    {product.title}
                  </CardTitle>
                  <CardDescription>{product.subtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">{product.description}</p>
                  <ul className="text-sm space-y-1">
                    {product.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quantum" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain size={20} />
                Quantum Engineering
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Quantum Hardware Stack</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse border border-gray-200">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-200 p-2 text-left">Layer</th>
                          <th className="border border-gray-200 p-2 text-left">Component</th>
                          <th className="border border-gray-200 p-2 text-left">Technology</th>
                          <th className="border border-gray-200 p-2 text-left">Specifications</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ['Physical', 'Qubits', 'Superconducting/Trapped Ion', '50-1000 qubits'],
                          ['Control', 'Quantum Gates', 'Microwave/Laser', '99.9% fidelity'],
                          ['Error Correction', 'QEC Codes', 'Surface/Topological', '<10⁻⁹ error rate'],
                          ['Logical', 'Logical Qubits', 'Encoded', '10-100 logical'],
                          ['Application', 'Algorithms', 'QAOA/VQE/QML', 'Production ready']
                        ].map((row, index) => (
                          <tr key={index}>
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} className="border border-gray-200 p-2">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartLine size={20} />
                Business Architecture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Revenue Projections (€ Billions)</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse border border-gray-200">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-200 p-2 text-left">Year</th>
                          <th className="border border-gray-200 p-2 text-left">AMPEL360</th>
                          <th className="border border-gray-200 p-2 text-left">GAIA</th>
                          <th className="border border-gray-200 p-2 text-left">ROBBBO-T</th>
                          <th className="border border-gray-200 p-2 text-left">QUANTUM</th>
                          <th className="border border-gray-200 p-2 text-left">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ['2030', '1.0', '2.0', '0.5', '0.5', '4.0'],
                          ['2035', '10.0', '8.0', '3.0', '2.0', '23.0'],
                          ['2040', '40.0', '15.0', '10.0', '5.0', '70.0'],
                          ['2045', '90.0', '25.0', '18.0', '11.0', '144.0'],
                          ['2050', '150.0', '40.0', '30.0', '20.0', '240.0']
                        ].map((row, index) => (
                          <tr key={index}>
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} className={`border border-gray-200 p-2 ${cellIndex === 0 ? 'font-medium' : ''} ${cellIndex === row.length - 1 ? 'font-bold' : ''}`}>
                                {cellIndex === 0 ? cell : `€${cell}B`}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Document Footer */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>© 2025 AQUA V. - All Rights Reserved</div>
            <div>Document ID: AQUART-OPS-SC-POL-STD-DC-PA-DTL-RDIG0-30600000001-MUL-v12.3.1</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}