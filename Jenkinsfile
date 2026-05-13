pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Compose Validation') {
            steps {
                sh 'docker compose -f docker-compose.ci.yaml config'
            }
        }

        stage('Build and Deploy') {
            steps {
                sh 'docker compose -f docker-compose.ci.yaml down || true'
                sh 'docker compose -f docker-compose.ci.yaml up -d --build'
            }
        }

        stage('Health Check') {
            steps {
                script {
                    sleep 20
                    sh '''docker compose -f docker-compose.ci.yaml exec -T transfera_backend node -e "fetch('http://127.0.0.1:3000/api/health').then(async (response) => { if (!response.ok) { throw new Error('Backend health check failed with status ' + response.status); } const payload = await response.json(); if (payload.status !== 'ok' && payload.status !== 'degraded') { throw new Error('Unexpected backend status: ' + JSON.stringify(payload)); } }).catch((error) => { console.error(error.message); process.exit(1); })"'''
                    sh '''docker compose -f docker-compose.ci.yaml exec -T transfera_frontend node -e "fetch('http://127.0.0.1:5173').then((response) => { if (!response.ok) { throw new Error('Frontend health check failed with status ' + response.status); } }).catch((error) => { console.error(error.message); process.exit(1); })"'''
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline basarili: Transfera Docker uzerinde calisiyor.'
        }
        failure {
            echo 'Pipeline basarisiz: Jenkins loglari ve docker compose loglarini kontrol et.'
        }
        always {
            sh 'docker compose -f docker-compose.ci.yaml ps || true'
        }
    }
}
