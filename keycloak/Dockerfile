FROM jboss/keycloak:3.4.3.Final

# Copy Waziup theme
RUN mkdir -p /opt/jboss/keycloak/themes/waziup/
COPY waziup /opt/jboss/keycloak/themes/waziup/

#Setup the realm
COPY imports /opt/jboss/keycloak/imports

EXPOSE 8080 8443
