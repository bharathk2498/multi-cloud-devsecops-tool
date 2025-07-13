#!/usr/bin/env python3
"""
Basic tests for the Multi-Cloud DevSecOps Tool
Run with: python -m pytest test_app.py -v
"""

import pytest
import os
import sys
import json
from unittest.mock import patch

# Add the current directory to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Set test environment variables
os.environ['SESSION_SECRET'] = 'test-secret-key'
os.environ['DATABASE_URL'] = 'sqlite:///test.db'

# Import after setting environment variables
from app import app, db
from models import SecurityService, ComplianceFramework, MitreAttackTactic, VulnerabilityTool, IaCTemplate

@pytest.fixture
def client():
    """Create a test client for the Flask application."""
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            yield client

@pytest.fixture
def sample_data():
    """Create sample data for testing."""
    with app.app_context():
        # Add sample security service
        service = SecurityService(
            name='Test AWS IAM',
            cloud_provider='AWS',
            category='Identity Management',
            description='Test IAM service',
            features=['User Management', 'MFA'],
            implementation_guide='Test implementation',
            best_practices=['Use MFA', 'Least privilege'],
            cost_info='Free tier available',
            compliance_frameworks=['SOC 2', 'ISO 27001']
        )
        db.session.add(service)
        
        # Add sample compliance framework
        framework = ComplianceFramework(
            name='Test NIST CSF',
            description='Test NIST Cybersecurity Framework',
            controls=['Identify', 'Protect', 'Detect'],
            aws_mappings={'Identify': ['CloudTrail']},
            azure_mappings={'Protect': ['Security Center']},
            gcp_mappings={'Detect': ['Security Command Center']}
        )
        db.session.add(framework)
        
        # Add sample MITRE tactic
        tactic = MitreAttackTactic(
            tactic_id='TA0001',
            name='Initial Access',
            description='Test initial access tactic',
            techniques=['T1190', 'T1133'],
            aws_mitigations=['WAF', 'GuardDuty'],
            azure_mitigations=['Application Gateway'],
            gcp_mitigations=['Cloud Armor']
        )
        db.session.add(tactic)
        
        db.session.commit()

class TestApplication:
    """Test the basic application functionality."""
    
    def test_app_creation(self):
        """Test that the app is created successfully."""
        assert app is not None
        assert app.config['TESTING'] is True

    def test_home_page(self, client):
        """Test the home page loads successfully."""
        response = client.get('/')
        assert response.status_code == 200
        assert b'Multi-Cloud DevSecOps' in response.data or b'DevSecOps' in response.data

    def test_aws_security_page(self, client, sample_data):
        """Test the AWS security page."""
        response = client.get('/aws-security')
        assert response.status_code == 200

    def test_azure_security_page(self, client, sample_data):
        """Test the Azure security page."""
        response = client.get('/azure-security')
        assert response.status_code == 200

    def test_gcp_security_page(self, client, sample_data):
        """Test the GCP security page."""
        response = client.get('/gcp-security')
        assert response.status_code == 200

    def test_compliance_page(self, client, sample_data):
        """Test the compliance page."""
        response = client.get('/compliance')
        assert response.status_code == 200

    def test_mitre_attack_page(self, client, sample_data):
        """Test the MITRE ATT&CK page."""
        response = client.get('/mitre-attack')
        assert response.status_code == 200

    def test_vulnerability_tools_page(self, client, sample_data):
        """Test the vulnerability tools page."""
        response = client.get('/vulnerability-tools')
        assert response.status_code == 200

    def test_iac_security_page(self, client, sample_data):
        """Test the IaC security page."""
        response = client.get('/iac-security')
        assert response.status_code == 200

    def test_comparison_page(self, client, sample_data):
        """Test the comparison page."""
        response = client.get('/comparison')
        assert response.status_code == 200

    def test_search_functionality(self, client, sample_data):
        """Test the search API."""
        response = client.get('/search?q=AWS')
        assert response.status_code == 200
        
        # Check if response is JSON
        try:
            data = json.loads(response.data)
            assert isinstance(data, list)
        except json.JSONDecodeError:
            pytest.fail("Search endpoint did not return valid JSON")

class TestModels:
    """Test the database models."""
    
    def test_security_service_model(self):
        """Test the SecurityService model."""
        with app.app_context():
            db.create_all()
            service = SecurityService(
                name='Test Service',
                cloud_provider='AWS',
                category='Test Category',
                description='Test description'
            )
            db.session.add(service)
            db.session.commit()
            
            retrieved = SecurityService.query.filter_by(name='Test Service').first()
            assert retrieved is not None
            assert retrieved.cloud_provider == 'AWS'

    def test_compliance_framework_model(self):
        """Test the ComplianceFramework model."""
        with app.app_context():
            db.create_all()
            framework = ComplianceFramework(
                name='Test Framework',
                description='Test description',
                controls=['Control1', 'Control2']
            )
            db.session.add(framework)
            db.session.commit()
            
            retrieved = ComplianceFramework.query.filter_by(name='Test Framework').first()
            assert retrieved is not None
            assert len(retrieved.controls) == 2

class TestDataLoader:
    """Test the data loading functionality."""
    
    def test_data_loading(self):
        """Test that data loads successfully."""
        with app.app_context():
            db.create_all()
            
            # Import and run data loader
            from data_loader import load_initial_data
            load_initial_data()
            
            # Check that data was loaded
            services_count = SecurityService.query.count()
            frameworks_count = ComplianceFramework.query.count()
            
            assert services_count > 0, "No security services were loaded"
            assert frameworks_count > 0, "No compliance frameworks were loaded"

class TestSecurity:
    """Test security-related functionality."""
    
    def test_session_secret_required(self):
        """Test that session secret is properly configured."""
        assert app.secret_key is not None
        assert app.secret_key != 'dev-secret-key-change-in-production'

    def test_sql_injection_protection(self, client, sample_data):
        """Test basic SQL injection protection."""
        # Try SQL injection in search
        malicious_query = "'; DROP TABLE security_service; --"
        response = client.get(f'/search?q={malicious_query}')
        
        # Should return 200 and not crash
        assert response.status_code == 200
        
        # Verify data still exists
        with app.app_context():
            count = SecurityService.query.count()
            assert count > 0, "Data was unexpectedly deleted"

if __name__ == '__main__':
    pytest.main([__file__, '-v'])
