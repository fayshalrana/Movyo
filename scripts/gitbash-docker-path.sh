# Git Bash often does not inherit Docker Desktop's Windows PATH.
# Run once per terminal:   source scripts/gitbash-docker-path.sh
# Then:                   docker build -t movyohealth . && docker run --rm -p 3000:3000 movyohealth
export PATH="/c/Program Files/Docker/Docker/resources/bin:$PATH"
