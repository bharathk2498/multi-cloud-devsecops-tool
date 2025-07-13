#!/bin/bash

# Multi-Cloud DevSecOps Tool - Startup Script
# Usage: ./run.sh [dev|prod|docker]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Python is installed
check_python() {
    if ! command -v python3 &> /dev/null; then
        log_error "Python 3 is not installed. Please install Python 3.11 or higher."
        exit 1
    fi
    
    PYTHON_VERSION=$(python3 -c 'import sys; print(".".join(map(str, sys.version_info[:2])))')
    log_info "Python version: $PYTHON_VERSION"
}

# Setup virtual environment
setup_venv() {
    if [ ! -d "venv" ]; then
        log_info "Creating virtual environment..."
        python3 -m venv venv
    fi
    
    log_info "Activating virtual environment..."
    source venv/bin/activate
    
    log_info "Installing dependencies..."
    pip install --upgrade pip
    pip install -r requirements.txt
}

# Development mode
run_dev() {
    log_info "Starting application in DEVELOPMENT mode..."
    check_python
    setup_venv
    
    export FLASK_ENV=development
    export FLASK_DEBUG=1
    
    log_success "Application starting at http://localhost:5000"
    python main.py
}

# Production mode
run_prod() {
    log_info "Starting application in PRODUCTION mode..."
    check_python
    setup_venv
    
    export FLASK_ENV=production
    export SESSION_SECRET=${SESSION_SECRET:-$(openssl rand -hex 32)}
    
    if [ -z "$SESSION_SECRET" ]; then
        log_warning "SESSION_SECRET not set. Using generated key (not persistent)."
    fi
    
    log_info "Starting with Gunicorn..."
    log_success "Application starting at http://localhost:5000"
    gunicorn -w 4 -b 0.0.0.0:5000 --timeout 120 app:app
}

# Docker mode
run_docker() {
    log_info "Starting application with Docker..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    # Build image
    log_info "Building Docker image..."
    docker build -t devsecops-tool .
    
    # Generate session secret if not provided
    SESSION_SECRET=${SESSION_SECRET:-$(openssl rand -hex 32)}
    
    # Run container
    log_info "Starting Docker container..."
    log_success "Application starting at http://localhost:5000"
    docker run -p 5000:5000 \
        -e SESSION_SECRET="$SESSION_SECRET" \
        -e DATABASE_URL="$DATABASE_URL" \
        --name devsecops-tool \
        --rm \
        devsecops-tool
}

# Health check
health_check() {
    log_info "Performing health check..."
    
    # Wait for application to start
    sleep 3
    
    if curl -f -s http://localhost:5000/ > /dev/null; then
        log_success "Application is healthy and responding"
        return 0
    else
        log_error "Application health check failed"
        return 1
    fi
}

# Stop application
stop_app() {
    log_info "Stopping application..."
    
    # Stop any running Python processes
    pkill -f "python main.py" 2>/dev/null || true
    pkill -f "gunicorn" 2>/dev/null || true
    
    # Stop Docker container if running
    docker stop devsecops-tool 2>/dev/null || true
    
    log_success "Application stopped"
}

# Clean up
clean() {
    log_info "Cleaning up..."
    
    # Stop application
    stop_app
    
    # Remove virtual environment
    if [ -d "venv" ]; then
        rm -rf venv
        log_info "Virtual environment removed"
    fi
    
    # Remove database
    if [ -f "devsecops.db" ]; then
        rm devsecops.db
        log_info "Database removed"
    fi
    
    # Remove Docker image
    docker rmi devsecops-tool 2>/dev/null || true
    
    log_success "Cleanup completed"
}

# Show usage
usage() {
    echo "Multi-Cloud DevSecOps Tool - Startup Script"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  dev        Start in development mode (default)"
    echo "  prod       Start in production mode with Gunicorn"
    echo "  docker     Build and run with Docker"
    echo "  health     Check application health"
    echo "  stop       Stop the application"
    echo "  clean      Clean up all resources"
    echo "  help       Show this help message"
    echo ""
    echo "Environment Variables:"
    echo "  SESSION_SECRET    Secret key for session encryption"
    echo "  DATABASE_URL      PostgreSQL connection string (optional)"
    echo "  PORT             Application port (default: 5000)"
    echo ""
    echo "Examples:"
    echo "  $0 dev                    # Start in development mode"
    echo "  $0 prod                   # Start in production mode"
    echo "  $0 docker                 # Run with Docker"
    echo "  SESSION_SECRET=mykey $0   # Set session secret"
}

# Main script logic
main() {
    case "${1:-dev}" in
        "dev"|"development")
            run_dev
            ;;
        "prod"|"production")
            run_prod
            ;;
        "docker")
            run_docker
            ;;
        "health"|"check")
            health_check
            ;;
        "stop")
            stop_app
            ;;
        "clean")
            clean
            ;;
        "help"|"-h"|"--help")
            usage
            ;;
        *)
            log_error "Unknown command: $1"
            usage
            exit 1
            ;;
    esac
}

# Trap signals to cleanup on exit
trap 'log_info "Shutting down..."; stop_app; exit 0' INT TERM

# Run main function
main "$@"
