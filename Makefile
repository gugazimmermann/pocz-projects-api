deploy-prod:
	yarn deploy:prod

	cp .env.development .env.production services/auth-api
	$(MAKE) -C services/auth-api deploy-prod

	cp .env.development .env.production services/subscriptions-api
	$(MAKE) -C services/subscriptions-api deploy-prod

	$(MAKE) -C services/auth-api clean
	$(MAKE) -C services/subscriptions-api clean