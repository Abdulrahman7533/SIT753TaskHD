pipeline {
  agent any

  environment {
    NODE_ENV = 'test'
  }

  stages {
    stage('Build') {
      steps {
        echo 'Building Docker image...'
        sh 'docker build -t doctor-app .'
      }
    }

    stage('Install') {
      steps {
        echo 'Installing dependencies...'
        sh 'docker run --rm -v $PWD:/app -w /app node:18 npm install'
      }
    }

    stage('Test') {
      steps {
        echo 'Running tests...'
        sh 'docker run --rm -v $PWD:/app -w /app node:18 npm test --ci || true'
      }
    }

    stage('Code Quality') {
      steps {
        echo 'Running ESLint...'
        sh 'docker run --rm -v $PWD:/app -w /app node:18 npx eslint index.js || true'
      }
    }

    stage('Security') {
      steps {
        echo 'Running Security Audit...'
        sh 'docker run --rm -v $PWD:/app -w /app node:18 npm audit --audit-level=low || true'
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
          docker run -d -p 8081:3000 --name doctor-prod doctor-app
        '''
      }
    }
  }
}
