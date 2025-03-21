pipeline {
    agent any

    tools {
        jdk 'jdk17'
        nodejs 'node20'
    }

    stages {

        stage('Clean Workspace') {
            steps {
                script {
                    echo "Cleaning workspace..."
                    deleteDir() // Deletes everything in the Jenkins workspace before starting
                }
            }
        }

        stage('Git Checkout') {
            steps {
                script {
                    git branch: 'main', 
                        credentialsId: 'github_secret',
                        url: 'https://github.com/Immanuvel1207/Full-stack-demo.git'
                }
            }
        }

        stage('Install Dependencies & Build') {
            steps {
                script {
                    sh '''
                    cd task-manager
                    
                    if [ -f package.json ]; then
                        echo "package.json found. Running npm install..."
                        npm install
                        npm run build
                    else
                        echo "ERROR: package.json is missing in task-manager. Skipping npm install."
                        exit 1
                    fi
                    '''
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker', toolName: 'docker') {
                        def imageName = "immanuvel12/task-manager"
                        def tag = "latest"

                        sh """
                        cd task-manager
                        docker build -t ${imageName} .
                        docker tag ${imageName} ${imageName}:${tag}
                        docker push ${imageName}:${tag}
                        """
                    }
                }
            }
        }

        stage('Deploy Docker Container') {
            steps {
                script {
                    def containerName = "task_manager_container"
                    def imageName = "immanuvel12/task-manager:latest"

                    // Stop and remove the existing container if running
                    sh """
                    docker stop ${containerName} || true
                    docker rm ${containerName} || true
                    """

                    // Run the new container on port 3002
                    sh """
                    docker run -d --name ${containerName} -p 3002:3000 ${imageName}
                    """
                }
            }
        }

    }
}
