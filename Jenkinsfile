pipeline {
  agent {
    kubernetes {
      yaml '''
        apiVersion: v1
        kind: Pod
        spec:
          containers:
          - name: docker
            image: node:18.16.0-alpine
            command:
            - ls
            tty: true
        '''
    }
    // docker { image 'node:18.16.0-alpine' }
  }
  stages { 
    // stage('Initialize') {
    //   steps {
    //     def dockerHome = tool 'myDocker'
    //     env.PATH = "${dockerHome}/bin:${env.PATH}"
    //   }
    // }
    stage('Test') {
      steps {
        sh 'node --version'
      }
    }
  }
}