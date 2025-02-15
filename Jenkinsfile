pipeline {
    agent any

    environment {
        NODEJS_HOME = tool name: 'nodejs', type: 'nodejs'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}:/var/jenkins_home/.npm-global/bin"
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh "npm install"
            }
        }

        stage('Run Tests') {
            steps {
                sh "npm run test:headless"
            }
        }

        stage('Build App') {
            steps {
                sh 'npx ng build --prod'
            }
        }
    }

    post {
        success {
            echo '✅ Build completed successfully!'
        }
        failure {
            echo '❌ Build failed.'
        }
    }
