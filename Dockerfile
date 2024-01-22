FROM nginx:alpine

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN mkdir -p /cmap/prism/adc-white-paper/dist
RUN rm /etc/nginx/conf.d/*
COPY white-paper.conf /etc/nginx/conf.d/
# Copy static assets from builder stage
COPY ./dist /cmap/prism/adc-white-paper/dist
# Containers run nginx with global directives and daemon off
EXPOSE 8080

ENTRYPOINT ["nginx", "-g", "daemon off;"]
