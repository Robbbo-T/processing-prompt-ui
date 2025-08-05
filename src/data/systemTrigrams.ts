/**
 * System/Technology Trigrams Registry
 * Based on AMPEL360 UTCS-Optimized Identification Coding Standard
 * 
 * 3-letter codes for registered technology families and systems
 */

export interface SystemTrigram {
  code: string
  name: string
  family: string
  description: string
  domains: string[]
  common: boolean
  status: 'active' | 'deprecated' | 'proposed'
  examples?: string[]
  lastModified: string
}

export const SYSTEM_TRIGRAMS: Record<string, SystemTrigram> = {
  // Quantum Systems
  'QNS': {
    code: 'QNS',
    name: 'Quantum Navigation System',
    family: 'Quantum Navigation',
    description: 'Quantum-enhanced inertial navigation and positioning',
    domains: ['900-Quantum', '300-Digital'],
    common: true,
    status: 'active',
    examples: ['Quantum gyroscopes', 'Quantum accelerometers', 'Atomic interferometry'],
    lastModified: '2025-01-01'
  },
  'QSH': {
    code: 'QSH',
    name: 'Quantum Structural Health',
    family: 'Quantum Sensing',
    description: 'Quantum sensors for structural health monitoring',
    domains: ['900-Quantum', '500-Materials'],
    common: false,
    status: 'active',
    examples: ['Quantum strain sensors', 'NV diamond sensors'],
    lastModified: '2025-01-01'
  },
  'QCS': {
    code: 'QCS',
    name: 'Quantum Computing System',
    family: 'Quantum Computing',
    description: 'Quantum processing and computation systems',
    domains: ['900-Quantum', '300-Digital'],
    common: true,
    status: 'active',
    examples: ['Gate-based quantum computers', 'Quantum annealers'],
    lastModified: '2025-01-01'
  },
  'QKD': {
    code: 'QKD',
    name: 'Quantum Key Distribution',
    family: 'Quantum Security',
    description: 'Quantum-secured communication and encryption',
    domains: ['900-Quantum', '800-Security'],
    common: true,
    status: 'active',
    examples: ['BB84 protocol', 'Continuous variable QKD'],
    lastModified: '2025-01-01'
  },
  'QSN': {
    code: 'QSN',
    name: 'Quantum Sensor Network',
    family: 'Quantum Sensing',
    description: 'Distributed quantum sensor systems',
    domains: ['900-Quantum'],
    common: false,
    status: 'active',
    examples: ['Quantum magnetometer arrays', 'Quantum gravity networks'],
    lastModified: '2025-01-01'
  },
  'QML': {
    code: 'QML',
    name: 'Quantum Machine Learning',
    family: 'Quantum Computing',
    description: 'Machine learning algorithms on quantum hardware',
    domains: ['900-Quantum', '300-Digital'],
    common: false,
    status: 'active',
    examples: ['VQE algorithms', 'QAOA optimization'],
    lastModified: '2025-01-01'
  },

  // Electric and Hybrid Propulsion
  'EPS': {
    code: 'EPS',
    name: 'Electric Propulsion System',
    family: 'Electric Propulsion',
    description: 'All-electric propulsion and power systems',
    domains: ['400-Energy', '000-Aero'],
    common: true,
    status: 'active',
    examples: ['Electric motors', 'Power electronics', 'Battery systems'],
    lastModified: '2025-01-01'
  },
  'HPS': {
    code: 'HPS',
    name: 'Hybrid Propulsion System',
    family: 'Hybrid Propulsion',
    description: 'Hybrid electric-combustion propulsion',
    domains: ['400-Energy', '000-Aero'],
    common: true,
    status: 'active',
    examples: ['Turbo-electric', 'Series hybrid', 'Parallel hybrid'],
    lastModified: '2025-01-01'
  },
  'FCS': {
    code: 'FCS',
    name: 'Fuel Cell System',
    family: 'Energy Systems',
    description: 'Hydrogen and methanol fuel cell systems',
    domains: ['400-Energy'],
    common: false,
    status: 'active',
    examples: ['PEM fuel cells', 'SOFC systems'],
    lastModified: '2025-01-01'
  },
  'BMS': {
    code: 'BMS',
    name: 'Battery Management System',
    family: 'Energy Systems',
    description: 'Advanced battery management and thermal control',
    domains: ['400-Energy'],
    common: true,
    status: 'active',
    examples: ['Li-ion management', 'Solid-state batteries'],
    lastModified: '2025-01-01'
  },

  // Digital and Software Systems
  'FMS': {
    code: 'FMS',
    name: 'Flight Management System',
    family: 'Flight Systems',
    description: 'Automated flight planning and execution',
    domains: ['300-Digital', '000-Aero'],
    common: true,
    status: 'active',
    examples: ['Autopilot', 'Flight planning', 'Navigation'],
    lastModified: '2025-01-01'
  },
  'ACS': {
    code: 'ACS',
    name: 'Autonomous Control System',
    family: 'Autonomous Systems',
    description: 'Autonomous operation and decision making',
    domains: ['300-Digital', '700-AAM'],
    common: true,
    status: 'active',
    examples: ['Path planning', 'Obstacle avoidance', 'Mission execution'],
    lastModified: '2025-01-01'
  },
  'DAT': {
    code: 'DAT',
    name: 'Data Analytics Platform',
    family: 'Data Systems',
    description: 'Real-time and predictive data analytics',
    domains: ['300-Digital'],
    common: true,
    status: 'active',
    examples: ['Predictive maintenance', 'Performance optimization'],
    lastModified: '2025-01-01'
  },
  'COM': {
    code: 'COM',
    name: 'Communication System',
    family: 'Communication',
    description: 'Voice and data communication systems',
    domains: ['300-Digital', '000-Aero'],
    common: true,
    status: 'active',
    examples: ['Radio systems', 'Satellite communication', 'Data links'],
    lastModified: '2025-01-01'
  },
  'DSP': {
    code: 'DSP',
    name: 'Display System',
    family: 'Human Interface',
    description: 'Cockpit and cabin display systems',
    domains: ['300-Digital', '000-Aero'],
    common: true,
    status: 'active',
    examples: ['Primary flight display', 'Multi-function display'],
    lastModified: '2025-01-01'
  },

  // Advanced Materials and Structures
  'STR': {
    code: 'STR',
    name: 'Primary Structure',
    family: 'Structural Systems',
    description: 'Primary structural components and assemblies',
    domains: ['500-Materials', '000-Aero'],
    common: true,
    status: 'active',
    examples: ['Composite structures', 'Metallic structures'],
    lastModified: '2025-01-01'
  },
  'SHM': {
    code: 'SHM',
    name: 'Structural Health Monitoring',
    family: 'Smart Materials',
    description: 'Real-time structural condition monitoring',
    domains: ['500-Materials', '300-Digital'],
    common: false,
    status: 'active',
    examples: ['Strain sensors', 'Damage detection', 'Fatigue monitoring'],
    lastModified: '2025-01-01'
  },
  'MMT': {
    code: 'MMT',
    name: 'Metamaterial Technology',
    family: 'Advanced Materials',
    description: 'Engineered metamaterial systems',
    domains: ['500-Materials'],
    common: false,
    status: 'active',
    examples: ['Electromagnetic metamaterials', 'Acoustic metamaterials'],
    lastModified: '2025-01-01'
  },
  'SMA': {
    code: 'SMA',
    name: 'Smart Material Actuator',
    family: 'Smart Materials',
    description: 'Shape memory and piezoelectric actuators',
    domains: ['500-Materials'],
    common: false,
    status: 'active',
    examples: ['Shape memory alloys', 'Piezoelectric actuators'],
    lastModified: '2025-01-01'
  },

  // Robotics and Automation
  'ROB': {
    code: 'ROB',
    name: 'Robotic System',
    family: 'Robotics',
    description: 'General robotic manipulation and control',
    domains: ['600-Robotics'],
    common: true,
    status: 'active',
    examples: ['Industrial robots', 'Service robots'],
    lastModified: '2025-01-01'
  },
  'MRO': {
    code: 'MRO',
    name: 'Maintenance Robot',
    family: 'Maintenance Robotics',
    description: 'Automated maintenance, repair, and overhaul',
    domains: ['600-Robotics', '000-Aero'],
    common: false,
    status: 'active',
    examples: ['Aircraft MRO', 'Engine maintenance', 'Component repair'],
    lastModified: '2025-01-01'
  },
  'EVA': {
    code: 'EVA',
    name: 'EVA Robot System',
    family: 'Space Robotics',
    description: 'Extra-vehicular activity robotics',
    domains: ['600-Robotics', '100-Space'],
    common: false,
    status: 'active',
    examples: ['Space station maintenance', 'Satellite servicing'],
    lastModified: '2025-01-01'
  },
  'EXP': {
    code: 'EXP',
    name: 'Exploration Robot',
    family: 'Exploration Robotics',
    description: 'Autonomous exploration systems',
    domains: ['600-Robotics'],
    common: false,
    status: 'active',
    examples: ['Planetary rovers', 'Deep-sea exploration', 'Cave exploration'],
    lastModified: '2025-01-01'
  },

  // Cybersecurity
  'SEC': {
    code: 'SEC',
    name: 'Security System',
    family: 'Cybersecurity',
    description: 'General cybersecurity and protection systems',
    domains: ['800-Security'],
    common: true,
    status: 'active',
    examples: ['Firewalls', 'Intrusion detection', 'Access control'],
    lastModified: '2025-01-01'
  },
  'ENC': {
    code: 'ENC',
    name: 'Encryption System',
    family: 'Cryptography',
    description: 'Classical and post-quantum encryption',
    domains: ['800-Security'],
    common: true,
    status: 'active',
    examples: ['AES encryption', 'RSA', 'Post-quantum crypto'],
    lastModified: '2025-01-01'
  },
  'IDS': {
    code: 'IDS',
    name: 'Intrusion Detection System',
    family: 'Threat Detection',
    description: 'Network and host-based intrusion detection',
    domains: ['800-Security'],
    common: false,
    status: 'active',
    examples: ['Network monitoring', 'Anomaly detection'],
    lastModified: '2025-01-01'
  },
  'AUTH': {
    code: 'AUTH',
    name: 'Authentication System',
    family: 'Identity Management',
    description: 'Multi-factor authentication and identity verification',
    domains: ['800-Security'],
    common: true,
    status: 'active',
    examples: ['Biometric auth', 'Smart cards', 'PKI'],
    lastModified: '2025-01-01'
  },

  // Traditional Aerospace Systems
  'HYD': {
    code: 'HYD',
    name: 'Hydraulic Power System',
    family: 'Hydraulic Systems',
    description: 'Hydraulic power generation and distribution',
    domains: ['000-Aero'],
    common: true,
    status: 'active',
    examples: ['Engine-driven pumps', 'Electric pumps', 'Reservoirs'],
    lastModified: '2025-01-01'
  },
  'FUEL': {
    code: 'FUEL',
    name: 'Fuel System',
    family: 'Fuel Systems',
    description: 'Fuel storage, distribution, and management',
    domains: ['000-Aero'],
    common: true,
    status: 'active',
    examples: ['Fuel tanks', 'Fuel pumps', 'Fuel management'],
    lastModified: '2025-01-01'
  },
  'LDG': {
    code: 'LDG',
    name: 'Landing Gear System',
    family: 'Landing Systems',
    description: 'Landing gear and ground handling systems',
    domains: ['000-Aero'],
    common: true,
    status: 'active',
    examples: ['Main gear', 'Nose gear', 'Retraction systems'],
    lastModified: '2025-01-01'
  },
  'PNEU': {
    code: 'PNEU',
    name: 'Pneumatic System',
    family: 'Pneumatic Systems',
    description: 'Compressed air and pneumatic power',
    domains: ['000-Aero'],
    common: true,
    status: 'active',
    examples: ['Bleed air', 'Cabin pressurization', 'Engine starting'],
    lastModified: '2025-01-01'
  },

  // Space Systems
  'TPS': {
    code: 'TPS',
    name: 'Thermal Protection System',
    family: 'Thermal Systems',
    description: 'Spacecraft thermal protection and control',
    domains: ['100-Space'],
    common: false,
    status: 'active',
    examples: ['Heat shields', 'Thermal blankets', 'Radiators'],
    lastModified: '2025-01-01'
  },
  'LSS': {
    code: 'LSS',
    name: 'Life Support System',
    family: 'Life Support',
    description: 'Environmental control and life support',
    domains: ['100-Space'],
    common: false,
    status: 'active',
    examples: ['Oxygen generation', 'CO2 scrubbing', 'Water recycling'],
    lastModified: '2025-01-01'
  },
  'GNC': {
    code: 'GNC',
    name: 'Guidance Navigation Control',
    family: 'Spacecraft Control',
    description: 'Spacecraft guidance, navigation, and control',
    domains: ['100-Space'],
    common: false,
    status: 'active',
    examples: ['Star trackers', 'Gyroscopes', 'Thrusters'],
    lastModified: '2025-01-01'
  },
  'PROP': {
    code: 'PROP',
    name: 'Propulsion System',
    family: 'Space Propulsion',
    description: 'Spacecraft propulsion systems',
    domains: ['100-Space'],
    common: false,
    status: 'active',
    examples: ['Chemical propulsion', 'Electric propulsion', 'Ion drives'],
    lastModified: '2025-01-01'
  },

  // Autonomous Air Mobility
  'UTM': {
    code: 'UTM',
    name: 'UTM System',
    family: 'Air Traffic Management',
    description: 'Unmanned aircraft traffic management',
    domains: ['700-AAM'],
    common: false,
    status: 'active',
    examples: ['Traffic coordination', 'Conflict resolution'],
    lastModified: '2025-01-01'
  },
  'VTP': {
    code: 'VTP',
    name: 'Vertiport System',
    family: 'Infrastructure',
    description: 'Vertical takeoff and landing infrastructure',
    domains: ['700-AAM'],
    common: false,
    status: 'active',
    examples: ['Landing platforms', 'Charging stations'],
    lastModified: '2025-01-01'
  },
  'VTOL': {
    code: 'VTOL',
    name: 'VTOL Flight Control',
    family: 'Vertical Flight',
    description: 'Vertical takeoff and landing control systems',
    domains: ['700-AAM', '000-Aero'],
    common: false,
    status: 'active',
    examples: ['Tilt-wing control', 'Multi-rotor control'],
    lastModified: '2025-01-01'
  },
  'NAV': {
    code: 'NAV',
    name: 'Autonomous Navigation',
    family: 'Navigation',
    description: 'Autonomous navigation and path planning',
    domains: ['700-AAM', '300-Digital'],
    common: true,
    status: 'active',
    examples: ['SLAM', 'Vision-based navigation', 'GPS-denied navigation'],
    lastModified: '2025-01-01'
  }
}

/**
 * Get trigrams by family
 */
export function getTrigramsByFamily(family: string): SystemTrigram[] {
  return Object.values(SYSTEM_TRIGRAMS).filter(trigram => 
    trigram.family.toLowerCase().includes(family.toLowerCase())
  )
}

/**
 * Get trigrams by domain
 */
export function getTrigramsByDomain(domain: string): SystemTrigram[] {
  return Object.values(SYSTEM_TRIGRAMS).filter(trigram => 
    trigram.domains.some(d => d.includes(domain))
  )
}

/**
 * Get common trigrams
 */
export function getCommonTrigrams(): SystemTrigram[] {
  return Object.values(SYSTEM_TRIGRAMS).filter(trigram => trigram.common)
}

/**
 * Search trigrams by keyword
 */
export function searchTrigrams(query: string): SystemTrigram[] {
  const queryLower = query.toLowerCase()
  return Object.values(SYSTEM_TRIGRAMS).filter(trigram =>
    trigram.code.toLowerCase().includes(queryLower) ||
    trigram.name.toLowerCase().includes(queryLower) ||
    trigram.family.toLowerCase().includes(queryLower) ||
    trigram.description.toLowerCase().includes(queryLower)
  )
}

/**
 * Get trigram families
 */
export function getTrigramFamilies(): string[] {
  const families = new Set(Object.values(SYSTEM_TRIGRAMS).map(t => t.family))
  return Array.from(families).sort()
}

/**
 * Suggest trigrams for a product variant
 */
export function suggestTrigramsForVariant(variantCode: string): SystemTrigram[] {
  const suggestions: SystemTrigram[] = []
  
  // Quantum variants
  if (variantCode.includes('Q')) {
    suggestions.push(...getTrigramsByFamily('Quantum'))
  }
  
  // Electric variants
  if (variantCode.includes('EVT') || variantCode.includes('E')) {
    suggestions.push(...getTrigramsByFamily('Electric'))
  }
  
  // Hybrid variants
  if (variantCode.includes('HYB')) {
    suggestions.push(...getTrigramsByFamily('Hybrid'))
  }
  
  // UAV variants
  if (variantCode.includes('UAV')) {
    suggestions.push(...getTrigramsByFamily('Autonomous'))
  }
  
  // Robot variants
  if (variantCode.includes('ROV') || variantCode.includes('FAL') || variantCode.includes('MRO') || variantCode.includes('SPC') || variantCode.includes('EXP')) {
    suggestions.push(...getTrigramsByFamily('Robotics'))
  }
  
  // Space variants
  if (variantCode.includes('SUBS') || variantCode.includes('ORB') || variantCode.includes('SAT')) {
    suggestions.push(...getTrigramsByDomain('100-Space'))
  }
  
  // Always include common trigrams
  suggestions.push(...getCommonTrigrams().slice(0, 3))
  
  // Remove duplicates and limit results
  return suggestions.filter((trigram, index, self) => 
    self.findIndex(t => t.code === trigram.code) === index
  ).slice(0, 10)
}