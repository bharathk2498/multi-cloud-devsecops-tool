from app import db
from sqlalchemy import Text, JSON
from datetime import datetime

class SecurityService(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    cloud_provider = db.Column(db.String(50), nullable=False)  # AWS, Azure, GCP
    category = db.Column(db.String(100), nullable=False)
    description = db.Column(Text, nullable=False)
    features = db.Column(JSON)
    implementation_guide = db.Column(Text)
    best_practices = db.Column(JSON)
    cost_info = db.Column(Text)
    compliance_frameworks = db.Column(JSON)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class ComplianceFramework(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(Text, nullable=False)
    controls = db.Column(JSON)
    aws_mappings = db.Column(JSON)
    azure_mappings = db.Column(JSON)
    gcp_mappings = db.Column(JSON)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class MitreAttackTactic(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tactic_id = db.Column(db.String(20), nullable=False)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(Text, nullable=False)
    techniques = db.Column(JSON)
    aws_mitigations = db.Column(JSON)
    azure_mitigations = db.Column(JSON)
    gcp_mitigations = db.Column(JSON)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class VulnerabilityTool(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    cloud_platforms = db.Column(JSON)
    description = db.Column(Text, nullable=False)
    features = db.Column(JSON)
    integration_guide = db.Column(Text)
    cost_model = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class IaCTemplate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    cloud_provider = db.Column(db.String(50), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    description = db.Column(Text, nullable=False)
    template_content = db.Column(Text, nullable=False)
    security_controls = db.Column(JSON)
    compliance_notes = db.Column(Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
