/**
 * TELEMETRY DATA FOR LIVE REQUESTS
 *
 * Realistic device diagnostics pulled via IMEI when request comes in.
 * Each request maps to actual device issue + probable root cause.
 * Battery drainage shown with multiple scenarios (hardware vs software).
 */

export const requestTelemetry = {
  // ═══════════════════════════════════════════════════════════════════════════
  // REQ-20260409-001: Galaxy S24 Ultra - SHATTERED DISPLAY (Impact damage)
  // ═══════════════════════════════════════════════════════════════════════════
  'REQ-20260409-001': {
    requestId: 'REQ-20260409-001',
    device: 'Galaxy S24 Ultra',
    issue: 'Shattered display, no touch',
    customer: 'C-88291',
    imei: '3547821964025814',

    diagnostics: {
      screenHealth: 0,                    // Display completely offline
      touchPanel: 'OFFLINE',
      panelTemperature: 85,               // Elevated from impact
      colorAccuracy: 0,                   // N/A - display dead
      brightness: 0,                      // N/A - display dead
      pixelsDeadCount: 'ALL',
    },

    hardware: {
      accelerometer: {
        lastImpact: 14.2,                 // G-force detected
        impactTime: '10:08 AM (6 min ago)',
        direction: 'Bottom-left corner (high impact zone)',
      },
      dropDetection: true,
      fallHeight: '~4-5 feet estimated',
      screenProtector: 'None detected',
    },

    software: {
      osHealth: 'PERFECT',                // OS fine, pure hardware failure
      kernelPanic: 'None',
      corruptedSectors: 0,
    },

    analysisAndDecision: {
      softFixApplicable: false,
      probabilityHardwareFailure: '100%',
      primaryCause: 'Physical impact - shattered OLED panel',
      secondaryCauses: ['Touch digitizer damaged', 'LCD ribbon severed (likely)'],
      replacementPart: 'Display Assembly',
      partCost: '$280',
      estimatedRepairTime: '1.5 hours',
      requiresQcTest: true,
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REQ-20260403-02: Galaxy A54 - RAPID DRAIN WITH SWELLING
  // ═══════════════════════════════════════════════════════════════════════════
  // KEY INSIGHT: Battery health is GOOD, but other factors causing drain
  // (This shows real-world scenario where battery health ≠ drain reason)
  // ═══════════════════════════════════════════════════════════════════════════
  'REQ-20260409-002': {
    requestId: 'REQ-20260409-002',
    device: 'Galaxy A54',
    issue: 'Rapid drain, swelling',
    customer: 'C-10934',
    imei: '8821946735802148',

    diagnostics: {
      batteryHealth: 95,                  // ← GOOD battery health!
      batteryCapacity: '4900 mAh',
      chargeVoltage: 4.2,                 // Normal (shows good circuit)
      chargingCurrent: 2100,              // Normal
      temperature: 48,                    // Normal operating temp
      swellingDetected: true,             // This is the clue!
      swellingPercentage: 2.3,            // Physical expansion detected
    },

    usagePatterns: {
      chargeCount: 387,                   // 387 cycles (light-moderate use, normal for age)
      avgDailyCycles: 0.9,                // ~1 cycle per day (normal)
      fastChargeUsage: 'Never',           // User doesn't fast charge
      extremeTemperatureExposure: 'No',
    },

    debogging: {
      screenOnTime: '12-14 hours/charge',  // Abnormal! Should be 18-20 hours
      backgroundAppDrain: 'Moderate',
      wifiRadioDrain: 'High (WiFi stuck connecting)',
      bluetoothDrain: 'Normal',
      gpsDrain: 'High (location services continuously on)',

      // THE ROOT CAUSE:
      suspectedRootCause: 'NOT battery degradation',
      findings: [
        {
          issue: 'Physical Swelling',
          cause: 'Manufacturing defect in battery cell',
          indicator: '2.3% volume expansion detected',
          risk: 'Battery could fail suddenly or catch fire',
        },
        {
          issue: 'Software Drain',
          cause: 'WiFi stuck in reconnection loop',
          indicator: 'Radio not sleeping (antenna stats show 95% active)',
          fixable: 'Software update + user troubleshooting',
        }
      ],
    },

    analysisAndDecision: {
      softFixApplicable: 'PARTIAL - Try WiFi reset first',
      probabilityHardwareFailure: '85%',  // Swelling = hardware issue
      primaryCause: 'Battery cell swelling (manufacturing defect)',
      secondaryCause: 'Software WiFi bug (compounding the problem)',
      recommendedAction: 'Battery replacement (manufacturer defect)',
      partCost: '$85',
      estimatedRepairTime: '1 hour',
      priorityLevel: 'HIGH (safety risk due to swelling)',
      warrantyStatus: 'IN WARRANTY - Manufacturing defect covered',
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REQ-20260403-03: Galaxy Z Flip5 - CREASE CRACKING
  // ═══════════════════════════════════════════════════════════════════════════
  'REQ-20260409-003': {
    requestId: 'REQ-20260409-003',
    device: 'Galaxy Z Flip5',
    issue: 'Crease cracking, display artifacts',
    customer: 'C-44920',
    imei: '7392841056283741',

    diagnostics: {
      screenHealth: 72,                   // Display functional but degraded
      creaseIntegrity: 'COMPROMISED',
      microFractureDetected: true,
      displayArtifacts: 8,                // Dead pixels near crease
      colorShift: 'Present (cyan shift, bottom third)',
      brightness: 92,                     // Slightly reduced
      liquidDetection: 'Moisture in hinge area (minor)',
    },

    hardwareFold: {
      hinge_cycles: 8742,                 // Heavy use
      dailyFoldCycles: 25,                // ~25 folds per day (heavy)
      hingeTension: 6.8,                  // Still within tolerance but wearing
      creaseMaterial: 'Flexible OLED panel',
      creaseMicroFracture: 'Hairline fracture detected at fold line',
    },

    environmental: {
      location: 'Los Angeles, CA',
      environment: 'Coastal/humid',
      saltExposure: true,                 // Salt air corrosion on metal hinge parts
      dustParticles: 'Moderate',          // Fine sand in hinge
      thermalCycles: 'High (daily temp swings 15-30°C)',
    },

    analysisAndDecision: {
      softFixApplicable: false,
      probabilityHardwareFailure: '88%',
      primaryCause: 'Material fatigue + environmental stress',
      details: [
        'Micro-fracture in flexible OLED at crease (stress point)',
        'Salt corrosion accelerated hinge wear',
        'Dust in hinge allowing moisture to contact electronics',
        'User folds device 25x/day (heavy, above average 15x)',
      ],
      replacementPart: 'Display Assembly (Flexible OLED) + Hinge module',
      partCost: '$420 (specialty part)',
      estimatedRepairTime: '2.5 hours',
      warrantyStatus: 'IN WARRANTY - Crease failure covered by Samsung',
      specialHandling: 'Requires precision hinge alignment after repair',
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REQ-20260403-04: Galaxy S24 - BOOT LOOP (Software + Hardware mixed)
  // ═══════════════════════════════════════════════════════════════════════════
  'REQ-20260409-004': {
    requestId: 'REQ-20260409-004',
    device: 'Galaxy S24',
    issue: 'Boot loop, system crashes',
    customer: 'C-33019',
    imei: '4921837465028341',

    diagnostics: {
      osHealth: 'CORRUPTED',
      bootStatus: 'Infinite loop - restarts every 8 seconds',
      cpuTemperature: 68,                 // Normal (not thermal throttling)
      ramTest: 'FAILING intermittently',
      storageBootSector: 'CORRUPTED (2 sectors unrecoverable)',
      powerManagement: 'Faulty IC detected',
    },

    softwareAnalysis: {
      lastSuccessfulBoot: '3 hours ago (successful)',
      lastOsUpdate: '2 days ago (Samsung May update)',
      updateIssue: 'OS update interrupted mid-install (user turned off power)',
      kernelPanic: 'Yes (watchdog timeout, reboot loop)',
      recoveryMode: 'Accessible (ADB commands possible)',
    },

    hardwareAnalysis: {
      flashMemory: 'Possibly corrupted (boot partition damaged)',
      ram: 'Intermittent errors (bad stick or loose connection)',
      powerSupply: 'Slight voltage drop detected (5V → 4.92V under load)',
      audioCodec: 'Fine',
      sensors: 'All responding normally',
    },

    analysisAndDecision: {
      softFixApplicable: true,            // Maybe!
      probabilityHardwareFailure: '62%',  // Mixed - partly software, partly hardware

      repairStrategy: [
        {
          step: 1,
          action: 'Attempt OS Recovery (via Download Mode)',
          success_rate: '40%',
          time: '20 minutes',
          outcome: 'If successful: No parts needed',
        },
        {
          step: 2,
          action: 'If recovery fails: Replace Logic Board',
          success_rate: '100%',
          reason: 'RAM + boot sector damage = logic board failure',
          partCost: '$180',
          time: '1.5 hours',
        }
      ],

      recommendedFirstAction: 'Try software recovery first (warranty covers)',
      fallbackAction: 'Logic Board replacement if recovery fails',
      warrantyCoverage: 'YES - Covered (defective boot sector repair/replacement)',
      estRepairTime: '20 min (if software) or 1.5 hours (if hardware)',
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REQ-20260403-05: Galaxy S23 FE - DEAD PIXELS (OLED Degradation)
  // ═══════════════════════════════════════════════════════════════════════════
  'REQ-20260409-005': {
    requestId: 'REQ-20260409-005',
    device: 'Galaxy S23 FE',
    issue: 'Dead pixels, color shift',
    customer: 'C-99211',
    imei: '2847361029485726',

    diagnostics: {
      screenHealth: 76,                   // Degraded but functional
      deadPixels: 47,                     // Black dots across display
      pixelDistribution: 'Scattered (clustered bottom-left)',
      colorAccuracy: 84,                  // Noticeable shift toward cyan/yellow
      brightness: 88,                     // Slightly dimmer
      refreshRate: 90,                    // Still supports 90Hz
      burnin: false,                      // Not image-retention burn-in
    },

    oledAnalysis: {
      oledTechnology: '6.4" AMOLED',
      pixelAgeEstimate: '18 months'  ,    // Device is 18 months old
      typicalOledFailureWindow: '18-24 months',
      pixelLuminanceDecay: 16,            // 16% brightness loss (normal for age)
      pixelDeadType: 'Sub-pixel failure (R, G, B elements failing)',
      pattern: 'Age-related degradation',
    },

    usagePatterns: {
      screenOnTime: '6-8 hours/day',      // Heavy use
      maxBrightness: 'Always (outdoor use)',
      darkMode: 'Never',
      staticContent: 'YouTube watched 4+ hours/day',
      overheating: 'Device stayed in hot car (50°C+)',
    },

    analysisAndDecision: {
      softFixApplicable: false,
      probabilityHardwareFailure: '92%',
      primaryCause: 'OLED pixel degradation (age + heavy use + heat)',
      details: [
        'Device at 18 months (within expected OLED failure window)',
        'Heavy screen-on usage (6-8 hrs/day = ~2000 hours total)',
        'Always max brightness + outdoor use (UV degradation)',
        'Thermal stress from hot car storage',
      ],
      replacementPart: 'Display Assembly (AMOLED)',
      partCost: '$210',
      estimatedRepairTime: '1 hour',
      warrantyStatus: 'OUT OF WARRANTY (pixel degradation is wear)',
      customerCost: 'Full price ($210 parts + $45 labor = $255)',
      failurePattern: 'Common for S23 FE at 18+ month mark',
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REQ-20260403-06: Galaxy A54 - CAMERA FAILURE (Hardware offline)
  // ═══════════════════════════════════════════════════════════════════════════
  'REQ-20260409-006': {
    requestId: 'REQ-20260409-006',
    device: 'Galaxy A54',
    issue: 'Rear camera failure, black output',
    customer: 'C-55102',
    imei: '6294738501826347',

    diagnostics: {
      cameraSensor: 'OFFLINE',            // Not responding
      cameraSubsystem: 'Failed to initialize',
      lensAutofocus: 'No response',
      flashLed: 'Works fine (separate circuit)',
      cameraHardwareInterrupt: 'I2C bus error',
      thermalSensor: 'Normal (no heat from camera)',
    },

    hardwareAnalysis: {
      sensorType: '50MP main camera',
      busConnectivity: 'Device tree shows camera absent',
      powerSupply: '3.3V present at connector',
      clockSignal: 'Missing (oscillator not running)',
      dataLine: 'No response to probe commands',
      likelyFailure: 'Solder joint failure on camera connector OR sensor IC dead',
    },

    usagePatterns: {
      cameraUsage: 'Heavy (photographer, Instagram daily)',
      physicalDamage: 'No drops detected',
      liquidExposure: 'None detected',
      cameraAppErrors: 'Started 3 days ago (intermittent) → now permanent',
    },

    failureProgression: {
      day1: 'Camera app freezes occasionally',
      day2: 'Black output when opening camera app',
      day3: 'Hardware fully offline (sensor not responding)',
      diagnosis: 'Gradual failure = loose solder joint finally broke',
    },

    analysisAndDecision: {
      softFixApplicable: false,
      probabilityHardwareFailure: '96%',
      primaryCause: 'Solder joint failure on camera module connector',
      details: [
        'No power issue (3.3V present)',
        'No thermal issue (temp normal)',
        'Clock signal missing = IC not responding (dead or disconnected)',
        'Progressive failure pattern = mechanical break (solder joint)',
      ],
      replacementPart: 'Camera Module (50MP)',
      partCost: '$95',
      estimatedRepairTime: '1.5 hours',
      warrantyStatus: 'OUT OF WARRANTY (manufacturing defect but not covered)',
      customerCost: 'Full price ($95 parts + $50 labor = $145)',
      repairComplexity: 'Moderate (requires precise soldering/alignment)',
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // REQ-20260403-07: Galaxy M34 - CHARGING NOT DETECTED
  // ═══════════════════════════════════════════════════════════════════════════
  // KEY INSIGHT: Battery health is EXCELLENT, but USB port is worn
  // (Shows battery drain ≠ battery problem, could be charger/port issue)
  // ═══════════════════════════════════════════════════════════════════════════
  'REQ-20260409-007': {
    requestId: 'REQ-20260409-007',
    device: 'Galaxy M34',
    issue: 'Charging not detected, USB intermittent',
    customer: 'C-72841',
    imei: '8473625019384627',

    diagnostics: {
      batteryHealth: 94,                  // ← EXCELLENT battery health!
      batteryCapacity: '6000 mAh',
      chargeVoltage: 0,                   // Not detecting charge!
      chargingCircuit: 'Functional (IC tests OK)',
      batteryTemperature: 22,             // Cool (not in use)
      usb_HighSpeedData: 'Intermittent',
      usb_ChargingDetect: 'Failing (USB charger not recognized)',
    },

    usbConnectorAnalysis: {
      connectorType: 'USB-C',
      connectorWear: 'HIGH',
      contactResistance: '1.2 ohms (should be <0.05 ohm)',
      oxideLayer: 'Heavy oxidation on contacts',
      insertionCount: '~800-1000 estimated',
      dust_debris: 'Lint and oxidation buildup detected',
      physicalDamage: 'No cracks, but contacts worn smooth',
    },

    chargingPattern: {
      dailyCharges: '1-2 per day',        // Normal use
      chargerUsed: 'Cheap third-party cable',
      goldPlatedConnector: 'Unknown (likely not)',
      chargerQuality: 'Non-standard (corroded connector)',
      cableCondition: 'Frayed outer jacket, discolored contacts',
    },

    usagePatterns: {
      screenOnTime: '7-9 hours/day',      // Normal
      batteryDrainRate: 'Normal',         // ~15% per hour normal use
      fastChargeCapability: 'Supported (65W) but not working',
      chargingSpeed: 'Unable to charge',
    },

    analysisAndDecision: {
      softFixApplicable: 'MAYBE - Try cleaning first',
      probabilityHardwareFailure: '78%',
      primaryCause: 'USB-C connector contact wear + oxidation',
      secondaryCause: 'Poor quality charger cable (non-OEM)',

      repairOptions: [
        {
          option: 1,
          action: 'Contact cleaning (manual)',
          cost: '$0 (user can try)',
          success_rate: '30%',
          time: '5 minutes',
          outcome: 'Temporary fix if debris is cause',
        },
        {
          option: 2,
          action: 'USB-C port module replacement',
          cost: '$65',
          success_rate: '100%',
          time: '1 hour',
          outcome: 'Permanent fix',
        }
      ],

      recommendedAction: 'USB-C Port replacement (contacts too worn)',
      partCost: '$65',
      estimatedRepairTime: '1 hour',
      priorityLevel: 'HIGH (device can\'t charge)',
      warrantyStatus: 'IN WARRANTY - Covered (port wear is manufacturing defect)',
      customerAdvice: 'Use OEM Samsung chargers after repair',
    }
  },
};

/**
 * QUICK REFERENCE: REALISTIC BATTERY DRAIN SCENARIOS
 *
 * NOT ALL BATTERY DRAIN = BAD BATTERY HEALTH
 *
 * REQ-02 (A54): Good battery health (95%), but swelling detected
 *   → Root cause: Physical manufacturing defect in battery cell
 *   → Secondary: Software WiFi bug draining power
 *   → Fix: Battery replacement (warranty covers)
 *
 * REQ-07 (M34): Excellent battery health (94%), not detecting charge
 *   → Root cause: USB port contacts worn (from cheap chargers)
 *   → Battery is fine, but port can't detect charger
 *   → Fix: USB-C port replacement
 *
 * If battery health is <50% AND customer reports fast drain:
 *   → Battery replacement likely needed
 *   → But also check: software leaks, old charger, heat exposure
 *
 * The platform checks ALL factors, not just battery health %.
 */
