pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {
        stage('Kod Al') {
            steps {
                checkout scm
            }
        }

        stage('Docker Compose Dogrulama') {
            steps {
                sh 'docker compose -f docker-compose.ci.yaml config'
            }
        }

        stage('Build ve Deploy') {
            steps {
                sh 'docker compose -f docker-compose.ci.yaml down || true'
                sh 'docker compose -f docker-compose.ci.yaml up -d --build'
            }
        }

        stage('Saglik Kontrolu') {
            steps {
                script {
                    sleep 20
                    sh 'docker exec transfera_backend wget -qO- http://localhost:3000/api/health'
                    sh 'docker inspect -f "{{.State.Running}}" transfera_frontend | grep true'
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
