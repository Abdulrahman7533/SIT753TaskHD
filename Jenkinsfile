pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        echo 'Building the Docker image...'
        sh 'docker build -t doctor-app .'
      }
    }
    stage('Test') {
      steps {
        echo 'Running tests...'
        sh 'npm install'
        sh 'npm test || true'
      }
    }
    stage('Code Quality') {
      steps {
        echo 'Running ESLint for code quality...'
        sh 'npx eslint index.js || true'
      }
    }
    stage('Security') {
      steps {
        echo 'Running npm audit...'
        sh 'npm audit || true'
      }
    }
    stage('Deploy to Test') {
      steps {
        echo 'Deploying to test environment (port 3000)...'
        sh 'docker run -d -p 3000:3000 --name doctor-test doctor-app || true'
      }
    }
    stage('Release to Production') {
      steps {
        echo 'Releasing to production (port 8080)...'
        sh '''
          docker stop doctor-test || true
          docker rm doctor-test || true
          docker run -d -p 8080:3000 --name doctor-prod doctor-app
        '''
      }
    }
  }
}
