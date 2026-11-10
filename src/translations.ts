export interface TranslationKeys {
  // Chei existente din chat/FAQ (păstrate)
  chatTitle?: string;
  chatStatus?: string;
  welcomeMsg?: string;
  faqTitle?: string;
  faq1?: string;
  faq2?: string;
  faq3?: string;
  faq4?: string;
  faq5?: string;
  chatPlaceholder?: string;

  // Navigație & Antet
  home?: string;
  adoptionGuide?: string;
  availableAnimals?: string;
  shelters?: string;
  collaborations?: string;
  aboutUs?: string;
  login?: string;

  // Catalog & Filtrare
  filterBy?: string;
  adoptionType?: string;
  physical?: string;
  distance?: string;
  distanceNoticeTitle?: string;
  distanceNoticeDesc?: string;
  distanceBannerTitle?: string;
  distanceBannerDesc?: string;
  
  basicInfo?: string;
  type?: string;
  speciesDog?: string;
  speciesCat?: string;
  speciesRabbit?: string;
  speciesParrot?: string;
  speciesTurtle?: string;
  speciesOther?: string;

  sex?: string;
  male?: string;
  female?: string;

  size?: string;
  small?: string;
  small2?: string;
  medium?: string;
  large?: string;

  animalDetails?: string;
  age?: string;
  yearOld?: string;
  yearsOld?: string;
  agePuppy?: string;
  ageYoung?: string;
  ageAdult?: string;
  ageSenior?: string;

  temperament?: string;
  playful?: string;
  calm?: string;
  energetic?: string;
  shy?: string;

  healthState?: string;
  healthy?: string;
  needsCare?: string;

  color?: string;
  colorBlack?: string;
  colorWhite?: string;
  colorBrown?: string;
  colorOrange?: string;
  colorGrey?: string;
  colorGolden?: string;
  colorBicolor?: string;
  colorTricolor?: string;

  locationLabel?: string;
  locationTypeLabel?: string;
  county?: string;
  shelter?: string;
  center?: string;
  foster?: string;

  compatibilityHealth?: string;
  petFriendly?: string;
  childFriendly?: string;
  noAllergies?: string;
  microchipped?: string;
  vaccinated?: string;
  sterilized?: string;
  dewormed?: string;

  // Butoane Filtre & Sortare
  applyFilters?: string;
  resetFilters?: string;
  clearAll?: string;
  sortBy?: string;
  newest?: string;
  oldest?: string;

  // Titluri Catalog
  friendsLookingForHome?: string;
  friendsWaitingSponsor?: string;
  noAnimalsFound?: string;
  loading?: string;

  // Card & Modal Animale
  statusAvailable?: string;
  btnViewDetails?: string;
  btnDonate?: string;
  fundingCovered?: string;
  senior?: string;
  keyDetails?: string;
  healthAndCompatibility?: string;
  scheduleVisit?: string;
  shareProfile?: string;
  yes?: string;
  no?: string;

  // Legendă Home
  legendVaccinated?: string;
  legendDewormed?: string;
  legendSterilized?: string;
}

export const translations: Record<'ro' | 'en', TranslationKeys> = {
  ro: {
    // FAQ & Chat (păstrate)
    chatTitle: "Asistent FurEverHome",
    chatStatus: "Online",
    welcomeMsg: "Bună! Cu ce te pot ajuta astăzi?",
    faqTitle: "Întrebări frecvente",
    faq1: "Cum pot adopta un animal?",
    faq2: "Care sunt condițiile de adopție?",
    faq3: "Cum pot dona pentru adăpost?",
    faq4: "Unde este situat adăpostul?",
    faq5: "Pot fi voluntar?",
    chatPlaceholder: "Scrie un mesaj...",

    // Navigație & Antet
    home: "Acasă",
    adoptionGuide: "Ghidul adoptatorului",
    availableAnimals: "Animale disponibile",
    shelters: "Adăposturi",
    collaborations: "Colaborări",
    aboutUs: "Despre noi",
    login: "Autentificare",

    // Catalog & Filtrare
    filterBy: "Filtrează după",
    adoptionType: "TIP ADOPȚIE",
    physical: "Fizică",
    distance: "La distanță",
    distanceNoticeTitle: "Doar adopție la distanță",
    distanceNoticeDesc: "Se afișează doar seniorii și animalele care au nevoie de tratament sau cazare permanentă și nu mai pot fi date spre adopție.",
    distanceBannerTitle: "Adopția la distanță",
    distanceBannerDesc: "Sprijină îngrijirea, tratamentul și cazarea unui animal care nu mai poate fi adoptat fizic. Ai nevoie de cont pentru a continua.",
    
    basicInfo: "INFO DE BAZĂ",
    type: "Tip",
    speciesDog: "Câine",
    speciesCat: "Pisică",
    speciesRabbit: "Iepure",
    speciesParrot: "Papagal",
    speciesTurtle: "Broască țestoasă",
    speciesOther: "Altele",

    sex: "Sex",
    male: "Mascul",
    female: "Femelă",

    size: "Talie",
    small: "Mică",
    small2: "Mic",
    medium: "Medie",
    large: "Mare",

    animalDetails: "DETALII ANIMAL",
    age: "Vârstă",
    yearOld: "an",
    yearsOld: "ani",
    agePuppy: "Pui (< 1 an)",
    ageYoung: "Tânăr (1 - 3 ani)",
    ageAdult: "Adult (3 - 7 ani)",
    ageSenior: "Senior (> 7 ani)",

    temperament: "Temperament",
    playful: "Jucăuș",
    calm: "Calm",
    energetic: "Energic",
    shy: "Timid",

    healthState: "Stare de sănătate",
    healthy: "Sănătos",
    needsCare: "Necesită îngrijiri",

    color: "Culoare",
    colorBlack: "Negru",
    colorWhite: "Alb",
    colorBrown: "Maro",
    colorOrange: "Portocaliu / Roșcat",
    colorGrey: "Gri",
    colorGolden: "Auriu",
    colorBicolor: "Bicolor / Tricolor",
    colorTricolor: "Tricolor",

    locationLabel: "Locație",
    locationTypeLabel: "Tip locație",
    county: "Județ",
    shelter: "Centru / Adăpost",
    center: "Centru",
    foster: "În Foster",

    compatibilityHealth: "COMPATIBILITATE & SĂNĂTATE",
    petFriendly: "Pet friendly",
    childFriendly: "Child friendly",
    noAllergies: "Fără alergii",
    microchipped: "Microcipat",
    vaccinated: "Vaccinat",
    sterilized: "Sterilizat",
    dewormed: "Deparazitat",

    // Butoane Filtre & Sortare
    applyFilters: "Aplică filtre",
    resetFilters: "Resetează filtrele",
    clearAll: "Șterge tot",
    sortBy: "Sortează după:",
    newest: "Cele mai noi",
    oldest: "Cele mai vechi",

    // Titluri Catalog
    friendsLookingForHome: "prieteni își caută o casă",
    friendsWaitingSponsor: "prieteni așteaptă un sponsor",
    noAnimalsFound: "Nu s-au găsit animale conform filtrelor selectate.",
    loading: "Se încarcă animalele...",

    // Card & Modal Animale
    statusAvailable: "Disponibil",
    btnViewDetails: "Vezi detalii",
    btnDonate: "Donează",
    fundingCovered: "din necesarul lunar acoperit",
    senior: "Senior",
    keyDetails: "Detalii cheie",
    healthAndCompatibility: "Sănătate & Compatibilitate",
    scheduleVisit: "Programează o vizită",
    shareProfile: "Distribuie profilul",
    yes: "Da",
    no: "Nu",

    // Legendă Home
    legendVaccinated: "Vaccinat",
    legendDewormed: "Deparazitat",
    legendSterilized: "Sterilizat",
  },

  en: {
    // FAQ & Chat (păstrate)
    chatTitle: "FurEverHome Assistant",
    chatStatus: "Online",
    welcomeMsg: "Hello! How can I help you today?",
    faqTitle: "Frequently Asked Questions",
    faq1: "How can I adopt an animal?",
    faq2: "What are the adoption requirements?",
    faq3: "How can I donate to the shelter?",
    faq4: "Where is the shelter located?",
    faq5: "Can I be a volunteer?",
    chatPlaceholder: "Type a message...",

    // Navigation & Header
    home: "Home",
    adoptionGuide: "Adoption Guide",
    availableAnimals: "Available Animals",
    shelters: "Shelters",
    collaborations: "Collaborations",
    aboutUs: "About Us",
    login: "Log In",

    // Catalog & Filters
    filterBy: "Filter by",
    adoptionType: "ADOPTION TYPE",
    physical: "Physical",
    distance: "At a distance",
    distanceNoticeTitle: "Distance adoption only",
    distanceNoticeDesc: "Only seniors and animals requiring continuous treatment or permanent shelter that cannot be physically adopted are displayed.",
    distanceBannerTitle: "Distance Adoption",
    distanceBannerDesc: "Support the care, treatment, and housing of an animal that cannot be physically adopted. You need an account to continue.",
    
    basicInfo: "BASIC INFO",
    type: "Type",
    speciesDog: "Dog",
    speciesCat: "Cat",
    speciesRabbit: "Rabbit",
    speciesParrot: "Parrot",
    speciesTurtle: "Turtle",
    speciesOther: "Others",

    sex: "Sex",
    male: "Male",
    female: "Female",

    size: "Size",
    small: "Small",
    small2: "Small",
    medium: "Medium",
    large: "Large",

    animalDetails: "ANIMAL DETAILS",
    age: "Age",
    yearOld: "year old",
    yearsOld: "years old",
    agePuppy: "Puppy (< 1 yr)",
    ageYoung: "Young (1 - 3 yrs)",
    ageAdult: "Adult (3 - 7 yrs)",
    ageSenior: "Senior (> 7 yrs)",

    temperament: "Temperament",
    playful: "Playful",
    calm: "Calm",
    energetic: "Energetic",
    shy: "Shy",

    healthState: "Health condition",
    healthy: "Healthy",
    needsCare: "Needs care",

    color: "Color",
    colorBlack: "Black",
    colorWhite: "White",
    colorBrown: "Brown",
    colorOrange: "Orange / Red",
    colorGrey: "Grey",
    colorGolden: "Golden",
    colorBicolor: "Bicolor / Tricolor",
    colorTricolor: "Tricolor",

    locationLabel: "Location",
    locationTypeLabel: "Location type",
    county: "County",
    shelter: "Center / Shelter",
    center: "Center",
    foster: "In Foster",

    compatibilityHealth: "COMPATIBILITY & HEALTH",
    petFriendly: "Pet friendly",
    childFriendly: "Child friendly",
    noAllergies: "No allergies",
    microchipped: "Microchipped",
    vaccinated: "Vaccinated",
    sterilized: "Sterilized",
    dewormed: "Dewormed",

    // Filter Buttons & Sorting
    applyFilters: "Apply filters",
    resetFilters: "Reset filters",
    clearAll: "Clear all",
    sortBy: "Sort by:",
    newest: "Newest",
    oldest: "Oldest",

    // Catalog Titles
    friendsLookingForHome: "friends looking for a home",
    friendsWaitingSponsor: "friends waiting for a sponsor",
    noAnimalsFound: "No animals found matching the selected filters.",
    loading: "Loading animals...",

    // Animal Card & Modal
    statusAvailable: "Available",
    btnViewDetails: "View details",
    btnDonate: "Donate",
    fundingCovered: "of monthly need covered",
    senior: "Senior",
    keyDetails: "Key details",
    healthAndCompatibility: "Health & Compatibility",
    scheduleVisit: "Schedule a visit",
    shareProfile: "Share profile",
    yes: "Yes",
    no: "No",

    // Home Legend
    legendVaccinated: "Vaccinated",
    legendDewormed: "Dewormed",
    legendSterilized: "Sterilized",
  }
};