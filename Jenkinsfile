pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build' // Build the React app
            }
        }

        stage('Test') {
            steps {
                sh 'npm test -- --passWithNoTests' // Run automated tests
            }
        }

        stage('Code Quality Analysis') {
            steps {
                sh 'npx eslint src' // Run code quality analysis with ESLint
            }
        }

        stage('Deploy to Test Environment') {
            steps {
                sh 'docker build -t my-react-app .' // Build Docker image
                sh 'docker run -d --name my-react-container -p 3000:3000 my-react-app' // Run Docker container
            }
        }
    }
}
