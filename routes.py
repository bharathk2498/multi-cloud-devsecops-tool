from flask import render_template, request, jsonify
from app import app, db
from models import SecurityService, ComplianceFramework, MitreAttackTactic, VulnerabilityTool, IaCTemplate
from sqlalchemy import or_

@app.route('/')
def index():
    """Main dashboard with overview of all platforms and features"""
    aws_count = SecurityService.query.filter_by(cloud_provider='AWS').count()
    azure_count = SecurityService.query.filter_by(cloud_provider='Azure').count()
    gcp_count = SecurityService.query.filter_by(cloud_provider='GCP').count()
    compliance_count = ComplianceFramework.query.count()
    
    return render_template('index.html', 
                         aws_count=aws_count,
                         azure_count=azure_count, 
                         gcp_count=gcp_count,
                         compliance_count=compliance_count)

@app.route('/aws-security')
def aws_security():
    """AWS Security Services comprehensive reference"""
    services = SecurityService.query.filter_by(cloud_provider='AWS').all()
    categories = db.session.query(SecurityService.category).filter_by(cloud_provider='AWS').distinct().all()
    categories = [cat[0] for cat in categories]
    
    return render_template('aws_security.html', services=services, categories=categories)

@app.route('/azure-security')
def azure_security():
    """Azure Security Services comprehensive reference"""
    services = SecurityService.query.filter_by(cloud_provider='Azure').all()
    categories = db.session.query(SecurityService.category).filter_by(cloud_provider='Azure').distinct().all()
    categories = [cat[0] for cat in categories]
    
    return render_template('azure_security.html', services=services, categories=categories)

@app.route('/gcp-security')
def gcp_security():
    """Google Cloud Security Services comprehensive reference"""
    services = SecurityService.query.filter_by(cloud_provider='GCP').all()
    categories = db.session.query(SecurityService.category).filter_by(cloud_provider='GCP').distinct().all()
    categories = [cat[0] for cat in categories]
    
    return render_template('gcp_security.html', services=services, categories=categories)

@app.route('/attack-surface')
def attack_surface():
    """Advanced Attack Surface Management methodology"""
    tools = VulnerabilityTool.query.filter(VulnerabilityTool.category.in_(['ASM', 'Vulnerability Scanning', 'CSPM'])).all()
    return render_template('attack_surface.html', tools=tools)

@app.route('/compliance')
def compliance():
    """Multi-standard compliance library"""
    frameworks = ComplianceFramework.query.all()
    return render_template('compliance.html', frameworks=frameworks)

@app.route('/mitre-attack')
def mitre_attack():
    """MITRE ATT&CK framework with cloud-specific tactics"""
    tactics = MitreAttackTactic.query.all()
    return render_template('mitre_attack.html', tactics=tactics)

@app.route('/iac-security')
def iac_security():
    """Infrastructure as Code security best practices"""
    templates = IaCTemplate.query.all()
    providers = db.session.query(IaCTemplate.cloud_provider).distinct().all()
    providers = [provider[0] for provider in providers]
    
    return render_template('iac_security.html', templates=templates, providers=providers)

@app.route('/vulnerability-tools')
def vulnerability_tools():
    """Security vulnerability and configuration scan tools database"""
    tools = VulnerabilityTool.query.all()
    categories = db.session.query(VulnerabilityTool.category).distinct().all()
    categories = [cat[0] for cat in categories]
    
    return render_template('vulnerability_tools.html', tools=tools, categories=categories)

@app.route('/comparison')
def comparison():
    """Cloud platform comparison matrices for security services"""
    aws_services = SecurityService.query.filter_by(cloud_provider='AWS').all()
    azure_services = SecurityService.query.filter_by(cloud_provider='Azure').all()
    gcp_services = SecurityService.query.filter_by(cloud_provider='GCP').all()
    
    return render_template('comparison.html', 
                         aws_services=aws_services,
                         azure_services=azure_services,
                         gcp_services=gcp_services)

@app.route('/search')
def search():
    """Global search across all content"""
    query = request.args.get('q', '')
    if not query:
        return jsonify([])
    
    # Search across multiple models
    services = SecurityService.query.filter(
        or_(SecurityService.name.contains(query),
            SecurityService.description.contains(query))
    ).limit(10).all()
    
    tools = VulnerabilityTool.query.filter(
        or_(VulnerabilityTool.name.contains(query),
            VulnerabilityTool.description.contains(query))
    ).limit(10).all()
    
    results = []
    for service in services:
        results.append({
            'type': 'Security Service',
            'name': service.name,
            'provider': service.cloud_provider,
            'url': f'/{service.cloud_provider.lower()}-security'
        })
    
    for tool in tools:
        results.append({
            'type': 'Vulnerability Tool',
            'name': tool.name,
            'category': tool.category,
            'url': '/vulnerability-tools'
        })
    
    return jsonify(results)
