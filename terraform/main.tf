resource "kubernetes_deployment" "nodejs_app" {
  metadata {
    name      = "nodejs-app"
    namespace = kubernetes_namespace.example.metadata[0].name
    labels = {
      app = "nodejs-app"
    }
  }
  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "nodejs-app"
      }
    }
    template {
      metadata {
        labels = {
          app = "nodejs-app"
        }
      }
      spec {
        container {
          image = "sandrahdocker/mon-image"  # Votre image Node.js spécifique
          name  = "nodejs-app"
          
          # Port exposé par votre app Node.js (généralement 3000, 8080, etc.)
          port {
            container_port = 3000
          }
          
          # Variables d'environnement si nécessaires
          env {
            name  = "NODE_ENV"
            value = "production"
          }
          
          # Autres variables d'environnement
          # env {
          #   name  = "DATABASE_URL"
          #   value = "mongodb://mongo:27017/myapp"
          # }
          
          resources {
            limits = {
              cpu    = "0.5"
              memory = "512Mi"
            }
            requests = {
              cpu    = "250m"
              memory = "256Mi"
            }
          }
        }
      }
    }
  }
}

# Service pour exposer votre application Node.js
resource "kubernetes_service" "nodejs_app" {
  metadata {
    name      = "nodejs-service"
    namespace = kubernetes_namespace.example.metadata[0].name
  }
  spec {
    selector = {
      app = kubernetes_deployment.nodejs_app.spec.0.template.0.metadata.0.labels.app
    }
    port {
      port        = 80
      target_port = 3000  # Port de votre application Node.js
    }
    type = "NodePort"
  }
}