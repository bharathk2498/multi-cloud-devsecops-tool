// Multi-Cloud DevSecOps Tool - Static Data
// This file contains all the security services, compliance frameworks, and tools data

const securityData = {
    // AWS Security Services
    awsServices: [
        {
            name: "AWS Identity and Access Management (IAM)",
            category: "identity",
            description: "Securely manage access to AWS services and resources for your users",
            features: ["User Management", "Role-based Access", "Multi-factor Authentication", "Identity Federation"],
            implementationGuide: "Create users, groups, and roles with least privilege principle. Enable MFA for all users.",
            bestPractices: ["Use roles instead of users for applications", "Enable MFA", "Regular access reviews"],
            costInfo: "Free service - no additional charges",
            complianceFrameworks: ["SOC 2", "ISO 27001", "FedRAMP"]
        },
        {
            name: "Amazon GuardDuty",
            category: "threat",
            description: "Intelligent threat detection service that continuously monitors your AWS accounts and workloads",
            features: ["Machine Learning Detection", "Threat Intelligence", "DNS Logs Analysis", "VPC Flow Logs"],
            implementationGuide: "Enable GuardDuty in all regions. Configure SNS notifications for findings.",
            bestPractices: ["Enable in all regions", "Integrate with Security Hub", "Automate response actions"],
            costInfo: "Usage-based pricing starting at $4.00 per million events",
            complianceFrameworks: ["SOC 2", "PCI DSS"]
        },
        {
            name: "AWS Security Hub",
            category: "compliance",
            description: "Centrally manage security findings and compliance status across AWS accounts",
            features: ["Security Standards", "Findings Aggregation", "Compliance Dashboard", "Custom Insights"],
            implementationGuide: "Enable Security Hub and activate security standards. Configure finding filters.",
            bestPractices: ["Enable all security standards", "Custom insights for monitoring", "Automated remediation"],
            costInfo: "$0.0030 per finding ingested per month",
            complianceFrameworks: ["CIS", "PCI DSS", "AWS Foundational"]
        },
        {
            name: "AWS WAF",
            category: "network",
            description: "Web application firewall that protects web applications from common web exploits",
            features: ["Rule-based Protection", "Rate Limiting", "Bot Control", "Managed Rules"],
            implementationGuide: "Create web ACLs with appropriate rules. Associate with CloudFront or ALB.",
            bestPractices: ["Use managed rule groups", "Enable logging", "Monitor blocked requests"],
            costInfo: "$1.00 per web ACL per month + $0.60 per million requests",
            complianceFrameworks: ["OWASP Top 10", "PCI DSS"]
        },
        {
            name: "Amazon Inspector",
            category: "compliance",
            description: "Automated security assessment service for applications deployed on AWS",
            features: ["Vulnerability Assessment", "Network Reachability", "Security Best Practices", "Continuous Monitoring"],
            implementationGuide: "Install Inspector agent on EC2 instances. Create assessment targets and templates.",
            bestPractices: ["Regular assessment runs", "Remediate high severity findings", "Integrate with CI/CD"],
            costInfo: "Per agent assessment pricing varies by package",
            complianceFrameworks: ["CIS", "Security Best Practices"]
        },
        {
            name: "AWS CloudTrail",
            category: "compliance",
            description: "Service that enables governance, compliance, operational auditing of your AWS account",
            features: ["API Logging", "Event History", "Data Events", "Insights"],
            implementationGuide: "Create trails for all regions. Configure S3 bucket with appropriate permissions.",
            bestPractices: ["Enable for all regions", "Use CloudWatch integration", "Set up log file validation"],
            costInfo: "First trail per region free, $2.00 per 100,000 events thereafter",
            complianceFrameworks: ["SOX", "HIPAA", "PCI DSS"]
        },
        {
            name: "AWS Key Management Service (KMS)",
            category: "data",
            description: "Managed service that makes it easy to create and control encryption keys",
            features: ["Envelope Encryption", "Key Rotation", "Access Policies", "CloudHSM Integration"],
            implementationGuide: "Create customer managed keys with appropriate policies. Use for service encryption.",
            bestPractices: ["Enable key rotation", "Use separate keys per service", "Monitor key usage"],
            costInfo: "$1.00 per key per month + usage charges",
            complianceFrameworks: ["FIPS 140-2", "Common Criteria"]
        },
        {
            name: "Amazon Macie",
            category: "data",
            description: "Fully managed data security and data privacy service using machine learning",
            features: ["Data Discovery", "Classification", "PII Detection", "Sensitive Data Alerts"],
            implementationGuide: "Enable Macie and configure S3 bucket scanning. Set up finding notifications.",
            bestPractices: ["Regular scanning schedules", "Custom data types", "Integration with Security Hub"],
            costInfo: "$1.25 per GB of data scanned per month",
            complianceFrameworks: ["GDPR", "CCPA", "HIPAA"]
        },
        {
            name: "AWS Config",
            category: "compliance",
            description: "Service that enables you to assess, audit, and evaluate configurations of AWS resources",
            features: ["Configuration Recording", "Compliance Rules", "Change Tracking", "Remediation"],
            implementationGuide: "Enable Config recorder and delivery channel. Configure compliance rules.",
            bestPractices: ["Enable for all supported resources", "Use conformance packs", "Automated remediation"],
            costInfo: "$0.003 per configuration item recorded",
            complianceFrameworks: ["CIS", "PCI DSS", "NIST"]
        },
        {
            name: "Amazon Cognito",
            category: "identity",
            description: "User identity and data synchronization service for mobile and web applications",
            features: ["User Pools", "Identity Pools", "Social Identity Providers", "MFA"],
            implementationGuide: "Create user pools with appropriate policies. Configure identity providers.",
            bestPractices: ["Enable MFA", "Use custom attributes carefully", "Monitor sign-in patterns"],
            costInfo: "50,000 monthly active users free, then $0.0055 per MAU",
            complianceFrameworks: ["SOC 2", "HIPAA eligible"]
        },
        {
            name: "AWS Systems Manager",
            category: "compliance",
            description: "Gives you visibility and control of your infrastructure on AWS",
            features: ["Patch Manager", "State Manager", "Parameter Store", "Session Manager"],
            implementationGuide: "Install SSM agent on instances. Configure maintenance windows and patch baselines.",
            bestPractices: ["Automate patching", "Use parameter store for secrets", "Enable session logging"],
            costInfo: "No additional charge for most features",
            complianceFrameworks: ["CIS", "NIST"]
        },
        {
            name: "AWS Secrets Manager",
            category: "data",
            description: "Helps you protect secrets needed to access your applications, services, and IT resources",
            features: ["Automatic Rotation", "Fine-grained Permissions", "Audit Trail", "Cross-region Replication"],
            implementationGuide: "Store secrets with automatic rotation enabled. Use IAM for access control.",
            bestPractices: ["Enable automatic rotation", "Use resource-based policies", "Monitor access patterns"],
            costInfo: "$0.40 per secret per month + $0.05 per 10,000 API calls",
            complianceFrameworks: ["SOC 2", "PCI DSS"]
        },
        {
            name: "AWS Shield",
            category: "network",
            description: "Managed Distributed Denial of Service (DDoS) protection service",
            features: ["DDoS Protection", "Always-on Detection", "Attack Diagnostics", "Cost Protection"],
            implementationGuide: "Shield Standard is automatic. Upgrade to Advanced for enhanced protection.",
            bestPractices: ["Use with CloudFront", "Configure health checks", "Set up notifications"],
            costInfo: "Standard free, Advanced $3,000 per month",
            complianceFrameworks: ["DDoS Best Practices"]
        },
        {
            name: "AWS Certificate Manager",
            category: "data",
            description: "Service that lets you easily provision, manage, and deploy SSL/TLS certificates",
            features: ["Free SSL Certificates", "Automatic Renewal", "Integration with AWS Services", "Private CA"],
            implementationGuide: "Request certificates through ACM. Associate with supported AWS services.",
            bestPractices: ["Use DNS validation", "Enable certificate transparency logging", "Monitor expiration"],
            costInfo: "Free for certificates used with AWS services",
            complianceFrameworks: ["PKI Best Practices"]
        },
        {
            name: "Amazon Detective",
            category: "threat",
            description: "Security service that uses machine learning to analyze and visualize security data",
            features: ["Behavior Analysis", "Visual Investigation", "Finding Groups", "Evidence Integration"],
            implementationGuide: "Enable Detective and integrate with GuardDuty and Security Hub findings.",
            bestPractices: ["Regular investigation workflows", "Team training on interface", "Export findings"],
            costInfo: "Based on volume of data ingested and analyzed",
            complianceFrameworks: ["SOC 2", "ISO 27001"]
        }
    ],

    // Azure Security Services
    azureServices: [
        {
            name: "Azure Active Directory",
            category: "identity",
            description: "Cloud-based identity and access management service",
            features: ["Single Sign-On", "Multi-factor Authentication", "Conditional Access", "Identity Protection"],
            implementationGuide: "Configure conditional access policies. Enable identity protection features.",
            bestPractices: ["Use Conditional Access", "Enable PIM", "Regular access reviews"],
            costInfo: "Free tier available, Premium P1/P2 licenses for advanced features",
            complianceFrameworks: ["SOC 2", "ISO 27001", "HIPAA"]
        },
        {
            name: "Azure Security Center",
            category: "governance",
            description: "Unified security management system that strengthens security posture",
            features: ["Security Assessments", "Threat Protection", "Compliance Dashboard", "Regulatory Compliance"],
            implementationGuide: "Enable Security Center for all subscriptions. Configure security policies.",
            bestPractices: ["Enable auto-provisioning", "Configure email notifications", "Regular compliance reviews"],
            costInfo: "Free tier available, Standard tier for advanced features",
            complianceFrameworks: ["Azure Security Benchmark", "NIST", "ISO 27001"]
        },
        {
            name: "Azure Sentinel",
            category: "threat",
            description: "Cloud-native security information and event management (SIEM) service",
            features: ["Data Connectors", "Analytics Rules", "Hunting Queries", "Incident Response"],
            implementationGuide: "Deploy workspace and configure data connectors. Set up analytics rules.",
            bestPractices: ["Use built-in connectors", "Custom hunting queries", "Automated playbooks"],
            costInfo: "Pay-as-you-go based on data ingestion and retention",
            complianceFrameworks: ["SOC 2", "ISO 27001"]
        },
        {
            name: "Azure Key Vault",
            category: "data",
            description: "Cloud service for securely storing and accessing secrets",
            features: ["Key Management", "Secret Management", "Certificate Management", "HSM-backed Keys"],
            implementationGuide: "Create key vault with appropriate access policies. Enable soft delete.",
            bestPractices: ["Use managed identities", "Enable logging", "Regular key rotation"],
            costInfo: "Per operation pricing, HSM-backed keys additional cost",
            complianceFrameworks: ["FIPS 140-2", "Common Criteria"]
        },
        {
            name: "Azure Defender",
            category: "threat",
            description: "Extended detection and response (XDR) solution for hybrid cloud workloads",
            features: ["Threat Protection", "Vulnerability Assessment", "Security Alerts", "JIT Access"],
            implementationGuide: "Enable Defender for specific resource types in Security Center.",
            bestPractices: ["Enable for all resource types", "Configure alert rules", "Regular security reviews"],
            costInfo: "Per resource per month pricing varies by service",
            complianceFrameworks: ["CIS", "NIST"]
        },
        {
            name: "Azure Application Gateway WAF",
            category: "network",
            description: "Web application firewall providing centralized protection for web applications",
            features: ["OWASP Protection", "Custom Rules", "Bot Protection", "Rate Limiting"],
            implementationGuide: "Configure WAF policies and associate with Application Gateway.",
            bestPractices: ["Use managed rule sets", "Monitor blocked requests", "Regular rule updates"],
            costInfo: "Included with Application Gateway, additional WAF charges apply",
            complianceFrameworks: ["OWASP Top 10", "PCI DSS"]
        },
        {
            name: "Azure Information Protection",
            category: "data",
            description: "Cloud-based solution to classify, label, and protect documents and emails",
            features: ["Data Classification", "Labeling", "Rights Management", "Usage Tracking"],
            implementationGuide: "Configure classification labels and policies. Deploy AIP client.",
            bestPractices: ["Train users on labeling", "Monitor usage reports", "Regular policy reviews"],
            costInfo: "Included in Microsoft 365 plans, standalone plans available",
            complianceFrameworks: ["GDPR", "HIPAA", "SOX"]
        },
        {
            name: "Azure Monitor",
            category: "governance",
            description: "Comprehensive monitoring solution for collecting, analyzing, and responding to telemetry",
            features: ["Metrics", "Logs", "Alerts", "Dashboards", "Application Insights"],
            implementationGuide: "Configure data collection rules and alert conditions.",
            bestPractices: ["Use action groups", "Create custom dashboards", "Set up log retention"],
            costInfo: "Pay-as-you-go based on data ingestion and retention",
            complianceFrameworks: ["SOC 2", "ISO 27001"]
        },
        {
            name: "Azure Policy",
            category: "governance",
            description: "Service that allows you to create, assign, and manage policies in Azure",
            features: ["Policy Definitions", "Compliance Reporting", "Remediation", "Initiative Definitions"],
            implementationGuide: "Create policy definitions and assign to appropriate scopes.",
            bestPractices: ["Use built-in policies", "Regular compliance reviews", "Automated remediation"],
            costInfo: "No additional cost for the service itself",
            complianceFrameworks: ["CIS", "NIST", "ISO 27001"]
        },
        {
            name: "Azure Bastion",
            category: "network",
            description: "Fully managed service that provides secure RDP and SSH connectivity",
            features: ["Browser-based Access", "No Public IPs", "SSL Protection", "Audit Logging"],
            implementationGuide: "Deploy Bastion in virtual network subnet. Configure NSG rules.",
            bestPractices: ["Use dedicated subnet", "Enable diagnostic logging", "Monitor session activities"],
            costInfo: "Hourly pricing based on deployment time",
            complianceFrameworks: ["CIS", "NIST"]
        },
        {
            name: "Azure DDoS Protection",
            category: "network",
            description: "DDoS mitigation service that provides protection against DDoS attacks",
            features: ["Always-on Monitoring", "Adaptive Tuning", "Attack Analytics", "Cost Protection"],
            implementationGuide: "Enable DDoS Protection Standard on virtual networks.",
            bestPractices: ["Configure telemetry", "Set up alerts", "Regular testing"],
            costInfo: "Standard tier $2,944 per month per protected virtual network",
            complianceFrameworks: ["DDoS Best Practices"]
        },
        {
            name: "Azure Privileged Identity Management",
            category: "identity",
            description: "Service that enables you to manage, control, and monitor access to important resources",
            features: ["Just-in-time Access", "Access Reviews", "Approval Workflows", "Risk-based Activation"],
            implementationGuide: "Configure eligible assignments and activation settings.",
            bestPractices: ["Regular access reviews", "Use approval workflows", "Monitor privileged activities"],
            costInfo: "Included in Azure AD Premium P2",
            complianceFrameworks: ["SOC 2", "ISO 27001"]
        }
    ],

    // GCP Security Services
    gcpServices: [
        {
            name: "Google Cloud Identity and Access Management",
            category: "identity",
            description: "Control who has access to what resources in Google Cloud",
            features: ["IAM Policies", "Service Accounts", "IAM Conditions", "Policy Intelligence"],
            implementationGuide: "Apply principle of least privilege. Use predefined roles when possible.",
            bestPractices: ["Use IAM Conditions", "Regular policy reviews", "Enable audit logging"],
            costInfo: "No additional cost for IAM features",
            complianceFrameworks: ["SOC 2", "ISO 27001", "FedRAMP"]
        },
        {
            name: "Google Cloud Security Command Center",
            category: "threat",
            description: "Centralized security and risk management platform for Google Cloud",
            features: ["Asset Discovery", "Vulnerability Assessment", "Threat Detection", "Compliance Monitoring"],
            implementationGuide: "Enable SCC for all projects. Configure notification channels.",
            bestPractices: ["Regular asset inventory", "Automated finding remediation", "Continuous monitoring"],
            costInfo: "Standard tier free, Premium tier for advanced features",
            complianceFrameworks: ["CIS Controls", "NIST CSF", "ISO 27001"]
        },
        {
            name: "Google Cloud Armor",
            category: "network",
            description: "DDoS protection and web application firewall (WAF) service",
            features: ["DDoS Protection", "WAF Rules", "Rate Limiting", "Adaptive Protection"],
            implementationGuide: "Configure security policies and attach to load balancers.",
            bestPractices: ["Use adaptive protection", "Monitor security events", "Regular rule updates"],
            costInfo: "Based on policies and requests processed",
            complianceFrameworks: ["OWASP Top 10", "DDoS Best Practices"]
        },
        {
            name: "Google Cloud KMS",
            category: "data",
            description: "Managed encryption key service for cloud services and applications",
            features: ["Key Management", "Envelope Encryption", "Key Rotation", "Hardware Security Modules"],
            implementationGuide: "Create key rings and keys with appropriate permissions.",
            bestPractices: ["Enable automatic rotation", "Use different keys per service", "Monitor key usage"],
            costInfo: "Per active key version and cryptographic operations",
            complianceFrameworks: ["FIPS 140-2", "Common Criteria"]
        },
        {
            name: "Google Cloud Data Loss Prevention",
            category: "data",
            description: "Service to discover, classify, and protect sensitive data",
            features: ["Data Discovery", "Classification", "De-identification", "Risk Assessment"],
            implementationGuide: "Configure inspection templates and job triggers.",
            bestPractices: ["Use built-in infoTypes", "Regular data scans", "Automated de-identification"],
            costInfo: "Based on data processed and operations performed",
            complianceFrameworks: ["GDPR", "CCPA", "HIPAA"]
        },
        {
            name: "Google Cloud Asset Inventory",
            category: "governance",
            description: "Service that provides inventory, search, and analysis of cloud assets",
            features: ["Asset Tracking", "Policy Analysis", "Access Policy", "Real-time Monitoring"],
            implementationGuide: "Enable asset inventory API and configure feeds.",
            bestPractices: ["Regular asset audits", "Use feeds for monitoring", "Policy analysis"],
            costInfo: "No additional cost for basic features",
            complianceFrameworks: ["CIS Controls", "NIST"]
        },
        {
            name: "Google Cloud Binary Authorization",
            category: "application",
            description: "Deploy-time security control that ensures only trusted container images are deployed",
            features: ["Image Verification", "Attestation", "Policy Enforcement", "Continuous Validation"],
            implementationGuide: "Configure policies and attestors for container images.",
            bestPractices: ["Use attestation", "Regular policy updates", "Monitor violations"],
            costInfo: "No additional cost for the service",
            complianceFrameworks: ["Supply Chain Security", "NIST"]
        },
        {
            name: "Google Cloud Identity-Aware Proxy",
            category: "identity",
            description: "Controls access to cloud applications running on Google Cloud",
            features: ["Context-aware Access", "Zero Trust Security", "App Engine Integration", "TCP Forwarding"],
            implementationGuide: "Configure access policies and enable for applications.",
            bestPractices: ["Use context-aware policies", "Regular access reviews", "Monitor access logs"],
            costInfo: "No additional cost for the service",
            complianceFrameworks: ["Zero Trust", "BeyondCorp"]
        },
        {
            name: "Google Cloud VPC Security",
            category: "network",
            description: "Network security features for Virtual Private Cloud",
            features: ["Firewall Rules", "VPC Flow Logs", "Private Google Access", "Shared VPC"],
            implementationGuide: "Configure firewall rules and enable VPC Flow Logs.",
            bestPractices: ["Least privilege firewall rules", "Enable flow logs", "Use private access"],
            costInfo: "VPC is free, flow logs charged based on volume",
            complianceFrameworks: ["CIS Controls", "NIST"]
        },
        {
            name: "Google Cloud Web Security Scanner",
            category: "application",
            description: "Web security scanner for common vulnerabilities in App Engine applications",
            features: ["XSS Detection", "Injection Flaws", "Sensitive Data Exposure", "Security Misconfigurations"],
            implementationGuide: "Configure scanning from Security Command Center or via API.",
            bestPractices: ["Regular scanning schedules", "Remediate findings promptly", "Integrate with CI/CD"],
            costInfo: "Free with usage limits",
            complianceFrameworks: ["OWASP Top 10"]
        }
    ],

    // Compliance Frameworks
    complianceFrameworks: [
        {
            name: "NIST Cybersecurity Framework",
            description: "Framework for improving critical infrastructure cybersecurity",
            controls: ["Identify", "Protect", "Detect", "Respond", "Recover"],
            awsMappings: {
                "Identify": ["Config", "CloudTrail", "Inspector"],
                "Protect": ["IAM", "WAF", "KMS"],
                "Detect": ["GuardDuty", "Security Hub", "CloudWatch"],
                "Respond": ["Lambda", "Systems Manager", "CloudFormation"],
                "Recover": ["Backup", "Disaster Recovery", "Business Continuity"]
            },
            azureMappings: {
                "Identify": ["Security Center", "Azure Policy", "Asset Inventory"],
                "Protect": ["Azure AD", "Key Vault", "Application Gateway WAF"],
                "Detect": ["Sentinel", "Security Center", "Monitor"],
                "Respond": ["Logic Apps", "Security Center", "Automation"],
                "Recover": ["Backup", "Site Recovery", "Business Continuity"]
            },
            gcpMappings: {
                "Identify": ["Security Command Center", "Asset Inventory", "Cloud Audit Logs"],
                "Protect": ["Cloud IAM", "Cloud KMS", "Cloud Armor"],
                "Detect": ["Security Command Center", "Cloud Monitoring", "Cloud Logging"],
                "Respond": ["Cloud Functions", "Cloud Deployment Manager", "Incident Response"],
                "Recover": ["Cloud Backup", "Disaster Recovery", "Business Continuity"]
            }
        },
        {
            name: "SOC 2 Type II",
            description: "Security, availability, processing integrity, confidentiality, and privacy controls",
            controls: ["Security", "Availability", "Processing Integrity", "Confidentiality", "Privacy"],
            awsMappings: {
                "Security": ["GuardDuty", "IAM", "Security Hub"],
                "Availability": ["Auto Scaling", "Multi-AZ", "ELB"],
                "Processing Integrity": ["CloudTrail", "Config", "Systems Manager"],
                "Confidentiality": ["KMS", "Secrets Manager", "Macie"],
                "Privacy": ["Macie", "Data Protection", "Access Controls"]
            },
            azureMappings: {
                "Security": ["Security Center", "Azure AD", "Sentinel"],
                "Availability": ["Load Balancer", "Availability Sets", "Traffic Manager"],
                "Processing Integrity": ["Monitor", "Policy", "Automation"],
                "Confidentiality": ["Key Vault", "Information Protection", "Encryption"],
                "Privacy": ["Information Protection", "Compliance Manager", "Data Classification"]
            },
            gcpMappings: {
                "Security": ["Security Command Center", "Cloud IAM", "Cloud Armor"],
                "Availability": ["Load Balancing", "Regional Persistent Disks", "Auto-scaling"],
                "Processing Integrity": ["Cloud Audit Logs", "Cloud Monitoring", "Deployment Manager"],
                "Confidentiality": ["Cloud KMS", "Secret Manager", "DLP API"],
                "Privacy": ["DLP API", "Data Governance", "Access Controls"]
            }
        },
        {
            name: "ISO 27001",
            description: "International standard for information security management systems",
            controls: ["Information Security Policies", "Risk Management", "Asset Management", "Access Control"],
            awsMappings: {
                "Information Security Policies": ["Organizations", "Control Tower", "Config"],
                "Risk Management": ["Security Hub", "Inspector", "Trusted Advisor"],
                "Asset Management": ["Config", "Systems Manager", "Resource Groups"],
                "Access Control": ["IAM", "Cognito", "Directory Service"]
            },
            azureMappings: {
                "Information Security Policies": ["Policy", "Blueprints", "Management Groups"],
                "Risk Management": ["Security Center", "Advisor", "Service Health"],
                "Asset Management": ["Resource Manager", "Tags", "Inventory"],
                "Access Control": ["Azure AD", "PIM", "Conditional Access"]
            },
            gcpMappings: {
                "Information Security Policies": ["Organization Policy", "Resource Manager", "Cloud Deployment Manager"],
                "Risk Management": ["Security Command Center", "Recommender", "Cloud Asset Inventory"],
                "Asset Management": ["Cloud Asset Inventory", "Resource Manager", "Cloud Monitoring"],
                "Access Control": ["Cloud IAM", "Identity-Aware Proxy", "Context-aware Access"]
            }
        },
        {
            name: "CIS Controls",
            description: "Prioritized set of actions for cyber defense",
            controls: ["Inventory and Control of Hardware Assets", "Inventory and Control of Software Assets", "Continuous Vulnerability Management"],
            awsMappings: {
                "Inventory and Control of Hardware Assets": ["Config", "Systems Manager", "EC2"],
                "Inventory and Control of Software Assets": ["Systems Manager", "Inspector", "License Manager"],
                "Continuous Vulnerability Management": ["Inspector", "Security Hub", "Systems Manager Patch Manager"]
            },
            azureMappings: {
                "Inventory and Control of Hardware Assets": ["Security Center", "Azure Resource Graph", "Inventory"],
                "Inventory and Control of Software Assets": ["Security Center", "Update Management", "Change Tracking"],
                "Continuous Vulnerability Management": ["Security Center", "Defender for Cloud", "Update Management"]
            },
            gcpMappings: {
                "Inventory and Control of Hardware Assets": ["Cloud Asset Inventory", "Compute Engine", "GKE"],
                "Inventory and Control of Software Assets": ["Cloud Asset Inventory", "Binary Authorization", "Container Analysis"],
                "Continuous Vulnerability Management": ["Security Command Center", "Container Analysis", "Web Security Scanner"]
            }
        },
        {
            name: "GDPR",
            description: "General Data Protection Regulation for data protection and privacy",
            controls: ["Data Protection by Design", "Rights of Data Subjects", "Data Breach Notification", "Privacy Impact Assessments"],
            awsMappings: {
                "Data Protection by Design": ["KMS", "Macie", "PrivateLink"],
                "Rights of Data Subjects": ["Cognito", "Data portability tools", "S3 lifecycle"],
                "Data Breach Notification": ["GuardDuty", "Security Hub", "SNS"],
                "Privacy Impact Assessments": ["Macie", "Config", "Well-Architected Tool"]
            },
            azureMappings: {
                "Data Protection by Design": ["Key Vault", "Information Protection", "Private Link"],
                "Rights of Data Subjects": ["Azure AD", "Data Subject Requests", "Data lifecycle"],
                "Data Breach Notification": ["Security Center", "Sentinel", "Logic Apps"],
                "Privacy Impact Assessments": ["Compliance Manager", "Service Trust Portal", "Privacy dashboard"]
            },
            gcpMappings: {
                "Data Protection by Design": ["Cloud KMS", "DLP API", "Private Service Connect"],
                "Rights of Data Subjects": ["Cloud Identity", "Data portability", "Cloud Storage lifecycle"],
                "Data Breach Notification": ["Security Command Center", "Cloud Monitoring", "Cloud Pub/Sub"],
                "Privacy Impact Assessments": ["DLP API", "Cloud Data Catalog", "Privacy Engineering"]
            }
        },
        {
            name: "PCI DSS",
            description: "Payment Card Industry Data Security Standard",
            controls: ["Secure Network", "Protect Cardholder Data", "Vulnerability Management", "Access Control"],
            awsMappings: {
                "Secure Network": ["VPC", "Security Groups", "WAF"],
                "Protect Cardholder Data": ["KMS", "CloudHSM", "S3 encryption"],
                "Vulnerability Management": ["Inspector", "Systems Manager", "Security Hub"],
                "Access Control": ["IAM", "MFA", "CloudTrail"]
            },
            azureMappings: {
                "Secure Network": ["Virtual Network", "Network Security Groups", "Application Gateway WAF"],
                "Protect Cardholder Data": ["Key Vault", "Storage encryption", "Dedicated HSM"],
                "Vulnerability Management": ["Security Center", "Update Management", "Defender for Cloud"],
                "Access Control": ["Azure AD", "PIM", "Conditional Access"]
            },
            gcpMappings: {
                "Secure Network": ["VPC", "Firewall rules", "Cloud Armor"],
                "Protect Cardholder Data": ["Cloud KMS", "Cloud HSM", "Encryption at rest"],
                "Vulnerability Management": ["Security Command Center", "Container Analysis", "Web Security Scanner"],
                "Access Control": ["Cloud IAM", "Identity-Aware Proxy", "Audit logs"]
            }
        },
        {
            name: "HIPAA",
            description: "Health Insurance Portability and Accountability Act",
            controls: ["Administrative Safeguards", "Physical Safeguards", "Technical Safeguards", "Breach Notification"],
            awsMappings: {
                "Administrative Safeguards": ["IAM", "Organizations", "CloudTrail"],
                "Physical Safeguards": ["Data centers", "Physical security", "Hardware disposal"],
                "Technical Safeguards": ["KMS", "VPC", "Security Groups"],
                "Breach Notification": ["GuardDuty", "Config", "SNS"]
            },
            azureMappings: {
                "Administrative Safeguards": ["Azure AD", "PIM", "Azure Policy"],
                "Physical Safeguards": ["Data centers", "Physical security", "Hardware lifecycle"],
                "Technical Safeguards": ["Key Vault", "Virtual Network", "Encryption"],
                "Breach Notification": ["Security Center", "Monitor", "Logic Apps"]
            },
            gcpMappings: {
                "Administrative Safeguards": ["Cloud IAM", "Organization policies", "Audit logs"],
                "Physical Safeguards": ["Data centers", "Physical security", "Hardware lifecycle"],
                "Technical Safeguards": ["Cloud KMS", "VPC", "Encryption"],
                "Breach Notification": ["Security Command Center", "Cloud Monitoring", "Pub/Sub"]
            }
        },
        {
            name: "FedRAMP",
            description: "Federal Risk and Authorization Management Program",
            controls: ["Access Control", "Audit and Accountability", "Configuration Management", "Incident Response"],
            awsMappings: {
                "Access Control": ["IAM", "Cognito", "Directory Service"],
                "Audit and Accountability": ["CloudTrail", "Config", "CloudWatch"],
                "Configuration Management": ["Config", "Systems Manager", "CloudFormation"],
                "Incident Response": ["Security Hub", "GuardDuty", "SNS"]
            },
            azureMappings: {
                "Access Control": ["Azure AD", "PIM", "RBAC"],
                "Audit and Accountability": ["Monitor", "Activity Log", "Sentinel"],
                "Configuration Management": ["Policy", "Blueprints", "Automation"],
                "Incident Response": ["Security Center", "Sentinel", "Logic Apps"]
            },
            gcpMappings: {
                "Access Control": ["Cloud IAM", "Identity-Aware Proxy", "Context-aware Access"],
                "Audit and Accountability": ["Cloud Audit Logs", "Cloud Logging", "Cloud Monitoring"],
                "Configuration Management": ["Deployment Manager", "Organization Policy", "Config Connector"],
                "Incident Response": ["Security Command Center", "Cloud Functions", "Pub/Sub"]
            }
        }
    ],

    // MITRE ATT&CK Tactics
    mitreTactics: [
        {
            tacticId: "TA0001",
            name: "Initial Access",
            description: "Techniques used to gain an initial foothold within a network",
            techniques: ["T1190", "T1133", "T1078", "T1566"],
            awsMitigations: ["WAF", "GuardDuty", "VPC Security Groups", "IAM"],
            azureMitigations: ["Application Gateway WAF", "Azure Sentinel", "Network Security Groups", "Azure AD"],
            gcpMitigations: ["Cloud Armor", "Security Command Center", "VPC Firewall Rules", "Cloud IAM"]
        },
        {
            tacticId: "TA0002",
            name: "Execution",
            description: "Techniques that result in adversary-controlled code running on a local or remote system",
            techniques: ["T1059", "T1053", "T1204", "T1569"],
            awsMitigations: ["Systems Manager", "Lambda", "CloudWatch Events", "Config"],
            azureMitigations: ["Azure Automation", "Logic Apps", "Monitor", "Policy"],
            gcpMitigations: ["Cloud Functions", "Cloud Scheduler", "Cloud Monitoring", "Organization Policy"]
        },
        {
            tacticId: "TA0003",
            name: "Persistence",
            description: "Techniques used to maintain access to systems across restarts",
            techniques: ["T1098", "T1136", "T1543", "T1547"],
            awsMitigations: ["CloudTrail", "Config", "IAM Access Analyzer", "Systems Manager"],
            azureMitigations: ["Azure Monitor", "Azure AD Audit Logs", "Security Center", "Policy"],
            gcpMitigations: ["Cloud Audit Logs", "Cloud Asset Inventory", "Policy Intelligence", "Security Command Center"]
        },
        {
            tacticId: "TA0004",
            name: "Privilege Escalation",
            description: "Techniques that adversaries use to gain higher-level permissions",
            techniques: ["T1078", "T1134", "T1068", "T1484"],
            awsMitigations: ["IAM", "GuardDuty", "Security Hub", "CloudTrail"],
            azureMitigations: ["Azure AD PIM", "Security Center", "Azure AD Identity Protection", "Conditional Access"],
            gcpMitigations: ["Cloud IAM", "Security Command Center", "Policy Intelligence", "Audit Logs"]
        },
        {
            tacticId: "TA0005",
            name: "Defense Evasion",
            description: "Techniques that adversaries use to avoid detection",
            techniques: ["T1562", "T1070", "T1027", "T1055"],
            awsMitigations: ["GuardDuty", "Security Hub", "CloudTrail", "Config"],
            azureMitigations: ["Azure Sentinel", "Security Center", "Monitor", "Advanced Threat Protection"],
            gcpMitigations: ["Security Command Center", "Cloud Monitoring", "Cloud Audit Logs", "Binary Authorization"]
        },
        {
            tacticId: "TA0006",
            name: "Credential Access",
            description: "Techniques for stealing credentials like account names and passwords",
            techniques: ["T1555", "T1003", "T1110", "T1212"],
            awsMitigations: ["Secrets Manager", "IAM", "GuardDuty", "MFA"],
            azureMitigations: ["Key Vault", "Azure AD Identity Protection", "PIM", "MFA"],
            gcpMitigations: ["Secret Manager", "Cloud IAM", "Security Command Center", "2-Step Verification"]
        },
        {
            tacticId: "TA0007",
            name: "Discovery",
            description: "Techniques an adversary may use to gain knowledge about the system",
            techniques: ["T1087", "T1083", "T1518", "T1135"],
            awsMitigations: ["CloudTrail", "VPC Flow Logs", "GuardDuty", "Config"],
            azureMitigations: ["NSG Flow Logs", "Azure Monitor", "Security Center", "Audit Logs"],
            gcpMitigations: ["VPC Flow Logs", "Cloud Audit Logs", "Security Command Center", "Cloud Monitoring"]
        },
        {
            tacticId: "TA0008",
            name: "Lateral Movement",
            description: "Techniques that adversaries use to enter and control remote systems",
            techniques: ["T1021", "T1210", "T1563", "T1570"],
            awsMitigations: ["Security Groups", "Network ACLs", "Systems Manager Session Manager", "VPC"],
            azureMitigations: ["Network Security Groups", "Azure Bastion", "Just-in-Time Access", "Private Link"],
            gcpMitigations: ["Firewall Rules", "Identity-Aware Proxy", "Private Service Connect", "VPC"]
        },
        {
            tacticId: "TA0009",
            name: "Collection",
            description: "Techniques adversaries may use to gather information",
            techniques: ["T1005", "T1039", "T1025", "T1114"],
            awsMitigations: ["Macie", "CloudTrail", "S3 Access Logging", "DLP"],
            azureMitigations: ["Information Protection", "Monitor", "Storage Analytics", "DLP"],
            gcpMitigations: ["DLP API", "Cloud Audit Logs", "Cloud Storage audit logs", "Cloud Monitoring"]
        },
        {
            tacticId: "TA0010",
            name: "Command and Control",
            description: "Techniques that adversaries may use to communicate with systems under their control",
            techniques: ["T1071", "T1573", "T1090", "T1095"],
            awsMitigations: ["GuardDuty", "VPC Flow Logs", "DNS Resolver Query Logging", "WAF"],
            azureMitigations: ["Azure Sentinel", "NSG Flow Logs", "DNS Analytics", "Application Gateway WAF"],
            gcpMitigations: ["Security Command Center", "VPC Flow Logs", "Cloud DNS Logging", "Cloud Armor"]
        },
        {
            tacticId: "TA0011",
            name: "Exfiltration",
            description: "Techniques that adversaries may use to steal data from your network",
            techniques: ["T1041", "T1048", "T1567", "T1029"],
            awsMitigations: ["Macie", "GuardDuty", "VPC Endpoints", "S3 Block Public Access"],
            azureMitigations: ["Information Protection", "Azure Sentinel", "Private Endpoints", "Storage Firewalls"],
            gcpMitigations: ["DLP API", "Security Command Center", "Private Service Connect", "VPC Service Controls"]
        },
        {
            tacticId: "TA0040",
            name: "Impact",
            description: "Techniques that adversaries use to disrupt availability or compromise integrity",
            techniques: ["T1485", "T1486", "T1490", "T1498"],
            awsMitigations: ["Backup", "Versioning", "MFA Delete", "Shield"],
            azureMitigations: ["Backup", "Soft Delete", "DDoS Protection", "Immutable Storage"],
            gcpMitigations: ["Cloud Backup", "Object Versioning", "Cloud Armor", "Immutable Storage"]
        },
        {
            tacticId: "TA0042",
            name: "Resource Development",
            description: "Techniques that involve adversaries creating, purchasing, or compromising/stealing resources",
            techniques: ["T1583", "T1584", "T1585", "T1586"],
            awsMitigations: ["Trusted Advisor", "Config", "Organizations", "Service Control Policies"],
            azureMitigations: ["Advisor", "Policy", "Management Groups", "Blueprints"],
            gcpMitigations: ["Recommender", "Organization Policy", "Resource Manager", "Security Command Center"]
        },
        {
            tacticId: "TA0043",
            name: "Reconnaissance",
            description: "Techniques that involve adversaries actively or passively gathering information",
            techniques: ["T1595", "T1590", "T1591", "T1598"],
            awsMitigations: ["GuardDuty", "WAF", "Shield", "CloudFront"],
            azureMitigations: ["Azure Sentinel", "DDoS Protection", "Application Gateway", "Front Door"],
            gcpMitigations: ["Security Command Center", "Cloud Armor", "Cloud CDN", "Load Balancing"]
        }
    ],

    // Security Tools Database
    securityTools: [
        {
            name: "AWS Inspector",
            category: "vulnerability",
            cloudPlatforms: ["AWS"],
            description: "Automated security assessment service for applications deployed on AWS",
            features: ["Application Security Assessment", "Network Reachability Analysis", "Runtime Behavior Analysis"],
            integrationGuide: "Install Inspector agent on EC2 instances. Create assessment targets and templates.",
            costModel: "Per assessment run"
        },
        {
            name: "Azure Defender",
            category: "cspm",
            cloudPlatforms: ["Azure"],
            description: "Cloud-native security solution for workload protection",
            features: ["Threat Protection", "Vulnerability Assessment", "Security Alerts", "JIT Access"],
            integrationGuide: "Enable Defender for specific resource types in Security Center.",
            costModel: "Per resource per month"
        },
        {
            name: "Google Cloud Security Scanner",
            category: "vulnerability",
            cloudPlatforms: ["GCP"],
            description: "Web security scanner for common vulnerabilities in App Engine applications",
            features: ["XSS Detection", "Injection Flaws", "Sensitive Data Exposure", "Security Misconfigurations"],
            integrationGuide: "Configure scanning from Security Command Center or via API.",
            costModel: "Free with usage limits"
        },
        {
            name: "Aqua Security",
            category: "container",
            cloudPlatforms: ["AWS", "Azure", "GCP"],
            description: "Full lifecycle security for containerized applications",
            features: ["Image Scanning", "Runtime Protection", "Compliance", "Network Security"],
            integrationGuide: "Deploy Aqua agents and configure policies.",
            costModel: "Per node/workload"
        },
        {
            name: "Prisma Cloud",
            category: "cspm",
            cloudPlatforms: ["AWS", "Azure", "GCP"],
            description: "Comprehensive cloud native security platform",
            features: ["CSPM", "CWPP", "CIEM", "Code Security"],
            integrationGuide: "Connect cloud accounts and configure policies.",
            costModel: "Per resource/credit"
        },
        {
            name: "Qualys VMDR",
            category: "vulnerability",
            cloudPlatforms: ["AWS", "Azure", "GCP"],
            description: "Vulnerability management, detection and response",
            features: ["Asset Discovery", "Vulnerability Assessment", "Patch Management", "Compliance"],
            integrationGuide: "Deploy cloud agents and configure scanning.",
            costModel: "Per asset"
        },
        {
            name: "Rapid7 InsightVM",
            category: "vulnerability",
            cloudPlatforms: ["AWS", "Azure", "GCP"],
            description: "Vulnerability risk management solution",
            features: ["Live Vulnerability Monitoring", "Dynamic Assessment", "Remediation Analytics"],
            integrationGuide: "Deploy scan engines and configure discovery.",
            costModel: "Per asset"
        },
        {
            name: "Tenable.io",
            category: "vulnerability",
            cloudPlatforms: ["AWS", "Azure", "GCP"],
            description: "Cloud-based vulnerability management platform",
            features: ["Asset Discovery", "Vulnerability Assessment", "Web Application Scanning", "Container Security"],
            integrationGuide: "Deploy Nessus agents and configure scans.",
            costModel: "Per asset"
        },
        {
            name: "Checkmarx SAST",
            category: "sast",
            cloudPlatforms: ["AWS", "Azure", "GCP"],
            description: "Static application security testing solution",
            features: ["Source Code Analysis", "Security Flaw Detection", "Compliance Reporting", "IDE Integration"],
            integrationGuide: "Integrate with CI/CD pipelines and development tools.",
            costModel: "Per lines of code"
        },
        {
            name: "Veracode",
            category: "sast",
            cloudPlatforms: ["AWS", "Azure", "GCP"],
            description: "Application security testing platform",
            features: ["Static Analysis", "Dynamic Analysis", "Software Composition Analysis", "Container Security"],
            integrationGuide: "Upload applications for scanning or use API integration.",
            costModel: "Per application/scan"
        },
        {
            name: "OWASP ZAP",
            category: "sast",
            cloudPlatforms: ["AWS", "Azure", "GCP"],
            description: "Open source web application security scanner",
            features: ["Automated Scanner", "Passive Scanner", "Fuzzer", "WebSockets Support"],
            integrationGuide: "Deploy as part of CI/CD pipeline or standalone scanning.",
            costModel: "Free/Open Source"
        },
        {
            name: "Twistlock (Prisma Cloud Compute)",
            category: "container",
            cloudPlatforms: ["AWS", "Azure", "GCP"],
            description: "Container and serverless security platform",
            features: ["Image Scanning", "Runtime Defense", "Compliance", "Serverless Protection"],
            integrationGuide: "Deploy defenders and configure policies.",
            costModel: "Per defended node"
        },
        {
            name: "Sysdig Secure",
            category: "container",
            cloudPlatforms: ["AWS", "Azure", "GCP"],
            description: "Container runtime security and forensics",
            features: ["Runtime Security", "Forensics", "Compliance", "Image Scanning"],
            integrationGuide: "Deploy Sysdig agents and configure policies.",
            costModel: "Per node"
        },
        {
            name: "Anchore Enterprise",
            category: "container",
            cloudPlatforms: ["AWS", "Azure", "GCP"],
            description: "Container image inspection and compliance",
            features: ["Deep Image Analysis", "Policy-based Compliance", "Vulnerability Detection", "Certificate Management"],
            integrationGuide: "Integrate with CI/CD pipelines and registries.",
            costModel: "Per repository/image"
        },
        {
            name: "Falco",
            category: "container",
            cloudPlatforms: ["AWS", "Azure", "GCP"],
            description: "Cloud native runtime security",
            features: ["Behavioral Activity Monitoring", "Runtime Security", "Kubernetes Security", "Custom Rules"],
            integrationGuide: "Deploy as DaemonSet in Kubernetes clusters.",
            costModel: "Free/Open Source"
        },
        {
            name: "CloudSploit",
            category: "cspm",
            cloudPlatforms: ["AWS", "Azure", "GCP"],
            description: "Cloud security posture management",
            features: ["Security Scanning", "Compliance Monitoring", "Best Practice Checks", "Custom Policies"],
            integrationGuide: "Connect cloud accounts and configure scanning.",
            costModel: "Free/Open Source"
        },
        {
            name: "Scout Suite",
            category: "cspm",
            cloudPlatforms: ["AWS", "Azure", "GCP"],
            description: "Multi-cloud security auditing tool",
            features: ["Security Posture Assessment", "Compliance Checking", "Risk Analysis", "Reporting"],
            integrationGuide: "Run security assessments using cloud provider APIs.",
            costModel: "Free/Open Source"
        },
        {
            name: "Prowler",
            category: "cspm",
            cloudPlatforms: ["AWS", "Azure", "GCP"],
            description: "Security best practices assessment",
            features: ["CIS Benchmarks", "AWS Security Best Practices", "GDPR", "HIPAA"],
            integrationGuide: "Run assessments using command line or integrate with CI/CD.",
            costModel: "Free/Open Source"
        },
        {
            name: "Nuclei",
            category: "vulnerability",
            cloudPlatforms: ["AWS", "Azure", "GCP"],
            description: "Fast and customizable vulnerability scanner",
            features: ["Template-based Scanning", "DNS Resolution", "Custom Templates", "Bulk Scanning"],
            integrationGuide: "Deploy as part of automated security testing.",
            costModel: "Free/Open Source"
        },
        {
            name: "OpenVAS",
            category: "vulnerability",
            cloudPlatforms: ["AWS", "Azure", "GCP"],
            description: "Full-featured vulnerability scanner",
            features: ["Network Vulnerability Testing", "Authenticated Testing", "Configuration Auditing", "Compliance Checks"],
            integrationGuide: "Deploy OpenVAS manager and configure targets.",
            costModel: "Free/Open Source"
        },
        {
            name: "Lacework",
            category: "cspm",
            cloudPlatforms: ["AWS", "Azure", "GCP"],
            description: "Cloud security platform with behavioral analytics",
            features: ["Anomaly Detection", "Compliance Monitoring", "Threat Detection", "Forensics"],
            integrationGuide: "Connect cloud accounts and deploy agents.",
            costModel: "Per resource hour"
        },
        {
            name: "Orca Security",
            category: "cspm",
            cloudPlatforms: ["AWS", "Azure", "GCP"],
            description: "Agentless cloud security platform",
            features: ["Asset Discovery", "Vulnerability Assessment", "Compliance", "Risk Prioritization"],
            integrationGuide: "Connect cloud accounts for agentless scanning.",
            costModel: "Per asset"
        },
        {
            name: "Wiz",
            category: "cspm",
            cloudPlatforms: ["AWS", "Azure", "GCP"],
            description: "Cloud security posture management platform",
            features: ["Risk Assessment", "Vulnerability Management", "Data Classification", "Network Visualization"],
            integrationGuide: "Connect cloud accounts for comprehensive scanning.",
            costModel: "Per workload"
        },
        {
            name: "Bridgecrew (Prisma Cloud)",
            category: "sast",
            cloudPlatforms: ["AWS", "Azure", "GCP"],
            description: "Infrastructure as code security",
            features: ["IaC Scanning", "Policy as Code", "Supply Chain Security", "Drift Detection"],
            integrationGuide: "Integrate with version control and CI/CD systems.",
            costModel: "Per repository"
        },
        {
            name: "TruffleHog",
            category: "sast",
            cloudPlatforms: ["AWS", "Azure", "GCP"],
            description: "Secrets detection in code repositories",
            features: ["Git Repository Scanning", "Entropy Detection", "Regular Expression Rules", "Active Secret Verification"],
            integrationGuide: "Scan repositories and integrate with CI/CD pipelines.",
            costModel: "Free/Open Source"
        }
    ]
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = securityData;
}