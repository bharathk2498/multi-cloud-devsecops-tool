# Multi-Cloud DevSecOps Reference Tool

## Overview

A comprehensive web-based reference tool for DevSecOps practitioners working across AWS, Azure, and Google Cloud Platform. This tool provides centralized access to security services, compliance frameworks, MITRE ATT&CK mappings, vulnerability tools, and Infrastructure as Code (IaC) security templates.

## Features

### 🛡️ **Security Services Database**
- **AWS Security Services**: IAM, GuardDuty, Security Hub, WAF, and more
- **Azure Security Services**: Azure AD, Security Center, Sentinel, Key Vault
- **GCP Security Services**: Cloud IAM, Security Command Center, Cloud Armor

### 📋 **Compliance Frameworks**
- NIST Cybersecurity Framework
- SOC 2 Type II
- ISO 27001
- CIS Controls
- GDPR compliance mappings

### ⚔️ **MITRE ATT&CK Integration**
- Cloud-specific tactics and techniques
- Platform-specific mitigation strategies
- Threat modeling guidance

### 🔍 **Vulnerability Management**
- Cloud-native security tools comparison
- Attack Surface Management (ASM) methodologies
- Integration guides and best practices

### 🏗️ **Infrastructure as Code Security**
- Secure IaC templates for all three clouds
- Security controls implementation
- Compliance-aligned configurations

## Quick Start

### Prerequisites
- Python 3.11+
- pip package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/bharathk2498/multi-cloud-devsecops-tool.git
cd multi-cloud-devsecops-tool
```

2. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Run the application**
```bash
python main.py
```

5. **Access the web interface**
   - Open browser to `http://localhost:5000`
   - The database will auto-populate with default security data

### Environment Configuration

Set environment variables for production:
```bash
export SESSION_SECRET="your-secure-session-key"
export DATABASE_URL="postgresql://user:pass@localhost/devsecops"  # Optional: defaults to SQLite
```

## Application Structure

```
multi-cloud-devsecops-tool/
├── app.py                 # Flask application factory
├── main.py               # Application entry point
├── models.py             # SQLAlchemy database models
├── routes.py             # Web route handlers
├── data_loader.py        # Initial data population
├── requirements.txt      # Python dependencies
├── data/                 # Security data files
│   ├── security_services.json
│   ├── compliance_frameworks.json
│   ├── mitre_attack.json
│   ├── vulnerability_tools.json
│   └── iac_templates.yaml
├── templates/            # HTML templates
│   ├── index.html
│   ├── aws_security.html
│   ├── azure_security.html
│   ├── gcp_security.html
│   └── ...
└── static/              # CSS/JS assets
    ├── css/
    └── js/
```

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/` | Main dashboard with platform overview |
| `/aws-security` | AWS security services reference |
| `/azure-security` | Azure security services reference |
| `/gcp-security` | GCP security services reference |
| `/compliance` | Compliance frameworks library |
| `/mitre-attack` | MITRE ATT&CK cloud mappings |
| `/vulnerability-tools` | Security tools database |
| `/iac-security` | Infrastructure as Code templates |
| `/comparison` | Cross-platform service comparison |
| `/search?q={query}` | Global search API |

## Database Models

### SecurityService
- Multi-cloud security service definitions
- Implementation guides and best practices
- Cost information and compliance mappings

### ComplianceFramework  
- Industry standard compliance requirements
- Cloud-specific control mappings
- Implementation guidance

### MitreAttackTactic
- MITRE ATT&CK tactics and techniques
- Cloud-specific mitigation strategies
- Threat detection recommendations

### VulnerabilityTool
- Security scanning and assessment tools
- Cloud platform compatibility
- Integration and cost information

### IaCTemplate
- Secure infrastructure code templates
- Security controls implementation
- Compliance alignment notes

## Development

### Adding New Security Services
1. Edit `data/security_services.json`
2. Restart application to reload data
3. Or add via database models programmatically

### Customizing Templates
- Modify HTML templates in `templates/` directory
- Update CSS styles in `static/css/custom.css`
- Enhance JavaScript functionality in `static/js/main.js`

### Database Migration
```bash
# For production deployments with schema changes
from app import app, db
with app.app_context():
    db.create_all()
```

## Production Deployment

### Using Gunicorn
```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Using Docker
```bash
docker build -t devsecops-tool .
docker run -p 5000:5000 -e SESSION_SECRET="your-key" devsecops-tool
```

### Environment Variables
- `SESSION_SECRET`: Secure session encryption key
- `DATABASE_URL`: PostgreSQL connection string (optional)
- `PORT`: Application port (default: 5000)

## Security Considerations

### Production Checklist
- [ ] Change default session secret
- [ ] Use PostgreSQL in production
- [ ] Enable HTTPS with reverse proxy
- [ ] Configure proper CORS headers
- [ ] Implement rate limiting
- [ ] Set up monitoring and logging
- [ ] Regular security updates

### Database Security
- Uses SQLAlchemy ORM with parameterized queries
- No direct SQL injection vulnerabilities
- Session management with secure cookies

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Adding New Cloud Providers
1. Extend models with new provider support
2. Add provider-specific templates
3. Update data loader with new services
4. Add route handlers for new provider

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

**Bharath Kumar Byru**
- Multi-domain tech expert specializing in Cybersecurity, Cloud Security, DevSecOps, and AI automation
- GitHub: [@bharathk2498](https://github.com/bharathk2498)

## Acknowledgments

- MITRE ATT&CK Framework for threat modeling methodology
- Cloud Security Alliance for best practices guidance
- NIST Cybersecurity Framework for compliance structure
- Open source security community for tools and techniques

---

**Executive Summary**: This tool consolidates disparate cloud security knowledge into a single, searchable interface, reducing research time from hours to minutes for security architects and DevSecOps engineers across multi-cloud environments.
