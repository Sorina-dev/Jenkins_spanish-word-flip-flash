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
                        // Unit tests with Vitest
                        sh 'npx vitest run --reporter=verbose'
                    }
                }
                //Integration tests with Playwright
                stage('e2e tests') {
                    agent{
                        docker{
                            image 'mcr.microsoft.com/playwright:v1.54.2-jammy' // Use the version for playwright that is presetn in package.json file
                            reuseNode true
                        }
            }
                    steps {
                        sh 'npx playwright test'
                        sh 'npm ci'
                        sh 'npm run build'
                        //sh 'npx playwright test --reporter=list'
                        // To view the report, uncomment the line below
                        // sh 'npx playwright show-report'
                    }
        }

        stage('deploy') {
            agent {
                docker {
                    image 'alpine'
                }
            }
            steps {
                // Mock deployment which does nothing
                echo 'Mock deployment was successful!'
            }
        }
    }
        }

        }   

}       