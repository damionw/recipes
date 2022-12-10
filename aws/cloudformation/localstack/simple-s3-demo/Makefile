STACK_NAME := S3_DemoStack

.PHONY: deploy clean

all: deploy

deploy:
	awslocal cloudformation deploy \
		--template-file cloudformation.yaml \
		--stack $(STACK_NAME)
status:
	awslocal cloudformation list-stacks

clean:
	awslocal cloudformation delete-stack \
		--stack $(STACK_NAME)

