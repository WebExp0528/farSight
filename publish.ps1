Set-DefaultAWSRegion -Region us-east-1
(Get-ECRLoginCommand).Password | docker login --username AWS --password-stdin 538092687847.dkr.ecr.us-east-1.amazonaws.com
docker build -t far-sight-repo .
docker tag far-sight-repo:latest 538092687847.dkr.ecr.us-east-1.amazonaws.com/far-sight-repo:latest
docker push 538092687847.dkr.ecr.us-east-1.amazonaws.com/far-sight-repo:latest
aws elasticbeanstalk update-environment --application-name FarSight --environment-name Farsight-develop --version-label farsight-source-14