FROM postgres
COPY dump_transcendence.sql /
RUN echo "psql --user=transcendence_user   < ../dump_transcendence.sql" > /docker-entrypoint-initdb.d/start_script.sh
RUN chmod +x /docker-entrypoint-initdb.d/start_script.sh