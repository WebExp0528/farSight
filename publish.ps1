#Note to newbies: Hashes are comments. 
#set the aws region for AWS Tools
Set-DefaultAWSRegion -Region us-east-1
(Get-ECRLoginCommand).Password | docker login --username AWS --password-stdin 538092687847.dkr.ecr.us-east-1.amazonaws.com
docker build -t far-sight-repo .
docker tag far-sight-repo:latest 538092687847.dkr.ecr.us-east-1.amazonaws.com/far-sight-repo:latest
docker push 538092687847.dkr.ecr.us-east-1.amazonaws.com/far-sight-repo:latest
#To trigger AWS EB to pull the docker image from ECR we must issue an environment update command.   Here we just set the version-label to the same value to trigger the update. 
#AWS Tools for PowerShell command to update the elastic beanstalk developer environment.
Update-EBEnvironment -ApplicationName FarSight -EnvironmentName Farsight-develop -VersionLabel farsight-source-14
#AWS CLI V2 command to update application version: 
#aws elasticbeanstalk update-environment --application-name FarSight --environment-name Farsight-develop --version-label farsight-source-14