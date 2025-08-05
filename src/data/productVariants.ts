/**
 * Product Variant Catalogue
 * Based on AMPEL360 UTCS-Optimized Identification Coding Standard
 * 
 * 7-character alphanumeric codes identifying platform, series, size or market segment
 */

export interface ProductVariant {
  code: string
  name: string
  description: string
  type: 'passenger' | 'suborbital' | 'orbital' | 'uav' | 'satellite' | 'rover' | 'drone' | 'robot' | 'quantum'
  category: string
  specifications?: {
    capacity?: string
    range?: string
    payload?: string
    power?: string
    dimensions?: string
  }
  status: 'active' | 'development' | 'discontinued' | 'planned'
  lastModified: string
}

export const PRODUCT_VARIANTS: Record<string, ProductVariant> = {
  // Passenger & Suborbital Aircraft
  'BWBQ100': {
    code: 'BWBQ100',
    name: 'Blended Wing Body Quantum 100',
    description: 'Quantum-enhanced passenger aircraft (120-180 pax)',
    type: 'passenger',
    category: 'Passenger Aircraft',
    specifications: {
      capacity: '120-180 passengers',
      range: '4,500 nm',
      power: 'Hybrid-electric with quantum navigation'
    },
    status: 'development',
    lastModified: '2025-01-01'
  },
  'BWBQ250': {
    code: 'BWBQ250',
    name: 'Blended Wing Body Quantum 250',
    description: 'Large quantum-enhanced passenger aircraft (220-300 pax)',
    type: 'passenger',
    category: 'Passenger Aircraft',
    specifications: {
      capacity: '220-300 passengers',
      range: '6,000 nm',
      power: 'Hybrid-electric with quantum navigation'
    },
    status: 'planned',
    lastModified: '2025-01-01'
  },
  'EVTCITY': {
    code: 'EVTCITY',
    name: 'Electric VTOL City',
    description: 'Urban air mobility vehicle (2-6 pax)',
    type: 'passenger',
    category: 'Advanced Air Mobility',
    specifications: {
      capacity: '2-6 passengers',
      range: '50 nm urban',
      power: 'Full electric VTOL'
    },
    status: 'development',
    lastModified: '2025-01-01'
  },
  'EVTMETR': {
    code: 'EVTMETR',
    name: 'Electric VTOL Metro',
    description: 'Metropolitan air mobility vehicle (8-12 pax)',
    type: 'passenger',
    category: 'Advanced Air Mobility',
    specifications: {
      capacity: '8-12 passengers',
      range: '100 nm metropolitan',
      power: 'Full electric VTOL'
    },
    status: 'development',
    lastModified: '2025-01-01'
  },
  'HYBE180': {
    code: 'HYBE180',
    name: 'Hybrid-Electric 180',
    description: 'Hybrid-electric passenger aircraft (180 pax)',
    type: 'passenger',
    category: 'Passenger Aircraft',
    specifications: {
      capacity: '180 passengers',
      range: '3,000 nm',
      power: 'Turbo-electric hybrid'
    },
    status: 'active',
    lastModified: '2025-01-01'
  },
  'HYBE220': {
    code: 'HYBE220',
    name: 'Hybrid-Electric 220',
    description: 'Large hybrid-electric passenger aircraft (220 pax)',
    type: 'passenger',
    category: 'Passenger Aircraft',
    specifications: {
      capacity: '220 passengers',
      range: '3,500 nm',
      power: 'Turbo-electric hybrid'
    },
    status: 'development',
    lastModified: '2025-01-01'
  },
  'SUBSB01': {
    code: 'SUBSB01',
    name: 'Suborbital Space Plane SB01',
    description: 'Tourism suborbital spacecraft (6-8 pax)',
    type: 'suborbital',
    category: 'Suborbital Spacecraft',
    specifications: {
      capacity: '6-8 passengers',
      range: '100 km altitude',
      power: 'Rocket propulsion'
    },
    status: 'development',
    lastModified: '2025-01-01'
  },
  'SUBSB02': {
    code: 'SUBSB02',
    name: 'Suborbital Space Plane SB02',
    description: 'Research suborbital spacecraft (4-6 pax)',
    type: 'suborbital',
    category: 'Suborbital Spacecraft',
    specifications: {
      capacity: '4-6 crew + experiments',
      range: '120 km altitude',
      power: 'Rocket propulsion'
    },
    status: 'development',
    lastModified: '2025-01-01'
  },
  'ORBOR01': {
    code: 'ORBOR01',
    name: 'Orbital Spacecraft OR01',
    description: 'Crew orbital spacecraft (4-6 pax)',
    type: 'orbital',
    category: 'Orbital Spacecraft',
    specifications: {
      capacity: '4-6 crew',
      range: 'LEO to GEO',
      power: 'Chemical + electric propulsion'
    },
    status: 'planned',
    lastModified: '2025-01-01'
  },
  'ORBOR02': {
    code: 'ORBOR02',
    name: 'Orbital Spacecraft OR02',
    description: 'Cargo orbital spacecraft (2 t)',
    type: 'orbital',
    category: 'Orbital Spacecraft',
    specifications: {
      capacity: '2 tonnes cargo',
      range: 'LEO to GEO',
      power: 'Chemical + electric propulsion'
    },
    status: 'planned',
    lastModified: '2025-01-01'
  },

  // Unmanned Aerial Vehicles & Satellites
  'UAVTACT': {
    code: 'UAVTACT',
    name: 'Tactical UAV',
    description: 'Military tactical unmanned aerial vehicle',
    type: 'uav',
    category: 'UAV',
    specifications: {
      payload: '100 kg',
      range: '500 nm',
      power: 'Turboprop'
    },
    status: 'active',
    lastModified: '2025-01-01'
  },
  'UAVCARG': {
    code: 'UAVCARG',
    name: 'Heavy-Lift Cargo UAV',
    description: 'Heavy-lift cargo unmanned aerial vehicle',
    type: 'uav',
    category: 'UAV',
    specifications: {
      payload: '5,000 kg',
      range: '1,000 nm',
      power: 'Turbofan'
    },
    status: 'development',
    lastModified: '2025-01-01'
  },
  'UAVHALE': {
    code: 'UAVHALE',
    name: 'High-Altitude Long-Endurance UAV',
    description: 'HALE surveillance and communication platform',
    type: 'uav',
    category: 'UAV',
    specifications: {
      payload: '500 kg sensors',
      range: '48 hour endurance',
      power: 'Solar-electric'
    },
    status: 'development',
    lastModified: '2025-01-01'
  },
  'UAVSWRM': {
    code: 'UAVSWRM',
    name: 'Swarm UAV',
    description: 'Small swarm-capable autonomous UAV',
    type: 'uav',
    category: 'UAV',
    specifications: {
      payload: '5 kg',
      range: '2 hour endurance',
      power: 'Electric'
    },
    status: 'development',
    lastModified: '2025-01-01'
  },
  'SATQNET': {
    code: 'SATQNET',
    name: 'Quantum Network Satellite',
    description: 'Quantum communication satellite',
    type: 'satellite',
    category: 'Satellite',
    specifications: {
      payload: 'Quantum transceivers',
      range: 'LEO constellation',
      power: 'Solar panels + batteries'
    },
    status: 'development',
    lastModified: '2025-01-01'
  },
  'SATEOBS': {
    code: 'SATEOBS',
    name: 'Earth-Observation Satellite',
    description: 'High-resolution Earth imaging satellite',
    type: 'satellite',
    category: 'Satellite',
    specifications: {
      payload: 'Optical + SAR sensors',
      range: 'Sun-synchronous orbit',
      power: 'Solar panels + batteries'
    },
    status: 'active',
    lastModified: '2025-01-01'
  },
  'SATCOMM': {
    code: 'SATCOMM',
    name: 'Communications Satellite',
    description: 'Broadband communication satellite',
    type: 'satellite',
    category: 'Satellite',
    specifications: {
      payload: 'Communication transponders',
      range: 'GEO',
      power: 'Solar panels + batteries'
    },
    status: 'active',
    lastModified: '2025-01-01'
  },
  'SATNAVS': {
    code: 'SATNAVS',
    name: 'Navigation Satellite',
    description: 'Global navigation satellite',
    type: 'satellite',
    category: 'Satellite',
    specifications: {
      payload: 'Atomic clocks + transmitters',
      range: 'MEO constellation',
      power: 'Solar panels + batteries'
    },
    status: 'active',
    lastModified: '2025-01-01'
  },

  // Planetary Rovers & Cargo Drones
  'ROVLUNA': {
    code: 'ROVLUNA',
    name: 'Lunar Rover',
    description: 'Lunar surface exploration rover',
    type: 'rover',
    category: 'Planetary Rover',
    specifications: {
      payload: '100 kg instruments',
      range: '10 km radius',
      power: 'RTG + solar'
    },
    status: 'development',
    lastModified: '2025-01-01'
  },
  'ROVMARS': {
    code: 'ROVMARS',
    name: 'Mars Rover',
    description: 'Mars surface exploration rover',
    type: 'rover',
    category: 'Planetary Rover',
    specifications: {
      payload: '200 kg instruments',
      range: '20 km radius',
      power: 'RTG'
    },
    status: 'planned',
    lastModified: '2025-01-01'
  },
  'ROVASTE': {
    code: 'ROVASTE',
    name: 'Asteroid Rover',
    description: 'Asteroid surface exploration rover',
    type: 'rover',
    category: 'Planetary Rover',
    specifications: {
      payload: '50 kg instruments',
      range: 'Surface mobility',
      power: 'Solar + batteries'
    },
    status: 'planned',
    lastModified: '2025-01-01'
  },
  'CRGLGT5': {
    code: 'CRGLGT5',
    name: 'Cargo Drone Light',
    description: 'Light cargo drone (< 50 kg)',
    type: 'drone',
    category: 'Cargo Drone',
    specifications: {
      payload: '< 50 kg',
      range: '50 km',
      power: 'Electric'
    },
    status: 'active',
    lastModified: '2025-01-01'
  },
  'CRGMED5': {
    code: 'CRGMED5',
    name: 'Cargo Drone Medium',
    description: 'Medium cargo drone (< 500 kg)',
    type: 'drone',
    category: 'Cargo Drone',
    specifications: {
      payload: '< 500 kg',
      range: '100 km',
      power: 'Hybrid-electric'
    },
    status: 'development',
    lastModified: '2025-01-01'
  },
  'CRGHVY2': {
    code: 'CRGHVY2',
    name: 'Cargo Drone Heavy',
    description: 'Heavy cargo drone (≈ 2 t)',
    type: 'drone',
    category: 'Cargo Drone',
    specifications: {
      payload: '≈ 2 tonnes',
      range: '200 km',
      power: 'Turboshaft'
    },
    status: 'development',
    lastModified: '2025-01-01'
  },
  'CRGUHV5': {
    code: 'CRGUHV5',
    name: 'Cargo Drone Ultra-Heavy',
    description: 'Ultra-heavy cargo drone (≈ 5 t)',
    type: 'drone',
    category: 'Cargo Drone',
    specifications: {
      payload: '≈ 5 tonnes',
      range: '300 km',
      power: 'Turboshaft'
    },
    status: 'planned',
    lastModified: '2025-01-01'
  },

  // Robotics (ROBBBO-T)
  'FALAS01': {
    code: 'FALAS01',
    name: 'Assembly Robot',
    description: 'Factory assembly automation robot',
    type: 'robot',
    category: 'Industrial Robot',
    specifications: {
      payload: '50 kg',
      range: '3m reach',
      power: 'Electric servo'
    },
    status: 'active',
    lastModified: '2025-01-01'
  },
  'FALWL01': {
    code: 'FALWL01',
    name: 'Welding Robot',
    description: 'Factory welding automation robot',
    type: 'robot',
    category: 'Industrial Robot',
    specifications: {
      payload: '25 kg torch',
      range: '2.5m reach',
      power: 'Electric + welding power'
    },
    status: 'active',
    lastModified: '2025-01-01'
  },
  'MROAC01': {
    code: 'MROAC01',
    name: 'Aircraft MRO Robot',
    description: 'Aircraft maintenance, repair, and overhaul robot',
    type: 'robot',
    category: 'Maintenance Robot',
    specifications: {
      payload: '100 kg tools',
      range: '5m reach',
      power: 'Electric + pneumatic'
    },
    status: 'development',
    lastModified: '2025-01-01'
  },
  'SPCEV01': {
    code: 'SPCEV01',
    name: 'EVA Robot',
    description: 'Extra-vehicular activity space robot',
    type: 'robot',
    category: 'Space Robot',
    specifications: {
      payload: '200 kg tools',
      range: 'Tethered/free-flying',
      power: 'Battery + fuel cell'
    },
    status: 'development',
    lastModified: '2025-01-01'
  },
  'EXPDP01': {
    code: 'EXPDP01',
    name: 'Deep-Sea Exploration Robot',
    description: 'Deep ocean exploration robot',
    type: 'robot',
    category: 'Exploration Robot',
    specifications: {
      payload: '50 kg instruments',
      range: '6,000m depth',
      power: 'Battery + tether'
    },
    status: 'development',
    lastModified: '2025-01-01'
  },

  // Quantum Technology Foundation
  'QPUDESK': {
    code: 'QPUDESK',
    name: 'Desktop Quantum Processing Unit',
    description: 'Desktop quantum computing system',
    type: 'quantum',
    category: 'Quantum Hardware',
    specifications: {
      capacity: '50-100 qubits',
      power: 'Dilution refrigerator',
      dimensions: 'Desktop form factor'
    },
    status: 'development',
    lastModified: '2025-01-01'
  },
  'QPURACK': {
    code: 'QPURACK',
    name: 'Rack Quantum Processing Unit',
    description: 'Rack-mounted quantum computing system',
    type: 'quantum',
    category: 'Quantum Hardware',
    specifications: {
      capacity: '100-500 qubits',
      power: 'Closed-cycle refrigerator',
      dimensions: '19" rack mount'
    },
    status: 'development',
    lastModified: '2025-01-01'
  },
  'QKDFIBR': {
    code: 'QKDFIBR',
    name: 'Fiber-based QKD Module',
    description: 'Fiber-optic quantum key distribution system',
    type: 'quantum',
    category: 'Quantum Security Hardware',
    specifications: {
      range: '100 km fiber',
      power: 'Rack-mounted',
      dimensions: '2U rack unit'
    },
    status: 'development',
    lastModified: '2025-01-01'
  },
  'QSNQMAG': {
    code: 'QSNQMAG',
    name: 'Quantum Magnetometer',
    description: 'Ultra-sensitive quantum magnetometer',
    type: 'quantum',
    category: 'Quantum Sensor',
    specifications: {
      range: 'fT sensitivity',
      power: 'Low power laser',
      dimensions: 'Portable'
    },
    status: 'active',
    lastModified: '2025-01-01'
  },
  'QSWPROC': {
    code: 'QSWPROC',
    name: 'Quantum Processing SDK',
    description: 'Quantum algorithm development toolkit',
    type: 'quantum',
    category: 'Quantum Software',
    specifications: {
      capacity: 'Multi-platform',
      power: 'Software only',
      dimensions: 'Cloud + on-premise'
    },
    status: 'active',
    lastModified: '2025-01-01'
  }
}

/**
 * Get variants by type
 */
export function getVariantsByType(type: ProductVariant['type']): ProductVariant[] {
  return Object.values(PRODUCT_VARIANTS).filter(variant => variant.type === type)
}

/**
 * Get variants by category
 */
export function getVariantsByCategory(category: string): ProductVariant[] {
  return Object.values(PRODUCT_VARIANTS).filter(variant => variant.category === category)
}

/**
 * Get variants by status
 */
export function getVariantsByStatus(status: ProductVariant['status']): ProductVariant[] {
  return Object.values(PRODUCT_VARIANTS).filter(variant => variant.status === status)
}

/**
 * Search variants by keyword
 */
export function searchVariants(query: string): ProductVariant[] {
  const queryLower = query.toLowerCase()
  return Object.values(PRODUCT_VARIANTS).filter(variant =>
    variant.code.toLowerCase().includes(queryLower) ||
    variant.name.toLowerCase().includes(queryLower) ||
    variant.description.toLowerCase().includes(queryLower) ||
    variant.category.toLowerCase().includes(queryLower)
  )
}

/**
 * Get variant categories
 */
export function getVariantCategories(): string[] {
  const categories = new Set(Object.values(PRODUCT_VARIANTS).map(v => v.category))
  return Array.from(categories).sort()
}

/**
 * Get variant types
 */
export function getVariantTypes(): ProductVariant['type'][] {
  const types = new Set(Object.values(PRODUCT_VARIANTS).map(v => v.type))
  return Array.from(types).sort()
}