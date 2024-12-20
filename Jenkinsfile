@Library("shared") _
pipeline{
    
    agent { label "vinod"}
    
    stages{
        
        stage("Hello"){
            steps{
                script{
                    hello()
                }
            }
        }
        stage("code"){
            steps{
                clone("https://github.com/nikhilpattarwal/weatherApp.git", "main")
            }
        }
        
         stage("Build"){
            steps{
                //  sh "docker build -t nikhilpattarwal/weather-app ."
                 docker_build("nikhilpattarwal","weather-app", "latest")
            }
        }
         stage("Docker Push"){
            steps{
                //  echo "This is testing stage"
                //  withCredentials([usernamePassword('credentialsId':"dockerHubCred",
                //  passwordVariable:"dockerHubPass",
                //  usernameVariable:"dockerHubUser")]){
                //  sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                //  sh "docker image tag weather-app ${env.dockerHubUser}/weather-app"
                //  sh "docker push ${env.dockerHubUser}/weather-app"
                //  }
                 script{
                     docker_push("weather-app", "latest")
                 }
            }
        }
         stage("deploy"){
            steps{
                 echo "This is deploying stage"
                 sh "docker compose down && docker compose up -d"
            }
        }
    }
}
