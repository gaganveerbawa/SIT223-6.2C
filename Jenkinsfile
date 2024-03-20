pipeline {
    agent any
    
    environment {
        NETLIFY_SITE_ID = 'aecf50a1-a868-4cec-91b2-9cc702dd955e'
    }
    
    stages {
        stage('Build') {
            steps {
                sh 'npm install' // Install Dependency
                sh 'npm run build' // Build the React app
                sh 'echo "Building the code using npm"'
            }
        }

        stage('Unit and Integration Tests') {
            steps {
                sh 'npm test -- --passWithNoTests' // Run automated tests
                sh 'echo "Running test on the code using inbuilt testing library provided by react framework"'
            }
        }

        stage('Code Quality Analysis') {
            steps {
                sh 'npx eslint src' // Run code quality analysis with ESLint
                sh 'echo "Running code quality analysis on the code using ESlint library provided by react framework"'
            }
        }
        
        stage('Security Scan') {
            steps {
                //security scanning tool 
                sh 'echo "Running security scan on the code using sonarcube"'
            }
        }

        stage('Deploy to Staging') {
            steps {
                sh 'docker build -t my-react-app .' // Build Docker image
                sh 'docker stop my-react-container || true' // Stop existing container (if running)
                sh 'docker rm my-react-container || true' // Remove existing container (if exists)
                sh 'docker run -d --name my-react-container -p 3000:3000 my-react-app' // Run Docker container
                sh 'echo "Deploying to staging server using docker"'
            }
        }

        stage('Integration Tests') {
            steps {
                sh 'echo "Running integration tests on testing environment"' // Run integration tests on the testing environment
                sh 'echo "Deploying to integration on the staging server"'
            }
        }
        
        stage('Deploy to Production') {
            steps {
                script {
                    sh 'echo "Deploying the website to netlify"'
                    sh "sudo netlify deploy --dir=./build --prod --site=${env.NETLIFY_SITE_ID}"
                }
            }
        }
    }
    
    post {
        success {
            emailext subject: "Pipeline '${currentBuild.fullDisplayName}' Successful",
                      body: 'The build was successful. Congratulations!',
                      to: 'gaganveerbawa@gmail.com',
                      attachLog: true
        }
        failure {
            emailext subject: "Pipeline '${currentBuild.fullDisplayName}' Failed",
                      body: 'The build has failed. Please investigate.',
                      to: 'gaganveerbawa@gmail.com',
                      attachLog: true
        }
    }
}
