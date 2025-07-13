// Multi-Cloud DevSecOps Tool - Application Logic
// This file contains all the interactive functionality for the static site

class DevSecOpsApp {
    constructor() {
        this.currentSection = 'home';
        this.searchIndex = this.buildSearchIndex();
        this.initializeApp();
    }

    // Initialize the application
    initializeApp() {
        this.setupEventListeners();
        this.updateStats();
        this.setupBackToTop();
        this.loadSection('home');
    }

    // Build search index for fast searching
    buildSearchIndex() {
        const index = [];
        
        // Index AWS services
        securityData.awsServices.forEach(service => {
            index.push({
                type: 'AWS Service',
                name: service.name,
                description: service.description,
                category: service.category,
                provider: 'AWS',
                features: service.features,
                url: '#aws'
            });
        });

        // Index Azure services
        securityData.azureServices.forEach(service => {
            index.push({
                type: 'Azure Service',
                name: service.name,
                description: service.description,
                category: service.category,
                provider: 'Azure',
                features: service.features,
                url: '#azure'
            });
        });

        // Index GCP services
        securityData.gcpServices.forEach(service => {
            index.push({
                type: 'GCP Service',
                name: service.name,
                description: service.description,
                category: service.category,
                provider: 'GCP',
                features: service.features,
                url: '#gcp'
            });
        });

        // Index compliance frameworks
        securityData.complianceFrameworks.forEach(framework => {
            index.push({
                type: 'Compliance Framework',
                name: framework.name,
                description: framework.description,
                category: 'compliance',
                provider: 'Multi-Cloud',
                features: framework.controls,
                url: '#compliance'
            });
        });

        // Index MITRE tactics
        securityData.mitreTactics.forEach(tactic => {
            index.push({
                type: 'MITRE Tactic',
                name: tactic.name,
                description: tactic.description,
                category: 'mitre',
                provider: 'Multi-Cloud',
                features: tactic.techniques,
                url: '#mitre'
            });
        });

        // Index security tools
        securityData.securityTools.forEach(tool => {
            index.push({
                type: 'Security Tool',
                name: tool.name,
                description: tool.description,
                category: tool.category,
                provider: tool.cloudPlatforms.join(', '),
                features: tool.features,
                url: '#tools'
            });
        });

        return index;
    }

    // Setup event listeners
    setupEventListeners() {
        // Global search
        const searchInput = document.getElementById('globalSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.performSearch(e.target.value);
            });
        }

        // Navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('href').substring(1);
                this.showSection(section);
            });
        });

        // Filter buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                const filter = e.target.getAttribute('data-filter');
                const section = e.target.getAttribute('data-section');
                this.applyFilter(section, filter);
                
                // Update active filter button
                const filterGroup = e.target.parentElement;
                filterGroup.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
            }
        });

        // Card clicks
        document.addEventListener('click', (e) => {
            const card = e.target.closest('.card[onclick]');
            if (card) {
                const onclick = card.getAttribute('onclick');
                const section = onclick.match(/showSection\('(.+)'\)/)?.[1];
                if (section) {
                    this.showSection(section);
                }
            }
        });
    }

    // Update statistics on dashboard
    updateStats() {
        document.getElementById('aws-count').textContent = securityData.awsServices.length;
        document.getElementById('azure-count').textContent = securityData.azureServices.length;
        document.getElementById('gcp-count').textContent = securityData.gcpServices.length;
        document.getElementById('aws-service-count').textContent = securityData.awsServices.length;
        document.getElementById('azure-service-count').textContent = securityData.azureServices.length;
        document.getElementById('gcp-service-count').textContent = securityData.gcpServices.length;
        document.getElementById('compliance-count').textContent = securityData.complianceFrameworks.length;
        document.getElementById('mitre-count').textContent = securityData.mitreTactics.length;
        document.getElementById('tools-count').textContent = securityData.securityTools.length;
    }

    // Perform global search
    performSearch(query) {
        const searchResults = document.getElementById('searchResults');
        
        if (!query || query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }

        const results = this.searchIndex.filter(item => {
            const searchText = `${item.name} ${item.description} ${item.features?.join(' ')}`.toLowerCase();
            return searchText.includes(query.toLowerCase());
        });

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="alert alert-info">No results found</div>';
            return;
        }

        const resultsHtml = results.slice(0, 10).map(result => `
            <div class="card mb-2">
                <div class="card-body py-2">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="card-title mb-1">${result.name}</h6>
                            <small class="text-muted">${result.type} - ${result.provider}</small>
                            <p class="card-text mb-0 text-truncate">${result.description}</p>
                        </div>
                        <button class="btn btn-sm btn-outline-primary" onclick="app.showSection('${result.url.substring(1)}')">
                            View
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        searchResults.innerHTML = resultsHtml;
    }

    // Show specific section
    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('hidden');
        });

        // Show hero section for home
        const heroSection = document.querySelector('.hero-section');
        if (sectionName === 'home') {
            heroSection.style.display = 'block';
            this.currentSection = 'home';
            return;
        } else {
            heroSection.style.display = 'none';
        }

        // Show requested section
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            targetSection.classList.add('fade-in');
            this.currentSection = sectionName;
            
            // Load section content
            this.loadSection(sectionName);
            
            // Scroll to section
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Load section content
    loadSection(sectionName) {
        switch (sectionName) {
            case 'aws':
                this.loadAWSServices();
                break;
            case 'azure':
                this.loadAzureServices();
                break;
            case 'gcp':
                this.loadGCPServices();
                break;
            case 'compliance':
                this.loadComplianceFrameworks();
                break;
            case 'mitre':
                this.loadMITRETactics();
                break;
            case 'tools':
                this.loadSecurityTools();
                break;
            case 'comparison':
                this.loadComparisonMatrix();
                break;
        }
    }

    // Load AWS services
    loadAWSServices() {
        const container = document.getElementById('awsServices');
        if (!container) return;

        const servicesHtml = securityData.awsServices.map(service => `
            <div class="col-md-6 col-lg-4 service-item" data-category="${service.category}">
                <div class="card h-100">
                    <div class="card-header bg-warning text-dark">
                        <h5 class="card-title mb-0">${service.name}</h5>
                        <small class="text-muted">${this.getCategoryName(service.category)}</small>
                    </div>
                    <div class="card-body">
                        <p class="card-text">${service.description}</p>
                        <div class="mb-3">
                            <h6>Key Features:</h6>
                            <ul class="list-unstyled">
                                ${service.features.map(feature => `<li><i class="fas fa-check text-success me-2"></i>${feature}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="mb-3">
                            <h6>Implementation Guide:</h6>
                            <p class="small">${service.implementationGuide}</p>
                        </div>
                        <div class="mb-3">
                            <h6>Best Practices:</h6>
                            <ul class="list-unstyled">
                                ${service.bestPractices.map(practice => `<li><i class="fas fa-star text-warning me-2"></i>${practice}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="mb-3">
                            <h6>Cost Information:</h6>
                            <p class="small text-info">${service.costInfo}</p>
                        </div>
                        <div>
                            <h6>Compliance Frameworks:</h6>
                            <div>
                                ${service.complianceFrameworks.map(framework => `<span class="badge bg-secondary me-1">${framework}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = servicesHtml;
    }

    // Load Azure services
    loadAzureServices() {
        const container = document.getElementById('azureServices');
        if (!container) return;

        const servicesHtml = securityData.azureServices.map(service => `
            <div class="col-md-6 col-lg-4 service-item" data-category="${service.category}">
                <div class="card h-100">
                    <div class="card-header bg-info text-white">
                        <h5 class="card-title mb-0">${service.name}</h5>
                        <small class="text-light">${this.getCategoryName(service.category)}</small>
                    </div>
                    <div class="card-body">
                        <p class="card-text">${service.description}</p>
                        <div class="mb-3">
                            <h6>Key Features:</h6>
                            <ul class="list-unstyled">
                                ${service.features.map(feature => `<li><i class="fas fa-check text-success me-2"></i>${feature}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="mb-3">
                            <h6>Implementation Guide:</h6>
                            <p class="small">${service.implementationGuide}</p>
                        </div>
                        <div class="mb-3">
                            <h6>Best Practices:</h6>
                            <ul class="list-unstyled">
                                ${service.bestPractices.map(practice => `<li><i class="fas fa-star text-warning me-2"></i>${practice}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="mb-3">
                            <h6>Cost Information:</h6>
                            <p class="small text-info">${service.costInfo}</p>
                        </div>
                        <div>
                            <h6>Compliance Frameworks:</h6>
                            <div>
                                ${service.complianceFrameworks.map(framework => `<span class="badge bg-secondary me-1">${framework}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = servicesHtml;
    }

    // Load GCP services
    loadGCPServices() {
        const container = document.getElementById('gcpServices');
        if (!container) return;

        const servicesHtml = securityData.gcpServices.map(service => `
            <div class="col-md-6 col-lg-4 service-item" data-category="${service.category}">
                <div class="card h-100">
                    <div class="card-header bg-success text-white">
                        <h5 class="card-title mb-0">${service.name}</h5>
                        <small class="text-light">${this.getCategoryName(service.category)}</small>
                    </div>
                    <div class="card-body">
                        <p class="card-text">${service.description}</p>
                        <div class="mb-3">
                            <h6>Key Features:</h6>
                            <ul class="list-unstyled">
                                ${service.features.map(feature => `<li><i class="fas fa-check text-success me-2"></i>${feature}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="mb-3">
                            <h6>Implementation Guide:</h6>
                            <p class="small">${service.implementationGuide}</p>
                        </div>
                        <div class="mb-3">
                            <h6>Best Practices:</h6>
                            <ul class="list-unstyled">
                                ${service.bestPractices.map(practice => `<li><i class="fas fa-star text-warning me-2"></i>${practice}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="mb-3">
                            <h6>Cost Information:</h6>
                            <p class="small text-info">${service.costInfo}</p>
                        </div>
                        <div>
                            <h6>Compliance Frameworks:</h6>
                            <div>
                                ${service.complianceFrameworks.map(framework => `<span class="badge bg-secondary me-1">${framework}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = servicesHtml;
    }

    // Load compliance frameworks
    loadComplianceFrameworks() {
        const container = document.getElementById('complianceFrameworks');
        if (!container) return;

        const frameworksHtml = securityData.complianceFrameworks.map(framework => `
            <div class="col-md-6 col-lg-4">
                <div class="card h-100">
                    <div class="card-header bg-primary text-white">
                        <h5 class="card-title mb-0">${framework.name}</h5>
                    </div>
                    <div class="card-body">
                        <p class="card-text">${framework.description}</p>
                        <div class="mb-3">
                            <h6>Controls:</h6>
                            <div>
                                ${framework.controls.map(control => `<span class="badge bg-light text-dark me-1 mb-1">${control}</span>`).join('')}
                            </div>
                        </div>
                        <div class="accordion" id="mappings-${framework.name.replace(/\s+/g, '-')}">
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#aws-${framework.name.replace(/\s+/g, '-')}" aria-expanded="false">
                                        AWS Mappings
                                    </button>
                                </h2>
                                <div id="aws-${framework.name.replace(/\s+/g, '-')}" class="accordion-collapse collapse" data-bs-parent="#mappings-${framework.name.replace(/\s+/g, '-')}">
                                    <div class="accordion-body">
                                        ${Object.entries(framework.awsMappings).map(([control, services]) => `
                                            <div class="mb-2">
                                                <strong>${control}:</strong> ${services.join(', ')}
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#azure-${framework.name.replace(/\s+/g, '-')}" aria-expanded="false">
                                        Azure Mappings
                                    </button>
                                </h2>
                                <div id="azure-${framework.name.replace(/\s+/g, '-')}" class="accordion-collapse collapse" data-bs-parent="#mappings-${framework.name.replace(/\s+/g, '-')}">
                                    <div class="accordion-body">
                                        ${Object.entries(framework.azureMappings).map(([control, services]) => `
                                            <div class="mb-2">
                                                <strong>${control}:</strong> ${services.join(', ')}
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#gcp-${framework.name.replace(/\s+/g, '-')}" aria-expanded="false">
                                        GCP Mappings
                                    </button>
                                </h2>
                                <div id="gcp-${framework.name.replace(/\s+/g, '-')}" class="accordion-collapse collapse" data-bs-parent="#mappings-${framework.name.replace(/\s+/g, '-')}">
                                    <div class="accordion-body">
                                        ${Object.entries(framework.gcpMappings).map(([control, services]) => `
                                            <div class="mb-2">
                                                <strong>${control}:</strong> ${services.join(', ')}
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = frameworksHtml;
    }

    // Load MITRE ATT&CK tactics
    loadMITRETactics() {
        const container = document.getElementById('mitreTactics');
        if (!container) return;

        const tacticsHtml = securityData.mitreTactics.map(tactic => `
            <div class="col-md-6 col-lg-4">
                <div class="card h-100">
                    <div class="card-header bg-danger text-white">
                        <h5 class="card-title mb-0">${tactic.name}</h5>
                        <small class="text-light">${tactic.tacticId}</small>
                    </div>
                    <div class="card-body">
                        <p class="card-text">${tactic.description}</p>
                        <div class="mb-3">
                            <h6>Techniques:</h6>
                            <div>
                                ${tactic.techniques.map(technique => `<span class="badge bg-light text-dark me-1 mb-1">${technique}</span>`).join('')}
                            </div>
                        </div>
                        <div class="accordion" id="mitigations-${tactic.tacticId}">
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#aws-mitigations-${tactic.tacticId}" aria-expanded="false">
                                        AWS Mitigations
                                    </button>
                                </h2>
                                <div id="aws-mitigations-${tactic.tacticId}" class="accordion-collapse collapse" data-bs-parent="#mitigations-${tactic.tacticId}">
                                    <div class="accordion-body">
                                        <ul class="list-unstyled">
                                            ${tactic.awsMitigations.map(mitigation => `<li><i class="fab fa-aws text-warning me-2"></i>${mitigation}</li>`).join('')}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#azure-mitigations-${tactic.tacticId}" aria-expanded="false">
                                        Azure Mitigations
                                    </button>
                                </h2>
                                <div id="azure-mitigations-${tactic.tacticId}" class="accordion-collapse collapse" data-bs-parent="#mitigations-${tactic.tacticId}">
                                    <div class="accordion-body">
                                        <ul class="list-unstyled">
                                            ${tactic.azureMitigations.map(mitigation => `<li><i class="fab fa-microsoft text-info me-2"></i>${mitigation}</li>`).join('')}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#gcp-mitigations-${tactic.tacticId}" aria-expanded="false">
                                        GCP Mitigations
                                    </button>
                                </h2>
                                <div id="gcp-mitigations-${tactic.tacticId}" class="accordion-collapse collapse" data-bs-parent="#mitigations-${tactic.tacticId}">
                                    <div class="accordion-body">
                                        <ul class="list-unstyled">
                                            ${tactic.gcpMitigations.map(mitigation => `<li><i class="fab fa-google text-success me-2"></i>${mitigation}</li>`).join('')}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = tacticsHtml;
    }

    // Load security tools
    loadSecurityTools() {
        const container = document.getElementById('securityTools');
        if (!container) return;

        const toolsHtml = securityData.securityTools.map(tool => `
            <div class="col-md-6 col-lg-4 service-item" data-category="${tool.category}">
                <div class="card h-100">
                    <div class="card-header bg-success text-white">
                        <h5 class="card-title mb-0">${tool.name}</h5>
                        <small class="text-light">${this.getCategoryName(tool.category)}</small>
                    </div>
                    <div class="card-body">
                        <p class="card-text">${tool.description}</p>
                        <div class="mb-3">
                            <h6>Cloud Platforms:</h6>
                            <div>
                                ${tool.cloudPlatforms.map(platform => {
                                    const iconClass = platform === 'AWS' ? 'fab fa-aws text-warning' : 
                                                     platform === 'Azure' ? 'fab fa-microsoft text-info' :
                                                     platform === 'GCP' ? 'fab fa-google text-success' : 'fas fa-cloud';
                                    return `<span class="badge bg-light text-dark me-1"><i class="${iconClass} me-1"></i>${platform}</span>`;
                                }).join('')}
                            </div>
                        </div>
                        <div class="mb-3">
                            <h6>Key Features:</h6>
                            <ul class="list-unstyled">
                                ${tool.features.map(feature => `<li><i class="fas fa-check text-success me-2"></i>${feature}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="mb-3">
                            <h6>Integration Guide:</h6>
                            <p class="small">${tool.integrationGuide}</p>
                        </div>
                        <div>
                            <h6>Cost Model:</h6>
                            <p class="small text-info">${tool.costModel}</p>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = toolsHtml;
    }

    // Load comparison matrix
    loadComparisonMatrix() {
        const container = document.getElementById('comparisonMatrix');
        if (!container) return;

        // Create category-based comparison
        const categories = ['identity', 'threat', 'data', 'network', 'compliance'];
        
        const comparisonHtml = `
            <table class="table table-striped table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>Category</th>
                        <th><i class="fab fa-aws text-warning me-2"></i>AWS</th>
                        <th><i class="fab fa-microsoft text-info me-2"></i>Azure</th>
                        <th><i class="fab fa-google text-success me-2"></i>GCP</th>
                    </tr>
                </thead>
                <tbody>
                    ${categories.map(category => {
                        const awsServices = securityData.awsServices.filter(s => s.category === category);
                        const azureServices = securityData.azureServices.filter(s => s.category === category);
                        const gcpServices = securityData.gcpServices.filter(s => s.category === category);
                        
                        return `
                            <tr>
                                <td><strong>${this.getCategoryName(category)}</strong></td>
                                <td>
                                    ${awsServices.map(s => `<span class="badge bg-warning text-dark me-1 mb-1">${s.name.split(' ').slice(-1)[0]}</span>`).join('')}
                                    <div class="small text-muted">${awsServices.length} services</div>
                                </td>
                                <td>
                                    ${azureServices.map(s => `<span class="badge bg-info me-1 mb-1">${s.name.split(' ').slice(-1)[0]}</span>`).join('')}
                                    <div class="small text-muted">${azureServices.length} services</div>
                                </td>
                                <td>
                                    ${gcpServices.map(s => `<span class="badge bg-success me-1 mb-1">${s.name.split(' ').slice(-1)[0]}</span>`).join('')}
                                    <div class="small text-muted">${gcpServices.length} services</div>
                                </td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
            
            <div class="row mt-4">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header bg-warning text-dark">
                            <h5><i class="fab fa-aws me-2"></i>AWS Strengths</h5>
                        </div>
                        <div class="card-body">
                            <ul class="list-unstyled">
                                <li><i class="fas fa-check text-success me-2"></i>Mature IAM system</li>
                                <li><i class="fas fa-check text-success me-2"></i>Comprehensive logging</li>
                                <li><i class="fas fa-check text-success me-2"></i>Advanced threat detection</li>
                                <li><i class="fas fa-check text-success me-2"></i>Extensive compliance</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header bg-info text-white">
                            <h5><i class="fab fa-microsoft me-2"></i>Azure Strengths</h5>
                        </div>
                        <div class="card-body">
                            <ul class="list-unstyled">
                                <li><i class="fas fa-check text-success me-2"></i>Strong identity integration</li>
                                <li><i class="fas fa-check text-success me-2"></i>Enterprise security</li>
                                <li><i class="fas fa-check text-success me-2"></i>Hybrid cloud security</li>
                                <li><i class="fas fa-check text-success me-2"></i>Advanced analytics</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-header bg-success text-white">
                            <h5><i class="fab fa-google me-2"></i>GCP Strengths</h5>
                        </div>
                        <div class="card-body">
                            <ul class="list-unstyled">
                                <li><i class="fas fa-check text-success me-2"></i>Zero trust architecture</li>
                                <li><i class="fas fa-check text-success me-2"></i>Data protection focus</li>
                                <li><i class="fas fa-check text-success me-2"></i>AI-powered security</li>
                                <li><i class="fas fa-check text-success me-2"></i>Container security</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = comparisonHtml;
    }

    // Apply filters to sections
    applyFilter(section, filter) {
        const container = document.getElementById(`${section}Services`);
        if (!container) return;

        const items = container.querySelectorAll('.service-item');
        items.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Get category display name
    getCategoryName(category) {
        const categoryNames = {
            'identity': 'Identity & Access Management',
            'threat': 'Threat Detection',
            'data': 'Data Protection',
            'network': 'Network Security',
            'compliance': 'Compliance & Governance',
            'governance': 'Governance',
            'application': 'Application Security',
            'vulnerability': 'Vulnerability Scanning',
            'cspm': 'Cloud Security Posture Management',
            'sast': 'Static Application Security Testing',
            'container': 'Container Security'
        };
        return categoryNames[category] || category;
    }

    // Setup back to top button
    setupBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Global functions for onclick handlers
function showSection(sectionName) {
    if (window.app) {
        window.app.showSection(sectionName);
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new DevSecOpsApp();
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DevSecOpsApp;
}