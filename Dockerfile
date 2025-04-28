# For react application 2 level builds are required.
# In the level 1, we build the application to /app/dist - makes the complete application available as s set of HTML/CSS/JS.

FROM node:latest as build

WORKDIR /app

COPY . .

# Remove build-related folders
RUN rm -rf server/ node_modules/ .git/ .github/ tests/ docs/ dist/ build/ .vite/ coverage/

RUN npm install

RUN npm run build

# Level 2 build - we copy all the dist files into the nginix html folder and make it available for serving in prod mode.

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# redirects all routes back to index.html, allowing React Router to handle client-side routing
RUN echo 'server { \
    listen 3000; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
