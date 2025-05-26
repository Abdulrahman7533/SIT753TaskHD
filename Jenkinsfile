pipeline {
  agent any

  stages {

    stage('Build') {
      steps {
        echo 'Building Docker image...'
        sh 'docker build -t doctor-app .'
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
          docker run -d -p 8080:3000 --name doctor-prod doctor-app
        '''
      }
    }

  }
}
