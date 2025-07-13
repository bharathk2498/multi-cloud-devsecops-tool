import json
import yaml
import os
from app import db
from models import SecurityService, ComplianceFramework, MitreAttackTactic, VulnerabilityTool, IaCTemplate

def load_initial_data():
    """Load initial data into the database if it's empty"""
    if SecurityService.query.count() > 0:
        return  # Data already loaded
    
    # Load security services data
    load_security_services()
    load_compliance_frameworks()
    load_mitre_attack_data()
    load_vulnerability_tools()
    load_iac_templates()
    
    db.session.commit()

def load_security_services():
    """Load AWS, Azure, and GCP security services"""
    try:
        with open('data/security_services.json', 'r') as f:
            data = json.load(f)
            
        for service_data in data:
            service = SecurityService(
                name=service_data['name'],
                cloud_provider=service_data['cloud_provider'],
                category=service_data['category'],
                description=service_data['description'],
                features=service_data.get('features', []),
                implementation_guide=service_data.get('implementation_guide', ''),
                best_practices=service_data.get('best_practices', []),
                cost_info=service_data.get('cost_info', ''),
                compliance_frameworks=service_data.get('compliance_frameworks', [])
            )
            db.session.add(service)
    except FileNotFoundError:
        # Create default data if file doesn't exist
        create_default_security_services()

def load_compliance_frameworks():
    """Load compliance frameworks data"""
    try:
        with open('data/compliance_frameworks.json', 'r') as f:
            data = json.load(f)
            
        for framework_data in data:
            framework = ComplianceFramework(
                name=framework_data['name'],
                description=framework_data['description'],
                controls=framework_data.get('controls', []),
                aws_mappings=framework_data.get('aws_mappings', {}),
                azure_mappings=framework_data.get('azure_mappings', {}),
                gcp_mappings=framework_data.get('gcp_mappings', {})
            )
            db.session.add(framework)
    except FileNotFoundError:
        create_default_compliance_frameworks()

def load_mitre_attack_data():
    """Load MITRE ATT&CK tactics and techniques"""
    try:
        with open('data/mitre_attack.json', 'r') as f:
            data = json.load(f)
            
        for tactic_data in data:
            tactic = MitreAttackTactic(
                tactic_id=tactic_data['tactic_id'],
                name=tactic_data['name'],
                description=tactic_data['description'],
                techniques=tactic_data.get('techniques', []),
                aws_mitigations=tactic_data.get('aws_mitigations', []),
                azure_mitigations=tactic_data.get('azure_mitigations', []),
                gcp_mitigations=tactic_data.get('gcp_mitigations', [])
            )
            db.session.add(tactic)
    except FileNotFoundError:
        create_default_mitre_data()

def load_vulnerability_tools():
    """Load vulnerability scanning and security tools"""
    try:
        with open('data/vulnerability_tools.json', 'r') as f:
            data = json.load(f)
            
        for tool_data in data:
            tool = VulnerabilityTool(
                name=tool_data['name'],
                category=tool_data['category'],
                cloud_platforms=tool_data.get('cloud_platforms', []),
                description=tool_data['description'],
                features=tool_data.get('features', []),
                integration_guide=tool_data.get('integration_guide', ''),
                cost_model=tool_data.get('cost_model', 'Unknown')
            )
            db.session.add(tool)
    except FileNotFoundError:
        create_default_vulnerability_tools()

def load_iac_templates():
    """Load Infrastructure as Code templates"""
    try:
        with open('data/iac_templates.yaml', 'r') as f:
            data = yaml.safe_load(f)
            
        for template_data in data:
            template = IaCTemplate(
                name=template_data['name'],
                cloud_provider=template_data['cloud_provider'],
                category=template_data['category'],
                description=template_data['description'],
                template_content=template_data['template_content'],
                security_controls=template_data.get('security_controls', []),
                compliance_notes=template_data.get('compliance_notes', '')
            )
            db.session.add(template)
    except FileNotFoundError:
        create_default_iac_templates()

def create_default_security_services():
    """Create default security services data"""
    # Ensure data directory exists
    os.makedirs('data', exist_ok=True)
    
    default_services = [
        # AWS Security Services
        {
            "name": "AWS Identity and Access Management (IAM)",
            "cloud_provider": "AWS",
            "category": "Identity & Access Management",
            "description": "Securely manage access to AWS services and resources for your users",
            "features": ["User Management", "Role-based Access", "Multi-factor Authentication", "Identity Federation"],
            "implementation_guide": "Create users, groups, and roles with least privilege principle. Enable MFA for all users.",
            "best_practices": ["Use roles instead of users for applications", "Enable MFA", "Regular access reviews"],
            "cost_info": "Free service - no additional charges",
            "compliance_frameworks": ["SOC 2", "ISO 27001", "FedRAMP"]
        },
        {
            "name": "Amazon GuardDuty",
            "cloud_provider": "AWS",
            "category": "Threat Detection",
            "description": "Intelligent threat detection service that continuously monitors your AWS accounts and workloads",
            "features": ["Machine Learning Detection", "Threat Intelligence", "DNS Logs Analysis", "VPC Flow Logs"],
            "implementation_guide": "Enable GuardDuty in all regions. Configure SNS notifications for findings.",
            "best_practices": ["Enable in all regions", "Integrate with Security Hub", "Automate response actions"],
            "cost_info": "Usage-based pricing starting at $4.00 per million events",
            "compliance_frameworks": ["SOC 2", "PCI DSS"]
        },
        # Azure Security Services
        {
            "name": "Azure Active Directory",
            "cloud_provider": "Azure",
            "category": "Identity & Access Management",
            "description": "Cloud-based identity and access management service",
            "features": ["Single Sign-On", "Multi-factor Authentication", "Conditional Access", "Identity Protection"],
            "implementation_guide": "Configure conditional access policies. Enable identity protection features.",
            "best_practices": ["Use Conditional Access", "Enable PIM", "Regular access reviews"],
            "cost_info": "Free tier available, Premium P1/P2 licenses for advanced features",
            "compliance_frameworks": ["SOC 2", "ISO 27001", "HIPAA"]
        },
        {
            "name": "Azure Security Center",
            "cloud_provider": "Azure",
            "category": "Cloud Security Posture Management",
            "description": "Unified security management system that strengthens security posture of data centers",
            "features": ["Security Assessments", "Threat Protection", "Compliance Dashboard", "Regulatory Compliance"],
            "implementation_guide": "Enable Security Center for all subscriptions. Configure security policies.",
            "best_practices": ["Enable auto-provisioning", "Configure email notifications", "Regular compliance reviews"],
            "cost_info": "Free tier available, Standard tier for advanced features",
            "compliance_frameworks": ["Azure Security Benchmark", "NIST", "ISO 27001"]
        },
        # Google Cloud Security Services
        {
            "name": "Google Cloud Identity and Access Management",
            "cloud_provider": "GCP",
            "category": "Identity & Access Management",
            "description": "Control who has access to what resources in Google Cloud",
            "features": ["IAM Policies", "Service Accounts", "IAM Conditions", "Policy Intelligence"],
            "implementation_guide": "Apply principle of least privilege. Use predefined roles when possible.",
            "best_practices": ["Use IAM Conditions", "Regular policy reviews", "Enable audit logging"],
            "cost_info": "No additional cost for IAM features",
            "compliance_frameworks": ["SOC 2", "ISO 27001", "FedRAMP"]
        },
        {
            "name": "Google Cloud Security Command Center",
            "cloud_provider": "GCP",
            "category": "Cloud Security Posture Management",
            "description": "Centralized security and risk management platform for Google Cloud",
            "features": ["Asset Discovery", "Vulnerability Assessment", "Threat Detection", "Compliance Monitoring"],
            "implementation_guide": "Enable SCC for all projects. Configure notification channels.",
            "best_practices": ["Regular asset inventory", "Automated finding remediation", "Continuous monitoring"],
            "cost_info": "Standard tier free, Premium tier for advanced features",
            "compliance_frameworks": ["CIS Controls", "NIST CSF", "ISO 27001"]
        }
    ]
    
    with open('data/security_services.json', 'w') as f:
        json.dump(default_services, f, indent=2)
    
    for service_data in default_services:
        service = SecurityService(
            name=service_data['name'],
            cloud_provider=service_data['cloud_provider'],
            category=service_data['category'],
            description=service_data['description'],
            features=service_data.get('features', []),
            implementation_guide=service_data.get('implementation_guide', ''),
            best_practices=service_data.get('best_practices', []),
            cost_info=service_data.get('cost_info', ''),
            compliance_frameworks=service_data.get('compliance_frameworks', [])
        )
        db.session.add(service)

def create_default_compliance_frameworks():
    """Create default compliance frameworks"""
    default_frameworks = [
        {
            "name": "NIST Cybersecurity Framework",
            "description": "Framework for improving critical infrastructure cybersecurity",
            "controls": ["Identify", "Protect", "Detect", "Respond", "Recover"],
            "aws_mappings": {"Identify": ["Config", "CloudTrail"], "Protect": ["IAM", "WAF"]},
            "azure_mappings": {"Identify": ["Security Center"], "Protect": ["Azure AD"]},
            "gcp_mappings": {"Identify": ["Security Command Center"], "Protect": ["Cloud IAM"]}
        },
        {
            "name": "SOC 2 Type II",
            "description": "Security, availability, processing integrity, confidentiality, and privacy controls",
            "controls": ["Security", "Availability", "Processing Integrity", "Confidentiality", "Privacy"],
            "aws_mappings": {"Security": ["GuardDuty", "IAM"], "Availability": ["Auto Scaling"]},
            "azure_mappings": {"Security": ["Security Center"], "Availability": ["Load Balancer"]},
            "gcp_mappings": {"Security": ["Security Command Center"], "Availability": ["Load Balancing"]}
        }
    ]
    
    with open('data/compliance_frameworks.json', 'w') as f:
        json.dump(default_frameworks, f, indent=2)
    
    for framework_data in default_frameworks:
        framework = ComplianceFramework(
            name=framework_data['name'],
            description=framework_data['description'],
            controls=framework_data.get('controls', []),
            aws_mappings=framework_data.get('aws_mappings', {}),
            azure_mappings=framework_data.get('azure_mappings', {}),
            gcp_mappings=framework_data.get('gcp_mappings', {})
        )
        db.session.add(framework)

def create_default_mitre_data():
    """Create default MITRE ATT&CK data"""
    default_tactics = [
        {
            "tactic_id": "TA0001",
            "name": "Initial Access",
            "description": "Techniques used to gain an initial foothold within a network",
            "techniques": ["T1190", "T1133", "T1078"],
            "aws_mitigations": ["WAF", "GuardDuty", "VPC Security Groups"],
            "azure_mitigations": ["Application Gateway WAF", "Azure Sentinel", "Network Security Groups"],
            "gcp_mitigations": ["Cloud Armor", "Security Command Center", "VPC Firewall Rules"]
        },
        {
            "tactic_id": "TA0003",
            "name": "Persistence",
            "description": "Techniques used to maintain access to systems across restarts",
            "techniques": ["T1098", "T1136", "T1543"],
            "aws_mitigations": ["CloudTrail", "Config", "IAM Access Analyzer"],
            "azure_mitigations": ["Azure Monitor", "Azure AD Audit Logs", "Security Center"],
            "gcp_mitigations": ["Cloud Audit Logs", "Cloud Asset Inventory", "Policy Intelligence"]
        }
    ]
    
    with open('data/mitre_attack.json', 'w') as f:
        json.dump(default_tactics, f, indent=2)
    
    for tactic_data in default_tactics:
        tactic = MitreAttackTactic(
            tactic_id=tactic_data['tactic_id'],
            name=tactic_data['name'],
            description=tactic_data['description'],
            techniques=tactic_data.get('techniques', []),
            aws_mitigations=tactic_data.get('aws_mitigations', []),
            azure_mitigations=tactic_data.get('azure_mitigations', []),
            gcp_mitigations=tactic_data.get('gcp_mitigations', [])
        )
        db.session.add(tactic)

def create_default_vulnerability_tools():
    """Create default vulnerability scanning tools"""
    default_tools = [
        {
            "name": "AWS Inspector",
            "category": "Vulnerability Scanning",
            "cloud_platforms": ["AWS"],
            "description": "Automated security assessment service for applications deployed on AWS",
            "features": ["Application Security Assessment", "Network Reachability Analysis", "Runtime Behavior Analysis"],
            "integration_guide": "Install Inspector agent on EC2 instances. Create assessment targets and templates.",
            "cost_model": "Per assessment run"
        },
        {
            "name": "Azure Defender",
            "category": "Cloud Security Posture Management",
            "cloud_platforms": ["Azure"],
            "description": "Cloud-native security solution for workload protection",
            "features": ["Threat Protection", "Vulnerability Assessment", "Security Alerts", "JIT Access"],
            "integration_guide": "Enable Defender for specific resource types in Security Center.",
            "cost_model": "Per resource per month"
        },
        {
            "name": "Google Cloud Security Scanner",
            "category": "Web Application Security",
            "cloud_platforms": ["GCP"],
            "description": "Web security scanner for common vulnerabilities in App Engine applications",
            "features": ["XSS Detection", "Injection Flaws", "Sensitive Data Exposure", "Security Misconfigurations"],
            "integration_guide": "Configure scanning from Security Command Center or via API.",
            "cost_model": "Free with usage limits"
        }
    ]
    
    with open('data/vulnerability_tools.json', 'w') as f:
        json.dump(default_tools, f, indent=2)
    
    for tool_data in default_tools:
        tool = VulnerabilityTool(
            name=tool_data['name'],
            category=tool_data['category'],
            cloud_platforms=tool_data.get('cloud_platforms', []),
            description=tool_data['description'],
            features=tool_data.get('features', []),
            integration_guide=tool_data.get('integration_guide', ''),
            cost_model=tool_data.get('cost_model', 'Unknown')
        )
        db.session.add(tool)

def create_default_iac_templates():
    """Create default IaC templates"""
    default_templates = [
        {
            "name": "AWS VPC with Security Groups",
            "cloud_provider": "AWS",
            "category": "Network Security",
            "description": "Secure VPC configuration with properly configured security groups",
            "template_content": """# AWS VPC with Security Best Practices
Resources:
  VPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16
      EnableDnsHostnames: true
      EnableDnsSupport: true
      
  PrivateSubnet:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.1.0/24
      MapPublicIpOnLaunch: false
      
  SecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Secure security group
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 443
          ToPort: 443
          CidrIp: 0.0.0.0/0""",
            "security_controls": ["Network Segmentation", "Least Privilege Access", "Traffic Encryption"],
            "compliance_notes": "Follows AWS Security Best Practices and CIS Controls"
        },
        {
            "name": "Azure Network Security Groups",
            "cloud_provider": "Azure",
            "category": "Network Security",
            "description": "Azure NSG configuration with security best practices",
            "template_content": """# Azure Network Security Group Template
resource "azurerm_network_security_group" "secure_nsg" {
  name                = "secure-nsg"
  location            = var.location
  resource_group_name = var.resource_group_name

  security_rule {
    name                       = "AllowHTTPS"
    priority                   = 1001
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "443"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  security_rule {
    name                       = "DenyAllInbound"
    priority                   = 4096
    direction                  = "Inbound"
    access                     = "Deny"
    protocol                   = "*"
    source_port_range          = "*"
    destination_port_range     = "*"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
}""",
            "security_controls": ["Default Deny", "Explicit Allow Rules", "Priority-based Rules"],
            "compliance_notes": "Aligns with Azure Security Baseline and CIS Controls"
        }
    ]
    
    with open('data/iac_templates.yaml', 'w') as f:
        yaml.dump(default_templates, f, default_flow_style=False)
    
    for template_data in default_templates:
        template = IaCTemplate(
            name=template_data['name'],
            cloud_provider=template_data['cloud_provider'],
            category=template_data['category'],
            description=template_data['description'],
            template_content=template_data['template_content'],
            security_controls=template_data.get('security_controls', []),
            compliance_notes=template_data.get('compliance_notes', '')
        )
        db.session.add(template)
