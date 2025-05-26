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
        sh 'docker run --rm -v /var/jenkins_home/workspace/SIT753Task7HD:/app -w /app node:18 npm install'
        sh 'docker run --rm -v /var/jenkins_home/workspace/SIT753Task7HD:/app -w /app node:18 npm test || true'
      }
    }

    stage('Code Quality') {
      steps {
        echo 'Running ESLint...'
        sh 'docker run --rm -v /var/jenkins_home/workspace/SIT753Task7HD:/app -w /app node:18 npx eslint index.js || true'
      }
    }

    stage('Security') {
      steps {
        echo 'Running npm audit...'
        sh 'docker run --rm -v /var/jenkins_home/workspace/SIT753Task7HD:/app -w /app node:18 npm audit || true'
      }
    }

    stage('Deploy to Test') {
      steps {
        echo 'Deploying to test environment...'
        sh 'docker run -d -p 3000:3000 --name doctor-test doctor-app || true'
      }
    }

    stage('Release to Production') {
      steps {
        echo 'Releasing to production...'
        sh '''
          docker stop doctor-test || true
          docker rm doctor-test || true
          docker run -d -p 8080:3000 --name doctor-prod doctor-app
        '''
      }
    }

  }
}
