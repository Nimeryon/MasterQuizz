pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    stages {
        stage('Clean project') {
            steps {
                cleanWs()
            }
        }
        stage('Cloning Git') {
            steps {
                sh 'git clone https://github.com/Nimeryon/MasterQuizz'
            }
        }
        stage('Instal dependencies') {
            steps {
                dir('MasterQuizz/') {
                    sh 'npm install'
                }
            }
        }
        stage('Build') {
            steps {
                dir('MasterQuizz/') {
                    sh 'npm run build'
                }
            }
        }
        stage('Run') {
            steps {
                dir('MasterQuizz/') {
                    sh 'npm run start'
                }
            }
        }
    }
}