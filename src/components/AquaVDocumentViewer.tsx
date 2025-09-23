import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { 
  Rocket, Target, Gear, Cube, Brain, ChartLine, Shield, Users, Clock, 
  Lightning, Globe, Database, FlowArrow, TreeStructure, ChartPieSlice,
  Download, Share, Eye, Copy, Airplane, Hash, FileText
} from '@phosphor-icons/react'

export default function AquaVDocumentViewer() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="p-4 bg-gradient-to-br from-primary to-accent rounded-xl">
            <Airplane size={48} className="text-primary-foreground" />
          </div>
          <div className="text-left">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AQUA V.
            </h1>
            <p className="text-lg text-muted-foreground">Aerospace & Quantum United Advanced Venture</p>
            <p className="text-sm text-accent font-medium">Flying Fluidity • Agua que Vuela</p>
          </div>
        </div>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Revolutionary integration of quantum computing, artificial intelligence, and cyber-physical systems 
            transforming aerospace through quantum-enhanced capabilities.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            v2.0.0-UNIFIED
          </Badge>
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            APPROVED
          </Badge>
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            €144B Revenue Target by 2045
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Target size={32} className="mx-auto text-primary mb-2" />
            <div className="text-2xl font-bold">4</div>
            <div className="text-sm text-muted-foreground">Product Lines</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Globe size={32} className="mx-auto text-green-600 mb-2" />
            <div className="text-2xl font-bold">6</div>
            <div className="text-sm text-muted-foreground">Global Facilities</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Lightning size={32} className="mx-auto text-orange-600 mb-2" />
            <div className="text-2xl font-bold">1000+</div>
            <div className="text-sm text-muted-foreground">Qubits Target</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Users size={32} className="mx-auto text-purple-600 mb-2" />
            <div className="text-2xl font-bold">15,000</div>
            <div className="text-sm text-muted-foreground">Employees by 2050</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Document Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="strategic">Strategic</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="quantum">Quantum</TabsTrigger>
          <TabsTrigger value="ai">AI/ML</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket size={24} />
                Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                AQUA V. represents a paradigm shift in aerospace technology through the revolutionary integration 
                of quantum computing, artificial intelligence, and cyber-physical systems. This comprehensive 
                framework targets €144 billion in annual revenue by 2045 and market leadership by 2050.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">Vision Statement</h4>
                  <p className="text-sm text-muted-foreground italic bg-muted/50 p-3 rounded-lg">
                    "Transforming aerospace through quantum-enhanced intelligence, creating a convergent 
                    platform where quantum computing, artificial intelligence, and cyber-physical systems 
                    unite to redefine the boundaries of flight and space exploration."
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">Strategic Objectives</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 2025-2027: Establish quantum computing foundation</li>
                    <li>• 2028-2032: Deploy first products, validate market</li>
                    <li>• 2033-2040: Scale production, achieve leadership</li>
                    <li>• 2041-2050: Consolidate global market position</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TreeStructure size={24} />
                Six-Layer Architecture Model
              </CardTitle>
              <CardDescription>
                Foundational framework integrating quantum, AI, and cyber-physical systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { layer: 6, name: "Business Intelligence", description: "Analytics • ROI • Strategic Decisions", color: "bg-green-100 text-green-800" },
                  { layer: 5, name: "Digital-Industrial", description: "Manufacturing • Supply Chain • MRO", color: "bg-blue-100 text-blue-800" },
                  { layer: 4, name: "Cyber-Physical", description: "IoT • Edge Computing • Sensors", color: "bg-purple-100 text-purple-800" },
                  { layer: 3, name: "AI/ML Cognitive", description: "WIR Framework • Neural Networks", color: "bg-orange-100 text-orange-800" },
                  { layer: 2, name: "Aerospace Integration", description: "Flight Systems • Avionics • Control", color: "bg-yellow-100 text-yellow-800" },
                  { layer: 1, name: "Quantum Enhancement", description: "QPU • Algorithms • Entanglement", color: "bg-pink-100 text-pink-800" }
                ].map((layer) => (
                  <div key={layer.layer} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/50">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-bold text-primary">L{layer.layer}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{layer.name}</div>
                      <div className="text-sm text-muted-foreground">{layer.description}</div>
                    </div>
                    <Badge variant="outline" className={layer.color}>
                      Layer {layer.layer}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategic" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target size={24} />
                  Strategic Framework
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-primary">Foundation (2025-2027)</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Quantum simulator development</li>
                      <li>• Core IP establishment</li>
                      <li>• Initial team building</li>
                      <li>• Technology validation</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-primary">Validation (2028-2032)</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• First product deliveries</li>
                      <li>• Market proof points</li>
                      <li>• Strategic partnerships</li>
                      <li>• Scale preparation</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-primary">Leadership (2041-2050)</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Market dominance</li>
                      <li>• €144B revenue target</li>
                      <li>• Industry standard setting</li>
                      <li>• Global expansion</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield size={24} />
                  Core Principles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Quantum-First Design", description: "Leverage quantum advantages wherever applicable" },
                    { title: "Hybrid Processing", description: "Seamless integration of quantum and classical computing" },
                    { title: "Autonomous Operations", description: "AI-driven decision-making with human oversight" },
                    { title: "Continuous Optimization", description: "Real-time system improvement through machine learning" },
                    { title: "Secure by Design", description: "Quantum-secured communications and data protection" },
                    { title: "Sustainable Innovation", description: "Environmentally conscious technology development" }
                  ].map((principle, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="font-medium mb-1">{principle.title}</div>
                      <div className="text-sm text-muted-foreground">{principle.description}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <div className="grid gap-6">
            {[
              {
                name: "AMPEL360",
                description: "Advanced Mobility Platform",
                icon: Airplane,
                color: "bg-blue-100 text-blue-800",
                products: [
                  { name: "BWB-Q100", spec: "120-180 pax, 5,000 nm, H₂ Fuel Cell", status: "2030 Certification" },
                  { name: "BWB-Q250", spec: "220-300 pax, 7,500 nm, H₂ Electric", status: "2032 Certification" },
                  { name: "eVTOL CITY", spec: "2-6 pax, 100 km, 200 km/h", status: "Urban Mobility" },
                  { name: "eVTOL METR", spec: "8-12 pax, 250 km, 250 km/h", status: "Regional Mobility" }
                ]
              },
              {
                name: "GAIA AIR & SPACE",
                description: "Unmanned Systems",
                icon: Rocket,
                color: "bg-green-100 text-green-800",
                products: [
                  { name: "UAV TACT", spec: "48h endurance, 500kg payload", status: "Military Applications" },
                  { name: "UAV CARG", spec: "24h endurance, 2,000kg payload", status: "Cargo Operations" },
                  { name: "SAT QNET", spec: "LEO Quantum Network", status: "2029 Deployment" },
                  { name: "SAT EOBS", spec: "Earth Observation", status: "2029 Launch" }
                ]
              },
              {
                name: "ROBBBO-T",
                description: "Robotic Systems",
                icon: Gear,
                color: "bg-purple-100 text-purple-800",
                products: [
                  { name: "Factory Assembly", spec: "1000 units/day, ±0.01mm accuracy", status: "Production Ready" },
                  { name: "Quality Control", spec: "10,000 checks/hr, 99.99% accuracy", status: "AI Integration" },
                  { name: "Space Robotics", spec: "EVA and Station Operations", status: "Development" },
                  { name: "Maintenance Robots", spec: "Aircraft MRO automation", status: "Testing" }
                ]
              },
              {
                name: "QUANTUM",
                description: "Technology Foundation",
                icon: Brain,
                color: "bg-pink-100 text-pink-800",
                products: [
                  { name: "QPU DESK", spec: "50-100 qubits, Office deployment", status: "Development" },
                  { name: "QPU RACK", spec: "100-500 qubits, Production use", status: "Testing" },
                  { name: "QPU DATA", spec: "500-1000 qubits, Enterprise", status: "Research" },
                  { name: "QKD Systems", spec: "Quantum key distribution", status: "Production" }
                ]
              }
            ].map((productLine) => (
              <Card key={productLine.name}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <productLine.icon size={24} />
                    {productLine.name}
                  </CardTitle>
                  <CardDescription>{productLine.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {productLine.products.map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground">{product.spec}</div>
                        </div>
                        <Badge variant="outline" className={productLine.color}>
                          {product.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quantum" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain size={24} />
                Quantum Computing Architecture
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-4">Quantum Hardware Stack</h4>
                <div className="space-y-3">
                  {[
                    { layer: "Physical", component: "Qubits", tech: "Superconducting/Trapped Ion", spec: "50-1000 qubits" },
                    { layer: "Control", component: "Quantum Gates", tech: "Microwave/Laser", spec: "99.9% fidelity" },
                    { layer: "Error Correction", component: "QEC Codes", tech: "Surface/Topological", spec: "<10⁻⁹ error rate" },
                    { layer: "Logical", component: "Logical Qubits", tech: "Encoded", spec: "10-100 logical" },
                    { layer: "Application", component: "Algorithms", tech: "QAOA/VQE/QML", spec: "Production ready" }
                  ].map((layer, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-white/50 rounded border">
                      <div className="w-16 text-sm font-medium">{layer.layer}</div>
                      <div className="flex-1">
                        <div className="font-medium">{layer.component}</div>
                        <div className="text-sm text-muted-foreground">{layer.tech}</div>
                      </div>
                      <Badge variant="outline">{layer.spec}</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">Quantum Advantages</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 10,000x speedup for optimization problems</li>
                    <li>• Exponential scaling for certain algorithms</li>
                    <li>• Quantum supremacy in specific domains</li>
                    <li>• Enhanced security through QKD</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-primary">Applications</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Fleet optimization (1000+ aircraft)</li>
                    <li>• Predictive maintenance</li>
                    <li>• Route planning and scheduling</li>
                    <li>• Materials simulation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartLine size={24} />
                Financial Projections
              </CardTitle>
              <CardDescription>Revenue projections in billions of euros</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Year</th>
                        <th className="text-left p-2">AMPEL360</th>
                        <th className="text-left p-2">GAIA</th>
                        <th className="text-left p-2">ROBBBO-T</th>
                        <th className="text-left p-2">QUANTUM</th>
                        <th className="text-left p-2 font-bold">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { year: 2030, ampel: 1.0, gaia: 2.0, robbbo: 0.5, quantum: 0.5, total: 4.0 },
                        { year: 2035, ampel: 10.0, gaia: 8.0, robbbo: 3.0, quantum: 2.0, total: 23.0 },
                        { year: 2040, ampel: 40.0, gaia: 15.0, robbbo: 10.0, quantum: 5.0, total: 70.0 },
                        { year: 2045, ampel: 90.0, gaia: 25.0, robbbo: 18.0, quantum: 11.0, total: 144.0 },
                        { year: 2050, ampel: 150.0, gaia: 40.0, robbbo: 30.0, quantum: 20.0, total: 240.0 }
                      ].map((row) => (
                        <tr key={row.year} className="border-b hover:bg-muted/50">
                          <td className="p-2 font-medium">{row.year}</td>
                          <td className="p-2">€{row.ampel}B</td>
                          <td className="p-2">€{row.gaia}B</td>
                          <td className="p-2">€{row.robbbo}B</td>
                          <td className="p-2">€{row.quantum}B</td>
                          <td className="p-2 font-bold text-primary">€{row.total}B</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlowArrow size={24} />
                Technology Development Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { 
                    period: "2025-2027 Foundation",
                    items: ["Quantum Simulator", "AI Framework", "Prototype Development"],
                    color: "bg-blue-100 text-blue-800"
                  },
                  { 
                    period: "2028-2032 Integration",
                    items: ["First Deliveries", "Quantum Integration", "Market Validation"],
                    color: "bg-green-100 text-green-800"
                  },
                  { 
                    period: "2033-2040 Expansion",
                    items: ["Commercial Operations", "Global Expansion", "IPO Execution"],
                    color: "bg-orange-100 text-orange-800"
                  },
                  { 
                    period: "2041-2050 Leadership",
                    items: ["Market Leadership", "€144B Revenue", "Industry Standard"],
                    color: "bg-purple-100 text-purple-800"
                  }
                ].map((phase, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{index + 1}</span>
                    </div>
                    <div className="flex-1 space-y-2">
                      <Badge variant="outline" className={phase.color}>
                        {phase.period}
                      </Badge>
                      <div className="flex flex-wrap gap-2">
                        {phase.items.map((item, itemIndex) => (
                          <Badge key={itemIndex} variant="secondary" className="text-xs">
                            {item}
                          </Badge>
                        ))}
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
      <div className="flex items-center justify-center gap-4 pt-8">
        <Button size="lg">
          <Download size={20} className="mr-2" />
          Download Full Document
        </Button>
        <Button variant="outline" size="lg">
          <Share size={20} className="mr-2" />
          Share Document
        </Button>
        <Button variant="outline" size="lg">
          <Eye size={20} className="mr-2" />
          View in XR Mode
        </Button>
      </div>
    </div>
  )
}