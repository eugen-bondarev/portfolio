pipeline {
  agent {
    docker { image 'node:18.16.0-alpine' }
  }
  stages { 
    stage('Initialize') {
      steps {
        def dockerHome = tool 'myDocker'
        env.PATH = "${dockerHome}/bin:${env.PATH}"
      }
    }
    stage('Test') {
      steps {
        sh 'node --version'
      }
    }
  }
}