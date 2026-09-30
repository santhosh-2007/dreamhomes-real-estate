
pipeline {
    agent any

    tools {
        nodejs 'NodeJS-22'
    }

    options {
        skipDefaultCheckout(true)
    }

    stages {
        stage('Checkout from GitHub') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build React Application') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Archive Build') {
            steps {
                archiveArtifacts artifacts: 'dist/**',
                                 fingerprint: true
            }
        }
    }

    post {
        success {
            echo 'DreamHomes build completed successfully!'
        }
        failure {
            echo 'Build failed. Check the console output.'
        }
    }
}