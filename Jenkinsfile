pipeline {
  agent any

  environment {
    NODE_ENV = 'test'
  }

  stages {
    stage('Cleanup') {
      steps {
        echo 'Cleaning up any leftover containers...'
        sh '''
          docker stop doctor-test || true
          docker rm doctor-test || true
          docker stop doctor-prod || true
          docker rm doctor-prod || true
        '''
      }
    }

    stage('Build') {
      steps {
        echo 'Building Docker image...'
        sh 'docker build -t doctor-app .'
      }
    }

    stage('Test') {
      steps {
        echo 'Running tests...'
        sh 'docker run --rm -e NODE_ENV=test -v ${WORKSPACE}/project_772:/app -w /app node:18 npm test --ci || true'
      }
    }

    stage('Code Quality') {
      steps {
        echo 'Running ESLint...'
        sh 'docker run --rm -v ${WORKSPACE}/project_772:/app -w /app node:18 npx eslint index.js || true'
      }
    }

    stage('Security') {
      steps {
        echo 'Running Security Audit...'
        sh 'docker run --rm -v ${WORKSPACE}/project_772:/app -w /app node:18 npm audit --audit-level=low || true'
      }
    }

    stage('Deploy to Test') {
      steps {
        echo 'Deploying to test...'
        sh 'docker run -d -p 3000:3000 --name doctor-test doctor-app || true'
      }
    }

    stage('Release to Production') {
      steps {
        echo 'Releasing to production...'
        sh '''
          docker stop doctor-test || true
          docker rm doctor-test || true
          docker stop doctor-prod || true
          docker rm doctor-prod || true
          docker run -d -p 8081:3000 --name doctor-prod doctor-app
        '''
      }
    }
  }
}
