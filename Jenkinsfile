
pipeline {
    agent any

    options {
        ansiColor('xterm')
    }

    stages {
        stage('build') {
            agent {
                docker {
                    image 'node:22-alpine'
                }
            }
            steps {
                sh 'npm ci'
                sh 'npm run build'
            }
        }

        stage('test') {
            parallel {
                stage('unit tests') {
                    agent {
                        docker {
                            image 'node:22-alpine'
                            reuseNode true
                        }
                    }
                    steps {
                        sh 'npm ci'
                        sh 'npm run build'
                        sh 'npx vitest run --reporter=verbose'
                    }
                }

                stage('integration tests') {
                    agent {
                        docker {
                            image 'mcr.microsoft.com/playwright:v1.54.2-jammy'
                            reuseNode true
                        }
                    }
                    steps {
                        sh 'npx playwright test'
                        sh 'npm ci'
                        sh 'npm run build'
                        sh 'npx vitest run --reporter=verbose'
                    }
                }
            }
        }

        stage('deploy') {
            agent {
                docker {
                    image 'alpine'
                }
            }
            steps {
                echo 'Mock deployment was successful!'
            }
        }

        stage('e2e'){
            agent{
                docker {
                    image 'mcr.microsoft.com/playwright:v1.54.2-jammy'
                    reuseNode true
                }
            }

            environment {
                E2E_BASE_URL = 'https://spanish-cards.netlify.app/'  // the application to test
            }
            steps {
                sh 'npx playwright test'
            }
        }
    }
}
