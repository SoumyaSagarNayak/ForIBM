// MapperSync - Interactive World Mapping JavaScript

class MapperSync {
    constructor() {
        this.userCount = 0;
        this.currentView = 'continents';
        this.currentContinent = null;
        this.currentCountry = null;
        this.navigationHistory = [];
        this.mapData = {};
        this.randomFacts = [];
        this.init();
    }

    init() {
        this.initMapData();
        this.initRandomFacts();
        this.initUserCount();
        this.initNavigation();
        this.initGlobeInteraction();
        this.initExplorer();
        this.initProfileForm();
        this.initContactForm();
        this.initThemeToggle();
        this.initScrollAnimations();
        this.initSmoothScrolling();
        this.loadStoredPreferences();
        this.generateRandomFact();
        this.initMapsCarousel();
    }

    // Initialize Map Data
    initMapData() {
        this.mapData = {
            'north-america': {
                name: 'North America',
                description: 'A continent in the Northern Hemisphere, known for its diverse landscapes from Arctic tundra to tropical beaches.',
                countries: {
                    'united-states': {
                        name: 'United States',
                        description: 'A federal republic with 50 states, known for its cultural diversity and economic power.',
                        states: {
                            'california': { name: 'California', cities: ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento'] },
                            'texas': { name: 'Texas', cities: ['Houston', 'Dallas', 'Austin', 'San Antonio'] },
                            'new-york': { name: 'New York', cities: ['New York City', 'Albany', 'Buffalo', 'Rochester'] },
                            'florida': { name: 'Florida', cities: ['Miami', 'Orlando', 'Tampa', 'Jacksonville'] }
                        }
                    },
                    'canada': {
                        name: 'Canada',
                        description: 'The second-largest country by land area, known for its natural beauty and multicultural society.',
                        states: {
                            'ontario': { name: 'Ontario', cities: ['Toronto', 'Ottawa', 'Hamilton', 'London'] },
                            'quebec': { name: 'Quebec', cities: ['Montreal', 'Quebec City', 'Laval', 'Gatineau'] },
                            'british-columbia': { name: 'British Columbia', cities: ['Vancouver', 'Victoria', 'Surrey', 'Burnaby'] }
                        }
                    },
                    'mexico': {
                        name: 'Mexico',
                        description: 'A country rich in ancient civilizations, vibrant culture, and diverse ecosystems.',
                        states: {
                            'jalisco': { name: 'Jalisco', cities: ['Guadalajara', 'Zapopan', 'Tlaquepaque', 'Tonalá'] },
                            'nuevo-leon': { name: 'Nuevo León', cities: ['Monterrey', 'Guadalupe', 'San Nicolás', 'Escobedo'] }
                        }
                    }
                },
                stats: { countries: 23, population: '579M', area: '24.7M km²' }
            },
            'south-america': {
                name: 'South America',
                description: 'Home to the Amazon rainforest and the Andes mountains, rich in biodiversity and culture.',
                countries: {
                    'brazil': {
                        name: 'Brazil',
                        description: 'The largest country in South America, famous for the Amazon rainforest and vibrant culture.',
                        states: {
                            'sao-paulo': { name: 'São Paulo', cities: ['São Paulo', 'Guarulhos', 'Campinas', 'São Bernardo'] },
                            'rio-de-janeiro': { name: 'Rio de Janeiro', cities: ['Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu'] }
                        }
                    },
                    'argentina': {
                        name: 'Argentina',
                        description: 'Known for tango, beef, and diverse landscapes from Patagonia to the Pampas.',
                        states: {
                            'buenos-aires': { name: 'Buenos Aires', cities: ['Buenos Aires', 'La Plata', 'Mar del Plata', 'Bahía Blanca'] }
                        }
                    }
                },
                stats: { countries: 12, population: '434M', area: '17.8M km²' }
            },
            'europe': {
                name: 'Europe',
                description: 'A continent rich in history, art, and culture, with diverse languages and traditions.',
                countries: {
                    'france': {
                        name: 'France',
                        description: 'Known for its art, cuisine, fashion, and iconic landmarks like the Eiffel Tower.',
                        states: {
                            'ile-de-france': { name: 'Île-de-France', cities: ['Paris', 'Boulogne-Billancourt', 'Saint-Denis', 'Argenteuil'] },
                            'provence': { name: 'Provence-Alpes-Côte d\'Azur', cities: ['Marseille', 'Nice', 'Toulon', 'Aix-en-Provence'] }
                        }
                    },
                    'germany': {
                        name: 'Germany',
                        description: 'A central European country known for its engineering, history, and cultural contributions.',
                        states: {
                            'bavaria': { name: 'Bavaria', cities: ['Munich', 'Nuremberg', 'Augsburg', 'Regensburg'] },
                            'north-rhine-westphalia': { name: 'North Rhine-Westphalia', cities: ['Cologne', 'Düsseldorf', 'Dortmund', 'Essen'] }
                        }
                    },
                    'italy': {
                        name: 'Italy',
                        description: 'Famous for its art, architecture, cuisine, and historical significance in Western civilization.',
                        states: {
                            'lazio': { name: 'Lazio', cities: ['Rome', 'Latina', 'Guidonia', 'Fiumicino'] },
                            'lombardy': { name: 'Lombardy', cities: ['Milan', 'Brescia', 'Monza', 'Bergamo'] }
                        }
                    }
                },
                stats: { countries: 44, population: '748M', area: '10.2M km²' }
            },
            'asia': {
                name: 'Asia',
                description: 'The largest and most populous continent, home to diverse cultures and ancient civilizations.',
                countries: {
                    'china': {
                        name: 'China',
                        description: 'The most populous country in the world with a rich history spanning thousands of years.',
                        states: {
                            'beijing': { name: 'Beijing', cities: ['Beijing', 'Chaoyang', 'Haidian', 'Fengtai'] },
                            'shanghai': { name: 'Shanghai', cities: ['Shanghai', 'Pudong', 'Huangpu', 'Xuhui'] }
                        }
                    },
                    'japan': {
                        name: 'Japan',
                        description: 'An island nation known for its technology, culture, and blend of traditional and modern life.',
                        states: {
                            'tokyo': { name: 'Tokyo', cities: ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya'] },
                            'osaka': { name: 'Osaka', cities: ['Osaka', 'Sakai', 'Higashiosaka', 'Hirakata'] }
                        }
                    },
                    'india': {
                        name: 'India',
                        description: 'A diverse country with numerous languages, religions, and cultural traditions.',
                        states: {
                            'maharashtra': { name: 'Maharashtra', cities: ['Mumbai', 'Pune', 'Nagpur', 'Thane'] },
                            'uttar-pradesh': { name: 'Uttar Pradesh', cities: ['Lucknow', 'Kanpur', 'Ghaziabad', 'Agra'] }
                        }
                    }
                },
                stats: { countries: 48, population: '4.6B', area: '44.6M km²' }
            },
            'africa': {
                name: 'Africa',
                description: 'The cradle of humanity, known for its wildlife, diverse cultures, and natural resources.',
                countries: {
                    'nigeria': {
                        name: 'Nigeria',
                        description: 'The most populous country in Africa, known for its oil resources and cultural diversity.',
                        states: {
                            'lagos': { name: 'Lagos', cities: ['Lagos', 'Ikeja', 'Ikorodu', 'Epe'] },
                            'kano': { name: 'Kano', cities: ['Kano', 'Fagge', 'Dala', 'Gwale'] }
                        }
                    },
                    'south-africa': {
                        name: 'South Africa',
                        description: 'Known for its diverse wildlife, history, and being the southernmost country in Africa.',
                        states: {
                            'gauteng': { name: 'Gauteng', cities: ['Johannesburg', 'Pretoria', 'Soweto', 'Randburg'] },
                            'western-cape': { name: 'Western Cape', cities: ['Cape Town', 'Stellenbosch', 'Paarl', 'George'] }
                        }
                    },
                    'egypt': {
                        name: 'Egypt',
                        description: 'Home to ancient pyramids and the Nile River, with a rich pharaonic history.',
                        states: {
                            'cairo': { name: 'Cairo', cities: ['Cairo', 'Giza', 'Shubra El Kheima', 'Port Said'] }
                        }
                    }
                },
                stats: { countries: 54, population: '1.4B', area: '30.3M km²' }
            },
            'antartica': {
    name: 'Antarctica',
    description: 'The coldest, driest, and windiest continent, almost entirely covered by ice and dedicated to scientific research.',
    countries: {
        'none': {
            name: 'No Sovereign Countries',
            description: 'Antarctica is not owned by any one nation. Governed by the Antarctic Treaty System, it is a place for peace and science.',
            states: {
                'research-zones': {
                    name: 'Research Zones',
                    cities: ['McMurdo Station (USA)', 'Amundsen-Scott South Pole Station (USA)', 'Vostok Station (Russia)', 'Concordia Station (France/Italy)', 'Maitri (India)']
                }
            }
        }
    },
    stats: { countries: 0, population: '~1,000 (winter), ~5,000 (summer)', area: '14M km²' }
},

            'australia': {
                name: 'Australia',
                description: 'A region of islands in the Pacific Ocean, including Australia and numerous island nations.',
                countries: {
                    'australia': {
                        name: 'Australia',
                        description: 'A country and continent known for its unique wildlife and diverse landscapes.',
                        states: {
                            'new-south-wales': { name: 'New South Wales', cities: ['Sydney', 'Newcastle', 'Wollongong', 'Maitland'] },
                            'victoria': { name: 'Victoria', cities: ['Melbourne', 'Geelong', 'Ballarat', 'Bendigo'] },
                            'queensland': { name: 'Queensland', cities: ['Brisbane', 'Gold Coast', 'Townsville', 'Cairns'] }
                        }
                    },
                    'new-zealand': {
                        name: 'New Zealand',
                        description: 'Known for its stunning natural beauty, from mountains to fjords and beaches.',
                        states: {
                            'north-island': { name: 'North Island', cities: ['Auckland', 'Wellington', 'Hamilton', 'Tauranga'] },
                            'south-island': { name: 'South Island', cities: ['Christchurch', 'Dunedin', 'Invercargill', 'Nelson'] }
                        }
                    }
                },
                stats: { countries: 14, population: '45M', area: '8.6M km²' }
            }
        };
    }

    // Initialize Random Facts
    initRandomFacts() {
        this.randomFacts = [
           "🇷🇺 Russia is the largest country in the world, covering over 17 million square kilometers!",
  "🌊 The Pacific Ocean is larger than all land masses combined.",
  "❄️ Antarctica is the driest continent on Earth, receiving less precipitation than most deserts.",
  "🏜️ The Sahara Desert is roughly the size of the entire United States.",
  "🏔️ Mount Everest grows about 4 millimeters taller each year due to tectonic activity.",
  "🌧️ The Amazon River is longer than the distance from New York to Rome.",
  "🇦🇺 Australia is the only country that is also a continent.",
  "🧂 The Dead Sea is actually a lake and is the lowest point on Earth's surface.",
  "🧊 Greenland is the world's largest island that is not a continent.",
  "⬇️ The Mariana Trench is deeper than Mount Everest is tall.",
  "🗣️ Africa is home to over 2,000 languages, more than any other continent.",
  "🧭 The Nile River flows northward, which is unusual for most rivers.",
  "🏝️ Japan consists of 6,852 islands, though only about 430 are inhabited.",
  "🚫 The Great Wall of China is not visible from space with the naked eye, contrary to popular belief.",
  "🐒 Madagascar is home to 5% of all plant and animal species, 80% of which are found nowhere else.",
  "🌊 The Arctic Ocean is the smallest and shallowest of the world's five major oceans.",
  "⛪ Vatican City is the smallest country in the world, at just 0.17 square miles.",
  "⛰️ The Andes is the longest mountain range in the world, stretching over 7,000 kilometers.",
  "💧 Lake Baikal in Russia contains about 20% of the world's unfrozen fresh water.",
  "🌍 The equator passes through 13 countries across three continents.",
  "🌋 Iceland has more active volcanoes than football teams — and runs almost entirely on renewable energy.",
  "🇨🇦 Canada has the longest coastline in the world — over 202,000 kilometers!",
  "🌐 Africa is the only continent located in all four hemispheres: North, South, East, and West.",
  "🕐 China has only one official time zone, even though it spans five geographically.",
  "🔥 The Danakil Depression in Ethiopia is one of the hottest and most alien-looking places on Earth.",
  "📏 Chile is the skinniest country in the world — over 4,300 km long but only 177 km wide!",
  "🤳 The Ural Mountains in Russia divide Europe and Asia — one selfie = two continents!",
  "🏖️ Indonesia has over 17,000 islands, but less than half are named or inhabited.",
  "🐅 Bangladesh has the world’s largest river delta — and swimming tigers!",
  "🏜️ The Atacama Desert in Chile is so dry, some parts haven’t seen rain in hundreds of years!"
        ];
    }

    // User Count Functionality
    initUserCount() {
        const storedCount = localStorage.getItem('mapperSyncUserCount');
        this.userCount = storedCount ? parseInt(storedCount) : Math.floor(Math.random() * 20) + 100;
        
        this.userCount++;
        localStorage.setItem('mapperSyncUserCount', this.userCount.toString());
        this.updateUserCountDisplay();
        this.animateCountUp();
    }

    updateUserCountDisplay() {
        const userCountElement = document.getElementById('userCount');
        if (userCountElement) {
            userCountElement.textContent = this.userCount.toLocaleString();
        }
    }

    animateCountUp() {
        const userCountElement = document.getElementById('userCount');
        if (!userCountElement) return;

        const startCount = Math.max(0, this.userCount - 20);
        const endCount = this.userCount;
        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentCount = Math.floor(startCount + (endCount - startCount) * progress);
            userCountElement.textContent = currentCount.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    // Navigation Functionality
    initNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const quickJumpDropdown = document.getElementById('quickJumpDropdown');
        const quickJumpMenu = document.getElementById('quickJumpMenu');

        // Mobile menu toggle
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close mobile menu when clicking on links
            const navLinks = navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }

        // Quick jump dropdown functionality
        if (quickJumpMenu) {
            const dropdownItems = quickJumpMenu.querySelectorAll('.dropdown-item');
            dropdownItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const continent = item.getAttribute('data-continent');
                    this.navigateToContinent(continent);
                    this.scrollToSection('explorer');
                });
            });
        }

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Globe Interaction
    initGlobeInteraction() {
        const continents = document.querySelectorAll('.continent');
        
        continents.forEach(continent => {
            continent.addEventListener('click', () => {
                const continentId = continent.getAttribute('data-continent');
                this.navigateToContinent(continentId);
                this.scrollToSection('explorer');
            });

            // Add keyboard support
            continent.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const continentId = continent.getAttribute('data-continent');
                    this.navigateToContinent(continentId);
                    this.scrollToSection('explorer');
                }
            });

            // Make focusable
            continent.setAttribute('tabindex', '0');
        });
    }

    // Explorer Functionality
    initExplorer() {
        this.renderContinents();
    }

    renderContinents() {
        const continentsGrid = document.getElementById('continentsView');
        if (!continentsGrid) return;

        const continentsHTML = Object.entries(this.mapData).map(([id, continent]) => `
            <div class="continent-card" data-continent="${id}" tabindex="0">
                <div class="card-image">
                    ${this.getContinentIcon(id)}
                </div>
                <div class="card-content">
                    <h3>${continent.name}</h3>
                    <p>${continent.description}</p>
                    <div class="card-stats">
                        <span><i class="fas fa-flag"></i> ${continent.stats.countries} countries</span>
                        <span><i class="fas fa-users"></i> ${continent.stats.population}</span>
                        <span><i class="fas fa-expand-arrows-alt"></i> ${continent.stats.area}</span>
                    </div>
                </div>
            </div>
        `).join('');

        continentsGrid.innerHTML = continentsHTML;

        // Add click handlers
        const continentCards = continentsGrid.querySelectorAll('.continent-card');
        continentCards.forEach(card => {
            card.addEventListener('click', () => {
                const continentId = card.getAttribute('data-continent');
                this.navigateToContinent(continentId);
            });

            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const continentId = card.getAttribute('data-continent');
                    this.navigateToContinent(continentId);
                }
            });
        });
    }

    renderCountries(continentId) {
        const countriesGrid = document.getElementById('countriesView');
        if (!countriesGrid || !this.mapData[continentId]) return;

        const continent = this.mapData[continentId];
        const countriesHTML = Object.entries(continent.countries).map(([id, country]) => `
            <div class="country-card" data-country="${id}" tabindex="0">
                <div class="card-image">
                    🏛️
                </div>
                <div class="card-content">
                    <h3>${country.name}</h3>
                    <p>${country.description}</p>
                    <div class="card-stats">
                        <span><i class="fas fa-map"></i> ${Object.keys(country.states).length} states/provinces</span>
                    </div>
                </div>
            </div>
        `).join('');

        countriesGrid.innerHTML = countriesHTML;

        // Add click handlers
        const countryCards = countriesGrid.querySelectorAll('.country-card');
        countryCards.forEach(card => {
            card.addEventListener('click', () => {
                const countryId = card.getAttribute('data-country');
                this.navigateToCountry(countryId);
            });

            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const countryId = card.getAttribute('data-country');
                    this.navigateToCountry(countryId);
                }
            });
        });
    }

    renderStates(continentId, countryId) {
        const statesGrid = document.getElementById('statesView');
        if (!statesGrid || !this.mapData[continentId] || !this.mapData[continentId].countries[countryId]) return;

        const country = this.mapData[continentId].countries[countryId];
        const statesHTML = Object.entries(country.states).map(([id, state]) => `
            <div class="state-card" data-state="${id}" tabindex="0">
                <div class="card-image">
                    🗺️
                </div>
                <div class="card-content">
                    <h3>${state.name}</h3>
                    <div class="city-list">
                        ${state.cities.map(city => `<span class="city-tag">${city}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        statesGrid.innerHTML = statesHTML;
    }

    navigateToContinent(continentId) {
        if (!this.mapData[continentId]) return;

        this.currentContinent = continentId;
        this.currentCountry = null;
        this.currentView = 'countries';
        this.navigationHistory.push({ type: 'continent', id: continentId });

        this.renderCountries(continentId);
        this.updateBreadcrumb();
        this.showView('countries');
    }

    navigateToCountry(countryId) {
        if (!this.currentContinent || !this.mapData[this.currentContinent].countries[countryId]) return;

        this.currentCountry = countryId;
        this.currentView = 'states';
        this.navigationHistory.push({ type: 'country', id: countryId });

        this.renderStates(this.currentContinent, countryId);
        this.updateBreadcrumb();
        this.showView('states');
    }

    navigateBack() {
        if (this.navigationHistory.length === 0) return;

        this.navigationHistory.pop(); // Remove current level

        if (this.navigationHistory.length === 0) {
            // Back to continents
            this.currentView = 'continents';
            this.currentContinent = null;
            this.currentCountry = null;
            this.showView('continents');
        } else {
            const lastLevel = this.navigationHistory[this.navigationHistory.length - 1];
            if (lastLevel.type === 'continent') {
                // Back to countries
                this.currentView = 'countries';
                this.currentCountry = null;
                this.showView('countries');
            }
        }

        this.updateBreadcrumb();
    }

    showView(viewType) {
        const views = ['continentsView', 'countriesView', 'statesView'];
        views.forEach(view => {
            const element = document.getElementById(view);
            if (element) {
                element.style.display = view === `${viewType}View` ? 'grid' : 'none';
            }
        });

        const backButton = document.getElementById('backButton');
        if (backButton) {
            backButton.style.display = viewType === 'continents' ? 'none' : 'inline-flex';
        }
    }

    updateBreadcrumb() {
        const breadcrumb = document.getElementById('breadcrumb');
        if (!breadcrumb) return;

        let breadcrumbHTML = '<span class="breadcrumb-item" data-level="continents">Continents</span>';

        if (this.currentContinent) {
            const continentName = this.mapData[this.currentContinent].name;
            breadcrumbHTML += ` <i class="fas fa-chevron-right"></i> <span class="breadcrumb-item" data-level="countries">${continentName}</span>`;
        }

        if (this.currentCountry) {
            const countryName = this.mapData[this.currentContinent].countries[this.currentCountry].name;
            breadcrumbHTML += ` <i class="fas fa-chevron-right"></i> <span class="breadcrumb-item active" data-level="states">${countryName}</span>`;
        }

        breadcrumb.innerHTML = breadcrumbHTML;

        // Add click handlers to breadcrumb items
        const breadcrumbItems = breadcrumb.querySelectorAll('.breadcrumb-item');
        breadcrumbItems.forEach(item => {
            item.addEventListener('click', () => {
                const level = item.getAttribute('data-level');
                if (level === 'continents') {
                    this.resetToContinent();
                } else if (level === 'countries' && this.currentContinent) {
                    this.resetToCountries();
                }
            });
        });
    }

    resetToContinent() {
        this.currentView = 'continents';
        this.currentContinent = null;
        this.currentCountry = null;
        this.navigationHistory = [];
        this.showView('continents');
        this.updateBreadcrumb();
    }

    resetToCountries() {
        this.currentView = 'countries';
        this.currentCountry = null;
        this.navigationHistory = this.navigationHistory.slice(0, 1); // Keep only continent
        this.showView('countries');
        this.updateBreadcrumb();
    }

    getContinentIcon(continentId) {
        const icons = {
            'north-america': '🌎',
            'south-america': '🌎',
            'europe': '🏰',
            'asia': '🏯',
            'africa': '🦁',
            'australia': '🏝️',
            'antartica': '☃️'
        };
        return icons[continentId] || '🌍';
    }

    // Maps Carousel
    initMapsCarousel() {
        const mapsCarousel = document.getElementById('mapsCarousel');
        if (!mapsCarousel) return;

        const featuredMaps = [
            {
                name: 'California',
                description: 'The Golden State with diverse landscapes from beaches to mountains.',
                cities: ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento'],
                pins: [
                    { top: '60%', left: '15%', city: 'Los Angeles' },
                    { top: '25%', left: '20%', city: 'San Francisco' },
                    { top: '75%', left: '18%', city: 'San Diego' },
                    { top: '35%', left: '25%', city: 'Sacramento' }
                ]
            },
            {
                name: 'Texas',
                description: 'The Lone Star State, known for its size and diverse culture.',
                cities: ['Houston', 'Dallas', 'Austin', 'San Antonio'],
                pins: [
                    { top: '70%', left: '75%', city: 'Houston' },
                    { top: '40%', left: '70%', city: 'Dallas' },
                    { top: '60%', left: '60%', city: 'Austin' },
                    { top: '75%', left: '55%', city: 'San Antonio' }
                ]
            },
            {
                name: 'New York',
                description: 'The Empire State, home to the city that never sleeps.',
                cities: ['New York City', 'Albany', 'Buffalo', 'Rochester'],
                pins: [
                    { top: '70%', left: '80%', city: 'New York City' },
                    { top: '45%', left: '70%', city: 'Albany' },
                    { top: '35%', left: '25%', city: 'Buffalo' },
                    { top: '40%', left: '35%', city: 'Rochester' }
                ]
            }
        ];

        const mapsHTML = featuredMaps.map(map => `
            <div class="map-card">
                <div class="map-image">
                    🗺️
                    <div class="map-pins">
                        ${map.pins.map(pin => `
                            <div class="map-pin" style="top: ${pin.top}; left: ${pin.left};" 
                                 title="${pin.city}" data-city="${pin.city}"></div>
                        `).join('')}
                    </div>
                </div>
                <div class="map-info">
                    <h3>${map.name}</h3>
                    <p>${map.description}</p>
                    <div class="city-list">
                        ${map.cities.map(city => `<span class="city-tag">${city}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        mapsCarousel.innerHTML = mapsHTML;

        // Add pin hover effects
        const pins = mapsCarousel.querySelectorAll('.map-pin');
        pins.forEach(pin => {
            pin.addEventListener('mouseenter', () => {
                const city = pin.getAttribute('data-city');
                this.showPinTooltip(pin, city);
            });

            pin.addEventListener('mouseleave', () => {
                this.hidePinTooltip();
            });
        });
    }

    showPinTooltip(pin, city) {
        // Remove existing tooltip
        this.hidePinTooltip();

        const tooltip = document.createElement('div');
        tooltip.className = 'pin-tooltip';
        tooltip.textContent = city;
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 1000;
            pointer-events: none;
            transform: translate(-50%, -100%);
            margin-top: -5px;
        `;

        pin.appendChild(tooltip);
    }

    hidePinTooltip() {
        const existingTooltip = document.querySelector('.pin-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
    }

    // Random Facts
    generateRandomFact() {
        const factElement = document.getElementById('randomFact');
        if (!factElement) return;

        const randomIndex = Math.floor(Math.random() * this.randomFacts.length);
        const fact = this.randomFacts[randomIndex];

        factElement.style.opacity = '0';
        setTimeout(() => {
            factElement.textContent = fact;
            factElement.style.opacity = '1';
        }, 300);
    }

    // Profile Form Functionality
    initProfileForm() {
        const profileForm = document.getElementById('profileForm');
        const profilePreview = document.getElementById('profilePreview');

        if (!profileForm) return;

        // Handle form submission
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleProfileSubmission();
        });

        // Real-time preview updates
        const inputs = profileForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.updateProfilePreview());
        });
    }

    updateProfilePreview() {
        const userName = document.getElementById('userName').value.trim();
        const favoriteContinent = document.getElementById('favoriteContinent').value;
        const favoriteCountry = document.getElementById('favoriteCountry').value.trim();
        const mapType = document.getElementById('mapType').value;

        const previewName = document.getElementById('previewName');
        const previewContinent = document.getElementById('previewContinent');
        const previewCountry = document.getElementById('previewCountry');
        const previewMapType = document.getElementById('previewMapType');
        const profilePreview = document.getElementById('profilePreview');

        if (userName || favoriteContinent || favoriteCountry || mapType) {
            profilePreview.style.display = 'block';
            
            if (previewName) previewName.textContent = userName || 'Explorer Name';
            if (previewContinent) {
                const continentName = favoriteContinent ? 
                    this.mapData[favoriteContinent]?.name || favoriteContinent : 'Not selected';
                previewContinent.textContent = continentName;
            }
            if (previewCountry) previewCountry.textContent = favoriteCountry || 'Not specified';
            if (previewMapType) {
                const mapTypeNames = {
                    'political': 'Political Maps',
                    'physical': 'Physical Maps',
                    'topographic': 'Topographic Maps',
                    'climate': 'Climate Maps',
                    'satellite': 'Satellite Maps'
                };
                previewMapType.textContent = mapTypeNames[mapType] || 'Not selected';
            }
        }
    }

    handleProfileSubmission() {
        const userName = document.getElementById('userName');
        const nameError = document.getElementById('nameError');

        // Clear previous errors
        nameError.textContent = '';

        // Validate name
        if (!userName.value.trim()) {
            nameError.textContent = 'Name is required';
            return;
        }

        if (userName.value.trim().length < 2) {
            nameError.textContent = 'Name must be at least 2 characters long';
            return;
        }

        // Create profile data
        const profileData = {
            name: userName.value.trim(),
            continent: document.getElementById('favoriteContinent').value,
            country: document.getElementById('favoriteCountry').value.trim(),
            mapType: document.getElementById('mapType').value,
            timestamp: new Date().toISOString()
        };

        // Save to localStorage
        localStorage.setItem('mapperSyncProfile', JSON.stringify(profileData));

        // Show success message
        this.showProfileSuccess();

        // Reset form
        document.getElementById('profileForm').reset();
        
        // Update user count
        this.userCount++;
        localStorage.setItem('mapperSyncUserCount', this.userCount.toString());
        this.updateUserCountDisplay();
    }

    showProfileSuccess() {
        const successMessage = document.querySelector('.success-message');
        
        if (successMessage) {
            successMessage.style.display = 'flex';
            successMessage.style.animation = 'fadeIn 0.5s ease';
            
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 4000);
        }
    }

    // Contact Form Functionality
    initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactSubmission(e);
            });
        }
    }

    handleContactSubmission(e) {
        const submitBtn = e.target.querySelector('.submit-btn');
        
        // Show loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            // Show success message
            this.showContactSuccess();
            
            // Reset form
            e.target.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    showContactSuccess() {
        // Create and show success notification
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Message sent successfully! We'll get back to you soon.</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success);
            color: white;
            padding: 15px 20px;
            border-radius: var(--radius-medium);
            box-shadow: var(--shadow-medium);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10000;
            animation: slideInRight 0.5s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 500);
        }, 5000);
    }

    // Theme Toggle Functionality
    initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        
        if (themeToggle) {
            themeToggle.addEventListener('change', () => {
                this.toggleTheme();
            });
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('mapperSyncTheme', newTheme);
        
        // Update toggle state
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.checked = newTheme === 'dark';
        }
    }

    // Load Stored Preferences
    loadStoredPreferences() {
        // Load theme preference
        const storedTheme = localStorage.getItem('mapperSyncTheme');
        if (storedTheme) {
            document.documentElement.setAttribute('data-theme', storedTheme);
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                themeToggle.checked = storedTheme === 'dark';
            }
        }

        // Load stored profile
        const storedProfile = localStorage.getItem('mapperSyncProfile');
        if (storedProfile) {
            const profileData = JSON.parse(storedProfile);
            const previewName = document.getElementById('previewName');
            const previewContinent = document.getElementById('previewContinent');
            const previewCountry = document.getElementById('previewCountry');
            const previewMapType = document.getElementById('previewMapType');
            const profilePreview = document.getElementById('profilePreview');

            if (previewName && previewContinent && previewCountry && previewMapType && profilePreview) {
                previewName.textContent = profileData.name;
                
                const continentName = profileData.continent ? 
                    this.mapData[profileData.continent]?.name || profileData.continent : 'Not selected';
                previewContinent.textContent = continentName;
                
                previewCountry.textContent = profileData.country || 'Not specified';
                
                const mapTypeNames = {
                    'political': 'Political Maps',
                    'physical': 'Physical Maps',
                    'topographic': 'Topographic Maps',
                    'climate': 'Climate Maps',
                    'satellite': 'Satellite Maps'
                };
                previewMapType.textContent = mapTypeNames[profileData.mapType] || 'Not selected';
                
                profilePreview.style.display = 'block';
            }
        }
    }

    // Scroll Animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.continent-card, .country-card, .state-card, .map-card, .creator-card, .fact-card');
        animateElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    // Smooth Scrolling
    initSmoothScrolling() {
        // Handle navigation links
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            });
        });
    }

    scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Utility Methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Public API
    getUserCount() {
        return this.userCount;
    }

    getCurrentView() {
        return this.currentView;
    }

    getMapData() {
        return this.mapData;
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.startTime = performance.now();
        this.setupPerformanceObserver();
    }

    setupPerformanceObserver() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'largest-contentful-paint') {
                        this.metrics.lcp = entry.startTime;
                    }
                    if (entry.entryType === 'first-input') {
                        this.metrics.fid = entry.processingStart - entry.startTime;
                    }
                    if (entry.entryType === 'layout-shift') {
                        this.metrics.cls = (this.metrics.cls || 0) + entry.value;
                    }
                }
            });

            try {
                observer.observe({ 
                    entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] 
                });
            } catch (e) {
                console.warn('Performance Observer not fully supported');
            }
        }
    }

    logMetrics() {
        const loadTime = performance.now() - this.startTime;
        console.log('MapperSync Performance Metrics:', {
            loadTime: `${loadTime.toFixed(2)}ms`,
            lcp: this.metrics.lcp ? `${this.metrics.lcp.toFixed(2)}ms` : 'N/A',
            fid: this.metrics.fid ? `${this.metrics.fid.toFixed(2)}ms` : 'N/A',
            cls: this.metrics.cls ? this.metrics.cls.toFixed(4) : 'N/A'
        });
    }
}

// Accessibility Helper
class AccessibilityHelper {
    constructor() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupAriaLabels();
    }

    setupKeyboardNavigation() {
        // Handle escape key for dropdowns and modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close mobile menu
                const hamburger = document.getElementById('hamburger');
                const navMenu = document.getElementById('navMenu');
                if (hamburger && navMenu && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });

        // Handle tab navigation for dropdown menus
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach((item, index) => {
            item.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown' && dropdownItems[index + 1]) {
                    e.preventDefault();
                    dropdownItems[index + 1].focus();
                } else if (e.key === 'ArrowUp' && dropdownItems[index - 1]) {
                    e.preventDefault();
                    dropdownItems[index - 1].focus();
                }
            });
        });
    }

    setupFocusManagement() {
        // Ensure focus is visible for keyboard users
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    setupAriaLabels() {
        // Add aria-labels to interactive elements that might need them
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            if (!link.getAttribute('aria-label')) {
                const icon = link.querySelector('i');
                if (icon) {
                    const platform = icon.className.split('-').pop();
                    link.setAttribute('aria-label', `Visit our ${platform} page`);
                }
            }
        });
    }
}

// Global Functions
window.scrollToSection = function(sectionId) {
    if (window.MapperSync) {
        window.MapperSync.scrollToSection(sectionId);
    }
};

window.navigateBack = function() {
    if (window.MapperSync) {
        window.MapperSync.navigateBack();
    }
};

window.generateRandomFact = function() {
    if (window.MapperSync) {
        window.MapperSync.generateRandomFact();
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main application
    const mapperSync = new MapperSync();
    
    // Initialize performance monitoring
    const performanceMonitor = new PerformanceMonitor();
    
    // Initialize accessibility helper
    const accessibilityHelper = new AccessibilityHelper();
    
    // Make MapperSync globally available
    window.MapperSync = mapperSync;
    
    // Log performance metrics after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            performanceMonitor.logMetrics();
        }, 1000);
    });
    
    console.log('🌍 MapperSync initialized successfully!');
});

// Service Worker Registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Error Handling
window.addEventListener('error', (e) => {
    console.error('MapperSync Error:', e.error);
    // Could send to error reporting service in production
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('MapperSync Unhandled Promise Rejection:', e.reason);
    // Could send to error reporting service in production
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid var(--ocean-blue) !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(style);

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MapperSync, PerformanceMonitor, AccessibilityHelper };
}
