all:
	yarn build
	rsync -azv --delete ./dist/ ${SERVER}:/var/www/html/rebalance
