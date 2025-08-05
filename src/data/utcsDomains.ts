/**
 * UTCS Domain Classification Table
 * Based on AMPEL360 UTCS-Optimized Identification Coding Standard
 * 
 * Format: Domain Code (YYYZZZ) -> Description
 */

export interface UTCSDomain {
  code: string
  domain: string
  category: string
  description: string
  examples?: string[]
}

export const DOMAIN_TABLE: Record<string, string> = {
  // 000-099: Aero (ATA-aligned)
  '024500': 'Aero · Electrical Power System',
  '024510': 'Aero · Electrical Power Distribution',
  '024520': 'Aero · Electrical Power Generation',
  '027210': 'Aero · Flight Control System',
  '027220': 'Aero · Primary Flight Controls',
  '027230': 'Aero · Secondary Flight Controls',
  '028100': 'Aero · Fuel System',
  '028110': 'Aero · Fuel Storage',
  '028120': 'Aero · Fuel Distribution',
  '032100': 'Aero · Landing Gear System',
  '032110': 'Aero · Main Landing Gear',
  '032120': 'Aero · Nose Landing Gear',
  '036100': 'Aero · Pneumatic System',
  '036110': 'Aero · Bleed Air System',
  '036120': 'Aero · Cabin Pressurization',
  
  // 100-199: Space
  '171502': 'Space · Thermal Protection System',
  '171510': 'Space · Heat Shields',
  '171520': 'Space · Thermal Blankets',
  '190100': 'Space · Life Support System',
  '190110': 'Space · Oxygen Generation',
  '190120': 'Space · CO2 Scrubbing',
  '120100': 'Space · Propulsion System',
  '120110': 'Space · Chemical Propulsion',
  '120120': 'Space · Electric Propulsion',
  '150100': 'Space · Guidance Navigation Control',
  '150110': 'Space · Star Trackers',
  '150120': 'Space · Gyroscopes',
  
  // 200-299: Defense
  '210100': 'Defense · Weapon Systems',
  '210110': 'Defense · Missile Systems',
  '210120': 'Defense · Gun Systems',
  '250100': 'Defense · Countermeasures',
  '250110': 'Defense · Electronic Warfare',
  '250120': 'Defense · Chaff/Flare Systems',
  '230100': 'Defense · Radar Systems',
  '230110': 'Defense · Surveillance Radar',
  '230120': 'Defense · Fire Control Radar',
  
  // 300-399: Digital/Software
  '310015': 'Digital · Flight Management System',
  '310020': 'Digital · Navigation System',
  '310025': 'Digital · Autopilot System',
  '350100': 'Digital · Data Analytics Platform',
  '350110': 'Digital · Real-time Analytics',
  '350120': 'Digital · Predictive Analytics',
  '320100': 'Digital · Communication System',
  '320110': 'Digital · Voice Communication',
  '320120': 'Digital · Data Communication',
  '330100': 'Digital · Display System',
  '330110': 'Digital · Primary Flight Display',
  '330120': 'Digital · Multi-function Display',
  
  // 400-499: Energy & Propulsion
  '431210': 'Energy · Electric Propulsion System',
  '431220': 'Energy · Electric Motor System',
  '431230': 'Energy · Power Electronics',
  '440100': 'Energy · Fuel Cell System',
  '440110': 'Energy · Hydrogen Fuel Cells',
  '440120': 'Energy · Direct Methanol Fuel Cells',
  '410100': 'Energy · Battery System',
  '410110': 'Energy · Lithium-ion Batteries',
  '410120': 'Energy · Solid-state Batteries',
  '420100': 'Energy · Hybrid Propulsion',
  '420110': 'Energy · Turbo-electric',
  '420120': 'Energy · Series Hybrid',
  
  // 500-599: Advanced Materials
  '510100': 'Materials · Composite Structures',
  '510110': 'Materials · Carbon Fiber Composites',
  '510120': 'Materials · Glass Fiber Composites',
  '550100': 'Materials · Metamaterials',
  '550110': 'Materials · Electromagnetic Metamaterials',
  '550120': 'Materials · Acoustic Metamaterials',
  '520100': 'Materials · Smart Materials',
  '520110': 'Materials · Shape Memory Alloys',
  '520120': 'Materials · Piezoelectric Materials',
  '040102': 'Materials · Structural Health Monitoring',
  '040110': 'Materials · Strain Sensors',
  '040120': 'Materials · Damage Detection',
  
  // 600-699: Robotics & Automation
  '610100': 'Robotics · Industrial Robot System',
  '610110': 'Robotics · Assembly Robot',
  '610120': 'Robotics · Welding Robot',
  '650100': 'Robotics · Maintenance Robot System',
  '650110': 'Robotics · Aircraft MRO Robot',
  '650120': 'Robotics · Engine MRO Robot',
  '630100': 'Robotics · Space Robot System',
  '630110': 'Robotics · EVA Robot',
  '630120': 'Robotics · Construction Robot',
  '640100': 'Robotics · Exploration Robot',
  '640110': 'Robotics · Deep-sea Robot',
  '640120': 'Robotics · Planetary Robot',
  
  // 700-799: Autonomous Air Mobility
  '710100': 'AAM · UTM System',
  '710110': 'AAM · Traffic Management',
  '710120': 'AAM · Conflict Resolution',
  '750100': 'AAM · Vertiport System',
  '750110': 'AAM · Landing Platform',
  '750120': 'AAM · Charging Infrastructure',
  '720100': 'AAM · VTOL Flight Control',
  '720110': 'AAM · Tilt-wing Control',
  '720120': 'AAM · Multi-rotor Control',
  '730100': 'AAM · Autonomous Navigation',
  '730110': 'AAM · SLAM Navigation',
  '730120': 'AAM · Vision-based Navigation',
  
  // 800-899: Cybersecurity
  '810100': 'Security · Encryption System',
  '810110': 'Security · Symmetric Encryption',
  '810120': 'Security · Asymmetric Encryption',
  '850100': 'Security · Intrusion Detection',
  '850110': 'Security · Network IDS',
  '850120': 'Security · Host-based IDS',
  '820100': 'Security · Authentication System',
  '820110': 'Security · Multi-factor Auth',
  '820120': 'Security · Biometric Auth',
  '830100': 'Security · Secure Communication',
  '830110': 'Security · VPN System',
  '830120': 'Security · Secure Messaging',
  
  // 900-999: Quantum
  '090101': 'Quantum · Quantum Navigation System',
  '090110': 'Quantum · Quantum Gyroscope',
  '090120': 'Quantum · Quantum Accelerometer',
  '910100': 'Quantum · Quantum Computing System',
  '910110': 'Quantum · Gate-based Quantum Computer',
  '910120': 'Quantum · Annealing Quantum Computer',
  '950100': 'Quantum · Quantum Sensor System',
  '950110': 'Quantum · Quantum Magnetometer',
  '950120': 'Quantum · Quantum Gravimeter',
  '920100': 'Quantum · Quantum Communication',
  '920110': 'Quantum · Quantum Key Distribution',
  '920120': 'Quantum · Quantum Internet',
  '930100': 'Quantum · Quantum Cryptography',
  '930110': 'Quantum · Post-quantum Cryptography',
  '930120': 'Quantum · Quantum Random Number Gen',
  '940100': 'Quantum · Quantum Optimization',
  '940110': 'Quantum · QAOA Algorithms',
  '940120': 'Quantum · VQE Algorithms'
}

export const DOMAINS_BY_CATEGORY = {
  'Aero': Object.entries(DOMAIN_TABLE).filter(([_, desc]) => desc.startsWith('Aero')),
  'Space': Object.entries(DOMAIN_TABLE).filter(([_, desc]) => desc.startsWith('Space')),
  'Defense': Object.entries(DOMAIN_TABLE).filter(([_, desc]) => desc.startsWith('Defense')),
  'Digital': Object.entries(DOMAIN_TABLE).filter(([_, desc]) => desc.startsWith('Digital')),
  'Energy': Object.entries(DOMAIN_TABLE).filter(([_, desc]) => desc.startsWith('Energy')),
  'Materials': Object.entries(DOMAIN_TABLE).filter(([_, desc]) => desc.startsWith('Materials')),
  'Robotics': Object.entries(DOMAIN_TABLE).filter(([_, desc]) => desc.startsWith('Robotics')),
  'AAM': Object.entries(DOMAIN_TABLE).filter(([_, desc]) => desc.startsWith('AAM')),
  'Security': Object.entries(DOMAIN_TABLE).filter(([_, desc]) => desc.startsWith('Security')),
  'Quantum': Object.entries(DOMAIN_TABLE).filter(([_, desc]) => desc.startsWith('Quantum'))
}

/**
 * Get domain info by code
 */
export function getDomainInfo(code: string): UTCSDomain | null {
  const description = DOMAIN_TABLE[code]
  if (!description) return null
  
  const [domain, category] = description.split(' · ')
  return {
    code,
    domain,
    category,
    description
  }
}

/**
 * Search domains by keyword
 */
export function searchDomains(query: string): UTCSDomain[] {
  const results: UTCSDomain[] = []
  const queryLower = query.toLowerCase()
  
  for (const [code, description] of Object.entries(DOMAIN_TABLE)) {
    if (description.toLowerCase().includes(queryLower) || code.includes(query)) {
      const domainInfo = getDomainInfo(code)
      if (domainInfo) {
        results.push(domainInfo)
      }
    }
  }
  
  return results
}